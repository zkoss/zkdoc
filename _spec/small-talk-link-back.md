# MediaWiki "Small Talk" Migration Plan

## 1. Content Strategy: Use Jekyll Posts

All "Small Talk" articles, both new and old, will be managed as standard Jekyll posts within the `_posts` directory. This approach leverages Jekyll's powerful built-in features for categorization, tagging, and archives.

- **Directory:** `_posts/`
- **Filename Convention:** `YYYY-MM-DD-title-of-the-article.md`

### 1.1. New Articles

All new articles will be created as Markdown files in the `_posts` directory with the following front matter:

```yaml
---
title: "Title of the New Article"
date: YYYY-MM-DD
author: "author_id"
version: "10.0+"
category: small_talk
---

(Article content in Markdown...)
```

### 1.2. Legacy Articles from MediaWiki (Link Posts)

To ensure old articles from the MediaWiki site are discoverable, a corresponding "link post" will be created for each one. These posts will not contain content; instead, their titles will link directly to the original article.

- **Action:** For each old article, create a new file in `_posts`.
- **Front Matter:** Use the following template, paying close attention to the `link` variable.

```yaml
---
title: "Title of the Old MediaWiki Article"
date: YYYY-MM-DD  # Use the original publication date
author: "author_id"
version: "6.5"
category: small_talk
link: "https://www.zkoss.org/wiki/Small_Talks/URL_OF_OLD_ARTICLE"
---
```

- **The `link` variable** is a feature of the Minimal Mistakes theme that makes the post's title an external link in all archive and list views.

## 2. Archive & Category Pages

To allow users to browse all "Small Talk" articles, we will create dedicated archive pages.

### 2.1. Main "Small Talk" Archive Page

A user-friendly page at `/small-talk/` will list all posts in the `small_talk` category.

- **Action:** Create a new file at `_pages/small-talk.md`.
- **Content:**
  ```markdown
  ---
  title: "Small Talk"
  layout: category
  taxonomy: small_talk
  permalink: /small-talk/
  ---

  This page lists all articles in the "Small Talk" category.
  ```

### 2.2. General Category Archive

To provide a page that lists all available categories, create a file at `_pages/categories.md`.

- **Action:** Create a new file at `_pages/categories.md`.
- **Content:**
  ```markdown
  ---
  title: "Posts by Category"
  layout: categories
  permalink: /categories/
  ---
  ```

**Note:** For the `_pages` directory to be processed by Jekyll, the `_config.yml` file must be updated with the following:

```yaml
include:
  - "_pages"
```

# 3. How to retrieve small talk profile
Get the article list from https://www.zkoss.org/documentation#Small_Talks
The article links are all in a table `#smalltalk-list`.
Its 4 columns are Title, Author, Date, Version respectively
We only need those article links, author, date, version.

One row looks like
```html
<tr class="st grid_4 stripe">
<td><div class="column title"><a href="https://www.zkoss.org/wiki/Small_Talks/2025/September/ZK_Browser-kit_Series:_ClipboardHelper_-_Solving_Real-World_Data_Capture_Challenges" title="ZK Browser-kit Series: ClipboardHelper - Solving Real-World Data Capture Challenges">ZK Browser-kit Series: ClipboardHelper - Solving Real-World Data Capture Challenges</a></div></td>
<td><div class="gap"></div></td>
<td><div class="column author">Hawk Chen, Manager, Potix Corporation</div></td>
<td><div class="gap"></div></td>
<td><div class="column date">September 23, 2025</div></td>
<td><div class="gap"></div></td>
<td><div class="column version">9.0.0</div></td>
</tr>
```
we should retrieve those fields and fill into each article's front matter. 