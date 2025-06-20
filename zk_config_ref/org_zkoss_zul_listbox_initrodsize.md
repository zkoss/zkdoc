**Property:**

`org.zkoss.zul.listbox.initRodSize`

`Default: 100`

Specifies the number of items rendered when the Listbox first render. It
is used only if live data
(<javadoc method="setModel(ListModel)">org.zkoss.zul.Listbox</javadoc>)
and not paging
(<javadoc method="getPagingChild()">org.zkoss.zul.Listbox</javadoc>).

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
