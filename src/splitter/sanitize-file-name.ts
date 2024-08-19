/**
 * Sanitizes a file name for use in a file system
 */
export const sanitizeFileName = (name: string) => {
	// Replace colon with hyphen
	name = name.replace(/:/g, "-");
	// Replace back slash with space
	name = name.replace(/\\/g, " ");
	// Replace forward slash with space
	name = name.replace(/\//g, " ");
	// Replace carrot with nothing
	name = name.replace(/\^/g, "");
	// Replace left bracket with nothing
	name = name.replace(/\[/g, "");
	// Replace right bracket with nothing
	name = name.replace(/\]/g, "");
	// Replace hash tag with nothing
	name = name.replace(/#/g, "");
	// Replace pipe with nothing
	name = name.replace(/\|/g, "");
	return name.trim();
};
