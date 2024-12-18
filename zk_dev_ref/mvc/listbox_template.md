

The template used to control the rendering of each item must be named
`model` and declared right inside the `listbox` element. For example,

``` xml
<div apply="foo.FruitProvider">
    <listbox model="${$composer.fruits}">
    <listhead>
        <listheader label="Name" sort="auto"/>
        <listheader label="Weight" sort="auto"/>
    </listhead>
    <template name="model">
        <listitem>
            <listcell label="${each[0]}"/>
            <listcell label="${each[1]}"/>
        </listitem>
    </template>
    </listbox>
</div>
```

The template's name is important because users are allowed to associate
multiple templates to one component, and `listbox`'s default renderer
looks only for the template called `model`.

When the template is rendered, a variable called
[each](ZUML_Reference/EL_Expressions/Implicit_Objects/each)
is assigned with the data being rendered. Thus, you could retrieve the
information to render with EL expressions, such as `${each[0]}`, if it
is an array, or `${each.name}`, if it is a bean with a getter called
`name`.

In this example, we assume the `$composer.fruits` expression returns a
two-dimensional array[^1], and is provided by the `foo.FruitProvider`
composer such as follows[^2].

``` java
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
```

![]({{site.baseurl}}/zk_dev_ref/images/St201107-listbox.png‎)

> ------------------------------------------------------------------------
>
> <references/>

## Component's Value

By default, the data used to render a component will be stored to the
component's value property automatically. For listitem, it is
<javadoc method="setValue(T)">org.zkoss.zul.Listitem</javadoc>. Thus,
you retrieve it back easily by invoking
<javadoc method="getValue()">org.zkoss.zul.Listitem</javadoc>.

Of course, if you prefer to store other values, you can simply specify
`value="${whatever}"` to the `listitem` element in the template.

## The forEachStatus Variable

There is a variable called
[forEachStatus](ZUML_Reference/EL_Expressions/Implicit_Objects/forEachStatus)
providing the information of the iteration. It is an instance of
<javadoc type="interface">org.zkoss.zk.ui.util.ForEachStatus</javadoc>.
For example, you could retrieve the iteration's index by use of
`${forEachStatus.index}`.

## Lifecycle and the arg Variable

When using the template, it is important to remember that the template
is rendered on demand. It means the template can be rendered very late,
after the page is rendered, after the user scrolls down to make an item
visible, and so on. Thus, in the template, you *cannot* reference
anything that is available only in the page rendering phase. For
example, you can't reference [the arg
variable](ZUML_Reference/EL_Expressions/Implicit_Objects/arg)
in a template:

``` xml
<listbox model="${$composer.fruits}" apply="foo.FruitProvider">
    <template name="model">
        <listitem>
            <listcell label="${arg.foo}"/> <!-- Wrong! it is always empty -->
            <listcell label="${each}"/>
        </listitem>
    </template>
</listbox>
```

To work around, you have to store the value in, say, component's custom
attributes
(<javadoc method="getAttributes()" type="interface">org.zkoss.zul.Component</javadoc>).
For example,

``` xml
<listbox model="${$composer.fruits}" apply="foo.FruitProvider">
    <custom-attributes foo="${arg.foo}"/><!-- store it for later use -->
    <template name="model">
        <listitem>
            <listcell label="${foo}"/> <!-- Correct! Use the stored copy. -->
            <listcell label="${each}"/>
        </listitem>
    </template>
</listbox>
```

## Nested Listboxes

The template can be applied recursively. Here is an example of a
listbox-in-listbox:

``` xml
<zk>
    <zscript><![CDATA[
    ListModel quarters = new ListModelArray(new String[] {"Q1", "Q2", "Q3", "Q4"});
    Map months = new HashMap();
    months.put("Q1", new ListModelArray(new String[] {"Jan", "Feb", "Mar"}));
    months.put("Q2", new ListModelArray(new String[] {"Apr", "May", "Jun"}));
    months.put("Q3", new ListModelArray(new String[] {"Jul", "Aug", "Sep"})); 
    months.put("Q4", new ListModelArray(new String[] {"Oct", "Nov", "Dec"}));
    ListModel qs = (quarters);
    ]]></zscript>
    <listbox model="${quarters}">
        <template name="model">
            <listitem>
                <listcell>${each}</listcell>
                <listcell>
                    <listbox model="${months[each]}">
                        <template name="model">
                            <listitem label="${each}"/>
                        </template>
                    </listbox>
                </listcell>
            </listitem>
        </template>
    </listbox>
</zk>
```

