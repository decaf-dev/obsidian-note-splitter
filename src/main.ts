import { Editor, MarkdownView, Notice, Plugin, normalizePath } from "obsidian";
import { escapeInvalidFileNameChars, findFrontmatterEndIndex, trimForFileName } from "./utils";
import NoteSplitterSettingsTab from "./obsidian/note-splitter-settings-tab";

interface NoteSplitterSettings {
	saveFolderPath: string;
	useContentAsTitle: boolean;
	delimiter: string;
}

const DEFAULT_SETTINGS: NoteSplitterSettings = {
	saveFolderPath: "note-splitter",
	useContentAsTitle: false,
	delimiter: "\\n",
}


export default class NoteSplitterPlugin extends Plugin {
	settings: NoteSplitterSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new NoteSplitterSettingsTab(this.app, this));

		this.addCommand({
			id: "split-by-delimiter",
			name: "Split by delimiter",
			editorCallback: async (_editor: Editor, view: MarkdownView) => {
				const file = view.file;
				if (file === null) return;

				let delimiter = this.settings.delimiter;
				//Obsidian will store `\n`` as `\\n` in the settings
				delimiter = delimiter.replace(/\\n/g, "\n");

				if (delimiter === "") {
					new Notice("No delimiter set. Please set a delimiter in the settings");
					return;
				}

				const fileData = await this.app.vault.cachedRead(file);
				const frontmatterEndIndex = findFrontmatterEndIndex(fileData);

				let dataWithoutFrontmatter = fileData;
				//Ignore frontmatter
				if (frontmatterEndIndex !== -1) {
					dataWithoutFrontmatter = dataWithoutFrontmatter.slice(frontmatterEndIndex + 1);
				}
				if (dataWithoutFrontmatter === "") {
					new Notice("No content to split");
					return;
				}

				const splitLines = dataWithoutFrontmatter.split(delimiter).filter((line) =>
					line !== ""
				);


				if (splitLines.length === 0) {
					new Notice("No content to split");
					return;
				}

				if (splitLines.length === 1) {
					new Notice("Only one line found. Nothing to split");
					return;
				}

				const folderPath = this.settings.saveFolderPath;

				try {
					await this.app.vault.createFolder(folderPath);
				} catch (err) {
					//Folder already exists
				}

				for (let i = 0; i < splitLines.length; i++) {
					const line = splitLines[i].trim();

					let fileName = line;
					if (this.settings.useContentAsTitle) {
						fileName = escapeInvalidFileNameChars(fileName);
						fileName = trimForFileName(fileName, ".md");
					} else {
						fileName = `split-note-${Date.now() + i}`;
					}

					const filePath = normalizePath(`${folderPath}/${fileName}.md`);

					try {
						await this.app.vault.create(
							filePath, line
						);
					} catch (err) {
						if (err.message.includes("already exists")) {
							const newFilePath = `${folderPath}/Split conflict ${crypto.randomUUID()}.md`;
							try {
								await this.app.vault.create(
									newFilePath, line
								);
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
				new Notice("Split into " + splitLines.length + " note" + (splitLines.length > 1 ? "s" : ""));
			},
		});
	}

	onunload() { }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
