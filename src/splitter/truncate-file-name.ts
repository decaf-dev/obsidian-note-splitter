/**
 * Truncates the string to the maximum length allowed for a file name
 */
export const truncateFileName = (name: string) => {
	const MAX_LENGTH = 255;

	const splitArr = name.split(".");
	if (splitArr.length < 2) {
		throw new Error("Invalid file name");
	}

	const baseName = splitArr[0];
	const extension = splitArr[1];
	return baseName.substring(0, MAX_LENGTH - extension.length - 1) + "." + splitArr[1];
};
