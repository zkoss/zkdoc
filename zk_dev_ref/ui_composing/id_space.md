# ID Space

It is common to decompose a visual presentation into several subsets or
ZUML pages. For example, you may use a page to display a purchase order,
and a modal dialog to enter the payment term. If all components are
uniquely identifiable in the same desktop, developers have to maintain
the uniqueness of all identifiers for all pages that might be created in
the same desktop. This step can be tedious, if not impossible, for a
sophisticated application.

The concept of ID space is hence introduced to resolve this issue. An ID
space is a subset of components of a desktop. The uniqueness is
guaranteed only in the scope of an ID space. Thus, developers could
maintain the subset of components separately without the need to worry
if there are any conflicts with other subsets.

Window ([org.zkoss.zul.Window](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html)) is a typical component
that is an ID space. All descendant components of a window (including
the window itself) form an independent ID space. Thus, you could use a
window as the topmost component to group components. This way developers
only need to maintain the uniqueness of each subset separately.

By and large, every component can form an ID space as long as it
implements [org.zkoss.zk.ui.IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html).
This type of component is called the space owner of the ID space after
the component is formed. Components in the same ID space are called
"fellows".

When a page implements
[org.zkoss.zk.ui.IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html), it becomes
a space owner. In additions, the macro component and the include
component ([org.zkoss.zul.Include](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Include.html)) can also be space
owners.

Another example is `idspace` ([org.zkoss.zul.Idspace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Idspace.html)).
It derives from `div`, and is the simplest component implementing
[org.zkoss.zk.ui.IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html). If you
don't need any feature of window, you could use `idspace` instead.

You could make a standard component as a space owner by extending it to
implement [org.zkoss.zk.ui.IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html).
For example,

```java
public class IdGrid extends Grid implements IdSpace {
   //no method implementation required
}
```

## Tree of ID Space

If an ID space has a child ID space, the components of the child space
are not part of the parent ID space. But the space owner of the child ID
space will be an exception in this case. For example, if an ID space,
let's say X, is a descendant of another ID space, let's say Y, then
space X's owner is part of space Y. However, the descendants of X is not
a part of space Y.

For example, see the following ZUML page

```xml
<?page id="P"?>
<zk>
    <window id="A">
        <hbox id="B">
            <button id="D" />
        </hbox>
        <window id="C">
            <button id="E" />
        </window>
    </window>
    <hbox id="F">
        <button id="G" />
    </hbox>
</zk>
```

will form ID spaces as follows:

![]({{site.baseurl}}/zk_dev_ref/images/zk_the_id_space.jpg)

As depicted in the figure, there are three spaces: P, A and C. Space P
includes P, A, F and G. Space A includes A, B, C and D. Space C includes
C and E.

Components in the same ID spaces are called fellows. For example, A, B,
C and D are fellows of the same ID space.

## getFellow and getSpaceOwner

