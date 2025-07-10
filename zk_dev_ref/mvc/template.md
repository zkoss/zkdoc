A template is a ZUML fragment that defines how to create components. A
template is enclosed with [the template element](/zuml_ref/template) as shown
below.

```xml
<window>
    <template name="foo">
      <textbox/>
      <grid model=${data}>
         <columns/>
         <template name="model"> <!-- nested template -->
            <row>Name: <textbox value="${each.name}"/></row>
         </template>
      </grid>
   </template>
...
```

A template can contain any ZUML elements you want, including other
templates. When a ZUML document is interpreted, a template won't be
interpreted immediately. Rather, it will be encapsulated as an instance
of [org.zkoss.zk.ui.util.Template](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Template.html),
and be associated to a component. Then, the component or a tool can
create the components repeatedly based on the template by invoking
[org.zkoss.zk.ui.util.Template#create(org.zkoss.zk.ui.Component, org.zkoss.zk.ui.Component, org.zkoss.xel.VariableResolver, org.zkoss.zk.ui.util.Composer)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Template.html#create(org.zkoss.zk.ui.Component, org.zkoss.zk.ui.Component, org.zkoss.xel.VariableResolver, org.zkoss.zk.ui.util.Composer)).

A component can be assigned with multiple templates. Each of them is
identified by the **name** attribute.

```xml
<div>
    <template name="t1">
        <grid model="${foo}"/>
    </template>
    <template name="t2">
        <listbox model="${foo}"/>
    </template>
```

How a template is used depends on the component it associates with and
the tools you use. Currently, all components that support the concept of
model allow you to specify a template to control how to render each
item. In the following sections, we discuss them in details. If you'd
like to know how to use templates manually in Java, please refer to [the UI Patterns: Templates section]({{site.baseurl}}/zk_dev_ref/ui_patterns/templates).

Notice that please read [the Listbox Template section]({{site.baseurl}}/zk_dev_ref/mvc/listbox_template)
first, even though you're rendering other kind of UI. It described the
common concepts and tricks of using templates.
