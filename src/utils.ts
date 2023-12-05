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
}
