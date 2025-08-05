---
title: "widget"
---

**Syntax:**
```xml
<widget name="widgetName"/>
```

It specifies the widget's name.

Example,

```xml
<package name="zul.wgt" language="xul/html" depends="zul">
    <widget name="A"/>
    <widget name="Cell"/>   
    <widget name="Div"/>
    <widget name="Span"/>
</package>
```

A widget declaration will cause WPD to generate the widget definition in
JavaScript. It also assumes that there is a JavaScript file with the
same name in the same directory. For example, the above example will
cause WPD to embed A.js, Cell.js, Div.js and Span.js.


