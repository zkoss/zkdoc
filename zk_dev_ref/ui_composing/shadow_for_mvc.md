

# Introduction

In ZK 8.0.0, we have introduced shadow elements, such as a boilerplate
code, to help application developers compose HTML layouts with dynamic
data. It is inspired by Shadow DOM to enable better composition of ZK
components. For more details, please check out our [ZK MVVM Reference](https://books.zkoss.org/zk-mvvm-book/10.0/shadow_elements/index.html).
You can also use shadow elements with the MVC pattern; however, there
are some differences. We will discuss this more in the following
sections.

In the MVC pattern, developers can declare shadow tags in zul files, but
the behavior is very different without MVVM annotation. For example,

```xml
<apply template="any" />
<template name="any">
    ...
</template>
```

The shadow element "apply" will not exist after the output is rendered
to the client, so developers can't dynamically change the template
content. For this purpose, we provide two kinds of Java classes for
those who favor MVC:

- [org.zkoss.zuti.zul.ShadowTemplate](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/ShadowTemplate.html)
- [org.zkoss.zuti.zul.CollectionTemplate](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/CollectionTemplate.html)

They are NOT like the typical shadow elements defined in zul but
components you can only create in Java code.

# Setup

Before using shadow elements, make sure you include the required jar -
`zuti.jar`. With maven, you should add the dependency below:

```xml
    <dependency>
        <groupId>org.zkoss.zk</groupId>
        <artifactId>zuti</artifactId>
        <version>${zk.version}</version>
    </dependency>
```

# Wire Shadow Components

Like wiring a UI component, you can [ wire a shadow component](zk_dev_ref/mvc/controller/wire_components#Shadow_Selectors).

# Use ShadowTemplate

[org.zkoss.zuti.zul.ShadowTemplate](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/ShadowTemplate.html) is a utility class
that allows developers to apply shadow elements in Java class. It has a
similar behavior to [org.zkoss.zuti.zul.Apply](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/Apply.html); for
example, developers can specify the template or pass parameters. The
difference is that developers must designate a boolean value, called
**autodrop**, to indicate whether to drop those rendered children or
not. If true, every time the user changes the template or detaches from
the original host, ShadowTemplate will
[org.zkoss.zk.ui.HtmlShadowElement#recreate()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlShadowElement.html#recreate())
or remove the children; otherwise, rendered children will remain. After
instantiating ShadowTemplate instance, developers can trigger
[org.zkoss.zuti.zul.ShadowTemplate#apply(org.zkoss.zk.ui.Component)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/ShadowTemplate.html#apply(org.zkoss.zk.ui.Component))
to compose the specified template, with shadow host passed as a
parameter. Note: the passed host should be the same one if **autodrop**
is true, or pass null to detach the original host first.

Note: `ShadowTemplate` doesn't support setting both template and
template URI at the same time; one of them should be a null or empty
string before setting another.

## Example

Assume we have a zul file like this:

```xml
<zk>
    <div apply="DemoComposer">
        <div id="host1"></div>
    </div>
    <template name="labels">
        <label value="zul label"/>
        <x:label>xhtml label</x:label>
        <n:span>native span</n:span>
    </template>
</zk>
```

and in DemoComposer.java

```java
@Wire
Div host1;

public void doAfterCompose(Component comp) throws Exception {
    super.doAfterCompose(comp);
    ShadowTemplate st = new ShadowTemplate(true); //autodrop = true
    st.setTemplate("labels");
    st.apply(host1);
}
```

- Line 6: we instantiate a new ShadowTemplate with **autodrop** which is
  equal to true.
- Line 7: assign the template name to `st`.
- Line 8: call apply method and shadow host is `Div host1`.

Then, we can see template "labels" are rendered and the created
components are attached to `host1`.

If we have a button to change the template:

```java
    @Listen("onClick = #btn")
    public void clickBtn() {
        st.setTemplate("othertemplate");
        st.apply(st.getShadowHost());
    }
```

Those components rendered before will be detached first before attaching
the new ones. Note: developers have to call `apply(host)` method again.

If developers want to apply other shadow hosts, please apply null first
and then reapply like this:

```java
st.apply(null);
st.apply(otherHost);
```

And the rendered components will also be detached.

Another case is when **autodrop** is equal to false. Here, neither
changing the template nor applying other hosts (yes, you can apply
whichever hosts you want) will cause rendered components to be detached.

# Use CollectionTemplate

[org.zkoss.zuti.zul.CollectionTemplate](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/CollectionTemplate.html) is similar to
[org.zkoss.zuti.zul.ShadowTemplate](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/ShadowTemplate.html). The difference is
that developers can assign [org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)
and [org.zkoss.zuti.zul.CollectionTemplateResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/CollectionTemplateResolver.html) for
iterative rendering.

## Example

The basic usage is simple. Here we demonstrate by using the previous
sample code:

```xml
<zk>
    <div apply="DemoComposer">
        <div id="host1"></div>
    </div>
    <template name="labels">
        <label value="zul one ${each} "></label>
        <x:label>xhtml one ${each} </x:label>
        <n:span>native one ${each} </n:span>
    </template>
</zk>
```

The `each` in line 6, 7, 8 represents each item in ListModel, and in
DemoComposer.java

```java
@Wire
Div host1;
ListModel model = new ListModelList(Arrays.asList(new String[]{"1", "2", "3"}));

public void doAfterCompose(Component comp) throws Exception {
    super.doAfterCompose(comp);
    CollectionTemplate ct = new CollectionTemplate(true); //autodrop = true
    ct.setModel(model);
    ct.setTemplate("labels");
    ct.apply(host1);
}
```

Developers have to prepare a [org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)
and assign it to the `CollectionTemplate` instance; they will then see
that the template is created multiple times. Similarly, in cases where
either the template or model is changed, `apply(host)` must be triggered
for the effect to take place. The benefit of using `CollectionTemplate`
is that every time the model's content changes, the layout will change
as well, no matter if **autodrop** is true or false.

## CollectionTemplateResolver

More advanced usage is to assign
[org.zkoss.zuti.zul.CollectionTemplateResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/CollectionTemplateResolver.html) to
resolve template by evaluating the variable reference from model in
runtime.

```xml
<zk>
    <div id="root" apply="DemoComposer">
        <div id="host1"></div>
    
        <template name="male">
            <div>
                <label>I'm male, my name is ${each.name}</label>
            </div>
        </template>
        <template name="female">
            <div>
                <label>I'm female, my name is ${each.name}</label>
            </div>
        </template>
    </div>
</zk>
```

The `each` in line 7, 12 represents each item in ListModel, and in
DemoComposer.java

```java
@Wire
Div host1;
ListModelList<Person> model = new ListModelList<Person>(new ArrayList<Person>() {
    add(new Person(true));
    add(new Person(false));
    add(new Person(false));
    add(new Person(true));
});

public void doAfterCompose(Component comp) throws Exception {
    super.doAfterCompose(comp);
    CollectionTemplate ct = new CollectionTemplate(true); //autodrop = true
    ct.setModel(model);
    ct.setTemplateResolver(new MyCollectionTemplateResolver<Person>());
    ct.apply(host1);
}

public class MyCollectionTemplateResolver<E extends Person> implements CollectionTemplateResolver<E> {
    public Template resolve(E o) {
        if (o.getGender())
            return root.getTemplate("male");
        else
            return root.getTemplate("female");
    }
}

public class Person {
    String name = "old name";
    boolean isMale = true;
    // getter and setter
}
```

In this example, we assign a `CollectionTemplateResolver` instead of
template name or URI, and you will see template "male" is rendered when
the gender of `Person` variable is male. That means,
`CollectionTemplate` provides not only `setTemplate` and
`setTemplateURI` but also supports determining template dynamically by
giving [org.zkoss.zuti.zul.CollectionTemplateResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zuti/zul/CollectionTemplateResolver.html)
like line 14, so the template will be resolved by evaluating the
variable reference from model in runtime.

Because these 3 methods: `setTemplate()`, `setTemplateURI()` and
`setTemplateResolver()`, serve the same purpose, please just call one of
them. If you call them all, the later one will override the previous
one.

# Comparison

Although the behavior of ShadowTemplate and [Macro component]({{site.baseurl}}/zk_dev_ref/ui_composing/macro_component)
looks similar, there are some differences.

|                     | ShadowTemplate                                                                                                                 | Macro Component                                                                     |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| change host/parent  | if **autodrop** is true, the rendered components will change parent; otherwise, they will stick with the same parent(or host). | doesn't matter if it is in-line or not; the rendered components will change parent. |
| change template/uri | if **autodrop** is true, the rendered components will be detached; otherwise, they will stick with the same parent(or host).   | doesn't matter if it is in-line or not; the rendered components will be detached.   |

In short, while using Macro components, we would have to instantiate
more than one to achieve this goal. ShadowTemplate has more flexibility
for templating; with only one ShadowTemplate instance, developers can
render anywhere without losing those rendered components.
CollectionTemplate, too, can render template iteratively with ListModel,
a task impossible for Macro component.
