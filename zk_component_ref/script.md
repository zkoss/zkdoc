---
title: "Script"
description: "Script: The script component is used to specify the script codes running at the browser."
---

- **Demonstration:** [Script](http://www.zkoss.org/zkdemo/effects/upload_effect)
- **Java API:** [org.zkoss.zul.Script](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Script.html)
- **JavaScript API:** [zul.utl.Script](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.utl.Script.html)

# Employment/Purpose

The script component is used to specify the script codes running at the
browser. Notice that, unlike zscript, the script codes are running at
the browser. They are usually written in JavaScript which is supported
by the most of browsers. The simplest format is as follows.

## Common Use Cases

- **Desktop-level initialisation** — define widget classes or global JavaScript functions before any widget is mounted: use `content` (or the element body) without `defer`.
- **Post-mount widget access** — read or manipulate ZK widget state after the page is fully rendered: set `defer="true"` and access widgets via `this.$f("id")`.
- **Loading an external library** — point `src` at a JS file; add `charset` when the file uses a non-UTF-8 encoding.
- **Lazy package loading** — use `packages` to declare widget packages that must finish downloading before the inline `content` script runs.

# Example

![Script Example](/zk_component_ref/images/ZKComRef_Script_Example.png)

```xml
<window id="win">
    <button label="change color" onClick='Clients.evalJavaScript("myfunc()")' />
</window>
<script type="text/javascript">
    function myfunc() {
        jq("$win").css("backgroundColor", "blue");
    }
 </script>
```

# Defer the Evaluation

By default, the specified JavaScript code will be evaluated as soon as
the page is loaded. By specifying `defer="true"`, the JavaScript code
won't be evaluated until all ZK widgets are created and bound to the DOM
tree.

```xml
<textbox id="inp"/>
<script defer="true">
   this.$f("inp").setValue("initialized");
</script>
```

The defer attribute can be used with a JavaScript file as shown below.
Then, the JavaScript file will be loaded after all widgets are created
and bound to the DOM tree.

```xml
<script src="/js/foo.js" defer="true"/>
```

This is required if the script to load intends to manipulate a ZK
widget's DOM elements. `defer="true"` can ensure that all widgets' DOM
elements are already generated.

# Alternatives

## Load Javascript in head tag - script directive

Instead of using this component, you can use [the script directive](/zuml_ref/script)
instead. It does not support `defer`, but it consumes no memory since no
component is created. And it generated `<script>` in HTML `<head>`, so
the specified script will be loaded earlier than body DOM is created.

```xml
<?script src="~./js/zk.debug.wpd"?>
<?script content="jq.IE6_ALPHAFIX='.png';"?>
```

- Line 1: loads the debug utility
- Line 2: generates a JavaScript code snippet directly.

## HTML script tag

Another alternative is the HTML SCRIPT tag. For example, we can define
global variables and functions as follows:

```xml
<n:script xmlns:n="native"><!-- use the native namespace -->
    var a_global_variable;
    function a_global_function () {
        alert("native script");
    }
    alert("you can not access this as widget but evaluated immediately");
</n:script>
```

# Properties

## charset

**Default Value:** `null`

Sets the character encoding of the linked script file. This attribute is meaningful only when used together with `src` to load an external JavaScript file. Refer to [HTML Character Sets](http://www.w3schools.com/TAGS/ref_charactersets.asp) for accepted values.

```xml
<script src="/js/foo.js" charset="UTF-8"/>
```

## content

**Default Value:** `null`

{% include supported-since.html version="3.0.0" %}

Sets inline JavaScript code to be embedded in the page. The code is enclosed in an HTML `<script>` element. You may also supply the content as the text body of the `<script>` tag in ZUL.

When `defer="false"` (the default), the code runs immediately before any widgets are instantiated — suitable for defining global functions or widget classes. When `defer="true"`, the code runs after all widgets are mounted and `this` refers to the script widget.

```xml
<!-- inline body form (textAs="content") -->
<script defer="true">
    this.$f("myBtn").setLabel("Ready");
</script>

<!-- attribute form -->
<script content="alert('hello');"/>
```

## defer

**Default Value:** `false`

Controls when the script is evaluated. When `false` (the default), the JavaScript code or external file is evaluated immediately as the page is loaded, before widgets are instantiated — use this for desktop-level initialisation such as defining a widget class or a global function. When `true`, evaluation is deferred until all ZK widgets have been instantiated and mounted to the DOM tree; `this` inside the script refers to the script widget itself.

```xml
<!-- deferred inline script: widgets are accessible via this.$f(...) -->
<textbox id="inp"/>
<script defer="true">
    this.$f("inp").setValue("initialized");
</script>

<!-- deferred external file -->
<script src="/js/widget-init.js" defer="true"/>
```

## packages

**Default Value:** `null`

{% include supported-since.html version="5.0.0" %}

A comma-separated list of ZK client-side packages (widget packages) to load before the inline script defined by `content` is evaluated. Has no effect when only `src` is used.

```xml
<script packages="zul.inp,zul.wgt" defer="true">
    zk.log(zul.inp);
</script>
```

## src

**Default Value:** `null`

The URI of an external JavaScript file to load. The URI is encoded by the current execution and supports ZK's resource-loading conventions (e.g. `~./` for classpath resources).

Use `src` to load a standalone JS file, or use `content` (or the element body) to embed code directly — do not combine both on the same element.

```xml
<!-- load an external file immediately -->
<script src="/js/mylib.js"/>

<!-- load with explicit charset -->
<script src="/js/mylib.js" charset="UTF-8"/>

<!-- load after widgets are mounted -->
<script src="/js/widget-patch.js" defer="true"/>
```

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|

Inherited Supported Events: [AbstractComponent]({{site.baseurl}}/zk_component_ref/abstractcomponent#Supported_Events)

# Supported Children

`*NONE`