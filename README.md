# ZK Document Website


# Document Folder Structure
* each book has its own folder

# highlight the current page in the sidebar
make `page.url` equal to `child.url` with `permalik`:
```yaml
permalink: /get_started/Learn_ZK_in_10_Minutes
```
Because `page.url` ends with `.html` by default.


# Preview at Local
1. install necessary gem
`bundle install`
2. start a local web server
`preview.sh`

Ref: [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll)


# Base Theme: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
from: https://jekyllthemes.io/

# Apply Jekyll Remote Theme

Jekyll plugin for building Jekyll sites with any public GitHub-hosted theme


## Usage

1. Add the following to your Gemfile

  ```ruby
  gem "jekyll-remote-theme"
  ```

  and run `bundle install` to install the plugin

2. Add the following to your site's `_config.yml` to activate the plugin

  ```yml
  plugins:
    - jekyll-remote-theme
  ```
  Note: If you are using a Jekyll version less than 3.5.0, use the `gems` key instead of `plugins`.

3. Add the following to your site's `_config.yml` to choose your theme

  ```yml
  remote_theme: benbalter/retlab
  ```

## Declaring your theme

Remote themes are specified by the `remote_theme` key in the site's config.

Remote themes must be in the form of `OWNER/REPOSITORY`, and must represent a public GitHub-hosted Jekyll theme. See [the Jekyll documentation](https://jekyllrb.com/docs/themes/) for more information on authoring a theme. Note that you do not need to upload the gem to RubyGems or include a `.gemspec` file.

You may also optionally specify a branch, tag, or commit to use by appending an `@` and the Git ref (e.g., `benbalter/retlab@v1.0.0` or `benbalter/retlab@develop`). If you don't specify a Git ref, the `master` branch will be used.


* from: https://github.com/benbalter/jekyll-remote-theme


# Book alphebetical order
1. Getting Started
1. ZATS Essentials
1. ZK Calendar Essentials
1. ZK Charts Essentials
1. ZK Client-side Reference
1. ZK Component Development Essentials
1. ZK Component Reference
1. ZK Configuration Reference
1. ZK Developer's Reference
1. ZK Essentials
1. ZK Installation Guide
1. ZK JSP Tags Essentials
1. ZK MVVM Reference
1. ZK Pivottable Essentials
1. ZK Spring Essentials
1. ZK Studio Essentials
1. ZK Style Customization Guide
1. ZUML Reference

# published order
1. ZK JSP Tags Essentials
2. ZATS Essentials
3. ZK PivotTable Essentials
4. ZK Studio Essentials
5. ZK Spring Essentials
6. ZK Component Development Essentials
7. ZK Calendar Essentials

# Editor Guidelines
## Sections to remove
* "Version History" section. Using `# Version History(.|\n)*` to find and remove it.
* `__TOC__`
 