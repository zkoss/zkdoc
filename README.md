# ZK Document Website


## Sidebar
support 3 levels of hierarchy. See `nav_list`.


# Document Folder Structure
* each book has its own folder

# highlight the current page in the sidebar
make `page.url` equal to `child.url` with `permalik`:
```yaml
permalink: /get_started/Learn_ZK_in_10_Minutes
```
Because `page.url` ends with `.html` by default.


# Preview at Local
* install necessary gem for one time
`bundle install`
* each time just start a local web server
`preview.sh`

Ref: [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll)


# Base Theme: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
from: https://jekyllthemes.io/

# Apply Jekyll Remote Theme

Jekyll plugin for building Jekyll sites with any public GitHub-hosted theme

# Apply Local theme
in `Gemfile`
`gem "minimal-mistakes-jekyll", path: "/Users/hawk/Documents/workspace/KEIKAI-SPACE/minimal-mistakes/"`

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

# Editor Guidelines
## Sections to remove
* "Version History" section. Using `# Version History(.|\n)*` to find and remove it.
* `__TOC__`
* replace `versionsince` with `version-badge.html version=`

## prepend the image path. 
* replace `!\[\]\(([^)]*)\)` with `![](images/$1)`
* replace `<img src="([^"]*)"` with `<img src="images/$1`
## check page link
* `\[([^\]]+)\]\((https?:\/\/[^\)]+)\)`
## image link
* Books having 1 level, use relative path for images.
* Books having multiple levels, use absolute path for images.

# Books Overview
## Getting Started
Path: /get_started/
Overview: A comprehensive guide for beginners to start developing with ZK framework. Covers basic concepts, setup, and first application development.
Keywords: beginner, setup, first app, basic concepts, quick start

## ZATS Essentials
Path: /zats_essentials/
Overview: Guide to ZK Application Testing Suite (ZATS), covering testing methodologies and tools for ZK applications.
Keywords: testing, ZATS, unit testing, integration testing, test automation

## ZK Calendar Essentials
Path: /zk_calendar_essentials/
Overview: Detailed documentation for implementing and customizing calendar functionality in ZK applications.
Keywords: calendar, scheduling, date handling, events, customization

## ZK Charts Essentials
Path: /zk_charts_essentials/
Overview: Guide to creating and customizing various types of charts and graphs in ZK applications.
Keywords: charts, graphs, data visualization, customization, analytics

## ZK Client-side Reference
Path: /zk_client_side_ref/
Overview: Comprehensive reference for client-side programming in ZK, including JavaScript integration and client-side events.
Keywords: client-side, JavaScript, events, browser, frontend

## ZK Component Development Essentials
Path: /zk_component_dev_essentials/
Overview: Guide to creating custom ZK components, covering component lifecycle, properties, and events.
Keywords: custom components, component development, lifecycle, properties, events

## ZK Component Reference
Path: /zk_component_ref/
Overview: Complete reference of all ZK components, their properties, methods, and usage examples.
Keywords: components, reference, properties, methods, examples

## ZK Configuration Reference
Path: /zk_config_ref/
Overview: Detailed documentation of ZK framework configuration options and settings.
Keywords: configuration, settings, properties, deployment, optimization

## ZK Developer's Reference
Path: /zk_dev_ref/overture/
Overview: Comprehensive guide for ZK developers, covering advanced topics and best practices.
Keywords: development, best practices, advanced topics, architecture, patterns

## ZK Essentials
Path: /zk_essentials/
Overview: Core concepts and fundamental knowledge required for ZK development.
Keywords: fundamentals, core concepts, basics, architecture, components

## ZK Installation Guide
Path: /zk_installation_guide/
Overview: Step-by-step guide for installing and setting up ZK framework in different environments.
Keywords: installation, setup, deployment, environment, requirements

## ZK JSP Tags Essentials
Path: /zk_jsp_tags_essentials/
Overview: Guide to using JSP tags in ZK applications, covering integration and best practices.
Keywords: JSP, tags, integration, web development, servlets

## ZK MVVM Reference
Path: /zk_mvvm_ref/intro/
Overview: Comprehensive guide to Model-View-ViewModel pattern implementation in ZK applications.
Keywords: MVVM, data binding, view model, patterns, architecture

## ZK Pivottable Essentials
Path: /zk_pivottable_essentials/
Overview: Guide to implementing and customizing pivot tables in ZK applications.
Keywords: pivot table, data analysis, reporting, customization, features

## ZK Spring Essentials
Path: /zk_spring_essentials/
Overview: Guide to integrating ZK with Spring framework, covering configuration and best practices.
Keywords: Spring, integration, dependency injection, configuration, best practices

## ZK Studio Essentials
Path: /zk_studio_essentials/
Overview: Guide to using ZK Studio IDE for ZK application development.
Keywords: IDE, development tools, debugging, design, productivity

## ZK Style Customization Guide
Path: /zk_style_customization_guide/
Overview: Comprehensive guide to customizing the look and feel of ZK applications.
Keywords: styling, CSS, themes, customization, design

## ZUML Reference
Path: /zuml_ref/
Overview: Complete reference for ZK User Interface Markup Language (ZUML), covering syntax and usage.
Keywords: ZUML, markup, UI, syntax, templates
