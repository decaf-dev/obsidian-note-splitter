import { MarkdownView, Notice, Plugin } from "obsidian";
import NoteSplitterSettingsTab from "./obsidian/note-splitter-settings-tab";
import { splitByDelimiter } from "./splitter/split-by-delimiter";
import { NodeFileSystem, NoteSplitterSettings, Notifier } from "./types";

const DEFAULT_SETTINGS: NoteSplitterSettings = {
	saveFolderPath: "note-splitter",
	useContentAsTitle: false,
	delimiter: "\\n",
	appendToSplitContent: "",
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

				if (view.getMode() !== "source") {
					new Notice("Please switch to editing mode to split this note.");
					return;
				}

				const fileSystem: NodeFileSystem = {
					create: (filePath, content) => this.app.vault.create(filePath, content),
					createFolder: (folderPath) => this.app.vault.createFolder(folderPath),
					delete: (file) => this.app.vault.delete(file),
					read: (file) => this.app.vault.read(file),
				};
				const notifier: Notifier = (message: string) => new Notice(message);
				await splitByDelimiter(fileSystem, notifier, file, this.settings);
			},
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
