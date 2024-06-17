# Span

- **Java API:** [org.zkoss.zul.Span](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Span.html)
- **JavaScript API:** [zul.wgt.Span](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Span.html)

## Employment/Purpose

The `Span` component in ZK is a lightweight container used for grouping child components. It is typically utilized for purposes such as assigning CSS styles or creating more complex layouts within ZK applications. Conceptually, the `Span` component functions similarly to HTML's SPAN tag. Notably, content placed within a `Span` is displayed inline with other sibling elements, without introducing line breaks between them.

## Example

The example illustrates the usage of the `Span` component in a ZK application. Within the `Span` container, a label "Name:" is followed by a textbox input field.

![Span Component Example](ZKComRef_Span_Example.png)

```xml
<span>
    Name:
    <textbox />
</span>
```

Try it

* [Span Example](https://zkfiddle.org/sample/1lopfso/1-ZK-Component-Reference-Span-Example?v=latest&t=Iceblue%20Compact)


## Supported Children

`*ALL`: The `Span` component is a container component that can hold various kinds of components. It allows you to add any kind of component as its child.
