**Syntax:**

<enable-source-map>`true|`**`false`**</enable-source-map>

`[Default: ``false``]`

It specifies whether to using source map to debug JavaScript files. By
default, it is `false` and ZK loads the merged JavaScript files in the
same package (\*.wpd). Those files are roughly categorized by package
(for example: zk or zul.wgt).

To debug JavaScript files with more precise directories and files, you
can specify it to `true`. Then, we can locate the JavaScript (TypeScript
after ZK 10.0.0) files easily.
