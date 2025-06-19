 Communicating among pages in the same desktop is
straightforward. First, you can use attributes to share data. Second,
you can use events to notify each other.

# Identify a Page

To communicate among pages, we have to assign an identifier to the
target page. In ZUML, it is done by the use of [the page directive](ZUML_Reference/ZUML/Processing_Instructions/page):

```xml
<?page id=" foo"?>
<window id="main"/>
```

Then we could retrieve it by use of
<javadoc method="getPage(java.lang.String)" type="interface">org.zkoss.zk.ui.Desktop</javadoc>
or by use of a utility class called
[org.zkoss.zk.ui.Path](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Path.html). For example, the following
statements could access the *main* window above:

```java
comp.getDesktop().getPage("foo").getFellow("main");
Path.getComponent("//foo/main");
```

As shown,
<javadoc method="getComponent(java.lang.String)">org.zkoss.zk.ui.Path</javadoc>
considers an ID starting with double slashes as a page's ID.

# Use Attributes

Each component, page, desktop, session and Web application has an
independent map of attributes. It is a good place to share data among
components, pages, desktops and even sessions.

In Java , you could use "setAttribute()","removeAttribute()" and
"getAttribute()" of
<javadoc type="interface">org.zkoss.zk.ui.Component</javadoc>,
<javadoc type="interface">org.zkoss.zk.ui.Page</javadoc> and so on to
share data. Another way is using the scope argument to identify which
scope you want to access. (In the following example, assuming comp is a
component.)

```java
 comp.setAttribute("some","anyObject");
 comp.getAttribute("some", comp.DESKTOP_SCOPE);
 comp.getDesktop().getAttribute("some"); //is equivalent to previous line
```

In `zscript` and EL expressions, you could use the [implicit objects](ZUML_Reference/EL_Expressions/Implicit_Objects):
`componentScope`, `pageScope`, `desktopScope`,
`sessionScope, requestScope` and `applicationScope`.

```xml
<window>
    <zscript><![CDATA[
        desktop.setAttribute("some","anyObject");
        desktopScope.get("some");
    ]]></zscript>
    1:${desktopScope["some"]}
</window>
```

# Post and Send Events

You could communicate among pages in the same desktop. The way to
communicate is to use the
<javadoc method="postEvent(org.zkoss.zk.ui.event.Event)">org.zkoss.zk.ui.event.Events</javadoc>
or
<javadoc method="sendEvent(org.zkoss.zk.ui.event.Event)">org.zkoss.zk.ui.event.Events</javadoc>
to notify a component in the target page.

For example,

```java
 Events.postEvent(new Event("SomethingHappens",
     comp.getDesktop().getPage("foo").getFellow("main"));
```

You can also pass the data with the event object. The third parameter in
<javadoc method="postEvent(org.zkoss.zk.ui.event.Event)">org.zkoss.zk.ui.event.Events</javadoc>
will be put into
<javadoc method="getData()">org.zkoss.zk.ui.event.Event</javadoc>. You
could pass the data you want with it.

```java
Events.postEvent("onTest", target, "this will be send");    
```