![](images/St201107-listbox-in-listbox.png)


### How to retrieve the outer template's data in the inner template

Although
[forEachStatus](ZUML_Reference/EL_Expressions/Implicit_Objects/forEachStatus)
has an API called
<javadoc method="getPrevious()" type="interface">org.zkoss.zk.ui.util.ForEachStatus</javadoc>,
it always returns null[^3]. It is because the template is rendered on
demand. When ZK is rendering the inner template, the previous iteration
has already gone. There is no way to retrieve the iteration information
of the outer template.

Rather, you have to traverse the component tree or use [the
custom-attributes
element](ZUML_Reference/ZUML/Elements/custom-attributes).

Here is an example of traversing the component tree to retrieve the data
in the outer template, as shown at line 9 below. Notice that, each data
is, as described before, stored in the component's value property.

``` xml
<listbox model="${quarters}">
    <template name="model">
        <listitem>
            <listcell>
                <listbox model="${months[each]}">
                    <template name="model">
                        <listitem>
                            <listcell label="${forEachStatus.index}" />
                            <listcell>${self.parent.parent.parent.parent.parent.value}</listcell>
                            <listcell>${each}</listcell>
                        </listitem>
                    </template>
                </listbox>
            </listcell>
        </listitem>
    </template>
</listbox>
```

If the component tree is deep, It is tedious and somehow error prone.
Alternatively, you can store the information into [a custom
attribute](ZUML_Reference/ZUML/Elements/custom-attributes)
and then retrieve it later, as shown at line 4 and 10 below.

``` xml
<listbox model="${quarters}">
    <template name="model">
        <listitem>
            <custom-attributes master="${each}"/>
            <listcell>
                <listbox model="${months[each]}">
                    <template name="model">
                        <listitem>
                            <listcell label="${forEachStatus.index}" />
                            <listcell>${master}</listcell>
                            <listcell>${each}</listcell>
                        </listitem>
                    </template>
                </listbox>
            </listcell>
        </listitem>
    </template>
</listbox>
```

> ------------------------------------------------------------------------
>
> <references/>

# Template for GroupsModel

When used with
<javadoc type="interface">org.zkoss.zul.GroupsModel</javadoc>, listboxes
will use the template called `model:group` for rendering the grouping
object. If it is not defined, it will look for the template called
`model` instead (i.e., the same template is used for rendering the
grouping and non-grouping objects).

``` xml
<listbox model="${fooGroupsModel}">
   <template name="model:group">
      <listgroup open="${groupingInfo.open}" label="${each}"/>
   </template>
   <template name="model">
      <listitem>....</listitem>
   </template>
   <template name="model:groupfoot">
      <listgroupfoot>....</listgroupfoot>
   </template>
<listbox>
```

- Note the *groupingInfo* is used to get the information of the grouping
  data. Please refer to
  <javadoc>org.zkoss.zul.ext.GroupingInfo</javadoc>.

# Version History

| Version | Date         | Content                                    |
|---------|--------------|--------------------------------------------|
| 6.0.0   | July 2011    | The template feature was introduced.       |
| 6.0.0   | January 2012 | The GroupingInfo statement was introduced. |

[^1]: Of course, it can be anything you like. Just make sure it matches
    the EL expressions specified in the template.

[^2]: Here we use
    <javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc> for
    simplicity. There are several ways to implement a composer, such as
    wiring a Spring-managed bean. For more information, please refer to
    [the Composer
    section]({{site.baseurl}}/zk_dev_ref/MVC/Controller/Composer).

[^3]: On the other hand, it returns the previous iteration information
    when using with [the forEach
    attribute](ZUML_Reference/ZUML/Attributes/forEach).