The owner of an ID space could be retrieved by
[org.zkoss.zk.ui.Component#getSpaceOwner()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#getSpaceOwner())
and any components in an ID space could be retrieved by
[org.zkoss.zk.ui.Component#getFellow(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#getFellow(java.lang.String)),
if it is assigned with an ID
([org.zkoss.zk.ui.Component#setId(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setId(java.lang.String))).

Notice that the `getFellow` method can be invoked against any components
in the same ID space, not just the space owner. Similarly, the
`getSpaceOwner` method returns the same object for any components in the
same ID space, no matter if it is the space owner or not. In the example
above, if C calls `getSpaceOwner` it will get C itself, if C calls
`getSpaceOwnerOfParent` it will get A.

# Composer and Fellow Auto-wiring

With [ZK Developer's Reference/MVC]({{site.baseurl}}/zk_dev_ref/mvc), you generally
don't need to look up fellows manually. Rather, they could be *wired*
automatically by using the
[auto-wiring]({{site.baseurl}}/zk_dev_ref/mvc/wire_variables)
feature of [a composer]({{site.baseurl}}/zk_dev_ref/mvc/controller). For
example,

```java
public class MyComposer extends SelectorComposer {
    @Wire
    private Textbox input; //will be wired automatically if there is a fellow named input

    public void onOK() {
      Messsagebox.show("You entered " + input.getValue());
    }
    public void onCancel() {
      input.setValue("");
    }
}
```

Then, you could associate this composer to a component by specifying the
apply attribute as shown below.

```xml
<window apply="MyComposer">
    <textbox id="input"/>
</window>
```

Once the ZUML document above is rendered, an instance of MyComposer will
be instantiated, and the `input` member will also be initialized with
the fellow named `input`. This process is called "auto-wiring". For more
information, please refer to the [Wire Components]({{site.baseurl}}/zk_dev_ref/mvc/wire_components)
section.

# Find Component Manually

There are basically two approaches to look for a component: by use of
CSS-like selector and file system-like path. The CSS-like selector is
more powerful and suggested if you're familiar with CSS selectors, while
a filesystem-like path is recommended if you're familiar with the
filesystem's path.

## Selector

[org.zkoss.zk.ui.Component#query(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#query(java.lang.String))
and
[org.zkoss.zk.ui.Component#queryAll(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#queryAll(java.lang.String))
are the methods to look for a component by use of CSS selectors. For
example,

```java
comp.query("#ok"); //look for a component whose ID is ok in the same ID space
comp.query("window #ok"); //look for a window and then look for a component with ID=ok in the window
comp.queryAll("window button"); //look for a window and then look for all buttons in the window
```

[org.zkoss.zk.ui.Component#query(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#query(java.lang.String))
returns the first matched component, or null if not found. On the other
hand,
[org.zkoss.zk.ui.Component#queryAll(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#queryAll(java.lang.String))
returns a list of all matched components.

## Path

ZK provides a utility class called
[org.zkoss.zk.ui.Path](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Path.html) to simplify the location of a
component among ID spaces. The way of using it is similar to
`java.io.File`. For example,

The formal syntax of the paths

```text
/[/]SPACE_OWNER_ID/[SPACE_OWNER_ID...]/FELLOW_ID
```

- The last element is a fellow (component) ID.
- page ID should start with double slash **`//`**

For example:

```java
//Two different ways to get the same component E
Path.getComponent("/A/C/E");//if call Path.getComponent under the same page.
new Path("/A/C", "E").getComponent(); //the same as new Path("/A/C/E").getComponent()

// B and D are fellows in the Id space of A
Path.getComponent("/A/B");  // get B
Path.getComponent("/A/D");  // get D
```

## Different Page

If a component belongs to another page, we can retrieve it by starting
with the page's ID. Notice that double slashes have to be specified in
front of the page's ID.

```java
Path.getComponent("//P/A/C/E");//for page, you have to use // as prefix
```

Notice that the page's ID can be assigned with the use of the page
directive as follows.

```xml
<?page id="foo"?>
<window/>
```

# UUID

A component has another identifier called UUID (Universal Unique ID). It
is assigned automatically when the component is attached to a page. UUID
of a component is unique in the whole desktop (if it is attached).

Application developers rarely need to access it.

In general, UUID is independent of ID. UUID is assigned (generated) automatically by
ZK framework, while ID is assigned by the application developers. However, if a component
implements [org.zkos.zk.ui.ext.RawId](https://www.zkoss.org/javadoc/latest/zk/org/zkos/zk/ui/ext/RawId.html),
ID will become UUID if the application assigns one. Currently, only
components from [ the XHTML component set](zuml_ref/xhtml) implements
[org.zkos.zk.ui.ext.RawId](https://www.zkoss.org/javadoc/latest/zk/org/zkos/zk/ui/ext/RawId.html).

A component's UUID is used by the ZK framework as the primary identifier for the corresponding HTML element in the rendered page. When ZK generates the client-side DOM, each component's root HTML element will have its `id` attribute set to the component's UUID. This ensures that every component can be uniquely referenced and manipulated on the client side, even if multiple components have the same developer-assigned ID within different ID spaces. The UUID is also used internally by ZK for event handling, client-server communication, and to maintain the mapping between server-side components and their client-side representations.

For example, when a `<window>` component is rendered, ZK generates HTML elements where the `id` attributes are based on the component's UUID. The main container div for the window will have its `id` set to the UUID (e.g., `oWqR0`), and related child elements will use the UUID as a prefix (e.g., `oWqR0-cave` for the content area):

```html
<div id="oWqR0" class="z-window z-window-noheader z-window-embedded">
    <div id="oWqR0-cave" class="z-window-content">
    </div>
</div>
```

Here, `oWqR0` is the UUID assigned to the `Window` component. ZK uses this UUID as a base to generate unique `id` attributes for all related DOM elements of the component. This prefixing ensures that all parts of a component's HTML structure are uniquely identifiable and grouped together, which is essential for ZK's client-side operations, event handling, and efficient updates. Even if multiple windows or components exist on the same page, their DOM elements will never conflict because each set is scoped by a unique UUID.

By default, zk generates UUID in a random pattern. But if you want a predictable UUID pattern e.g. for automated testing purpose, please see [Testing Tips](../testing/testing_tips.md)

## FAQ

- **What is the difference between ID and UUID in ZK?**
  - ID: Set by developer, unique within an ID space, used server-side.
  - UUID: Generated by ZK, unique across the desktop, used client-side (DOM/JS).

- **How can I make UUIDs static for testing?**
  - See [Testing Tips](../testing/testing_tips.md) for configuring predictable UUIDs.

- **Why do UUIDs change?**
  - For security and multi-session support. This can be changed for testing.