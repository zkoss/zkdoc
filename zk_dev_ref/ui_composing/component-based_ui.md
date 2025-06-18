# Overview

Each UI object is represented by a component
(<javadoc type="interface">org.zkoss.zk.ui.Component</javadoc>). Thus,
composing an UI object is like assembling components. To alter UI one
has to modify the states and relationships of components.

For example, as shown below, we declared a
<javadoc>org.zkoss.zul.Window</javadoc> component, enabling the border
property to normal and setting its width to a definite 250 pixels.
Enclosed in the <javadoc>org.zkoss.zul.Window</javadoc> component are
two <javadoc>org.zkoss.zul.Button</javadoc> components.

![]({{site.baseurl}}/zk_dev_ref/images/zkessentials_intro_hello.png)

As shown above, there are two ways to declare UI: XML-based approach and
pure-Java approach. You can mix them if you like.

# Forest of Trees of Components

Like in a tree structure, a component has at most one parent, while it
might have multiple children.

Some components accept only certain types of components as children.
Some do not allow to have any children at all. For example,
<javadoc>org.zkoss.zul.Grid</javadoc> in XUL accepts
<javadoc>org.zkoss.zul.Columns</javadoc> and
<javadoc>org.zkoss.zul.Rows</javadoc> as children only.

A component without any parents is called a **root component**. Each
page is allowed to have multiple root components, even though this does
not happen very often.

Notice that if you are using ZUML, there is an XML limitation, which
means that only one document root is allowed. To specify multiple roots,
you have to enclose the root components with the `zk` tag. `zk` tag is a
special tag that does not create components. For example,

```xml
<zk>
    <window/> <!-- the first root component -->
    <div/> <!-- the second root component -->
</zk>
```

## getChildren()

Most of the collections returned by a component, such as
<javadoc method="getChildren()" type="interface">org.zkoss.zk.ui.Component</javadoc>,
are live structures. It means that you can add, remove or clear a child
by manipulating the returned list directly. For example, to detach all
children, you could do it in one statement:

```xml
comp.getChildren().clear();
```

It is equivalent to

```xml
for (Iterator it = comp.getChildren().iterator(); it.hasNext();) {
    it.next();
    it.remove();
}
```

Note that the following code will never work because it would cause
ConcurrentModificationException.

```xml
for (Iterator it = comp.getChildren().iterator(); it.hasNext();)
    ((Component)it.next()).detach();
```

## Sorting the children

The following statement will fail for sure because the list is live and
a component will be detached first before we move it to different
location.

```java
Collections.sort(comp.getChildren());
```

More precisely, a component has at most one parent and it has only one
spot in the list of children. It means, the list is actually a set (no
duplicate elements allowed). On the other hand, `Collections.sort()`
cannot handle a set correctly.

Thus, we have to copy the list to another list or array and then sort
it.
<javadoc method="sort(java.util.List, java.util.Comparator)">org.zkoss.zk.ui.Components</javadoc>
is a utility to simplify the job.

# Desktop, Page and Component

A page (<javadoc type="interface">org.zkoss.zk.ui.Page</javadoc>) is a
collection of components. It represents a portion of the browser window.
Only components attached to a page are available at the client. They are
removed when they are detached from a page.

A desktop (<javadoc type="interface">org.zkoss.zk.ui.Desktop</javadoc>)
is a collection of pages. It represents a browser window (a tab or a
frame of the browser)[^1]. You might image a desktop representing an
independent HTTP request.

![]({{site.baseurl}}/zk_dev_ref/images/zkessentials_intro_multipage.png)

A desktop is also a logic scope that an application can access in a
request. Each time a request is sent from the client, it is associated
with the desktop it belongs. The request is passed to \<javadoc
method="service(org.zkoss.zk.au.AuRequest, boolean)"
type="interface\>org.zkoss.zk.ui.sys.DesktopCtrl</javadoc> and then
forwarded to
<javadoc method="service(org.zkoss.zk.au.AuRequest, boolean)">org.zkoss.zk.ui.sys.ComponentCtrl</javadoc>.
This also means that the application can not access components in
multiple desktops at the same time.

Both a desktop and a page can be created automatically when ZK Loader
loads a ZUML page or calls a richlet
(<javadoc type="interface" method="service(org.zkoss.zk.ui.Page)">org.zkoss.zk.ui.Richlet</javadoc>).
The second page is created when the
<javadoc>org.zkoss.zul.Include</javadoc> component includes another page
with the defer mode. For example, two pages will be created if the
following is visited:

```xml
<!-- the main page -->
<window>
  <include src="another.zul" mode="defer"/> <!-- creates another page -->
</window>
```

Notice that if the mode is not specified (i.e., the instant mode),
<javadoc>org.zkoss.zul.Include</javadoc> will not be able to create a
new page. Rather, it will append all components created by `another.zul`
as its own child components. For example,

```xml
<window>
  <include src="another.zul"/> <!-- default: instant mode -->
</window>
```

is equivalent to the following (except div is not a space owner, see
below)

```xml
<window>
  <div>
    <zscript>
      execution.createComponents("another.zul", self, null);
    </zscript>
  </div>
</window>
```

> ------------------------------------------------------------------------
>
> <references/>

## Attach a Component to a Page

A component is available at the client only if it is attached to a page.
For example, the window created below will not be available at the
client.

```java
Window win = new Window();
win.appendChild(new Label("foo"));
```

