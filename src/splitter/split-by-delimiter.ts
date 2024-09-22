import { normalizePath, Platform, TFile } from "obsidian";
import { removeFrontmatterBlock } from "./remove-frontmatter-block";
import { sanitizeFileName } from "./sanitize-file-name";
import { truncateFileName } from "./truncate-file-name";
import { NodeFileSystem, NoteSplitterSettings, Notifier } from "src/types";

export const splitByDelimiter = async (
	fileSystem: NodeFileSystem,
	notify: Notifier,
	file: TFile,
	isWindows: boolean,
	settings: Pick<
		NoteSplitterSettings,
		| "saveFolderPath"
		| "delimiter"
		| "removeDelimiter"
		| "useContentAsTitle"
		| "appendToSplitContent"
		| "deleteOriginalNote"
	>,
) => {
	const {
		delimiter,
		saveFolderPath,
		useContentAsTitle,
		appendToSplitContent,
		removeDelimiter,
		deleteOriginalNote,
	} = settings;
	const escapedDelimiter = delimiter.replace(/\\n/g, "\n");

	if (escapedDelimiter === "") {
		notify("No delimiter set. Please set a delimiter in the settings.");
		return;
	}

	const content = await fileSystem.read(file);
	const contentWithoutFrontmatter = removeFrontmatterBlock(content);
	if (contentWithoutFrontmatter === "") {
		notify("No content to split.");
		return;
	}

	const splitContent = contentWithoutFrontmatter
		.split(escapedDelimiter)
		.map((splitContent) => splitContent.trim())
		.filter((splitContent) => splitContent !== "")
		.map((splitContent) => {
			if (!removeDelimiter) {
				return splitContent + delimiter;
			}
			return splitContent;
		});

	if (splitContent.length === 1) {
		notify("Only one section of content found. Nothing to split.");
		return;
	}

	const folderPath = saveFolderPath || "";

	try {
		await fileSystem.createFolder(folderPath);
	} catch (err) {
		// Folder already exists
	}

	let filesCreated = 0;
	for (const [i, originalContent] of splitContent.entries()) {
		let updatedContent = originalContent;
		if (appendToSplitContent.length > 0) {
			updatedContent += appendToSplitContent;
		}

		let fileName = "";
		if (useContentAsTitle) {
			fileName = originalContent.split("\n")[0] + ".md";
		} else {
			fileName = `split-note-${Date.now() + i}.md`;
		}

		fileName = sanitizeFileName(fileName, isWindows);
		fileName = truncateFileName(fileName, ".md");

		const filePath = normalizePath(`${folderPath}/${fileName}`);

		try {
			await fileSystem.create(filePath, updatedContent);
			filesCreated++;
		} catch (err) {
			if (err.message.includes("already exists")) {
				const newFilePath = `${folderPath}/Split conflict ${crypto.randomUUID()}.md`;
				try {
					await fileSystem.create(newFilePath, updatedContent);
					filesCreated++;
				} catch (err) {
					console.error(err);
					notify(`Error creating file: ${err.message}`);
				}
				continue;
			}
			notify(`Error creating file: ${err.message}`);
			console.log(err);
		}
	}

	if (deleteOriginalNote && filesCreated === splitContent.length) {
		await fileSystem.delete(file);
	}

	notify("Split into " + filesCreated + " note" + (filesCreated > 1 ? "s" : "") + ".");
};
