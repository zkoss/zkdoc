Similar to
[Listbox]({{site.baseurl}}/zk_dev_ref/mvc/view/template/listbox_template),
you can render a selectbox with a template. However, notice that, unlike
other components, selectbox doesn't allow any child component, so you
have to render each item as a string. For example,

```xml
<selectbox model="${users}" onSelect='alert(model.get(event.getData()));'>
    <template name="model">
        Name is ${each}
    </template>
</selectbox>
```

where we assume there is a list model
([org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)) called `users` such as:

```java
ListModelList model = new ListModelList(new String[] { "Tony", "Ryan", "Jumper", "Wing", "Sam" });
```

# Version History

| Version | Date          | Content                                 |
|---------|---------------|-----------------------------------------|
| 6.0.0   | November 2011 | The selectbox component was introduced. |
| 6.0.0   | July 2011     | The template feature was introduced.    |
