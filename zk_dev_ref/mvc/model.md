---
title: "Model"
---



The *model* is the data an application handles. Depending on the
application requirement, it could be anything as long as your controller
knows it. Typical objects are POJOs, beans, Spring-managed beans, and
DAOs. Examples of manipulating the model in the controller were
discussed in the previous sections.

In this section and subsections, we will focus on the model that ZK
components support directly without custom glue logic. For example,
implementing [org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)
to control the display of [org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html) and
[org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html), and
[org.zkoss.zul.ChartModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ChartModel.html) to control
[org.zkoss.zul.Chart](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Chart.html).

In addition to implementing these models, you could use one of the
predefined implementations such as
[org.zkoss.zul.SimpleListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleListModel.html) and
[org.zkoss.zul.SimplePieModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimplePieModel.html). For detailed
description, please refer to the following sections.

# Model-Driven Rendering

Those ZK components (e.g. Listbox, Grid, Tree) that allow you to set
`model` properties support model-driven rendering, which means they
create (render) their child components upon a model object (e.g.
`ListModelList`). Hence, you can assign a ListModelList to a Listbox,
and it will render its Listitem upon the ListModelList with its
renderer.

In this case, you have to control the component's rendering by
**manipulating its model objects**. If you want to remove a Listitem,
don't remove the Listitem object itself. You should remove the
corresponding object in the ListModelList (`remove()`). Then Listbox
will remove the Listitem accordingly. The same rule applies to adding,
clearing, and replacing.

From one component's perspective, it also follows the MVC pattern: ![](/zk_dev_ref/images/model-driven-rendering.jpg)

- **Component (Controller)**
  - get data objects from a Model
  - as a data change listener of Model (by invoking
    [org.zkoss.zul.ListModel#addListDataListener(org.zkoss.zul.event.ListDataListener)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#addListDataListener(org.zkoss.zul.event.ListDataListener)))
  - handle events from the client e.g. update the selection upon user
    clicking
- **ListModel (Model)**
  - it stores your domain objects (the data could be Car, Person)
  - notify the component for data update when you call its method e.g.
    `add(), remove(), clear()`
  - ZK provides various default model implementations for various
    components, please refer to
    [ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html),
    [TreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/TreeModel.html),
    [GroupsModel](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModel.html)
- **Renderer (View)**
  - render/create child components and insert them into their parent
    component according to the request from the Component
  - each component has its own built-in renderer

# How to Assign Model to UI

Depending on the requirements, there are a few ways to assign a model to
a UI component.

## Use Composer to Assign Model

A typical way is to use [a composer]({{site.baseurl}}/zk_dev_ref/mvc/composer)
to assign the model. For example, assume the UI component is a grid and
we have a method called `getFooModel` returning the data to show on the
grid, then we could implement a composer, say `foo.FooComposer` as
follows:

```java
public class FooComposer implements Composer {
    public void doAfterCompose(Component comp) throws Exception {
        ((Grid)comp).setModel(getFooModel());
    }
}
```

Then, you could assign it in ZUML as follows:

```xml
<grid apply="foo.FooComposer">
...
```

## Use Data Binding

If you are using [data binding]({{site.baseurl}}/zk_mvvm_ref/data_binding/index), you can
have the data binder to assign the model for you. For example, assume
that you have a `ListModelList persons`, then:

```xml
<listbox model="@init(vm.persons)">
```

## Use EL Expressions

EL is another common way to assign the model. For example, assume you
have a variable resolver called `foo.FooVariableResolver` implementing
[org.zkoss.xel.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/VariableResolver.html) as follows.

```java
public class FooVariableResolver implements VariableResolver {
    public Object resolveVariable(String name) {
        if ("persons".equals(name)) //found
            return getPersons(); //assume this method returns an instance of ListModel 
        //... you might support more other variables
       return null; //not found
    }
}
```

Then, you could specify it in ZUML as follows:

```xml
<?variable-resolver class="foo.FooVariableResolver"?>

<listbox model="${persons}">
...
```

The other approach is to use the function mapper. For example, assume
you have an implementation called `foo.CustomerListModel`, then you
could use it to drive a listbox as follows.

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" ?>
<listbox model="${c:new('foo.CustomerListModel')}"/>
```

## Use zscript

If you are building a prototype, you could use
[zscript]({{site.baseurl}}/zk_dev_ref/ui_composing/scripts_in_zuml)
to assign the model directly. For example,

```xml
<zk>
    <zscript>
    ListModel infos = new ListModelArray(
        new String[][] {
            {"Apple", "10kg"},
            {"Orange", "20kg"},
            {"Mango", "12kg"}
        });
    </zscript>          
    <listbox model="${infos}"/>
</zk>
```

**Notice** that, since the performance of zscript is not good and the
mix of Java code in ZUML is not easy to maintain, it is suggested
**not** to use this approach in a production system. Please refer to
[Performance Tips]({{site.baseurl}}/zk_dev_ref/performance_tips/use_compiled_java_codes)
for more information.
