---
layout: none
---
{%- comment -%}
  Local override of the theme's assets/js/lunr/lunr-store.js.

  For Jekyll *pages* (this site's books are pages, not a collection),
  doc.content is the RAW Markdown source with unrendered Liquid tags, so the
  theme's strip_html chain leaves Markdown/Liquid noise (headings, links,
  tables, include tags) in the search excerpt.

  Fix, applied per doc:
    1. strip unrendered Liquid include/output tags via a pure-Liquid
       split/join idiom (no regex filter -> works on classic GitHub Pages),
    2. markdownify to convert Markdown -> HTML,
    3. the theme's existing strip_html chain -> clean plain text.

  Delimiter strings are assembled from single characters so the literal
  tag delimiters never appear in this template (the Liquid lexer would
  otherwise terminate a tag early on them).

  Kept as a same-path override (like lunr-en.js) so it works on classic
  GitHub Pages without editing the remote theme.
{%- endcomment -%}
{%- assign _pct = '%' -%}
{%- assign _lb = '{' -%}
{%- assign _rb = '}' -%}
{%- assign _tagOpen = _lb | append: _pct -%}
{%- assign _tagClose = _pct | append: _rb -%}
{%- assign _outOpen = _lb | append: _lb -%}
{%- assign _outClose = _rb | append: _rb -%}
var store = [
  {%- for c in site.collections -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}
    {%- for doc in docs -%}
      {%- assign _seg = doc.url | split: '/' -%}
      {%- assign _book = _seg[1] -%}
      {%- if doc.header.teaser -%}
        {%- capture teaser -%}{{ doc.header.teaser }}{%- endcapture -%}
      {%- else -%}
        {%- assign teaser = site.teaser -%}
      {%- endif -%}
      {%- assign _parts = doc.content | split: _tagClose -%}
      {%- capture _clean -%}{%- for _p in _parts -%}{{ _p | split: _tagOpen | first }}{%- endfor -%}{%- endcapture -%}
      {%- assign _parts = _clean | split: _outClose -%}
      {%- capture _clean -%}{%- for _p in _parts -%}{{ _p | split: _outOpen | first }}{%- endfor -%}{%- endcapture -%}
      {
        "title": {{ doc.title | jsonify }},
        "excerpt":
          {%- if site.search_full_content == true -%}
            {{ _clean | markdownify | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | jsonify }},
          {%- else -%}
            {{ _clean | markdownify | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | truncatewords: 50 | jsonify }},
          {%- endif -%}
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "book": {{ _book | jsonify }},
        "url": {{ doc.url | relative_url | jsonify }},
        "teaser": {{ teaser | relative_url | jsonify }}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}{%- if site.lunr.search_within_pages -%},
  {%- assign pages = site.pages | where_exp:'doc','doc.search != false' | where_exp:'doc','doc.url contains ".html"' -%}
  {%- for doc in pages -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign _seg = doc.url | split: '/' -%}
    {%- assign _book = _seg[1] -%}
    {%- assign _parts = doc.content | split: _tagClose -%}
    {%- capture _clean -%}{%- for _p in _parts -%}{{ _p | split: _tagOpen | first }}{%- endfor -%}{%- endcapture -%}
    {%- assign _parts = _clean | split: _outClose -%}
    {%- capture _clean -%}{%- for _p in _parts -%}{{ _p | split: _outOpen | first }}{%- endfor -%}{%- endcapture -%}
  {
    "title": {{ doc.title | jsonify }},
    "excerpt":
        {%- if site.search_full_content == true -%}
          {{ _clean | markdownify | newline_to_br |
            replace:"<br />", " " |
            replace:"</p>", " " |
            replace:"</h1>", " " |
            replace:"</h2>", " " |
            replace:"</h3>", " " |
            replace:"</h4>", " " |
            replace:"</h5>", " " |
            replace:"</h6>", " "|
          strip_html | strip_newlines | jsonify }},
        {%- else -%}
          {{ _clean | markdownify | newline_to_br |
            replace:"<br />", " " |
            replace:"</p>", " " |
            replace:"</h1>", " " |
            replace:"</h2>", " " |
            replace:"</h3>", " " |
            replace:"</h4>", " " |
            replace:"</h5>", " " |
            replace:"</h6>", " "|
          strip_html | strip_newlines | truncatewords: 50 | jsonify }},
        {%- endif -%}
      "book": {{ _book | jsonify }},
      "url": {{ doc.url | absolute_url | jsonify }}
  }{%- unless forloop.last and l -%},{%- endunless -%}
  {%- endfor -%}
{%- endif -%}]
