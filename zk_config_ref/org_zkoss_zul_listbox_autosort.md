**Property:**

`org.zkoss.zul.listbox.autoSort`

Default: `false`  
{% include version-badge.html version=5.0.7 %}

Specifies whether to sort the model when the following cases:

- [org.zkoss.zul.Listbox#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#setModel(ListModel))
  is called and
  [org.zkoss.zul.Listheader#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listheader.html#setSortDirection(String))
  is set.
- [org.zkoss.zul.Listheader#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listheader.html#setSortDirection(String))
  is called.
- Model receives `org.zkoss.zul.event.ListDataEvent`and
  [org.zkoss.zul.Listheader#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listheader.html#setSortDirection(String))
  is set.

If you want to ignore sort when receiving
`org.zkoss.zul.event.ListDataEvent`, you can specify
the value as **ignore.change**.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.autoSort="true"/>
...
```

# Version History

| Version | Date       | Content                                          |
|---------|------------|--------------------------------------------------|
| 5.0.7   | April 2011 | Listbox shall sort model based on current state. |
