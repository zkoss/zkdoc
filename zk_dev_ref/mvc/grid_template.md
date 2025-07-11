Similar to
[Listbox]({{site.baseurl}}/zk_dev_ref/mvc/listbox_template),
you can define a customer rendering with a template for a grid:

```xml
<grid model="${books}">
    <columns>
        <column label="ISBN" sort="auto"/>
        <column label="Name" sort="auto"/>
        <column label="Description"/>
    </columns>
    <template name="model">
        <row>
            <label value="${each.isbn}"/>
            <label value="${each.name}"/>
            <label value="${each.description}"/>
        </row>
    </template>
</grid>
```

where `books` is assumed as an instance of
[org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html) that
contains a list of the Book instances while each Book instance has at
least three getter methods: `getIsbn`, `getName` and `getDescription`.

Notice that the template named `model` must be associated with the grid,
i.e., it must be a direct child element of the grid element as shown
above. A common mistake is to put it under the rows element. Remember
the template is a ZUML fragment telling the grid how to render a row,
and the template itself is not a component.

# Template for GroupsModel

When used with
[org.zkoss.zul.GroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModel.html), grids
will use the template called `model:grouping` for rendering the grouping
object. If it is not defined, it will look for the template called
`model` instead (i.e., the same template is used for rendering the
grouping and non-grouping objects).

```xml
<grid mode="${fooGroupsModel}">
   <template name="model:group">
      <group open="${groupingInfo.open}">....</group>
   </template>
   <template name="model">
      <row>....</row>
   </template>
   <template name="model:groupfoot">
      <groupfoot>....</groupfoot>
   </template>
<grid>
```

- Note the *groupingInfo* is used to get the information of the grouping
  data. Please refer to
  [org.zkoss.zul.ext.GroupingInfo](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/GroupingInfo.html).

# Version History

| Version | Date         | Content                                    |
|---------|--------------|--------------------------------------------|
| 6.0.0   | July 2011    | The template feature was introduced.       |
| 6.0.0   | January 2012 | The GroupingInfo statement was introduced. |
