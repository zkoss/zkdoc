

The template used to control the rendering of each tab and tabpanel must
be named `model:tab` and `model:tabpanel` and declared right inside the
`tabbox` element. For example,

```xml
<div apply="foo.FruitProvider">
<tabbox id="mytab" model="${$composer.fruits}">
    <template name="model:tab">
        <tab iconSclass="z-icon-user">
            ${each[0]}
        </tab>
    </template>
    <template name="model:tabpanel">
        <tabpanel>
            <div style="background:green">
                ${each[1]}
            </div>
        </tabpanel>
    </template>
</tabbox>
</div>
```

The template's name is important because users are allowed to associate
multiple templates to one component, and `tabbox`'s default renderer
looks only for the template called `model:tab` and `model:tabpanel`.

When the template is rendered, a variable called
[each](zuml_ref/each)
is assigned with the data being rendered. Thus, you could retrieve the
information to render with EL expressions, such as `${each[0]}`, if it
is an array, or `${each.name}`, if it is a bean with a getter called
`name`.

In this example, we assume the `$composer.fruits` expression returns a
two-dimensional array[^1], and is provided by the `foo.FruitProvider`
composer such as follows[^2].

```java
<zscript><![CDATA[
public class FruitProvider extends org.zkoss.zk.ui.select.SelectorComposer {
    public ListModelArray fruits = new ListModelArray(
            new String[][] {
                {"Apple", "10kg"},
                {"Orange", "20kg"},
                {"Mango", "12kg"}
            });

    public ListModelArray getFruits() {
         return fruits;
    }
}
]]></zscript>
```

![]({{site.baseurl}}/zk_dev_ref/images/st201311-tabbox.png‎)

> ------------------------------------------------------------------------
>
> <references/>

## Component's Value

By default, the data used to render a component will be stored to the
component's value property automatically. For tab, it is
[org.zkoss.zul.Tab#setValue(T)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tab.html#setValue(T)). Thus, you
retrieve it back easily by invoking
[org.zkoss.zul.Tab#getValue()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tab.html#getValue()).

Of course, if you prefer to store other values, you can simply specify
`value="${whatever}"` to the `tab` element in the template.

## The forEachStatus Variable

There is a variable called
[forEachStatus](zuml_ref/foreachstatus)
providing the information of the iteration. It is an instance of
[org.zkoss.zk.ui.util.ForEachStatus](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html).
For example, you could retrieve the iteration's index by use of
`${forEachStatus.index}`.

## Lifecycle and the arg Variable

When using the template, it is important to remember that the template
is rendered on demand. It means the template can be rendered very late,
after the page is rendered, after the user scrolls down to make an item
visible, and so on. Thus, in the template, you *cannot* reference
anything that is available only in the page rendering phase. For
example, you can't reference [the arg variable](zuml_ref/arg)
in a template:

```xml
<div apply="foo.FruitProvider">
<tabbox id="mytab" model="${$composer.fruits}">
    <template name="model:tab">
        <tab label="${arg.foo}"/> <!-- Wrong! it is always empty -->
    </template>
    <template name="model:tabpanel">
        <tabpanel>
            ${each[1]}
        </tabpanel>
    </template>
</tabbox>
</div>
```

To work around, you have to store the value in, say, component's custom
attributes
([org.zkoss.zul.Component#getAttributes()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Component.html#getAttributes()).
For example,

```xml
<div apply="foo.FruitProvider">
<tabbox id="mytab" model="${$composer.fruits}">
    <custom-attributes foo="${arg.foo}"/><!-- store it for later use -->
    <template name="model:tab">
        <tab label="${foo}"/> <!-- Correct! Use the stored copy. -->
    </template>
    <template name="model:tabpanel">
        <tabpanel>
            <div>
                ${each[1]}
            </div>
        </tabpanel>
    </template>
</tabbox>
</div>
```

# Version History

| Version | Date          | Content                                                             |
|---------|---------------|---------------------------------------------------------------------|
| 7.0.0   | November 2013 | [Tabbox support ListModel](http://tracker.zkoss.org/browse/ZK-2002) |

[^1]: Of course, it can be anything you like. Just make sure it matches
    the EL expressions specified in the template.

[^2]: Here we use
    [org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html) for
    simplicity. There are several ways to implement a composer, such as
    wiring a Spring-managed bean. For more information, please refer to
    [the Composer section]({{site.baseurl}}/zk_dev_ref/mvc/composer)
