ZK creates a component (one of the derives of
<javadoc>org.zkoss.zhtml.AbstractTag</javadoc>) for each XML element
specified with the [XHTML component
set](ZUML_Reference/ZUML/Languages/XHTML). In other words, ZK
will maintain their states on the server. However, if you won't change
their states dynamically (i.e., after instantiated), you could use the
[native namespace](ZUML_Reference/ZUML/Namespaces/Native)
instead.

For example, the following code snippet creates five components (one
<javadoc>org.zkoss.zhtml.Table</javadoc>,
<javadoc>org.zkoss.zhtml.Tr</javadoc>,
<javadoc>org.zkoss.zul.Textbox</javadoc> and two
<javadoc>org.zkoss.zhtml.Td</javadoc>).

``` xml
<h:table xmlns:h="xhtml">
    <h:tr>
        <h:td>Name</h:td>
        <h:td>
        <textbox/>
        </h:td>
    </h:tr>
</h:table>
```

On the other hand, the following code snippet won't create components
for any elements specified with the native space (with prefix `n:`)[^1].

``` xml
<n:table xmlns:n="native">
    <n:tr>
        <n:td>Name</n:td>
        <n:td>
        <textbox/>
        </n:td>
    </n:tr>
</n:table>
```

Notice that `table`, `tr` and `td` are generated directly to the client,
so they have no counterpart at the server. You cannot change their
states dynamically. For example, the following code snippet is
incorrect.

``` xml
<n:ul id="x" xmlns:n="native"/>
<button label="add" onClick="new Li().setParent(x)"/>
```

If you have to change them dynamically, you still have to use the [XHTML
component set](ZUML_Reference/ZUML/Languages/XHTML), or you
could use <javadoc>org.zkoss.zul.Html</javadoc> alternatively, if the
HTML tags won't contain any ZUL component.

**Notice** that you could create the native components in Java too. For
more information, please refer to [the native
namespace](ZK_Developer's_Reference/UI_Patterns/HTML_Tags/The_native_Namespace)
section.

``` java
    HtmlNativeComponent n =
        new HtmlNativeComponent("table", "<tr><td>When:</td><td>", "</td></tr>");
    n.setDynamicProperty("border", "1");
    n.setDynamicProperty("width", "100%");
    n.appendChild(new Datebox());
    parent.appendChild(n);
```

> ------------------------------------------------------------------------
>
> <references/>

# The Stub-izing of Native Components

By default, a native component will be *stub-ized*, i.e., they will be
replaced with a stateless component called
<javadoc>org.zkoss.zk.ui.StubComponent</javadoc>, such that the memory
footprint will be minimized[^2]

Though rarely, you could disable the stubing by setting a component
attribute called `org.zkoss.zk.ui.stub.native` (i.e.,
<javadoc method="STUB_NATIVE">org.zkoss.zk.ui.sys.Attributes</javadoc>).
A typical case is that suppose you have a component that has a native
descendant, and you'd like to detach it and re-attach later. Then, you
have to set this attribute to false, since the server does not maintain
the states of stub-ized components (thus, it cannot be restored when
attached back).

``` xml
<div>
    <custom-attributes org.zkoss.zk.ui.stub.native="false"/>
    <n:table xmlns:n="native"> <!-- won't be stub-ized -->
...
```

Once set, descendant components unless it was set explicitly.

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date          | Content                                                                                          |
|---------|---------------|--------------------------------------------------------------------------------------------------|
| 5.0.6   | January, 2011 | The attribute called `org.zkoss.zk.ui.stub.native` was introduced to disable the *stub-ization*. |

{{ ZKDevelopersReferencePageFooter}}

[^1]: In fact, it will still create some components for the rerender
    purpose, such as
    <javadoc method="invalidate()">org.zkoss.zk.ui.Component</javadoc>.
    However, since they shall not be accessed, you could imagine them as
    not created at all.

[^2]: Non-native components could be stub-ized too by use of
    <javadoc method="setStubonly(java.lang.String)" type="interface">org.zkoss.zk.ui.Component</javadoc>.
    For more information, please refer
    [here](ZK_Developer's_Reference/Performance_Tips/Specify_Stubonly_for_Client-only_Components).
