# forEach

By default, ZK instantiates a component for each XML element. If you
would like to generate a collection of components, you could specify the
forEach attribute. For example,

```xml
<listbox>
    <listitem label="${each}" forEach="Apple, Orange, Strawberry"/>
</listbox>
```

is equivalent to

```xml
<listbox>
    <listitem label="Apple"/>
    <listitem label="Orange"/>
    <listitem label="Strawberry"/>
</listbox>
```

When ZK Loader iterates through items of the given collection, it will
update two implicit objects:
[each](zuml_ref/each)
and
[forEachStatus](zuml_ref/foreachstatus).
The `each` object represents the item being iterated, while
forEachStatus is an instance of
[org.zkoss.zk.ui.util.ForEachStatus](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html),
from which you could retrieve the index and the previous forEach, if any
(nested iterations).

If you have a variable holding a collection of objects, you can specify
it directly in the forEach attribute. For example, assume that you have
a variable called `grades` as follows.

```java
grades = new String[] {"Best", "Better", "Good"};
```

Then, you can iterate them by the use of the forEach attribute as
follows. Notice that you have to use EL expression to specify the
collection.

```xml
<listbox>
    <listitem label="${each}" forEach="${grades}"/>    
</listbox>
```

The iteration depends on the type of the value of the forEach attribute:

- If it is java.util.Collection, it iterates each element of the
  collection.
- if it is java.util.Map, it iterates each Map.Entry of the map.
- If it is java.util.Iterator, it iterates each element from the
  iterator.
- If it is java.util.Enumeration, it iterates each element from the
  enumeration.
- If it is Object\[\], int\[\], short\[\], byte\[\], char\[\], float\[\]
  or double\[\], it iterates each element from the array.
- If it is null, nothing is generated (it is ignored).
- If neither of the above types is specified, the associated element
  will be evaluated once as if a collection with a single item is
  specified.

## The each Object

During the evaluation, an object called `each` is created and assigned
with the item from the specified collection. In the above example,
`each` is assigned with "Best" in the first iteration, then "Better" and
finally "Good".

Notice that the `each` object is accessible both in an EL expression and
in zscript. ZK will preserve the value of the `each` object if it is
defined before, and restore it after the evaluation of the associated
element.

## The forEachStatus Object

The `forEachStatus` object is an instance of
[org.zkoss.zk.ui.util.ForEachStatus](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html). It
holds the information about the current iteration. It is mainly used to
get the item of the enclosing element that is also assigned with the
forEach attribute.

In the following example, we use nested iterative elements to generate
two listboxes.

```xml
<hlayout>
    <zscript>
    classes = new String[] {"College", "Graduate"};
    grades = new Object[] {
        new String[] {"Best", "Better"}, new String[] {"A++", "A+", "A"}
    };
    </zscript>
    <listbox width="200px" forEach="${classes}">
        <listhead>
            <listheader label="${each}"/>
        </listhead>
        <listitem label="${forEachStatus.previous.each}: ${each}"
         forEach="${grades[forEachStatus.index]}"/>
    </listbox>
</hlayout>
```

Notice that the `each` and `forEachStatus` objects can be accessible
both in an EL expression and in zscript.

## Apply forEach to Multiple Elements

If you have to iterate a collection of items for multiple XML elements,
you could group them with the
[zk](zuml_ref/zk) element as shown below.

```xml
<zk forEach="${cond}">
    ${each.name}
    <textbox value="${each.value}"/>
    <button label="Submit"/>
</zk>
```

The `zk` element is a special element used to *group* a set of XML
elements nested. ZK Loader will not create a component for it. Rather,
it interprets the `forEach`, if and unless attribute it might have.

# Access each and forEachStatus in Java

You could access the `each` and `forEachStatus` object directly in
zscript such as:

```xml
<window>
    <button label="${each}" forEach="apple, orange">
        <zscript>
   self.parent.appendChild(new Label("" + each));
        </zscript>
    </button>
</window>
```

In a composer, you could retrieve them from the attributes, because
these objects are actually stored in the parent component's attributes
([org.zkoss.zk.ui.Component#getAttribute(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#getAttribute(java.lang.String))).
For example,

```java
public class Foo implements Composer {
    public void doAfterCompose(Component comp) throws Exception {
        Object each = comp.getParent().getAttribute("each"); //retrieve the each object
        ForEachStatus forEachStatus = (ForEachStatus)comp.getParent().getAttribute("forEachStatus");
        //...
    }
}
```

If the component is a root, you could retrieve them from the page's
attributes
([org.zkoss.zk.ui.Page#getAttribute(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html#getAttribute(java.lang.String))).

## Access each and forEachStatus in Event Listeners

However, you cannot access the values of `each` and `forEachStatus` in
an event listener because their values are reset after the XML element
which `forEach` is associated has been evaluated.

For example, the following code will not work:

```xml
<button label="${each}" forEach="${countries}"
    onClick="alert(each)"/> <!-- incorrect!! --> 
```

When the onClick event is received, the `each` object no longer exists.

There is a simple solution: store the value in the component's
attribute, so you can retrieve it when the event listener is called. For
example,

```xml
<button label="${each}" forEach="${countries}"
    onClick='alert(self.getAttribute("country"))'>
        <custom-attributes country="${each}"/>
</button> 
```

# Iterate a Subset of a Collection

If you would like to iterate a subset of a collection, you could specify
the
[forEachBegin](zuml_ref/foreachbegin)
and/or
[forEachEnd](zuml_ref/foreachend)
attributes.

```xml
<grid>
    <rows>
        <row forEach="${foos}" forEachBegin="${param.begin}" forEachEnd="${param.end}">
            ${each.name} ${each.title}
        </row>
    </rows>
</grid>
```
