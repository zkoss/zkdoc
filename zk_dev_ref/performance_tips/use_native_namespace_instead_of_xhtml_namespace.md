---
title: "Use Native Namespace instead of XHTML Namespace"
---

ZK creates a component (one of the derives of
[org.zkoss.zhtml.AbstractTag](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/AbstractTag.html)) for each XML element
specified with the [XHTML component set](/zuml_ref/xhtml). In other words, ZK
will maintain their states on the server. However, if you won't change
their states dynamically (i.e., after instantiated), you could use the
[native namespace](/zuml_ref/native)
instead.

For example, the following code snippet creates five components (one
[org.zkoss.zhtml.Table](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/Table.html),
[org.zkoss.zhtml.Tr](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/Tr.html),
[org.zkoss.zul.Textbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Textbox.html) and two
[org.zkoss.zhtml.Td](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/Td.html)).

```xml
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

```xml
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

```xml
<n:ul id="x" xmlns:n="native"/>
<button label="add" onClick="new Li().setParent(x)"/>
```

If you have to change them dynamically, you still have to use the [XHTML component set](/zuml_ref/xhtml), or you
could use [org.zkoss.zul.Html](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Html.html) alternatively, if the
HTML tags won't contain any ZUL component.

**Notice** that you could create the native components in Java too. For
more information, please refer to [the native namespace]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_native_namespace)
section.

```java
    HtmlNativeComponent n =
        new HtmlNativeComponent("table", "<tr><td>When:</td><td>", "</td></tr>");
    n.setDynamicProperty("border", "1");
    n.setDynamicProperty("width", "100%");
    n.appendChild(new Datebox());
    parent.appendChild(n);
```


# The Stub-izing of Native Components

By default, a native component will be *stub-ized*, i.e., they will be
replaced with a stateless component called
[org.zkoss.zk.ui.StubComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/StubComponent.html), such that the memory
footprint will be minimized[^2]

Though rarely, you could disable the stubing by setting a component
attribute called `org.zkoss.zk.ui.stub.native` (i.e.,
[org.zkoss.zk.ui.sys.Attributes#STUB_NATIVE](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/Attributes.html#STUB_NATIVE)).
A typical case is that suppose you have a component that has a native
descendant, and you'd like to detach it and re-attach later. Then, you
have to set this attribute to false, since the server does not maintain
the states of stub-ized components (thus, it cannot be restored when
attached back).

```xml
<div>
    <custom-attributes org.zkoss.zk.ui.stub.native="false"/>
    <n:table xmlns:n="native"> <!-- won't be stub-ized -->
...
```

Once set, descendant components unless it was set explicitly.


# Version History

| Version | Date          | Content                                                                                          |
|---------|---------------|--------------------------------------------------------------------------------------------------|
| 5.0.6   | January, 2011 | The attribute called `org.zkoss.zk.ui.stub.native` was introduced to disable the *stub-ization*. |

{{ ZKDevelopersReferencePageFooter}}

[^1]: In fact, it will still create some components for the rerender
    purpose, such as
    [org.zkoss.zk.ui.Component#invalidate()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#invalidate()).
    However, since they shall not be accessed, you could imagine them as
    not created at all.

[^2]: Non-native components could be stub-ized too by use of
    [org.zkoss.zk.ui.Component#setStubonly(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setStubonly(java.lang.String)).
    For more information, please refer
    [here]({{site.baseurl}}/zk_dev_ref/performance_tips/specify_stubonly_for_client_only_components).
