import { Editor, MarkdownView, Plugin } from "obsidian";

export default class NoteSplitterPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "split-by-line",
			name: "Split by line",
			editorCallback: async (_editor: Editor, view: MarkdownView) => {
				const file = view.file;
				if (file) {
					const data = await this.app.vault.cachedRead(file);
					const split = data.split("\n").filter((line) =>
						 line !== ""
					);
					for (const line of split) {
						await this.app.vault.create(
							`note-splitter-${Date.now}.md`, line
						);
					}
				}
			},
		});
	}

	onunload() {}
}
