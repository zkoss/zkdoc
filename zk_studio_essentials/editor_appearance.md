# Editor Appearance Configuration for ZK Studio ZUL Files

The ZK Studio ZUL editor doesn't need to be configured separately from the default XML editor. This article introduces how to select colors for the ZUL editor and provides default recommendations for common use cases.

## Editor Appearance Configuration

The ZK Studio editor for ZUL files is based on the Eclipse XML editor. Appearance settings applied to the XML editor will be reflected in the ZUL file editor.

You can access the editor configuration under:

Preferences > XML > XML Files > Editor > Appearance



![Editor appearance settings for XML files in Eclipse]({{site.baseUrl}}/zk_studio_essentials/Editor-default-appearance.png)

## Editor Configuration for Dark Theme

If you are using a dark theme, the out-of-the-box settings for the XML editor can be difficult to read.

![Editor autocomplete popup in dark theme with default settings]({{site.baseUrl}}/zk_studio_essentials/Editor-dark-mode-default.png)

The following settings are a possible set of values for better XML readability, including in ZUL files, when using a dark theme:

| Key | Red | Green | Blue |
| --- | --- | --- | ---- |
| completion proposal background | 52 | 57 | 61 |
| completion proposal foreground | 238 | 238 | 238 |
| bracket highlight | 66 | 66 | 66 |
| Parameter hints background | 52 | 57 | 61 |
| Parameter hints foreground | 238 | 238 | 238 |

Custom colors can be defined by selecting "Define custom colors" in the color picker, then filling in the custom values for red, green, and blue.

![Editor custom colors selection]({{site.baseUrl}}/zk_studio_essentials/Editor-custom-colors.png)