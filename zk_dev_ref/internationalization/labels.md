# Overview

For a multilingual application, it is common to display the content in
the language that the end user prefers. Here we discuss the built-in
support called *internationalization labels*.

However, if you prefer to use other approaches, please refer to [the Use
Other Implementation section](#Use_Other_Implementation).

# Creating Internationalization Labels

The internationalization labels of an application are loaded from
properties files based on the current locale[^1]. A properties file is a
simple text file encoded in UTF-8[^2]. The file contains a list of
`key=value` pairs, such as[^3]

``` text
# This is the default LabelsBundle.properties file
s1=computer
s2=disk
s3=monitor
s4=keyboard
```

By default the property file must be placed under the `WEB-INF`
directory and named as `zk-label_`*`lang`*`_`*`CNTY`*`.properties`.[^4],
where *lang* is the language such as en and fr, and *CNTY* is the
country, such as US and FR.

If you want to use one file to represent a language regardless of the
country, you could name it `zk-label_`*`lang`*`.properties`, such as
`zk-label_ja.properties`. Furthermore, `zk-label.properties` is the
default file if the user's preferred locale doesn't match any other
file.

When a user accesses a page, ZK will load the properties files for the
user's locale. For example, assume the locale is `de_DE`, then it will
search the following files and load them if found:

1.  zk-label_de_DE.properties
2.  zk-label_de.properties
3.  zk-label.properties

By default, one properties file is used to contain all labels of a given
locale. If you prefer to split it into multiple properties files (such
as one file per module), please refer to [the Loading Labels from
Multiple Resources
section](#Loading_Labels_from_Multiple_Resources).

Also, notice that all files that match the given locale will be loaded
and merged, and the property specified in, say,
`zk-label_de_DE.properties` will override what is defined in
`zk-label_de.properties` if replicated. It also means if a label is the
same in both `de_DE` and `de`, then you need only to specify in
`zk-label_de.properties` (and then it will be *inherited* when de_DE is
used). Of course, you could specify it in both files.

> ------------------------------------------------------------------------
>
> <references/>

## Encoding character set

By default, the encoding of properties files is assumed to be `UTF-8`.
If you prefer another encoding, please specify it in a library property
called `org.zkoss.util.label.web.charset`. It also means all properties
files must be encoded in the same character set.

For more information, please refer to [ZK Configuration
Reference](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.util.label.web.charset).

# Access Internationalization Labels In ZUML

## Use `labels`

Since 5.0.7 and later, an implicit object called
[labels](ZUML_Reference/EL_Expressions/Implicit_Objects/labels)
was introduced, such that you could access the internationalization
labels (so-called internationalization labels) directly. For example,
assume you have a label called `app.title`, and then you could:

``` xml
<window title="${labels.app.title}">
...
</window>
```

The
[labels](ZUML_Reference/EL_Expressions/Implicit_Objects/labels)
object is a map (`java.util.Map`), so you could access the label
directly by the use of `labels.`*`whatever`* in an EL expression.
Moreover, as shown above, you could access the label even if a key is
named as *aa*.*bb*.*cc* (a string containing dots), such as `app.title`
in the above example.

If the key is not a legal name, you could use `labels['key']` to access
it, such as `labels['foo-yet']`.

When an internationalization label is about to be retrieved, one of
zk-label\_*lang*\_*CNTY*.properties will be loaded. For example, if the
Locale is `de_DE`, then `WEB-INF/zk-label_de_DE.properties` will be
loaded. If no such file, ZK will try to load
`WEB-INF/zk-label_de.properties` and `WEB-INF/zk-label.properties` in
turn.

Notice that ZK groups the segmented labels as maps. For example,
`${labels.app}` was resolved as a map containing two entries (`title`
and `description`).

``` xml
app.title=Foo
app.description=A super application
```

If you have a key named as the prefix of the other keys, you have to use
`$` to access it. For example, if the labels consist of keys `a, a.b`,
etc., `${labels.a.$}` is required to resolve the label with the key
named `a`.

For example, in properties file:

``` xml
app=Application
app.title=Foo
app.description=A super application
```

In ZUL:

``` xml
<window title="${labels.app.$}"><!-- shows "Application" -->
...
</window>
<window title="${labels.app}"><!-- WRONG! -->
...
</window>
```

## Use `c:l('key')`

With 5.0.6 or prior, you could get an internationalization label using
`${c:l('key')}` in EL expression. For example,

``` xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>

<window title="${c:l('app.title')}">
 ...
</window>
```

Notice that [the l
function](ZUML_Reference/EL_Expressions/Core_Methods/l)
belongs to the TLD file called
[<http://www.zkoss.org/dsp/web/core>](ZUML_Reference/EL_Expressions/Core_Methods),
so we have to specify it with the
[taglib](ZUML_Reference/ZUML/Processing_Instructions/taglib)
directive as shown above.

## Use `c:l2('key')` to format the message

If you'd like to use the label as a pattern to generate concatenated
message with additional arguments (like
[`java.text.MessageFormat`](https://docs.oracle.com/javase/8/docs/api/java/text/MessageFormat.html)
does), you could use [the l2
function](ZUML_Reference/EL_Expressions/Core_Methods/l2).

For example, let us assume we want to generate a full name based on the
current Locale, then we could use `${c:l2('key',args)}` to generate
concatenated messages as follows.

``` text
fullname.format=full name is {0}
```

``` xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<label value="${c:l2('fullname.format', fullname)}">
```

- We assume `fullname` is a string array (such as
  `new String[] {"Jimmy", "Shiau"}`).

<javadoc method="getLabel(java.lang.String, java.lang.Object[])">org.zkoss.util.resource.Labels</javadoc>
assumes the content is a valid pattern accepted by
[MessageFormat](http://download.oracle.com/javase/6/docs/api/java/text/MessageFormat.html),
such as `"{1}, {0}"`.

Please notice that "a single quote itself must be represented by doubled
single quotes" according to
[java.text.MessageFormat](https://docs.oracle.com/javase/8/docs/api/java/text/MessageFormat.html).

# Access Internationalization Labels In Java

To access labels in Java code (including zscript), you could use
<javadoc method="getLabel(java.lang.String)">org.zkoss.util.resource.Labels</javadoc>,
<javadoc method="getLabel(java.lang.String, java.lang.Object[])">org.zkoss.util.resource.Labels</javadoc>
and others.

``` java
String username = Labels.getLabel("username");
```

Here is a more complex example. Let us assume we want to generate a full
name based on the Locale, then we could use
<javadoc method="getLabel(java.lang.String, java.lang.Object[])">org.zkoss.util.resource.Labels</javadoc>
to generate concatenated messages as follows.

``` java
public String getFullName(String firstName, String lastName) {
   return Labels.getLabel("fullname.format", new java.lang.Object[] {firstName, lastName});
}
```

<javadoc method="getLabel(java.lang.String, java.lang.Object[])">org.zkoss.util.resource.Labels</javadoc>
assumes the content is a valid pattern accepted by
[MessageFormat](http://download.oracle.com/javase/6/docs/api/java/text/MessageFormat.html),
such as `"{1}, {0}"`.

# Loading Labels from Multiple Resources

It is typical to partition the properties file into several modules for
easy maintenance. Since 5.0.7 and later, you could specify the location
for each of these properties file with [the label-location
element](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_label-location_Element).
For example,

``` xml
<system-config>
    <label-location>/WEB-INF/labels/order.properties</label-location>
    <label-location>/WEB-INF/labels/invoice.properties</label-location>
</system-config>
```

Notice that, once you specify `label-location`, the default loading of
`/WEB-INF/zk-labels.properties` won't take place. In other words, only
the properties files specified in the label-location elements are
loaded. Thus, if you'd like to load `/WEB-INF/zk-labels.properties` too,
you have to add it to `label-location` with others.

Also notice that you don't have to and shall not specify the language,
such as `de_DE`, in the path. ZK will try to locate the most matched one
as described in the previous section.

In addition to the servlet path, you could specify a file path by
starting with [`file://`](file://)[^5]. For example,
[`file:///foo/labels.properties`](file:///foo/labels.properties). If the
target environment is Windows, you could specify the drive too, such as
[`file:///C:/myapp/foo.properties`](file:///C:/myapp/foo.properties).
The advantage is that additional properties files could be added after
the project has been built into a WAR file.

``` xml
<system-config>
    <label-location>file:///labels/order.properties</label-location>
    <label-location>file:///labels/invoice.properties</label-location>
</system-config>
```

Notice that the configuration with a path related to the file system is
better not to be part of `WEB-INF/zk.xml`, since it is easy to cause
errors when deploying the application. Rather, it is better to be
specified in the additional configuration file. The additional
configuration file is also specified at the run time and could be
located in the file system (rather than the WAR file). It can be done by
specifying the path of the configuration file in a library property
called
[org.zkoss.zk.config.path](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zk.config.path).

For 5.0.6 and older, you could use the approach described in the
following section to load multiple properties files.

> ------------------------------------------------------------------------
>
> <references/>

# Loading Labels from Jar

If your application is built using multiple Jars as custom components or
as a modular project, you can load internationalization labels by
putting the .properties files in the resource folder of your add-on
project.

Required Steps:

1.  put properties files under `[classpath]/metainfo`
2.  the properties files name should be `zk-label.properties` or
    `zk-label_[LOCALE].properties`
      
    e.g. `zk-label_en.properties`

For example, if you are building with maven, the files can be placed
into `/src/main/resources/metainfo/` in your project. You can define the
default labels using `zk-label.properties` as well as language specific
labels using the same file name convention as in the default case.

When the jars generated this way are added as libraries to the main ZK
project, the properties files located in these libraries will be used to
locate labels as well as the properties files declared in the main
application. The properties files must follow the same syntax used in
the default case.

# Loading from Database or Other Resources

If you prefer to put the internationalization labels in, say, database,
you could extend the label loader to load labels from other locations,
say database. It can be done by registering a locator, which must
implement either
<javadoc type="interface">org.zkoss.util.resource.LabelLocator</javadoc>
or
<javadoc type="interface">org.zkoss.util.resource.LabelLocator2</javadoc>.
Then, invoking
<javadoc method="register(org.zkoss.util.resource.LabelLocator)">org.zkoss.util.resource.Labels</javadoc>
or
<javadoc method="register(org.zkoss.util.resource.LabelLocator2)">org.zkoss.util.resource.Labels</javadoc>
to register it[^6].

If you can represent your resource in URL, you could use
<javadoc type="interface">org.zkoss.util.resource.LabelLocator</javadoc>
(as shown below). If you have to load it by yourself, you could use
<javadoc type="interface">org.zkoss.util.resource.LabelLocator2</javadoc>
and return an input stream (java.io.InputStream).

**Alernative 1: load as an input stream:**

``` java
public class FooDBLocator implements org.zkoss.util.resource.LabelLocator2 {
    private String _field;
    public FooDBLocator(String field) {
        _field = field;
    }
    public InputStream locate(Locale locale) {
        InputStream is = ... //load the properties from, say, database
        return is;
    }
    public String getCharset() {
        return "UTF-8"; //depending the encoding you use
    }
}
```

**Alernative 2: load as an URL:**

``` java
public class FooServletLocator implements org.zkoss.util.resource.LabelLocator {
    private ServletContext _svlctx;
    private String _name;
    public FooServletLocator(ServletContext svlctx, String name) {
        _svlctx = svlctx;
        _name = name;
    }
    public URL locate(Locale locale) {
        return _svlctx.getResource("/WEB-INF/labels/" + name + "_" + locale + ".properties");
    }
}
```

Then, we could register label locators when the application starts by
use of
<javadoc type="interface">org.zkoss.zk.ui.util.WebAppInit</javadoc> as
follows.

``` java
public class MyAppInit implements org.zkoss.zk.ui.util.WebAppInit {
    public void init(WebApp wapp) throws Exception {
        Labels.register(new FooDBLocator(("moduleX");
        Labels.register(new FooDBLocator(("moduleY");
        Labels.register(new FooServletLocator((ServletContext)wapp.getNativeContext(), "module-1");
        Labels.register(new FooServletLocator((ServletContext)wapp.getNativeContext(), "module-2");
    }
}
```

where we assume `moduleX` and `moduleY` are the database tables to load
the properties, and `module-1.properties` and `module-2.properties` are
two modules of messages you provide. Then, you configure it in
`WEB-INF/zk.xml` as described in [ZK Configuration
Reference](ZK_Configuration_Reference/zk.xml/The_listener_Element/The_org.zkoss.zk.ui.util.WebAppInit_interface).

> ------------------------------------------------------------------------
>
> <references/>

# Reload Labels Dynamically

The internationalization labels are loaded when a locale is used for the
first time. It won't be reloaded automatically if the file is modified.
However, it is easy to force ZK to reload by the use of
<javadoc method="reset()">org.zkoss.util.resource.Labels</javadoc>.

For example, you could prepare a test paging for reloading as follows.

``` xml
<zk>
<button label="Reload Labels" onClick="org.zkoss.util.resource.Labels.reset();execution.sendRedirect(null);"/>
Test result: ${foo} ${another.whatever}
</zk>
```

# Use Other Implementation

If you prefer to use other implementation (such as property bundle), you
could implement a static method and map it with
[xel-method](ZUML_Reference/ZUML/Processing_Instructions/xel-method).
Then, you could reference it in EL expressions. For example,

``` xml
<?xel-method prefix="c" name="label" class="foo.MyI18Ns" 
  signature="java.lang.String label(java.lang.String)"?>
<window title="${c:label('app.title')}">
....
${c:label('another.key')}
</window>
```

# Version History

| Version | Date         | Content                                                                                   |
|---------|--------------|-------------------------------------------------------------------------------------------|
| 5.0.5   | October 2010 | <javadoc type="interface">org.zkoss.util.resource.LabelLocator2</javadoc> was introduced. |
| 5.0.7   | March 2011   | The `labels` object was introduced.                                                       |

[^1]: It is the value returned by
    <javadoc method="getCurrent()">org.zkoss.util.Locales</javadoc>. For
    more information, please refer to [the Locale
    section]({{site.baseurl}}/zk_dev_ref/Internationalization/Locale).

[^2]: If you prefer a different charset, please refer to [the Encoding
    Character Set section](#Encoding_character_set).

[^3]: Please refer to
    [here]({{site.baseurl}}/zk_dev_ref/Internationalization/Labels/The_Format_of_Properties_Files)
    for more details about the format of a properties file, such as the
    use of multiple lines and EL expressions.

[^4]: Notice the directory and filename are configurable. For more
    information, please refer to [ZK Configuration Reference:
    org.zkoss.util.label.web.location](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.util.label.web.location)

[^5]: For more information about the URI of a file, please refer to
    [File URI scheme](http://en.wikipedia.org/wiki/File_URI_scheme).

[^6]: For 5.0.7 and later, you could use [the label-location
    element](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_label-location_Element)
    if the properties file is located in the file system or in the Web
    application as described in the previous section.
