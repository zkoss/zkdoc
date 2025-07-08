**Syntax:**

`forEach="${`*`an-EL-expr`*`}"`  
`forEach="`*`an-value`*`, ${`*`an-EL-expr`*`}"`

The forEach attribute is used to specify a collection of object such
that the XML element it belongs will be evaluated repeatedly for each
object of the collection.

There are two formats. First, you specify a value without comma. The
value is usually a collection of objects, such that the associated
element will be evaluated repeatedly against each object in the
collection. If this attribute is not specified or empty, it will be
ignored. If non-collection object is specified, it is evaluated only
once as if a single-element collection is specified.

Second, you can specify a list of values by separating them with commas.
Then, the associated element will be evaluated repeatedly against each
value in the list.

For each iteration, two variables, `each` and `forEachStatus`, are
assigned automatically to let developers control how to evaluate the
associated element.

```xml

<hbox>
    <zscript>
        classes = new String[] {"College", "Graduate"};
        grades = new Object[] {
            new String[] {"Best", "Better"}, new String[] {"A++", "A+", "A"}
        };
    </zscript>
    <listbox width="200px" forEach="${classes}">
        <listhead>
            <listheader label="${each}" />
        </listhead>
        <listitem label="${forEachStatus.previous.each}: ${each}"
            forEach="${grades[forEachStatus.index]}" />
    </listbox>
</hbox>
```

When ZK Loader iterates through items of the give collection, it will
update two implicit objects:
[each](zuml_ref/EL_Expressions/Implicit_Objects/each)
and
[forEachStatus](zuml_ref/EL_Expressions/Implicit_Objects/forEachStatus).
The each variable represents the item being iterated, while
forEachStatus is an instance of
[org.zkoss.zk.ui.util.ForEachStatus](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html),
from which you could retrieve the index and the previous forEach, if
any.

If you prefer to iterate only a portion of a collection, you could
specify
[forEachBegin](zuml_ref/ZUML/Attributes/forEachBegin)
and/or
[forEachEnd](zuml_ref/ZUML/Attributes/forEachEnd).

Fore more examples, please refer to [ZK Developer's Reference: Iterative Evaluation]({{site.baseurl}}/zk_dev_ref/ui_composing/iterative_evaluation).


