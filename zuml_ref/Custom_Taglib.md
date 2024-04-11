# The Syntax of Taglib Document

The syntax of a Taglib document is the same as JSP's taglib (aka., TLD),
so you could use JSP's TLD files directly. However, ZK only recognizes
the function elements. All others are ignored.

Here is an example:

``` xml
<taglib>
    <function>
        <name>browser</name>
        <function-class>org.zkoss.web.fn.ServletFns</function-class>
        <function-signature>
    boolean isBrowser(java.lang.String)
        </function-signature>
        <description>
    Whether the current request is coming from the browser of the specified
    type.
        </description>
    </function>
    <function>
        <name>l</name>
        <function-class>org.zkoss.xel.fn.CommonFns</function-class>
        <function-signature>java.lang.String getLabel(java.lang.String)</function-signature>
        <description>
        Returns the label of the specified key.
        </description>
    </function>
</taglib>
```

where

- The root element must be called `taglib`
- Each function declaration must be called `function`. It requires three
  sub-elements: `name`, `function-class` and `function-signature`. The
  `description` element is optional (for documentation only).

In addition, you could import all public static methods with an element
called `import`, and the name of EL function will be the same as the
method name. For example,

``` xml
<import>
    <import-name>Labels</import-name>
    <import-class>org.zkoss.util.resource.Labels</import-class>
</import>
```

# Configure Tag Documents as Built-in

The custom taglib document could be specified as follows (assuming you
have a taglib called `/WEB-INF/tld/foo.tld`):

``` xml
<?taglib uri="/WEB-INF/tld/foo.tld" prefix="f"?>
```

In addition, you could map a taglib to URL as if they are bult-in.
First, provide a file named `/metainfo/tld/config.xml` that can be found
in the classpath. For example, you could put it under
`WEB-INF/classes/metainfo/tld/config.xml`, or as part of a JAR file.
Then, in this file (`config.xml`), you could specify any number of the
mapping as follows.

``` xml
<config>
    <config-name>myTag</config-name> <!-- required since ZK 8 -->
    <taglib>
        <taglib-uri>http://www.foo.com/myfirst</taglib-uri>
        <taglib-location>/whatever/myfirst.tld</taglib-location>
    </taglib>
    <taglib>
        <taglib-uri>http://www.foo.com/mysecond</taglib-uri>
        <taglib-location>/whatever/mysecond.tld</taglib-location>
    </taglib>
</config>
```

Notice that <taglib-location> must be a path accessible by the classpath
(such as `/WEB-INF/classes` or a JAR file).

Then, you can declare them in a zul:

``` xml
<?taglib uri="http://www.foo.com/myfirst" prefix="f"?>
<?taglib uri="http://www.foo.com/mysecond" prefix="s"?>
```

# Solving config.xml Dependence

### The config-name Element

**Syntax:**

<config-name>*`a_name`*</config-name>

`[Required]`

It specifies the configuration's name. The name must be unique if it is
referenced by other configuration files (with [the depends
element](#The_depends_Element)).

### The depends Element

**Syntax:**

<depends>*`a_list_of_config_names`*</depends>

`[Optional]`

It specifies what configurations this configuration depends on. If
specified, this configuration will be parsed after all specified
configurations are parsed.

Example,

``` xml
<depends>zk</depends>
```

which means this configuration won't be parsed until
`/metainfo/tld/config.xml` in `zk` is parsed.

# Version History

| Version | Date               | Content                                                                                                                |
|---------|--------------------|------------------------------------------------------------------------------------------------------------------------|
| 8.0.0   | September 16, 2015 | [ZK Custom Taglib should support the depends attribute to load them in order](http://tracker.zkoss.org/browse/ZK-2876) |
