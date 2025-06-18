# Embed Server-side Script Code

To make it easier to create a dynamic web page, the ZUML document allows
you to embed the script code. Notice that there are two types of script
code: server-side and client-side. How the client-side code can be
embedded is discussed in the [Client-side UI Composing]({{site.baseurl}}/zk_dev_ref/ui_composing/client-side_ui_composing)
and [Client-side Event Listening]({{site.baseurl}}/zk_dev_ref/event_handling/client-side_event_listening)
sections. Here we will discuss how to embed the server-side script code
in a ZUML document.

## Fast Prototyping

Embedding Java code in a ZUML page is a powerful way for fast
prototyping. For example, you can quickly build a prototype UI page to
discuss with business analysts and UI designers. Then, modify it
directly and get feedback immediately without going through drawings and
even recompiling.

## Performance Notice

Notice that the performance of BeanShell is not good and, like any
interpreter, typos can be found only when it is evaluated. For more
information, please refer to [the Performance Tips section]({{site.baseurl}}/zk_dev_ref/performance_tips/use_compiled_java_codes)

# 2 Places to Embed

Depending on the requirement, there are two ways to embed the
server-side script code in a ZUML document: the `zscript` element and
the event handler. The `zscript` element is used to embed the code that
will execute when the page is loaded, while the event handler will
execute when the event is received.

## zscript

First, you could embed the code inside the [zscript element](ZUML_Reference/ZUML/Elements/zscript), such that
they will be evaluated when the page is rendered[^1]. For example,

```xml
<zscript>
//inside is zscript
//you can declare variable, function, and even Java class here.
void foo(String msg) {
    //...
}
comp.addEventListener("onClick",
    new EventListener() {
        public void onEvent(Event event) {
            //...
        }
    });
</zscript>
```

