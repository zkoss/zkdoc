

If you'd like to customize the client-side behavior, it will end up with
some JavaScript code. The code can be packaged in several ways depending
on the size and re-usability.

It is recommended to take a look at the [Object-Oriented Programming in
JavaScript](ZK_Client-side_Reference/Introduction/Object_Oriented_Programming_in_JavaScript)
section, if you are not familiar how ZK extends JavaScript to support
the concept of packages and classes.

# Embed the JavaScript Code Directly

Use [the script
directive](ZUML_Reference/ZUML/Processing_Instructions/script)
to embed the code directly. For example,

``` xml
<!-- foo.zul -->
<?script type="text/javascript" content="jq.IE6_ALPHAFIX='.png';"?>
```

Alternatively, you could use [the script
component](ZK_Component_Reference/Essential_Components/Script)
to embed the code.

# Put in a Separate File and Reference it in the ZUML page

If there are a lot of JavaScript code, it is better to package them in a
separate file, and then use [the script
directive](ZUML_Reference/ZUML/Processing_Instructions/script)
to reference the file in every ZUML page that requires it.

``` xml
<!-- foo.zul -->
<?script type="text/javascript" src="/myjs/foo.js"?>
```

# Put in a Separate File and Reference it in Language Addon

If the JavaScript code will be used in every ZUML page, it is better to
package them in a separate file, and then make it part of the [the
language definition](ZUML_Reference/ZUML/Languages). To make
it part of the language definition, you could specify the following
content in [the language
addon](ZK_Client-side_Reference/Language_Definition), say,
`WEB-INF/lang-addon.xml`:

``` xml
<language-addon>
    <addon-name>my.extension</addon-name><!-- any name you like -->
    <javascript src="/myjs/foo.js"/> <!-- assume you package it as /myjs/foo.js -->
</language-addon>
```

Then, you could specify the language addon in `WEB-INF/zk.xml`:

``` xml
<language-config>
    <addon-uri>/WEB-INF/lang-addon.xml</addon-uri>
</language-config>
```

# Make It a WPD File for More Control

Technically, you could do whatever you want with a JavaScript file.
However, if you prefer to make it a JavaScript package, such that they
will be loaded automatically when required, you could package them as [a
WPD
file](ZK_Client-side_Reference/Widget_Package_Descriptor).

For example, you could have a WPD file and make it loaded with the zk
package (so [it speeds up the
loading](ZK_Developer's_Reference/Performance_Tips/Minimize_Number_of_JavaScript_Files_to_Load)).

``` xml
<language-addon>
    <addon-name>my.extension</addon-name><!-- any name you like -->
    <javascript package="my.foo" merge="true"/> <!-- assume you call it my.foo -->
</language-addon>
```

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
