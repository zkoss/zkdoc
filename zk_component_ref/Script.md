

# Script

- Demonstration:
  [Script](http://www.zkoss.org/zkdemo/effects/upload_effect)
- Java API: <javadoc>org.zkoss.zul.Script</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.utl.Script</javadoc>
- Style Guide: N/A

# Employment/Purpose

The script component is used to specify the script codes running at the
browser. Notice that, unlike zscript, the script codes are running at
the browser. They are usually written in JavaScript which is supported
by the most of browsers. The simplest format is as follows.

# Example

![](images/ZKComRef_Script_Example.png)

``` xml
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

``` xml
<textbox id="inp"/>
<script defer="true">
   this.$f("inp").setValue("initialized");
</script>
```

The defer attribute can be used with a JavaScript file as shown below.
Then, the JavaScript file will be loaded after all widgets are created
and bound to the DOM tree.

``` xml
<script src="/js/foo.js" defer="true"/>
```

This is required if the script to load intends to manipulate a ZK
widget's DOM elements. `defer="true"` can ensure that all widgets' DOM
elements are already generated.

# Alternatives

## Load Javascript in head tag - script directive

Instead of using this component, you can use [the script
directive](ZUML_Reference/ZUML/Processing_Instructions/script)
instead. It does not support `defer`, but it consumes no memory since no
component is created. And it generated `<script>` in HTML `<head>`, so
the specified script will be loaded earlier than body DOM is created.

``` xml
<?script src="~./js/zk.debug.wpd"?>
<?script content="jq.IE6_ALPHAFIX='.png';"?>
```

- Line 1: loads the debug utility
- Line 2: generates a JavaScript code snippet directly.

## HTML script tag

Another alternative is the HTML SCRIPT tag. For example, we can define
global variables and functions as follows:

``` xml
<n:script xmlns:n="native"><!-- use the native namespace -->
    var a_global_variable;
    function a_global_function () {
        alert("native script");
    }
    alert("you can not access this as widget but evaluated immediately");
</n:script>
```

# Supported Events

- Inherited Supported Events: [
  AbstractComponent](ZK_Component_Reference/Base_Components/AbstractComponent#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description           | Example Location                                                                                                                                                                      |
|---------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0     | Overview and Tutorial | [Client Side Programming](Small_Talks/2010/April/Client_Side_Programming) [ZK Client-side Reference: General Control](ZK_Client-side_Reference/General_Control) |


