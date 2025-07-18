

**Syntax:**

`<template name="`*`template-name`*`" [src="`*`URI`*`"]`  
` [`*`attr1`*`="`*`value1`*`"] [`*`attr2`*`="`*`value2`*`"...] [if="`*`if-condition`*`"] [unless="`*`unless-condition`*`"]/>`

It defines a template. A template is a ZUML fragment that defines how to
create components. Once a ZUML document is interpreted, the template
will be encapsulated as an instance of
[org.zkoss.zk.ui.util.Template](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Template.html) and
associated to a component. Then, the component can create the components
repeatedly based on the template by invoking
[org.zkoss.zk.ui.util.Template#create(org.zkoss.zk.ui.Component, org.zkoss.zk.ui.Component, org.zkoss.xel.VariableResolver, org.zkoss.zk.ui.util.Composer)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Template.html#create(org.zkoss.zk.ui.Component, org.zkoss.zk.ui.Component, org.zkoss.xel.VariableResolver, org.zkoss.zk.ui.util.Composer)).

A component can be assigned with multiple templates. Each of them is
identified by the **name** attribute.

```xml
<div>
    <template name="t1">
        <grid model="${foo}">
        ...
        </grid>
    </template>
    <template name="t2">
        <listbox model="${foo}">
        ...
        </listbox>
    </template>
```

How a template is used depends on the component it associates with and
the tools you use. Currently, all components that support the concept of
model allow you to specify a template for each item to render. For more
information, please refer to [ZK Developer's Reference: Template]({{site.baseurl}}/zk_dev_ref/mvc/template).

## name

`[Required]`

Specifies the name of the template.

## src

`[Optional][Default: `*`none`*`]`

Specifies the URI of the ZUML document that represents this template. If
the src attribute is specified, its content will be loaded and
interpreted as if they are specified inside the template element (right
after the content specified directly inside it).

## *attr1*

`[Optional][Default: `*`none`*`]`

Specifies a parameter that can be retrieved by use of
[org.zkoss.zk.ui.util.Template#getParameters()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Template.html#getParameters()).

## if

`[Optional][Default: true]`

Specifies the condition to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to false.

## unless

`[Optional][Default: false]`

Specifies the condition *not* to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to true.

## Version History

| Version | Date          | Content                      |
|---------|---------------|------------------------------|
| 6.0.0   | November 2011 | This feature was introduced. |
