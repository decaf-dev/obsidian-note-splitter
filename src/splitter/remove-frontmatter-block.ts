export const removeFrontmatterBlock = (content: string) => {
	const FRONTMATTER_REGEX = /^---[\s\S]*?---/;
	return content.replace(FRONTMATTER_REGEX, "").trim();
};
