---
title: "A"
---

- **Demonstration:** N/A
- **Java API:** [org.zkoss.zul.A](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/A.html)
- **JavaScript API:** [zul.wgt.A](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.A.html)

# Employment/Purpose

The same as HTML A tag.

## Common Use Cases

### Navigation Link

Use `href` for a plain navigation link.

```xml
<a href="http://www.zkoss.org" label="Visit ZK!"/>
```

### Open in a New Tab

Set `target="_blank"` so the browser opens the URL in a new tab.

```xml
<a href="report.pdf" target="_blank" label="Download Report"/>
```

### File Download via `download` Attribute

Add the HTML `download` attribute via the `c:` client-attribute namespace. This instructs the browser to download the file rather than navigate.

```xml
<zk xmlns:c="client/attribute">
    <a href="report.xls" c:download="" target="_self" label="Download"/>
</zk>
```

### Prevent Double-Click with Autodisable

Use `autodisable="self"` to disable the anchor immediately on click and re-enable it once the server responds. Prefix with `+` to keep it disabled until you enable it manually.

```xml
<a id="submit" label="Submit" autodisable="self"/>
```

# Example

![](/zk_component_ref/images/ZKComRef_A_Examples.PNG)

```xml
<a href="http://www.zkoss.org" label="Visit ZK!"/>
```

In addition, you could add child components to
[org.zkoss.zul.A](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/A.html) too:

```xml
<a href="http://www.zkoss.org" label="Visit ZK!" image="zk.png">
  <grid>
    <rows>
      <row>What ever content</row>
    </rows>
  </grid>
</a>
```

Notice that a child component might also handle the mouse click, so the
final result of clicking on a child component is really up to which
child component is used.

The href attribute can be an URI. For example,

```xml
<a href="/foo" label="Foo" />
<a href="goo" label="Goo" />
```

# Properties

## Dir

**Default Value:** `"normal"`

Controls the layout direction of the label relative to the image. Accepted values are `"normal"` (label after image) and `"reverse"` (label before image). Any other value throws a `WrongValueException`.

| Value | Meaning |
|-------|---------|
| `normal` | Label is placed after (to the right of) the image (default) |
| `reverse` | Label is placed before (to the left of) the image |

```xml
<a label="Download" image="/img/dl.png" dir="reverse"/>
```

## Href

**Default Value:** `null`

The URL the browser navigates to when the user clicks the anchor. If `null`, clicking the anchor fires an `onClick` event to the server instead of navigating. If set, the browser handles navigation directly and no `onClick` event is sent.

```xml
<a href="http://www.zkoss.org" label="Visit ZK!"/>
```

## Target

**Default Value:** `null`

Specifies the name of the browser frame or window in which to open the URL set by `href`. Only meaningful when `href` is also set. Common values include `"_blank"` (new tab), `"_self"` (same tab), `"_parent"`, and `"_top"`.

```xml
<a href="report.pdf" target="_blank" label="Download Report"/>
```

## Autodisable

{% include supported-since.html version="7.0.2" %}

[org.zkoss.zul.A#setAutodisable(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/A.html#setAutodisable(java.lang.String))
is used to disable an anchor automatically, when it is clicked. It is
useful to prevent the user from clicking it twice (and firing redundant
requests), which is common if the request takes long to serve.

The simplest use is to specify it with `self` as follows. Then, the
anchor is disabled when it is clicked.

```xml
<a id="ok" label="OK" autodisable="self" />
```

If you'd like to disable several anchors, you could specify all of them
in this property by separating with a comma. For example, the following
disables both anchors, when one of them is clicked.

```xml
<a id="ok" label="OK" autodisable="ok,cancel" />
<a id="cancel" label="Cancel" autodisable="ok,cancel" />
```

The anchor will be enabled automatically, after the request has been
served (i.e., the response has been sent back to the client). If you
prefer to enable them manually (i.e., by calling
[org.zkoss.zul.A#setDisabled(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/A.html#setDisabled(boolean))
explicitly), you could prefix the ID with a plus (`+`). For example,

```xml
<a id="ok" label="OK" autodisable="+self, +cancel" />
```

Then, you could enable them manually under the situation depending on
your application's requirement, such as

```java
if (something_happens) {
   ok.setDisabled(false);
   cancel.setDisabled(false);
}
```

### Enable Autodisable for All Anchors

As described in [ZK Developer's Reference:Customization]({{site.baseurl}}/zk_dev_ref/customization/component_properties),
you could customize ZK to enable `autodisable` for all anchors by
specifying the following in the custom language addon:

```xml
<language-addon>
    <language-name>xul/html</language-name>
    <component>
        <component-name>a</component-name>
        <extends>a</extends>
        <property>
            <property-name>autodisable</property-name>
            <property-value>self</property-value>
        </property>
    </component>
</language-addon>
```

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| `onFocus` | [`Event`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes when a component gets the focus. Sent when the anchor receives keyboard focus. |
| `onBlur` | [`Event`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes when a component loses the focus. Sent when the anchor loses keyboard focus. |

- Inherited Supported Events: [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Children

`*ALL`
