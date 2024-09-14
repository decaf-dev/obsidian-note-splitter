/**
 * Sanitizes a file name for use in a file system
 */
export const sanitizeFileName = (name: string, isWindows: boolean) => {
	if (isWindows) {
		name = name.replace(/\?/g, ""); // Remove question mark (Windows)
		name = name.replace(/</g, ""); // Remove less than (Windows)
		name = name.replace(/>/g, ""); // Remove greater than (Windows)
		name = name.replace(/"/g, ""); // Remove double quote (Windows)
		name = name.replace(/\*/g, ""); // Remove asterisk (Windows)
		name = name.replace(/`/g, ""); // Remove backtick (Windows)
	}

	name = name.replace(/:/g, ""); // Remove colon (Windows, macOS)
	name = name.replace(/\|/g, ""); // Remove pipe (Windows)
	name = name.replace(/\\/g, ""); // Remove backslash (Windows, general cross-platform safety)
	name = name.replace(/\//g, ""); // Remove forward slash (Windows, Linux, macOS)
	name = name.replace(/\[/g, ""); // Remove left bracket (General safety, no specific OS restriction)
	name = name.replace(/\]/g, ""); // Remove right bracket (General safety, no specific OS restriction)
	name = name.replace(/#/g, ""); // Remove hashtag (General safety, no specific OS restriction)
	name = name.replace(/\^/g, ""); // Remove caret (General safety, no specific OS restriction)
	return name.trim(); // Trim whitespace from start and end (General cleanup)
};
