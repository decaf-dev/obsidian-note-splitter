import { removeFrontmatterBlock } from "src/splitter/remove-frontmatter-block";

describe("removeFrontmatterBlock", () => {
	it("should remove frontmatter block", () => {
		// Arrange
		const content = `---
		key1: value
		key2: value
		---
		
		This is some text`;

		// Act
		const result = removeFrontmatterBlock(content);

		// Assert
		expect(result).toEqual("This is some text");
	});
});
