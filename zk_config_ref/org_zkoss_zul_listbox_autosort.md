**Property:**

`org.zkoss.zul.listbox.autoSort`

`Default: false`  
`[Since 5.0.7]`

Specifies whether to sort the model when the following cases:

- <javadoc method="setModel(ListModel)">org.zkoss.zul.Listbox</javadoc>
  is called and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Listheader</javadoc>
  is set.
- <javadoc method="setSortDirection(String)">org.zkoss.zul.Listheader</javadoc>
  is called.
- Model receives `org.zkoss.zul.event.ListDataEvent`and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Listheader</javadoc>
  is set.

If you want to ignore sort when receiving
`org.zkoss.zul.event.ListDataEvent`, you can specify
the value as **ignore.change**.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.autoSort="true"/>
...
```

# Version History

| Version | Date       | Content                                          |
|---------|------------|--------------------------------------------------|
| 5.0.7   | April 2011 | Listbox shall sort model based on current state. |
