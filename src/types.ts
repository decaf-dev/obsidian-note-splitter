import { TFile, TFolder } from "obsidian";

export interface NoteSplitterSettings {
	saveFolderPath: string;
	useContentAsTitle: boolean;
	delimiter: string;
	appendToSplitContent: string;
	deleteOriginalNote: boolean;
}

export interface NodeFileSystem {
	read(file: TFile): Promise<string>;
	create(filePath: string, content: string): Promise<TFile>;
	createFolder(folderPath: string): Promise<TFolder>;
	delete(file: TFile): Promise<void>;
}

export type Notifier = (message: string) => void;