Notice that, by default, the code inside the `zscript` element is Java
but you could also use other languages, such as Groovy. Keep in mind
that it is *interpreted* at run time (by
[Beanshell](https://github.com/beanshell/beanshell)), so typo or syntax
error will be found only when it is interpreted. In addition, it runs on
the server, so it could access any Java libraries. You could even define
variables, methods, and classes with it, and they are visible to EL
expressions on the same page.

### CDATA

The code embedded in the zscript element must be a valid XML text. In
other words, you must encode the special characters well, such as \<
must be replaced with &lt;, & with &amp; and so on. In addition to
encoding individual characters, you can also enclose the whole code with
XML CDATA as follows.

```xml
<zscript><![CDATA[
if (some < another && another < last) //OK since CDATA is used
   doSomething();
]]></zscript>
```

As depicted CDATA is represented with and `]]>`.

> ------------------------------------------------------------------------
>
> <references/>

### Class Declaration

You could define a class declared in a ZUML document, and the class is
accessible only in the page it was defined. For example,

```xml
<?xml version="1.0" encoding="UTF-8"?>
<zk>
<zscript><![CDATA[
public class FooModel extends AbstractTreeModel {
    public FooModel() {
        super("Root");
    }
    public boolean isLeaf(Object node) {
        return getLevel((String)node) >= 4; //at most 4 levels
    }
    public Object getChild(Object parent, int index) {
        return parent + "." + index;
    }
    public int getChildCount(Object parent) {
        return 5; //each node has 5 children
    }
    public int getIndexOfChild(Object parent, Object child) {
        String data = (String)child;
        int i = data.lastIndexOf('.');
        return Integer.parseInt(data.substring(i + 1));
    }
    private int getLevel(String data) {
        for (int i = -1, level = 0;; ++level)
            if ((i = data.indexOf('.', i + 1)) < 0)
                return level;
    }
};
FooModel model = new FooModel();
]]></zscript>
<tree model="${model}">
    <treecols>
        <treecol label="Names"/>
    </treecols>
</tree>
</zk>
```

## Event Handlers

Second, you could put the code inside an event handler, such that it
will execute when the event is received, as depicted below.

```xml
<button onClick='alert("event handler for onXXX inside ZUML is also zscript")'/>
```

Notice that the name of the event must start with `on`, and the third
letter must be an **upper** case. Otherwise, it will be considered as a
property.

Again, the code is Java interpreted at run time and running on the
server. For client-side listening, please refer to the [Client-side Event Listening]({{site.baseurl}}/zk_dev_ref/event_handling/client-side_event_listening)
section.

For the sake of discussion, we call it zscript no matter the code is
embedded in the `zscript` element or in an event handler.

### Attribute

If the code is too complicated, you could specify the event handle in
the [attribute element](ZUML_Reference/ZUML/Elements/attribute). For
example,

```xml
<button label="hi">
    <attribute name="onClick"><![DATA[
    if (anything > best)
        best = anything;
    ]]></attribute>
</button>
```

# Distinguish `zscript` from EL

Keep in mind, [an EL expression]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/el_expressions)
is enclosed by \${ }.

For example, `${self.label}` and `${ok.label}` are both EL expressions
in the following example:

```xml
<window>    
    <button label="ok" id="${self.label}"/>
    ${ok.label}     
</window>
```

On the other hand, in the following example, `alert(self.label)` is not
an EL expression. Rather, it's the zscript code:

```xml
<window>    
    <button label="ok" onClick='alert(self.label)'/>        
</window>
```

You cannot mix the use of EL expressions with zscript:

```xml
<window>    
    <!-- It's wrong, for java don't accept syntax as ${}-->
    <button label="ok" onClick='alert(${self.label})'/>     
</window>
```

Also notice that the evaluation of EL expressions is very fast, so EL
can be used in a production system. On the other hand, [zscript is suggested to use only in prototyping or quick-fix]({{site.baseurl}}/zk_dev_ref/performance_tips/use_compiled_java_codes).

## Variables Defined in zscript Visible to EL

A variable defined in zscript is visible to EL expression, unless it is
a local variable, which will be discussed later.

```xml
<zscript>
Date now = new Date();
</zscript>
${now}
```

# Java Interpreter

The default interpreter is based on
[BeanShell](http://www.beanshell.org). It is a Java Interpreter.

## Scope for Each ID Space

The Java interpreter is a *multi-scope* interpreter. It creates a scope
for each [ID space]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui#ID_Space).
Since ID space is hierarchical, so are the scopes. If a variable cannot
be found in the current ID space, it will go further to parent's ID
space to try to resolve the variable.

For example, in the following example, two logical scopes are created
for window[^2] `A` and `B` respectively. Therefore, `var2` is visible
only to window `B`, while `var1` is visible to both window `A` and `B`.

```xml
<window id="A">
    <zscript>var1 = "abc";</zscript>
    <window id="B">
        <zscript>var2 = "def";</zscript>
    </window>
</window>
```

> ------------------------------------------------------------------------
>
> <references/>

## Declare a Local Variable

If a variable is declared inside a pair of curly braces, it is visible
only to the scope defined by the curly braces. It is called a local
variable. For example,

```xml
<zscript>
void echo() {
   String a_local_variable;
}
</script>
```

Here is another example,

```xml
<window>
    <zscript>
    {
        Date now = new Date(); //local variable
        abc ="def"; //global variable since not defined before and not Class specified
    }
    String first = "first"; //global variable
    </zscript>
    0: ${first}
    1:${abc}
    2:${now}
</window>
```

The result shows: `0:first 1:def 2:` . It is because `now` is a local
variable and it is invisible to EL expressions. On the other hand,
`first` and `abc` are both global variables that are visible to EL
expressions. Notice that `abc` is not declared but assigned directly,
and it causes a global variable to be created.

Please refer to the [Beanshell Documentation](http://beanshell.org/docs.html) and search "scoping" and
"local" for more information.

# Use Other Languages

Currently, zscript supports Java, Groovy, Ruby, JavaScript and Python.
For example,

```xml
<?page zscriptLanguage="Groovy"?>
<window border="normal">
    <vbox id="vb">
        <label id="l" value="Hi"/>
        <button label="change label" onClick="l.value='Hi, Groovy';"/>
        <button label="add label" onClick="new Label('New').setParent(vb);"/>
    </vbox>
    <button label="alert" onClick="alert('Hi, Groovy')"/>
</window>
```

In addition, you could add your own interpreter by implementing
<javadoc type="interface">org.zkoss.zk.scripting.Interpreter</javadoc>.
For more information, please refer to [ZUML Reference](ZUML_Reference/Extensions/zscript).

[^1]: The zscript element has an attribute called
    [deferred](ZUML_Reference/ZUML/Elements/zscript#deferred)
    that could make the evaluation as late as possible

[^2]: Built in id space owner includes
    <javadoc>org.zkoss.zul.Window</javadoc>,
    <javadoc type="interface">org.zkoss.zk.ui.Page</javadoc> and [macro components]({{site.baseurl}}/zk_dev_ref/ui_composing/macro_component).
