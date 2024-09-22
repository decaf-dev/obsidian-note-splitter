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
			.setName("Output folder")
			.setDesc(
				"The folder to save split notes in. If empty, the folder of the original note will be used.",
			)
			.addText((text) =>
				text.setValue(this.plugin.settings.saveFolderPath).onChange(async (value) => {
					this.plugin.settings.saveFolderPath = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
			.setName("Delimiter")
			.setDesc("The sequence of characters to split by.")
			.addText((text) =>
				text.setValue(this.plugin.settings.delimiter).onChange(async (value) => {
					this.plugin.settings.delimiter = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
			.setName("Remove delimiter")
			.setDesc(
				"If enabled, the delimiter will not be included in the content of split notes.",
			)
			.addToggle((cb) =>
				cb.setValue(this.plugin.settings.removeDelimiter).onChange(async (value) => {
					this.plugin.settings.removeDelimiter = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
			.setName("Use first line as title")
			.setDesc(
				"If enabled, the first line of split content will be used as the title of the split note. If disabled, a timestamp will be used. e.g. note-splitter-1702591910",
			)
			.addToggle((text) =>
				text.setValue(this.plugin.settings.useContentAsTitle).onChange(async (value) => {
					this.plugin.settings.useContentAsTitle = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
			.setName("Append to split content")
			.setDesc("Text to append to the split content.")
			.addText((text) =>
				text.setValue(this.plugin.settings.appendToSplitContent).onChange(async (value) => {
					this.plugin.settings.appendToSplitContent = value;
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
