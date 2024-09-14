/**
 * Truncates the string to the maximum length allowed for a file name
 */
export const truncateFileName = (name: string, extension: string) => {
	const MAX_LENGTH = 255;

	//Add support for links
	let length = name.length;
	if (length > MAX_LENGTH) {
		length = MAX_LENGTH;
	}

	return name.substring(0, length - extension.length) + extension;
};
