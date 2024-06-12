export const findFrontmatterEndIndex = (value: string) => {
	// Define the regular expression for the frontmatter block
	const regex = /^---\n([\s\S]*?)\n---/;

	// Execute the regex on the string
	const match = regex.exec(value);

	// If a match is found, return the index where the block ends
	if (match) {
		// The ending index is the starting index of the match plus its length
		return match[0].length;
	}
	// If no match is found, return -1
	return -1;
};

/**
 * Escapes characters invalid for a file name
 * @param value
 */
export const escapeInvalidFileNameChars = (value: string) => {
	// Replace colon with hyphen
	value = value.replace(/:/g, "-");
	// Replace back slash with space
	value = value.replace(/\\/g, " ");
	// Replace forward slash with space
	value = value.replace(/\//g, " ");
	// Replace carrot with nothing
	value = value.replace(/\^/g, "");
	// Replace left bracket with nothing
	value = value.replace(/\[/g, "");
	// Replace right bracket with nothing
	value = value.replace(/\]/g, "");
	// Replace hash tag with nothing
	value = value.replace(/#/g, "");
	// Replace pipe with nothing
	value = value.replace(/\|/g, "");
	return value;
};

/**
 * Trims the string to the maximum length allowed for a file name
 */
export const trimForFileName = (value: string, extension: string) => {
	const MAX_LENGTH_MAC_OS = 255;
	return value.substring(0, MAX_LENGTH_MAC_OS - extension.length - 1);
};