A component is a POJO object. If you do not have any reference to it, it
will be recycled when JVM starts [garbage
collection](http://en.wikipedia.org/wiki/Garbage_collection_%28computer_science%29).

There are two ways to attach a component to a page:

1.  Append it as a child of another component that is already attached
    to a page
    (<javadoc method="appendChild(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.Component</javadoc>,
    <javadoc method="insertBefore(org.zkoss.zk.ui.Component, org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.Component</javadoc>,
    or
    <javadoc method="setParent(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.Component</javadoc>).
2.  Invoke
    <javadoc method="setPage(org.zkoss.zk.ui.Page)" type="interface">org.zkoss.zk.ui.Component</javadoc>
    to attach it to a page directly. It is also another way to make a
    component become a root component.

Since a component can have at most one parent and be attached at most
one page, it will be detached automatically from the previous parent or
page when it is attached to another component or page. For example, `b`
will be a child of `win2` and `win1` has no child at the end.

```xml
Window win1 = new Window;
Button b = new Button();
win1.appendChild(b);
win2.appendChild(b); //implies detach b from win1
```

## Detach a Component from a Page

To detach a Component from the page, you can either invoke
`comp.setParent(null)` if it is not a root component or
`comp.setPage(null)` if it is a root component.
<javadoc method="detach()" type="interface">org.zkoss.zk.zk.ui.Component</javadoc>
is a shortcut to detach a component without knowing if it is a root
component.

## Invalidate a Component

When a component is attached to a page, the component and all of its
descendants will be rendered. On the other hand, when a state of an
attached component is changed, only the changed state is sent to client
for update (for better performance). Very rare, you might need to invoke
<javadoc method="invalidate()" type="interface">org.zkoss.zk.ui.Component</javadoc>
to force the component and its descendants to be rerendered[^2].

There are only a few reasons to invalidate a component, but it is still
worthwhile to note them down:

1.  If you add more than 20 child components, you could invalidate the
    parent to improve the performance. Though the result Ajax response
    might be longer, the browser will be more effective in replacing a
    DOM tree rather than adding DOM elements.
2.  If a component has a bug that does not update the DOM tree
    correctly, you could invalidate its parent to resolve the
    problem[^3].

> ------------------------------------------------------------------------
>
> <references/>

## Don't Cache Components Attached to a Page in Static Fields

As described above, a desktop is a logical scope which can be accessed
by the application when serving a request. In other words, the
application cannot detach a component from one desktop to another
desktop. This typically happens when you cache a component accidentally.

For example, the following code will cause an exception if it is loaded
multiple times.

```xml
<window apply="foo.Foo"/> <!-- cause foo.Foo to be instantiated and executed -->
```

and `foo.Foo` is defined as follows[^4].

```java
package foo;
import org.zkoss.zk.ui.*;
import org.zkoss.zul.*;

public class Foo implements org.zkoss.zk.ui.util.Composer {
   private static Window main; //WRONG! don't cache it in a static field
   public void doAfterCompose(Component comp) {
       if (main == null)
           main = new Window();
       comp.appendChild(main);
   }
}
```

The exception is similar to the following:

```text
org.zkoss.zk.ui.UiException: The parent and child must be in the same desktop: <Window u1EP0>
    org.zkoss.zk.ui.AbstractComponent.checkParentChild(AbstractComponent.java:1057)
    org.zkoss.zk.ui.AbstractComponent.insertBefore(AbstractComponent.java:1074)
    org.zkoss.zul.Window.insertBefore(Window.java:833)
    org.zkoss.zk.ui.AbstractComponent.appendChild(AbstractComponent.java:1232)
    foo.Foo.doAfterCompose(Foo.java:10)
```

> ------------------------------------------------------------------------
>
> <references/>

# Component Cloning

All components are cloneable (java.lang.Cloneable). It is simple to
replicate components by invoking
<javadoc method="clone()" type="interface">org.zkoss.zk.ui.Component</javadoc>.

```java
main.appendChild(listbox.clone());
```

**Notice**

- It is a *deep clone*. That is, all children and descendants are cloned
  too.
- The component returned by
  <javadoc method="clone()" type="interface">org.zkoss.zk.ui.Component</javadoc>
  does not belong to any pages. It doesn't have a parent either. You
  have to attach it manually if necessary.
- ID, if any, is preserved. Thus, you *cannot* attach the returned
  component to the same ID space without modifying ID if there is any.

Similarly, all components are serializable (java.io.Serializable). Like
cloning, all children and descendants are serialized. If you serialize a
component and then de-serialize it back, the result will be the same as
invoking
<javadoc method="clone()" type="interface">org.zkoss.zk.ui.Component</javadoc>[^5].

> ------------------------------------------------------------------------
>
> <references/>

[^1]: Under portal environment, there might be multiple desktops in one
    browser window. However, it is really important in the developer's
    viewpoint.

[^2]: ZK Update Engine will queue the *update* and *invalidate*
    commands, and then optimize them before sending them back to the
    client (for better performance)

[^3]: Of course, remember to let us know and we will fix it in the
    upcoming version.

[^4]: A composer
    (<javadoc type="interface">org.zkoss.zk.ui.util.Composer</javadoc>)
    is a controller that can be associated with a component for handling
    the UI in Java. For the information, please refer to [the Composer
    section]({{site.baseurl}}/zk_dev_ref/mvc/controller/composer).

[^5]: Of course, the performance of
    <javadoc method="clone()" type="interface">org.zkoss.zk.ui.Component</javadoc>
    is much better.
