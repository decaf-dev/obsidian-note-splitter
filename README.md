# Obsidian Note Splitter

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22note-splitter%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

Note splitter is an [Obsidian.md](https://obsidian.md) plugin for desktop only. It allows you to split a single note into many notes based on a specified sequence of characters (a delimiter).

## Table of contents

-   [Videos](#videos)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Settings](#settings)
-   [Contributing](#contributing)
-   [License](#license)

## Videos

Split a note with default settings.

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

1. Open the note that you want to split
2. Switch to editing mode
3. Open the Obsidian command palette
4. Type **Split by delimiter**
5. Press enter
6. See split notes in the [output folder](#output-folder)

>[!NOTE]
> Splitting a note does not modify the original note.

### Frontmatter

When splitting a note, frontmater is ignored. Only content after the frontmatter block is split.

## Settings

### Output folder

The folder to save split notes in. If empty, the folder of the original note will be used.

> [!NOTE]
> Default value is `note-splitter`

### Delimiter

The sequence of characters to split by. When you split a note, the content before and after each delimiter will become new notes.

> [!NOTE]
> Default value is a newline character `\n`

### Use first line as title

If enabled, the first line of split content will be used as the title of the split note. If the title already exists, the conflict will be indicated by naming the note as `Split conflict <random-uuid>`.

If disabled, a timestamp will be used as the title e.g. `note-splitter-1702591910`.

> [!NOTE]
> Disabled by default.

### Delete original

If enabled, the original note will be deleted after a successful split.

> [!NOTE]
> Disabled by default.

## Contributing

Issues and pull requests are welcome.

## License

Note Splitter is distributed under [MIT License](https://github.com/decaf-dev/obsidian-note-splitter/blob/master/LICENSE)
