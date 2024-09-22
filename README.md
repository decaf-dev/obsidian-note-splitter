# Obsidian Note Splitter

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22note-splitter%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

Note splitter is an [Obsidian.md](https://obsidian.md) plugin for desktop only. It allows you to split a single note into many notes based on a sequence of characters (a delimiter).

## Table of contents

-   [Videos](#videos)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Settings](#settings)
-   [Learn more](#learn-more)
-   [Contributing](#contributing)
-   [License](#license)

## Videos

Split a note using default settings.

<video src="https://github.com/decaf-dev/obsidian-note-splitter/assets/40307803/b15117e8-a297-4353-b705-13e7713872ef" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

Split a note with [use first line as title](#use-first-line-as-title) enabled.

<video src="https://github.com/decaf-dev/obsidian-note-splitter/assets/40307803/fe4edb7c-4f4d-4f3e-b1a8-a42cd2a23706" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

## Installation

1. In Obsidian, open **Settings**
2. Go to **Community plugins**
3. Select **Browse**
4. Search for **Note Splitter** by **DecafDev**
5. Select **Install**
6. Then select **Enable**

## Usage

1. Open a note that you want to split
2. Switch to editing mode
3. Open the Obsidian command palette
4. Type **Split by delimiter**
5. Press enter
6. See split notes in the [output folder](#output-folder)

> [!NOTE]
> Splitting a note will not modify the original note.

### Frontmatter

When splitting a note, frontmater is ignored. Only content after the frontmatter block is split.

## Settings

### Output folder

The folder to save split notes in. If the input is empty, the folder of the original note will be used.

> [!NOTE]
> Default value is `note-splitter`

### Delimiter

The sequence of characters to split by. When you split a note, the content before and after each delimiter will become new notes.

> [!NOTE]
> The default value is a newline character `\n`

## Remove delimiter

If enabled, the delimiter will be removed from the split notes.

For example, suppose you have two sentences and your delimiter is set to a period `.`.

```markdown
This is sentence 1. This is sentence 2.
```

If this setting is enabled, the output will be:

```markdown
This is sentence 1
```

```markdown
This is sentence 2
```

If you wanted to retain the period in each split note, you could disable this setting. The output would then be:

```markdown
This is sentence 1.
```

```markdown
This is sentence 2.
```

> [!NOTE]
> Enabled by default.

### Use first line as title

If enabled, the first line of split content will be used as the title of the split note. If the title already exists, the conflict will be indicated by naming the note as `Split conflict <random-uuid>`.

If disabled, a timestamp will be used as the title e.g. `note-splitter-1702591910`.

> [!NOTE]
> Disabled by default.

#### Removed characters

Depending on your operating system, Obsidian will not allow certain characters in a file name.

When `Use first line as title` is enabled, invalid characters in the first line will be removed.

| Character | Removed On            |
| --------- | --------------------- |
| `*`       | Windows               |
| `"`       | Windows               |
| `` ` ``   | Windows               |
| `?`       | Windows               |
| `<`       | Windows               |
| `>`       | Windows               |
| `:`       | Windows, macOS, Linux |
| `\`       | Windows, macOS, Linux |
| `/`       | Windows, macOS, Linux |
| `^`       | Windows, macOS, Linux |
| `[`       | Windows, macOS, Linux |
| `]`       | Windows, macOS, Linux |
| `#`       | Windows, macOS, Linux |

### Append to split content

This is text that should appended to the content of each split note.

### Delete original

If enabled, the original note will be deleted after a successful split.

> [!NOTE]
> Disabled by default.

## Learn more

[Steps to create Anki flashcards from an English article, using Yanki, ChatGPT, Note Splitter](https://www.youtube.com/watch?v=Gu6B7nqUV9o) by [@jdevtw](https://www.youtube.com/@jdevtw)

## Contributing

Issues and pull requests are welcome.

## License

Note Splitter is distributed under [MIT License](https://github.com/decaf-dev/obsidian-note-splitter/blob/master/LICENSE)
