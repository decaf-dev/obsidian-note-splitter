export const removeFrontmatterBlock = (data: string) => {
	// Define the regular expression for the frontmatter block
	const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;
	return data.replace(FRONTMATTER_REGEX, "").trim();
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
	const MAX_LENGTH = 255;
	return value.substring(0, MAX_LENGTH - extension.length - 1);
};
