\_\_TOC\_\_

**Syntax:**

<?component name="''myName''" templateURI="''/mypath/my.zul''" ?>
<?component name="''myName''" macroURI="''/mypath/my.zul''" [inline="true|'''false'''"]
   [apply="''composer''"] [''prop1''="''value1''"] [''prop2''="''value2''"]... ?>
<?component name="''myName''" [class="''myPackage.myClass''"]
   [extends="''nameOfExistComponent''"]
   [moldName="''myMoldName''"] [moldURI="/''myMoldURI''"]
   [apply="''composer''"] [''prop1''="''value1''"] [''prop2''="''value2''"]... ?>

Defines a new component in the page scope.

# The by-macro Format

**Syntax:**

<?component name="''myName''" macroURI="''/mypath/my.zul''"
   [apply="''composer''"] [language="xul/html"] [''prop1''="''value1''"] [''prop2''="''value2''"]... ?>

You can define a new component based on a ZUML page. It is also called
the *macro component*. In other words, once an instance of the new
component is created, it creates child components based on the specified
ZUML page (the `macroURI` attribute).

In addition, you could specify the initial properties (such as `prop1`
in the above example), such that they are always passed to the macro
component (through the `arg` variable).

The `inline` attribute specifies whether it is an inline macro
(`inlinie="true"`) or a regular macro (default).

An inline macro behaves like *inline-expansion*. ZK doesn't create a
macro component if an inline macro is encountered. Rather, it
inline-expands the components defined in the macro URI. In other words,
it works as if you type the content of the inline macro directly to the
target page.

On the other hand, ZK will create a real component (called a macro
component) to represent the regular macro. That is, the macro component
is created as the parent of the components that are defined in the
macro.

# The by-template Format

**Syntax:**

<?component name="''myName''" templateURI="''/mypath/my.zul''"
   [language="xul/html"] [''prop1''="''value1''"] [''prop2''="''value2''"]... ?>

Defines a named
[<apply>](http://books.zkoss.org/zk-mvvm-book/8.0/syntax/apply.html)
element on that page with a predefined templateURI and default optional
parameters. ([Application wide
configuration](ZK_Developer%27s_Reference/UI_Composing/ZUML/Include_a_Page#Application-wide_Named_.3CApply.3E))

# The by-class Format

**Syntax:**

<?component name="''myName''" [class="''myPackage.myClass''"]
   [extends="''nameOfExistComponent''"]
   [moldName="''myMoldName''"] [moldURI="/''myMoldURI''"]
   [apply="''composer''"] [language="xul/html"] [''prop1''="''value1''"] [''prop2''="''value2''"]...?>

In addition to defining a component by a ZUML page (aka., a macro
component), you could define a new component by implementing a class
that implements the
<javadoc type="interface">org.zkoss.zk.ui.Component</javadoc> interface.
Then, use the `by-class` format to declare such kind of components for a
page.

To define a new component, you have to specify at least one `class`
attribute, which is used by ZK to instantiate a new instance of the
component.

# Define Initial Attribute Value

In addition to defining a new component, you can override properties of
existent components by specifying the `extends` element with the
component's name to extend from (aka., extendee). In other words, if
`extends` is specified, the definition of the extendee is loaded as the
default value and then override only properties that are specified in
this directive.

If the name of extendee and extender is the same, it means the extender
will override the definition of extendee.

For example, assume you want to use `MyWindow` instead of the default
window, <javadoc>org.zkoss.zul.Window</javadoc> for all windows defined
in this ZUML page. Then, you can declare it as follows.

``` xml
 <?component name="window" extends="window" class="foo.MyWindow"?>
 ...
 <window>
 ...
 </window>
```

It is equivalent to the following codes.

``` xml
 <window use="MyWindow">
 ...
 </window>
```

In addition, you could specify the properties to initialize. For
example, you want to use the style class called blue for all buttons
used in this page, then you could:

``` xml
 <?component name="button" extends="button" sclass="blue"?>
```

Similarly, you could use the following definition to use OK as the
default label for all buttons specified in this page.

``` xml
<?component name="button" extends="button" label="OK"?>
```

Notice that the properties won't be applied if a component is created
manually (by `zscript` or by Java codes). If you still want them to be
applied with the initialial properties, you could invoke the
`applyProperties` method as follows.

``` xml
 <zscript>
     Button btn = new Button();
     btn.applyProperties(); //apply the initial properties
 </zscript>
```

# Attributes

## apply

`[Optional]`  
`[Since 3.6.0]`

The apply condition, which is a list of composer's class names or EL
expressions. If an EL expression is specified, it must return either a
class instance, a class name, a composer instance or null.

Notice that the list of composers specified here is always applied even
if the component has its own apply condition. For example, both
BaseComposer and FooComposer are applied in the following example,

``` xml
<?component name="window" extends="window" apply="BaseComposer"?>
<window apply="FooComposer">
</window>
```

## class

`[Optional]`

Used to specify the class to instantiate an instance of such kind of
components. Unlike other directives, the class can be defined with
`zscript`.

For implementing a macro component, please refer to [ZK Developer's
Reference](ZK_Developer's_Reference/UI_Composing/Macro_Component/Implement_Custom_Java_Class).

## extends

`[Optional]`

Specifies the component name to extend from. The existent definition of
the specified name will be loaded to initialize the new component
definition. In other words, it *extends* the existent definition instead
of defining a brand-new one.

## language

`[Optional][Since ZK 5.0.0]`

Specifies which language to look for the component definition to extends
from. If omitted, the page's language is assumed.

Notice that the new defined component is visible only to the associate
page. The language attribute is used for locating the component
definition specified in the extends attribute. For example, the
following statement works even if it is used in a ZHTML file.

``` javascript
<?component name="foo" extends="button" language="xul/html"?>
```

## macroURI

`[Required if the by-macro format is used][EL is `*`not`*` allowed]`

Used with the by-macro format to specify the URI of the ZUML page, which
is used as the template to create components.

## templateURI

`[Required if the by-template format is used][EL is `*`not`*` allowed]`

Used with the by-template format to specify the URI of the ZUML page,
which is used as the template to create components.

## moldName

`[Optional][Default: ``default``]`

Used with the by-class format to specify the mold name. If `moldName` is
specified, `moldURI` must be specified, too.

## moldURI

`[REMOVED, only for ZK < 5.0.0]`  
`[Optional][EL is allowed]`

`moldURI="~./zul/in-my-jar.dsp"`  
`moldURI="/WEB-INF/in-my-web.dsp"`  
`moldURI="/jsp-or-other-servlet"`  
`moldURI="class:com.mycompany.myrender"`

Used with the by-class format to specify the mold URI. If `moldURI` is
specified but `moldName` is not specified, the mold name is assumed as
`default`.

## name

`[Required]`

The component name. If an existent component is defined with the same
name, the existent component is completely invisible in this page. If
the by-class format is used, the attributes of the existent components
are used to initialize the new components and then override with what
are defined in this processing instruction.

# Version History

| Version | Date       | Content                                                        |
|---------|------------|----------------------------------------------------------------|
| 8.0.0   | 2015/10/06 | [\#The_by-template_Format](#The_by-template_Format) |
|         |            |                                                                |
