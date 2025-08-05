---
title: "The embed Element"
---

**Syntax:**

```xml
<embed>
*any_valid_fragment*
</embed>
```
`[Optional][Multiple]`

It specifies the content that shall be added to the output generated and
sent to the client when rendering a desktop. The syntax of the content
will depend on the client. For Ajax clients(browsers), you can put any tag that can be placed inside HTML [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head), such as `<script>`, `<meta>`, and others.

This can be a way to include a javascript code snippet in all pages,
e.g. a javascript patch or a custom widget javascript. For example, if
you want to show the progress bar in the center of the browser window,
you can specify the following:

```xml
<device-config>
    <device-type>ajax</device-type>
    <embed><![CDATA[
 <script type="text/javascript">
     AU_progressbar = function (id, msg) {
         Boot_progressbox(id, msg, 0, 0, true, true);
     };
 </script>
     ]]></embed>
</device-config>
```

You can specify multiple `embed` elements and their content be
concatenated together.

# Usage

Notice that you need to specify your **application context path** in the
source path. Becuase ZK directly puts the content into a response
without any encoding.

```xml
<device-config>
   <device-type>ajax</device-type>
   <embed><![CDATA[
        <script type="text/javascript" src="/myapp/zkpatch/lisbox_selectbugfixed.js"></script>
        <link rel="stylesheet" href="/myapp/styles.css">
    ]]></embed>
</device-config>
```
