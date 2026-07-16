---
title: "LabelElement"
description: "LabelElement: The LabelElement is an abstract base class for components that render a text label."
---

- **Java API:** [`org.zkoss.zul.impl.LabelElement`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/LabelElement.html)

# Employment/Purpose

The `LabelElement` is an abstract base class for components that render a text label. It provides the foundational `label` property that concrete subclasses use to display text content.

# Properties

This property is inherited by components that extend `LabelElement` (e.g. `<button>`, `<caption>`, `<toolbarbutton>`). The example below uses `<button>` as a representative concrete component.

## Label

The text label displayed by this element. The getter never returns `null`; if no label is set it returns an empty string.

```xml
<button label="Hello World"/>
```

# Supported Children

`*ALL`: Allows encoding any ZK component as its child.
