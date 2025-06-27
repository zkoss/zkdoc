Similar to
[Listbox]({{site.baseurl}}/zk_dev_ref/mvc/view/template/listbox_template),
you can render a combobox with a template:

```xml
<combobox model="${infos}">
    <template name="model">
        <comboitem label="${each[0]}: ${each[1]}"/>
    </template>
</combobox>
```

where we assume there is a list model
([org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)) called `infos` such as:

```java
ListModel infos = new ListModelArray(
    new String[][] {
        {"Apple", "10kg"},
        {"Orange", "20kg"},
        {"Mango", "12kg"}
});
```

# Version History

| Version | Date      | Content                              |
|---------|-----------|--------------------------------------|
| 6.0.0   | July 2011 | The template feature was introduced. |
