import { truncateFileName } from "src/splitter/truncate-file-name";

describe("truncateFileName", () => {
	it("should throw an error if the file name is invalid", () => {
		// Arrange
		const fileName = "file";

		// Act
		const action = () => truncateFileName(fileName);

		// Assert
		expect(action).toThrow();
	});

	it("should truncate the string to 255 characters", () => {
		// Arrange
		const fileName = "a".repeat(260) + ".md";

		// Act
		const result = truncateFileName(fileName);

		// Assert
		expect(result.length).toEqual(255);
		expect(result.endsWith(".md")).toEqual(true);
	});
});
