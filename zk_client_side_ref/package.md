**Syntax:**

`<package name="`a_name`" [language="`a_lang`"] [depends="`pkg0`, `pkg1`..."] [cacheable="true|false"]>`

The root element of a WPD document. It specifies the name of the
package, what packages it depends and other information.

Example,

``` xml
<package name="zul.box" language="xul/html" depends="zul,zul.wgt">
    <script src="Layout.js" jsdoc="true"/>
    
    <widget name="Box"/>
    <widget name="Splitter"/>
    <widget name="Hlayout"/>
    <widget name="Vlayout"/>
</package>
```

# name

`[Required]`

The package name, such as `zul.grid`. It has to be unique.

# language

`[Optional]`

The [language](ZUML_Reference/ZUML/Languages) name, such as
[xul/html](ZUML_Reference/ZUML/Languages/ZUL).

If omitted, it means it does not belong to a particular language. It is
better to specify one if the WPD document defines a
[widget](ZK_Client-side_Reference/Widget_Package_Descriptor/widget).

# depends

`[Optional]`

It specifies a list of packages that this package depends on. In other
words, the packages specified in this attribute will be loaded before
loading this package.

# cacheable

`[Optiona][Default: true]`

It specifies whether the client is allowed to cache the output of this
WPD file. By default, it is cacheable since the performance is better.
However, you have to turn it off, if you use a
[function](ZK_Client-side_Reference/Widget_Package_Descriptor/function)
that will generate the output depending on a varying condition (such as
Locale and time zone).


