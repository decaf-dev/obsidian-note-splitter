import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import { findFrontmatterEndIndex, getTitleFromContent } from "./utils";
import NoteSplitterSettingsTab from "./note-splitter-settings-tab";

interface NoteSplitterSettings {
	saveFolderPath: string;
	groupFolderName: string;
	useContentAsTitle: boolean;
	delimiter: string;
}

const DEFAULT_SETTINGS: NoteSplitterSettings = {
	saveFolderPath: "note-splitter",
	groupFolderName: "group",
	useContentAsTitle: false,
	delimiter: "\\n",
}


export default class NoteSplitterPlugin extends Plugin {
	settings: NoteSplitterSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new NoteSplitterSettingsTab(this.app, this));

		this.addCommand({
			id: "split-by-delimeter",
			name: "Split by delimeter",
			editorCallback: async (_editor: Editor, view: MarkdownView) => {
				const file = view.file;
				if (file) {
					let delimeter = this.settings.delimiter;
					//Obsidian will store `\n`` as `\\n` in the settings
					delimeter = delimeter.replace(/\\n/g, "\n");

					if (delimeter === "") {
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

					const splitLines = dataWithoutFrontmatter.split(delimeter).filter((line) =>
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

					const currentTime = Date.now();
					const folderPath = this.settings.saveFolderPath;

					try {
						await this.app.vault.createFolder(folderPath);
					} catch (err) {
						//Folder already exists
					}

					const groupFolderName = this.settings.groupFolderName;
					const groupFolderPath = `${folderPath}/${groupFolderName}-${currentTime}`;

					try {
						await this.app.vault.createFolder(groupFolderPath);
					} catch (err) {
						//Folder already exists
					}

					for (let i = 0; i < splitLines.length; i++) {
						const line = splitLines[i].trim();

						let fileName = "";
						if (this.settings.useContentAsTitle) {
							fileName = getTitleFromContent(line);
						} else {
							fileName = `split-note-${Date.now() + i}`;
						}

						const filePath = `${groupFolderPath}/${fileName}.md`
						await this.app.vault.create(
							filePath, line
						);
					}
					new Notice("Split into " + splitLines.length + " note" + (splitLines.length > 1 ? "s" : ""));
				}
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
