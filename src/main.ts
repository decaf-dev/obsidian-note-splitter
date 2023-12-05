import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import { findFrontmatterEndIndex } from "./utils";

export default class NoteSplitterPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "split-by-line",
			name: "Split by line",
			editorCallback: async (_editor: Editor, view: MarkdownView) => {
				const file = view.file;
				if (file) {
					let data = await this.app.vault.cachedRead(file);
					const frontmatterEndIndex = findFrontmatterEndIndex(data);

					//Ignore frontmatter
					if (frontmatterEndIndex !== -1) {
						data = data.slice(frontmatterEndIndex + 1);
					}
					if (data === ""){
						new Notice("No content to split");
						return;
					}

					const split = data.split("\n").filter((line) =>
						 line !== ""
					);

					if (split.length === 0) {
						new Notice("No content to split");
						return;
					}

					if (split.length === 1) {
						new Notice("No need to split");
						return;
					}

					try {
						this.app.vault.createFolder("note-splitter");
					} catch (err){
						//Folder already exists
					}

					for (let i = 0; i < split.length; i++) {
						const line = split[i].trim();
						await this.app.vault.create(
							`note-splitter/split-note-${Date.now() + i}.md`, line
						);
					}
					new Notice("Split into " + split.length + " note" + (split.length > 1 ? "s" : ""));
				}
			},
		});
	}

	onunload() {}
}
