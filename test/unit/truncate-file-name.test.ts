import { truncateFileName } from "src/splitter/truncate-file-name";

describe("truncateFileName", () => {
	it("should truncate the string to 255 characters", () => {
		// Arrange
		const fileName = "a".repeat(260) + ".md";

		// Act
		const result = truncateFileName(fileName, ".md");

		// Assert
		expect(result.length).toEqual(255);
		expect(result.endsWith(".md")).toEqual(true);
	});

	it("should not modify a link shorter than 255 characters", () => {
		// Arrange
		const fileName = "https://example.com.md";

		// Act
		const result = truncateFileName(fileName, ".md");

		// Assert
		expect(result).toEqual(fileName);
	});
});
