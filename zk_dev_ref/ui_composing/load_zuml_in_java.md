

# Overview

[org.zkoss.zk.ui.Execution](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html) provides a collection of
methods to allow you to create components based on a ZUML document, such
as
[org.zkoss.zk.ui.Execution#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)),
[org.zkoss.zk.ui.Execution#createComponentsDirectly(java.lang.String, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponentsDirectly(java.lang.String, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))
and many others. In addition,
[org.zkoss.zk.ui.Executions](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html) provides a similar
collection of shortcuts so that you do not have to retrieve the current
execution first.

For example,

```java
public class Controller extends SelectorComposer {
    @Wire
    private Window main; //assumed wired automatically
    @Listen(onClick = #main)
    public void createListbox() {
        Executions.createComponentsDirectly(
           "<listbox><listitem label=\"foo\"/></listbox>", "zul", this, null);
    }
...
```

# Create from URI

There are several ways to create components based on a ZUML document.
One of the most common approaches is to create components from a URI.

```java
Map arg = new HashMap();
arg.put("myKey", someValue);
Executions.createComponents("/foo/my.zul", parent, arg); //attach to page as root if parent is null
```

where `parent` (an instance of
[org.zkoss.zk.ui.Component](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html)) will become the parent of
the components specified in the ZUML document. If `parent` is null, the
components specified in the ZUML documents will become the root
components of the current page. In other words, the components created
by
[org.zkoss.zk.ui.Execution#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))
will be attached to the current page.

## The arg Object

The `Map` passed to the `createComponents()` can be accessed on the page
being created by use of [the arg object](zuml_ref/el_expressions/implicit_objects/arg).
For example,

```xml
<button label="Submit" if="${arg.myKey}"/>
```

or

```java
Executions.getCurrent().getArg().get("myKey");
```

## Create Components Not Attached to Any Pages

If you want to create components that will not be attached to a page,
you could use
[org.zkoss.zk.ui.Execution#createComponents(java.lang.String, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, java.util.Map)).
It is useful if you want to maintain a cache of components or implement
a utility.

For example:

```java
Map arg = new HashMap();
arg.put("someName", someValue);
Component[] comps = Executions.getCurrent().createComponents("/foo/my.zul", arg); //won't be attached to a page
cache.put("pool", comps); //you can store and use them later since they are not (yet) attached to any pages
```

## Create Components in Working Thread

With
[org.zkoss.zk.ui.Executions#createComponents(org.zkoss.zk.ui.WebApp, java.lang.String, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents(org.zkoss.zk.ui.WebApp, java.lang.String, java.util.Map)),
you could create components in a working thread without execution[^1],
though it is rare.

Of course, the components being created by
[org.zkoss.zk.ui.Executions#createComponents(org.zkoss.zk.ui.WebApp, java.lang.String, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents(org.zkoss.zk.ui.WebApp, java.lang.String, java.util.Map))
will not be attached to any pages. You have to attach them manually, if
you want to show them to the client.

> ------------------------------------------------------------------------
>
> <references/>

# Create from Content Directly

If the ZUML document is a resource of Web application (i.e., not
accessible through ServletContext), you could use one of the
`createComponentsDirectly` methods. For example, you could read the
content into a string from database and pass it to
[org.zkoss.zk.ui.Execution#createComponentsDirectly(java.lang.String, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponentsDirectly(java.lang.String, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)).
Or, you could represent the content as a reader (say, representing BLOB
in database) and then pass it to
[org.zkoss.zk.ui.Execution#createComponentsDirectly(java.io.Reader, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponentsDirectly(java.io.Reader, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))

For example, suppose we want to create a component from a remote site.
Then, we could represent the resource as a URL and do as follows.

```xml
public void loadFromWeb(java.net.URL src, Component parent) {
    Executions.createComponentsDirectly(
        new java.io.InputStreamReader(src.openStream(), "UTF-8"), parent, null);
}
```

# Create from Page Definition

When creating components from the URI (such as
[org.zkoss.zk.ui.Execution#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))),
ZK Loader will cache the parsed result and reuse it to speed up the
rendering.

However, if you create components from the content directly (such as
[org.zkoss.zk.ui.Execution#createComponentsDirectly(java.lang.String, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponentsDirectly(java.lang.String, java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))),
there is no way to cache the parsed result. In other words, the ZUML
content will be parsed each time `createComponentsDirectly` is called.

It is OK if the invocation does not happen frequently. However, if you
want to improve the performance, you could parse the content into
[org.zkoss.zk.ui.metainfo.PageDefinition](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/PageDefinition.html) by using
[org.zkoss.zk.ui.Executions#getPageDefinitionDirectly(org.zkoss.zk.ui.WebApp, java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#getPageDefinitionDirectly(org.zkoss.zk.ui.WebApp, java.lang.String, java.lang.String)),
cache it, and then invoke
[org.zkoss.zk.ui.Executions#createComponents(org.zkoss.zk.ui.metainfo.PageDefinition, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents(org.zkoss.zk.ui.metainfo.PageDefinition, org.zkoss.zk.ui.Component, java.util.Map))
to create them repeatedly.

[org.zkoss.zk.ui.metainfo.PageDefinition](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/PageDefinition.html) is a Java
object representing a ZUML document. It is designed to allow ZK Loader
to interpret even more efficiently. Unfortunately, it is not
serializable, so you can not store it into database or other persistent
storage. You could serialize or marshal the original content (i.e., ZUML
document) if required.

# Notices

There are a few notices worth to know.

## No Page Created

When creating components from a ZUML document as described above, no
page ([org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html)) is created. Components
are attached to the current page, to a component, or simply standalone.
Since no page is created, there are a few differences than visiting a
ZUML document directly[^2].

1.  The
    [\<?page?\>](zuml_ref/zuml/processing_instructions/page),
    [\<?script?\>](zuml_ref/zuml/processing_instructions/script),
    [\<?link?\>](zuml_ref/zuml/processing_instructions/link),
    [\<?header?\>](zuml_ref/zuml/processing_instructions/header)
    and other directives controlling a page
    ([org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html)) have no function. It means
    that you could not change the page's title, add JavaScript code, or
    add CSS with these directives in a ZUML document loaded in this way.
2.  On the other hand, when
    [\<?function-mapper?\>](zuml_ref/zuml/processing_instructions/function-mapper),
    [\<?variable-resolver?\>](zuml_ref/zuml/processing_instructions/variable-resolver)
    and
    [\<?component?\>](zuml_ref/zuml/processing_instructions/component)
    work correctly, they decide how a ZUML document is parsed rather
    than how the current page ([org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html))
    should be.
3.  The variables, functions and classes defined in zscript will be
    stored in the interpreter of the current page
    ([org.zkoss.zk.ui.Page#getInterpreter(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html#getInterpreter(java.lang.String))).
    - If
      [org.zkoss.zk.ui.Execution#createComponents(java.lang.String, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, java.util.Map)),
      [org.zkoss.zk.ui.Executions#createComponents(org.zkoss.zk.ui.WebApp, java.lang.String, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents(org.zkoss.zk.ui.WebApp, java.lang.String, java.util.Map))
      or similar is used to create components not attached to any page,
      the variables, functions and classes defined in the ZUML document
      will be lost. Thus, it is *not* a good idea to use zscript in this
      case.

> ------------------------------------------------------------------------
>
> <references/>

[^1]: It means
    [org.zkoss.zk.ui.Executions#getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#getCurrent())
    returns null. For example, it happens when the application starts,
    or in a working thread.

[^2]: Don't confuse a ZUML page with
    [org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html). The former refers to a file
    containing a ZUML document. The latter is a Java object of
    [org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html) that represents [a portion of a desktop]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui#Desktop.2C_Page_and_Component).
