---
title: "Theme Template"
---

We collect all style-related files into [ZK theme template project at Github](https://github.com/zkoss/zkThemeTemplate), making it much easier
to create a custom theme. The main idea here is to have a ZK template
theme as the **base theme**, which then allows ZK app developers to fork
the repository and commit your changes in your repository to create your
new custom theme.

# Process

The general steps are:

1.  Fork [the zkThemeTemplate repository](https://github.com/zkoss/zkThemeTemplate)
2.  initialize the theme project
3.  modify [LESS](https://lesscss.org/) files and preview
4.  build a jar
5.  apply to your project

For detailed steps, please see [README in zkThemeTemplate](https://github.com/zkoss/zkThemeTemplate)

# Benefits

This approach has some benefits that previous approaches don't have.

## Easy to Maintain

Committing your change into a git repository makes your change easy to
track in the future. Therefore, your team can know what's difference
between your custom theme and ZK standard theme. It's easy to identify
an issue.

## Easy to Upgrade

If you isolate your custom change into separate files, you can easily
merge changes with git from the original repository when there are fixes
committed to the original theme template. Moreover, it's can be done
automatically. You don't need to manually compare changed files and
apply the changes by yourselves. This reduces human errors.
