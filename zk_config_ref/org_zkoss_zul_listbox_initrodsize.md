---
title: "org.zkoss.zul.listbox.initRodSize"
---

**Property:**

`org.zkoss.zul.listbox.initRodSize`

`Default: 100`

Specifies the number of items rendered when the Listbox first render. It
is used only if live data
([org.zkoss.zul.Listbox#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#setModel(ListModel)))
and not paging
([org.zkoss.zul.Listbox#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#getPagingChild())).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.initRodSize="30"/>
...
```

# Version History

| Version | Date      | Content                                                                                  |
|---------|-----------|------------------------------------------------------------------------------------------|
| 5.0.8   | June 2011 | Add a custom attributes "org.zkoss.zul.listbox.initRodSize" for control ROD render size. |
