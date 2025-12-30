---
title: "JavaScript Packaging and Inclusion"
---

When you need to customize the client-side behavior, apply a js patch, or include a 3rd-party js library, you have to include the js file in your application. This section describes
how you can include the js file for different scopes.

It is recommended to take a look at the [Object-Oriented Programming in JavaScript]({{site.baseurl}}/zk_client_side_ref/object_oriented_programming_in_javascript)
, if you are not familiar with how ZK extends JavaScript to support
the concept of packages and classes.

# Page-Scope

To include a JavaScript file for a single page, you can use either the `script` directive or the `script` component. This is useful for page-specific logic.

## Embed JavaScript Code Directly

Use [the script directive]({{site.baseurl}}/zuml_ref/languages) to embed the code directly.

```xml
<!-- foo.zul -->
<?script type="text/javascript" content="jq.IE6_ALPHAFIX='.png';"?>
```

Alternatively, you could use [the script component]({{site.baseurl}}/zk_component_ref/script) to embed the code.

## Reference a Separate JavaScript File

If there are a lot of JavaScript code, it is better to package them in a
separate file, and then use [the script directive]({{site.baseurl}}/zuml_ref/script)
to reference the file in every ZUML page.

```xml
<!-- foo.zul -->
<?script type="text/javascript" src="/myjs/foo.js"?>
```

The [script component](/zk_component_ref/script) can also be used to reference an external file.

# Application-Scope

If you need to include a JavaScript file on every ZUL page in your application, there are several ways.

## By Language Addon

You can create a `lang-addon.xml` to include the JavaScript file. ZK will load this addon for the whole application.

First, create a `lang-addon.xml` file, for example in `WEB-INF/lang-addon.xml`:
```xml
<language-addon>
    <addon-name>my-patch-addon</addon-name><!-- give a meaningful name -->
    <language-name>xul/html</language-name>
    <depends>zul</depends>
    <javascript src="~./mypatch.js" />
    <javascript src="/zkpatch/mypatch2.js"/>
</language-addon>
```
- A path starting with `~./` is a [classpath web resource path]({{site.baseurl}}/zk_dev_ref/ui_composing/include_a_page#Classpath_Web_Resource_Path) which is a special path supported by ZK to load resources from classpath.
- You can also link a file under your web application context root e.g. `/zkpatch/mypatch2.js`.

Then, you must register this language addon in `WEB-INF/zk.xml`:

```xml
<language-config>
    <addon-uri>/WEB-INF/lang-addon.xml</addon-uri>
</language-config>
```

### Dependent Addon

If you override a component's widget or extend an existing component,
it's crucial to specify `<depends>` correctly, so that your lang addon
will take effect. According to which component you override, you need to
specify the corresponding addon name. For example:

- If you override a component in zul language e.g. `<button>`, you specify
  ```xml
  <depends>zul</depends>
  ```
- If you override a component provided by zkmax e.g. `<nav>`, you specify
  ```xml
  <depends>zkmax</depends>
  ```
- If you override something about accessibility, e.g. override aria
  attribute, you specify
  ```xml
  <depends>za11y</depends>
  ```

## By zk.xml

A simpler way for application-scope is to use the [`<embed>`](/zk_config_ref/the_embed_element) element in `zk.xml`. This will embed a specified content inside the `head` element of every ZK page.

```xml
<zk>
    <embed><![CDATA[
        <script type="text/javascript" src="/js/my-global.js"></script>
    ]]></embed>
</zk>
```

## Make It a WPD File for More Control

Technically, you could do whatever you want with a JavaScript file.
However, if you prefer to make it a JavaScript package, such that they
will be loaded automatically when required, you could package them as [a WPD file]({{site.baseurl}}/zk_client_side_ref/widget_package_descriptor). This gives you more control over packaging and on-demand loading.

For example, you could have a WPD file and make it loaded with the zk
package (so [it speeds up the loading]({{site.baseurl}}/zk_dev_ref/performance_tips/minimize_number_of_javascript_files_to_load)).

```xml
<language-addon>
    <addon-name>my.extension</addon-name><!-- any name you like -->
    <javascript package="my.foo" merge="true"/> <!-- assume you call it my.foo -->
</language-addon>
```
This requires you to create a `zk.wpd` file for your `my.foo` package.