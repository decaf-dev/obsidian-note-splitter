import { sanitizeFileName } from "src/splitter/sanitize-file-name";

describe("sanitizeFileName", () => {
	it("should replace colon with hyphen", () => {
		// Arrange
		const content = "file:name";

		// Act
		const result = sanitizeFileName(content, false);

		// Assert
		expect(result).toEqual("filename");
	});

	it("should replace backslash with space", () => {
		// Arrange
		const content = "file\\name";

		// Act
		const result = sanitizeFileName(content, false);

		// Assert
		expect(result).toEqual("filename");
	});

	it("should replace forward slash with space", () => {
		// Arrange
		const content = "file//name";

		// Act
		const result = sanitizeFileName(content, false);

		// Assert
		expect(result).toEqual("filename");
	});

	it("should remove invalid characters", () => {
		// Arrange
		const content = "file name #|^[]";

		// Act
		const result = sanitizeFileName(content, false);

		// Assert
		expect(result).toEqual("file name");
	});
});
