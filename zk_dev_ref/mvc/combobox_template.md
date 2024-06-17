Similar to
[Listbox](ZK_Developer's_Reference/MVC/View/Template/Listbox_Template),
you can render a combobox with a template:

``` xml
<combobox model="${infos}">
    <template name="model">
        <comboitem label="${each[0]}: ${each[1]}"/>
    </template>
</combobox>
```

where we assume there is a list model
(<javadoc>org.zkoss.zul.ListModel</javadoc>) called `infos` such as:

``` java
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
