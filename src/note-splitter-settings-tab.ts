import { App, PluginSettingTab, Setting } from "obsidian";
import NoteSplitterPlugin from "./main";

export default class NoteSplitterSettingsTab extends PluginSettingTab {

	plugin: NoteSplitterPlugin;

	constructor(app: App, plugin: NoteSplitterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Folder path")
			.setDesc("The path to the folder that split notes will be placed in")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.saveFolderPath)
					.onChange(async (value) => {
						this.plugin.settings.saveFolderPath = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Group name")
			.setDesc("The name of the group folder that split notes will be placed in. A timestamp will be added to this name. e.g. group-123456")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.groupFolderName)
					.onChange(async (value) => {
						this.plugin.settings.groupFolderName = value;
						await this.plugin.saveSettings();
					})
			);


		new Setting(containerEl)
			.setName("Delimeter")
			.setDesc("The delimeter to split by")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.delimiter)
					.onChange(async (value) => {
						this.plugin.settings.delimiter = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Use content as title")
			.setDesc("If true, the first sentence will be used as the title of the note, otherwise a timestamp will be used e.g. note-splitter-123456")
			.addToggle((text) =>
				text
					.setValue(this.plugin.settings.useContentAsTitle)
					.onChange(async (value) => {
						this.plugin.settings.useContentAsTitle = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
