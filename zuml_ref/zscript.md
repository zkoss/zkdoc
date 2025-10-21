
**Syntax:**
```xml
<zscript [language="Java|JavaScript|Ruby|Groovy|Python"] [if="if-condition"] [unless="unless-condition"]>Scripting codes</zscript>  
<zscript src="a_uri" [language="Java|JavaScript|Ruby|Groovy"] [if="if-condition"] [unless="unless-condition"]/>
```

It defines a piece of scripting codes that will be interpreted when the
page is evaluated. The language of the scripting codes is, by default,
Java. You can select a different language with the use of `language`
attribute[^1].

The `zscript` element has two formats as shown above. The first format
is used to embed the scripting codes directly in the page. The second
format is used to reference an external file that contains the scripting
codes.

```xml
 <zscript>
 alert("Hi");
 </zscript>
 <zscript src="/codes/my.bs"/>
```

Like other ZK elements, it is not a component but a special XML element.

For introductory of zscript, please refer to [Scripts_in_ZUML](/zk_dev_ref/ui_composing/scripts_in_zuml).

## src

`[Optional][Default: none]`

Specifies the URI of the file containing the scripting codes. If
specified, the scripting codes will be loaded as if they are embedded
directly.

Note: the file should contain the source codes in the selected scripting
language. The encoding must be UTF-8. Don't specify a class file (aka.
byte codes).

Like other URL and URI, it has several characteristics as follows:

1.  It is relative to the servlet context path (aka., the
    `getContextPath` method from the
    `javax.servlet.http.HttpServletRequest` interface). In other words,
    ZK will prefix it with the servlet context automatically.
2.  It resolves "~" to other Web applications (aka., different
    ServletContext). Notice that Web server administrator might disable
    the Web applications from peeking other's content[^2].
3.  It accepts `*` for loading browser and Locale dependent style
    sheet.

The algorithm to resolve `*` is as follows.

- If there is one `*` specified in an URL or URI such as `/my*.css`,
  then `*` will be replaced with a proper Locale depending on the
  preferences of user's browser.For example, user's preferences is
  `de_DE`, then ZK searches `/my_de_DE.css`, `/my_de.css`, and `/my.css`
  one-by-one from your Web site, until any of them is found. If none of
  them is found, `/my.css`is still used.
- If two or more `*` are specified in an URL or URI such as
  `/my*/lang*.css`, then the first `*` will be replaced with "`ie`"
  for Internet Explorer and "`moz`" for other browsers[^3]. If the last
  `*` will be replaced with a proper Locale as described above.
- All other `*` are ignored.


## language

`[Optional][Default: the page's default scripting language][Allowed Values: Java | JavaScript | Ruby | Groovy | Python]`

It specifies the scripting language which the scripting codes are
written in.

Except Java, you have to include corresponding script engines jar files
manually by yourselves before using them in this element, like:

Ruby:

```xml
        <dependency>
            <groupId>org.jruby</groupId>
            <artifactId>jruby</artifactId>
            <version>1.1.2</version>
        </dependency>
```

Python:

```xml
        <dependency>
            <groupId>org.python</groupId>
            <artifactId>jython</artifactId>
            <version>2.2.1</version>
        </dependency>
```

JavaScript:

```xml
        <dependency>
            <groupId>org.mozilla</groupId>
            <artifactId>rhino</artifactId>
            <version>1.7R4</version>
        </dependency>
```

Groovy:

```xml
        <dependency>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy-all</artifactId>
            <version>1.5.6</version>
        </dependency>
```

## deferred

`[Optional][Default: false]`

Specifies whether to defer the evaluation of this element until the
first non-deferred `zscript` codes of the same language has to be
evaluated. It is used to defer the loading of the interpreter and then
speed up the loading of a ZUML page. For example, if all `zscript`
elements are deferred, they are evaluated only when the first event
listened by a handler implemented in `zscript` is received.

For instance, in the following example, the interpreter is loaded and
the zscript element is evaluated, only when the button is clicked:

```xml
<window id="w">
    <zscript deferred="true">
     void addMore() {
         new Label("More").setParent(w);
     }
    </zscript>
    <button label="Add" onClick="addMore()"/>
</window>
```

## if

`[Optional][Default: true]`

Specifies the condition to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to false.

## unless

`[Optional][Default: false]`

Specifies the condition *not* to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to true.


[^1]: Furthermore, you can use the page directive to change the default
    scripting language other than Java.

[^2]: Refer to the `getContext` meth from the
    javax.servlet.ServletContext interface.

[^3]: In the future editions, we will use different codes for browsers
    other than IE and FF.
