

If you are not familiar with XML, please take a look at [XML Background]({{site.baseurl}}/zk_dev_ref/ui_composing/xml_background)
first.

# An XML Element Represents a Component

Each XML element represents a component, except for special elements
like \<zk\> and \<attribute\>. Thus, the following example will cause
three components (window, textbox and button) to be created when ZK
Loader processes it.

```xml
<window>
  <textbox/>
  <button/>
</window>
```

In addition, the parent-child relationship of the created components
will follow the same hierarchical structure as the XML document. In the
previous example, window will be the parent of textbox and button, while
textbox is the first child and button is the second.

# Special XML Elements

There are a few elements dedicated to special functionality rather than
a component. For example,

```xml
 <zk>...</zk>
```

[The zk element](zuml_ref/ZUML/Elements/zk) is a
special element used to aggregate other components. Unlike a real
component (say, `hbox` or `div`), it is not part of the component tree
being created. In other words, it does not represent any components. For
example,

```xml
 <window>
     <zk if="${whatever}">
         <textbox/>
         <textbox/>
     </zk>
 </window>
```

is equivalent to

```xml
 <window>
     <textbox if="${whatever}"/>
     <textbox if="${whatever}"/>
 </window>
```

For more information about special elements, please refer to [ZUML Reference](zuml_ref/ZUML/Elements).

# An XML Attribute Assigns a Value to a Component's Property or Event Listener

Each attribute, except for special attributes like `if` and `forEach`,
represents a value that should be assigned to a property of a component
after it is created. The attribute name is the property name, while the
attribute value is the value to assign. For example, the following
example assigns `"Hello"` to the window's title property. More
precisely,
[org.zkoss.zul.Window#setTitle(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#setTitle(java.lang.String))
will be called with the argument `"Hello"`.

```xml
<window title="Hello"/>
```

Like JSP, you could use EL for the value of any attributes. The
following example assigns the value of the request parameter called name
to window's title.

```xml
<window title="${param.name}"/>
```

For more information about EL expressions, please refer to [ZUML Reference](zuml_ref/EL_Expressions).

## Assign Event Listener if the Name Starts With `on`

If the attribute name starts with `on` and the third letter is
uppercase, an event listener is assigned. For example, we can register
an event listener to handle the onClick event as follows:

```xml
<button onClick="do_something_in_Java())"/>
```

The attribute value must be a valid Java code, and it will be
interpreted[^1] when the event is received. You could specify different
languages by prefixing the language name. For example, we could write
the event listener in Groovy as follows.

```xml
<vlayout onClick="groovy:self.appendChild(new Label('New'));">
Click me!
</vlayout>
```

> ------------------------------------------------------------------------
>
> <references/>

## Special Attributes

There are a few special attributes dedicated to special functionality
rather than assigning properties or handling events. For example, the
forEach attribute is used to specify a collection of objects such that
the XML element it belongs will be evaluated repeatedly for each object
of the collection.

```xml
<listbox>
    <listitem forEach="${customers}" label="${each.name}"/>
</listbox>
```

For more information about special attributes, please refer to the
[Iterative Evaluation]({{site.baseurl}}/zk_dev_ref/ui_composing/iterative_evaluation)
section and the [ZUML Reference](zuml_ref/ZUML/Attributes)

# An XML Text Represents Label Component or Property's Value

In general, an XML text is interpreted as a label component. For
example,

```xml
<window>
  Begin ${foo.whatever}
</window>
```

is equivalent to

```xml
<window>
  <label value="Begin ${foo.whatever}"/>
</window>
```

## An XML Text as Property's Value

Depending on the component's implementation, the text nested in an XML
element can be interpreted as the value of a component's particular
property. For example, [org.zkoss.zul.Html](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Html.html) is one of
these kinds of components, and

```xml
<html>Begin ${foo.whatever}</html>
```

is equivalent to

```xml
<html content="Begin ${foo.whatever}"/>
```

This is designed to make it easy to specify multiple-line value. This is
usually used by a particular component that requires a multiple-lines
value. For a complete list of components that interpret the XML text as
a property's value, please refer to the [ZUML Reference](zuml_ref/ZUML/Texts).

# An XML Processing Instruction Specifies the Page-wide Information

Each XML processing instruction specifies the instruction on how to
process the XML document. It is called directives in ZK. For example,
the following specifies the page title and style.

```xml
<?page title="Grey background" style="background: grey"?>
```

Notice that there should be *no* whitespace between the question mark
and the processing instruction's name (i.e., page in the above example).

The other directives include the declaration of components, the class
for initializing a page, the variable resolver for EL expressions, and
so on. For more information about directives, please refer to [ZUML Reference](zuml_ref/ZUML/Processing_Instructions).

[^1]: ZK uses [BeanShell](http://www.beanshell.org) to interpret it at
    run time
