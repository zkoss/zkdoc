**Syntax:**

```xml
<debug-js>true|false</debug-js>
```

`[Default: `false`]`

It specifies whether to load uncompressed JavaScript files. By default,
it is `false` and ZK loads the compressed version of JavaScript files
(\*.wpd). They are hard to read and debug, though the footprint is much
smaller.

To debug JavaScript files, you can specify it to `true`. Then, the
original uncompressed JavaScript files with comments will be loaded
instead. When you report a javascript error stack trace, it's better to
enable this to make calling hierarchy readable.

![](images/{{site.baseUrl}}/zk_config_ref-debug-js.png)
