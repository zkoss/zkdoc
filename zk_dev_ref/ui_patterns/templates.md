As described in [the MVC: Template
section]({{site.baseurl}}/zk_dev_ref/mvc/view/template), a
template is a ZUML fragment that defines how to create components. A
template is enclosed with [the template
element](ZUML_Reference/ZUML/Elements/template) as shown
below.

```xml
<window>
    <template name="foo">
      <textbox/>
      <grid model=${data}>
         <columns/>
         <template name="model"> <!-- nested template -->
            <row>Name: <textbox value=${each.name}"/></row>
         </template>
      </grid>
   </template>
...
```

# Using Template in Application

"Template" is a generic feature and its use is not limited to custom
model rendering. Users are able to use "template" in ZK applications
too.

Each template is stored as part of a component and can be retrieved by
invoking the
<javadoc method="getTemplate(java.lang.String)">org.zkoss.zk.ui.Component</javadoc>.
To create the components defined in the template, just invoke the
<javadoc method="create(org.zkoss.zk.ui.Component, org.zkoss.zk.ui.Component, org.zkoss.xel.VariableResolver, org.zkoss.zk.ui.util.Composer)">org.zkoss.zk.ui.util.Template</javadoc>.
For example,

```java
comp.getTemplate("foo").create(comp, null, null, null);
```

The third argument of the `create` method is a variable resolver
(<javadoc type="interface">org.zkoss.xel.VariableResolver</javadoc>).
Depending on the requirement, you could pass any implementation you
like. For example, the implementation of a listbox actually utilizes it
to return the data being rendered; the code is similar to the following
(for easy understanding, the code has been simplified).

For more detailed information about the variable resolver, please refer
to [ZUML
Reference](ZUML_Reference/ZUML/Processing_Instructions/variable-resolver).

```java
public class TemplateBasedRenderer implements ListitemRenderer {
    public void render(Listitem item, final Object data, int index) {
        final Listbox listbox = (Listbox)item.getParent();
        final Component[] items = listbox.getTemplate("model").create(listbox, item,
            new VariableResolver() {
                public Object resolveVariable(String name) {
                    return "each".equals(name) ? data: null;
                }
            }, null);

        final Listitem nli = (Listitem)items[0];
        if (nli.getValue() == null) //template might set it
            nli.setValue(data);
        item.detach();
    }
}
```

In addition, the template allows users to specify any number of
parameters with any name, and these parameters can be retrieved back by
the `getParameters` method of the `Template` interface:

```xml
<template name="foo" var1="value1" var2="${el2}">
...
</template>
```

If the content of a template is located elsewhere as a separate file, to
reference it, specify it in the `src` attribute as follows.

```xml
<template name="foo" src="foo.zul">
...
</template>
```

# Children Binding

We suggest using shadow component
[<forEach>](http://books.zkoss.org/zk-mvvm-book/8.0/shadow_elements/iterate_collections.html)
as a replacement of children binding.

[ ZK Data
Binding]({{site.baseurl}}/zk_dev_ref/mvvm/data_binding) provides
a powerful way called [Children
Binding]({{site.baseurl}}/zk_dev_ref/mvvm/data_binding/children_binding)
to render a template based on the data (such as a list of elements).
Moreover, the UI will be updated automatically if the data has been
changed. For more information, please refer to [the Children Binding
section]({{site.baseurl}}/zk_dev_ref/mvvm/data_binding/children_binding).

# Version History

| Version | Date      | Content                              |
|---------|-----------|--------------------------------------|
| 6.0.0   | July 2011 | The template feature was introduced. |
