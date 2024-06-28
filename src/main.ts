import { MarkdownView, Notice, Plugin, TFile, normalizePath } from "obsidian";
import { escapeInvalidFileNameChars, removeFrontmatterBlock, trimForFileName } from "./utils";
import NoteSplitterSettingsTab from "./obsidian/note-splitter-settings-tab";

interface NoteSplitterSettings {
	saveFolderPath: string;
	useContentAsTitle: boolean;
	delimiter: string;
	deleteOriginalNote: boolean;
}

const DEFAULT_SETTINGS: NoteSplitterSettings = {
	saveFolderPath: "note-splitter",
	useContentAsTitle: false,
	delimiter: "\\n",
	deleteOriginalNote: false,
};

export default class NoteSplitterPlugin extends Plugin {
	settings: NoteSplitterSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new NoteSplitterSettingsTab(this.app, this));

		this.addCommand({
			id: "split-by-delimiter",
			name: "Split by delimiter",
			callback: async () => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (view === null) {
					new Notice("Please open a markdown note.");
					return;
				}

				const file = view.file;
				if (file === null) {
					new Notice("No file found for this note.");
					return;
				}

				if (view.getMode() !== 'source') {
					new Notice("Please switch to editing mode to split the note.");
					return;
				}

				this.splitNoteByDelimiter(file);
			},
		});
	}

	onunload() { }

	private async splitNoteByDelimiter(file: TFile) {
		//Obsidian will store `\n`` as `\\n` in the settings
		const delimiter = this.settings.delimiter.replace(/\\n/g, "\n");

		if (delimiter === "") {
			new Notice("No delimiter set. Please set a delimiter in the settings.");
			return;
		}

		const data = await this.app.vault.cachedRead(file);

		const dataWithoutFrontmatter = removeFrontmatterBlock(data);
		if (dataWithoutFrontmatter === "") {
			new Notice("No content to split.");
			return;
		}

		const splitLines = dataWithoutFrontmatter
			.split(delimiter)
			.map((line) => line.trim())
			.filter((line) => line !== "");

		if (splitLines.length === 0) {
			new Notice("No content to split.");
			return;
		}

		if (splitLines.length === 1) {
			new Notice("Only one line found. Nothing to split.");
			return;
		}

		const folderPath =
			this.settings.saveFolderPath ||
			file.parent?.path ||
			this.settings.saveFolderPath;

		try {
			await this.app.vault.createFolder(folderPath);
		} catch (err) {
			//Folder already exists
		}

		let filesCreated = 0;
		for (const [i, line] of splitLines.entries()) {
			let fileName = line;
			if (this.settings.useContentAsTitle) {
				fileName = escapeInvalidFileNameChars(fileName);
				fileName = trimForFileName(fileName, ".md");
			} else {
				fileName = `split-note-${Date.now() + i}`;
			}

			const filePath = normalizePath(`${folderPath}/${fileName}.md`);

			try {
				await this.app.vault.create(filePath, line);
				filesCreated++;
			} catch (err) {
				if (err.message.includes("already exists")) {
					const newFilePath = `${folderPath}/Split conflict ${crypto.randomUUID()}.md`;
					try {
						await this.app.vault.create(newFilePath, line);
						filesCreated++;
					} catch (err) {
						console.error(err);
						new Notice(`Error creating file: ${err.message}`);
					}
					continue;
				}
				new Notice(`Error creating file: ${err.message}`);
				console.log(err);
			}
		}

		if (filesCreated === splitLines.length && this.settings.deleteOriginalNote) {
			await this.app.vault.delete(file);
		}

		new Notice(
			"Split into " + filesCreated + " note" + (filesCreated > 1 ? "s" : "") + ".",
		);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
