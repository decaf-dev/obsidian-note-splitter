import { App, PluginSettingTab, Setting } from "obsidian";
import NoteSplitterPlugin from "../main";

export default class NoteSplitterSettingsTab extends PluginSettingTab {
	plugin: NoteSplitterPlugin;

	constructor(app: App, plugin: NoteSplitterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Folder path")
			.setDesc(
				"The path to the folder that split notes will be placed in. If left empty, the folder of the original note will be used.",
			)
			.addText((text) =>
				text.setValue(this.plugin.settings.saveFolderPath).onChange(async (value) => {
					this.plugin.settings.saveFolderPath = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
			.setName("Delimiter")
			.setDesc("The delimiter to split by.")
			.addText((text) =>
				text.setValue(this.plugin.settings.delimiter).onChange(async (value) => {
					this.plugin.settings.delimiter = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
			.setName("Use content as title")
			.setDesc(
				"If true, the first sentence will be used as the title of the note, otherwise a timestamp will be used e.g. note-splitter-1702591910.",
			)
			.addToggle((text) =>
				text.setValue(this.plugin.settings.useContentAsTitle).onChange(async (value) => {
					this.plugin.settings.useContentAsTitle = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
			.setName("Delete original")
			.setDesc("Delete the original note after a successful split.")
			.addToggle((text) =>
				text.setValue(this.plugin.settings.deleteOriginalNote).onChange(async (value) => {
					this.plugin.settings.deleteOriginalNote = value;
					await this.plugin.saveSettings();
				}),
			);
	}
}
