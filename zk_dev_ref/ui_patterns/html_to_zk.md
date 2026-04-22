# Overview

An existing HTML page (along with its resources and styles) can easily be converted into a ZK page using the following methods. This enables a developer to reuse a already functional page and add ZK's component and behaviors with minimal effort.

The [native namespace](/zk_dev_ref/ui_patterns/The_native_Namespace) and [XHTML namespace](/zk_dev_ref/ui_patterns/the_xhtml_component_set) can be used to render pure HTML content while maintaining the page structure.

## namespace declaration

Using [xmlns declarations](zuml_ref/languages.html), multiple namespace can be declared for a given page.
When declaring multiple namespaces, each language is assigned to a prefix.
A xmlns declaration replaces the previous namespace for that prefix for the element and its descendants.
In addition, an empty prefix replaces the namespace for non-prefixed elements in the page.

| Useful namespaces | namespace url | notes |
|-|-|-|
| [zuml](zk_dev_ref/ui_composing/zuml) | http://www.zkoss.org/2005/zul | Used to declare ZK components |
| [xhtml](zk_dev_ref/ui_patterns/the_xhtml_component_set) | http://www.w3.org/1999/xhtml | Used to declare ZK XHTML components |
| [native](zk_dev_ref/ui_patterns/the_native_namespace) | http://www.zkoss.org/2005/zk/native | Used to declare native HTML tags |

In this example, we map the zul namespace without a prefix, xhtml to x, and native to n

```xml
<window xmlns="http://www.zkoss.org/2005/zul" xmlns:x="http://www.w3.org/1999/xhtml" xmlns:n="http://www.zkoss.org/2005/zk/native"  >
    <div>this is a zul div</div>
    <x:div>this is a xhtml div</x:div>
    <n:div>this is a native html div</n:div>
...
```
## using native html, xhtml or zul namespace to import an existing layout

The native namespace can be used to render html layouts directly to the client directly. This doesn't create an associated ZK component. The result is lightweight, but cannot be updated or listen to client-side events from serverside.

The xhtml namespace contains a [set of ZK components](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/package-summary.html) directly representing a selection of HTML tags. They can be manipulated in Java from server-side, like regular zul component, and are able to send events directly to the server.

The zul namespace contains ZK automated components. For the most part, these components are not direct 1-to-1 representations of an HTML tag. A ZK textbox renders an HTML text input, and contains more behaviors and features defined in the ZK component. More complex components such as Listbox will create their own multi-tag layouts inside of the page.

When importing an exiting HTML layout as a ZK page, the first choice to make is to decide the "main" namespace of the page.

The two samples below are entirely identical in output:
5 div components from the zul namespace, followed by one div tag from the native HTML namespace

```xml
<window xmlns="http://www.zkoss.org/2005/zul" xmlns:n="http://www.zkoss.org/2005/zk/native">
    <div>this is a zul div</div>
    <div>this is a zul div</div>
    <div>this is a zul div</div>
    <div>this is a zul div</div>
    <div>this is a zul div</div>
    <n:div>this is a native html div</n:div>
...
```

```xml
<z:window xmlns="http://www.zkoss.org/2005/zk/native" z:xmlns="http://www.zkoss.org/2005/zul">
    <z:div>this is a zul div</z:div>
    <z:div>this is a zul div</z:div>
    <z:div>this is a zul div</z:div>
    <z:div>this is a zul div</z:div> 
    <z:div>this is a zul div</z:div>
    <div>this is a native html div</div>
...
```

In this case, since the final layout contains mostly zul components, declaring this namespace as the default namespace for the page is more convenient.
In contrast, if you want to entirely preserve an existing layout but only occasionally add a zul component, you could consider using native as the default namespace, and only prefixing the zul components.

## embedding HTML content in a ZK page

It is possible to render an HTML insert in a zul page simply by using [the HTML component](zk_dev_ref/ui_patterns/the_html_component)

See its own documentation entry for further information.

Code samples for these patterns are available [on github](https://github.com/zkoss/zkbooks/tree/master/developersreference/developersreference/src/main/webapp/uiPattern/zulFromHtml).