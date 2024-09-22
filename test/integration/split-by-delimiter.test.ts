import { TFile } from "obsidian";
import { splitByDelimiter } from "src/splitter/split-by-delimiter";
import { NodeFileSystem, Notifier } from "src/types";

const mockFileSystem: NodeFileSystem = {
	read: jest.fn((file: TFile) => {
		if (file.path === "file1.md") {
			return Promise.resolve("---\nkey:value\n---\n");
		} else if (file.path === "file2.md") {
			return Promise.resolve("This is my content");
		} else if (file.path === "file3.md") {
			return Promise.resolve("This is sentence 1\nThis is sentence 2");
		} else if (file.path === "file4.md") {
			return Promise.resolve("This is sentence 1. This is sentence 2.");
		} else {
			throw new Error("File not handled");
		}
	}),
	create: jest.fn(),
	createFolder: jest.fn(),
	delete: jest.fn(),
};

const mockNotifier: Notifier = jest.fn();

describe("splitByDelimiter", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should notify if no delimiter is set", async () => {
		// Arrange
		const file = {
			path: "file1.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: "",
			saveFolderPath: "",
			useContentAsTitle: false,
			appendToSplitContent: "",
			removeDelimiter: true,
			deleteOriginalNote: false,
		});

		//Assert
		expect(mockNotifier).toHaveBeenCalledWith(expect.stringContaining("No delimiter"));
	});

	it("should notify if there is no content is set", async () => {
		// Arrange
		const file = {
			path: "file1.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: "\n",
			saveFolderPath: "",
			useContentAsTitle: false,
			appendToSplitContent: "",
			removeDelimiter: true,
			deleteOriginalNote: false,
		});

		//Assert
		expect(mockNotifier).toHaveBeenCalledWith(expect.stringContaining("No content"));
	});

	it("should notify if only one section is found", async () => {
		// Arrange
		const file = {
			path: "file2.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: "\n",
			saveFolderPath: "",
			useContentAsTitle: false,
			appendToSplitContent: "",
			removeDelimiter: true,
			deleteOriginalNote: false,
		});

		//Assert
		expect(mockNotifier).toHaveBeenCalledWith(expect.stringContaining("one section"));
	});

	it("should split into 2 files", async () => {
		// Arrange
		const file = {
			path: "file3.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: "\n",
			saveFolderPath: "",
			useContentAsTitle: false,
			appendToSplitContent: "",
			removeDelimiter: true,
			deleteOriginalNote: false,
		});

		//Assert
		expect(mockFileSystem.read).toHaveBeenCalledTimes(1);
		expect(mockFileSystem.create).toHaveBeenCalledTimes(2);
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("split-note"),
			"This is sentence 1",
		);
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("split-note"),
			"This is sentence 2",
		);
		expect(mockFileSystem.delete).not.toHaveBeenCalled();
		expect(mockNotifier).toHaveBeenCalledWith(expect.stringContaining("2 notes"));
	});

	it("should delete the original note when the setting is true", async () => {
		// Arrange
		const file = {
			path: "file3.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: "\n",
			saveFolderPath: "",
			useContentAsTitle: false,
			appendToSplitContent: "",
			removeDelimiter: true,
			deleteOriginalNote: true,
		});

		//Assert
		expect(mockFileSystem.delete).toHaveBeenCalledWith(file);
	});

	it("should append to split content", async () => {
		// Arrange
		const file = {
			path: "file3.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: "\n",
			saveFolderPath: "",
			useContentAsTitle: false,
			appendToSplitContent: ".",
			removeDelimiter: true,
			deleteOriginalNote: false,
		});

		//Assert
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("split-note"),
			"This is sentence 1.",
		);
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("split-note"),
			"This is sentence 2.",
		);
	});

	it("should use content as title", async () => {
		// Arrange
		const file = {
			path: "file3.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: "\n",
			saveFolderPath: "",
			useContentAsTitle: true,
			appendToSplitContent: "",
			removeDelimiter: true,
			deleteOriginalNote: false,
		});

		//Assert
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("sentence 1"),
			"This is sentence 1",
		);
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("sentence 2"),
			"This is sentence 2",
		);
	});

	it("should retain delimiter if removeDelimiter is false", async () => {
		// Arrange
		const file = {
			path: "file4.md",
		} as TFile;

		//Act
		await splitByDelimiter(mockFileSystem, mockNotifier, file, false, {
			delimiter: ".",
			saveFolderPath: "",
			useContentAsTitle: false,
			appendToSplitContent: "",
			removeDelimiter: false,
			deleteOriginalNote: false,
		});

		//Assert
		expect(mockFileSystem.create).toHaveBeenCalledTimes(2);
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("split-note"),
			"This is sentence 1.",
		);
		expect(mockFileSystem.create).toHaveBeenCalledWith(
			expect.stringContaining("split-note"),
			"This is sentence 2.",
		);
	});
});
