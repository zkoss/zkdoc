Similar to
[Listbox]({{site.baseurl}}/zk_dev_ref/mvc/view/template/listbox_template),
you can render a searchbox with a template. However, notice that, unlike
other components, searchbox doesn't allow any child component, so you
have to render each item as a string, a \<label\> or a \<html\>. For
example,

```xml
<searchbox model="${users}">
    <template name="model">
        Name is ${each}
    </template>
</searchbox>

<searchbox model="${users}">
    <template name="model">
        <label value="Name is ${each}"/>
    </template>
</searchbox>

<searchbox model="${users}">
    <template name="model">
        <html><![CDATA[
        Name is ${each}
        ]]></html>
    </template>
</searchbox>
```

where we assume there is a list model
([org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)) called `users` such as:

```java
ListModelList model = new ListModelList(new String[] { "Tony", "Ryan", "Jumper", "Wing", "Sam" });
```

# Version History

| Version | Date           | Content                                                                            |
|---------|----------------|------------------------------------------------------------------------------------|
| 9.0.0   | September 2019 | [ZK-4380](https://tracker.zkoss.org/browse/ZK-4380): Provide a Searchbox component |
