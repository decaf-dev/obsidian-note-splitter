# Note Splitter

## About

This plugin allows you to split an Obsidian note into individual notes based on a specified sequence of characters (a delimiter). The default delimiter is a new line.

## Installation

1. Install the [Obsidian BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin from Obsidian community plugin store
2. Enable the plugin
3. Open the plugin settings
4. Click **Add beta plugin**
5. Enter the repository url: **https://github.com/trey-wallis/obsidian-note-splitter**
6. Click **Add plugin**

## Usage

1. Open a note that you want to split
2. Open the Obsidian command prompt (cmd + shift + p)
3. Type `Split by delimiter`
4. Press enter

### Setting a delimiter

The delimiter to split by can be configured in the plugin settings. The default delimiter is a new line `\n`.

### Frontmatter

When splitting a note, this plugin will ignore frontmatter. Only the content after the frontmatter block will be split.
