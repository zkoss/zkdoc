**Syntax:**

```xml
<zk>
    ...
</zk>
```

It is a special element used to aggregate other components. Unlike a
real component (say, `hbox` or `div`), it is not part of the component
tree being created. In other words, it doesn't represent any component.
For example,

``` xml
 <window>
     <zk>
         <textbox/>
         <textbox/>
     </zk>
 </window>
```

is equivalent to

``` xml
 <window>
     <textbox/>
     <textbox/>
 </window>
```

The main use is to represent multiple root elements in XML format.

``` xml
 <?page title="Multiple Root"?>
 <zk>
     <window title="First">
     ...
     </window>
     <window title="Second" if="${param.secondRequired}">
     ...
     </window>
 </zk>
```

The other use is to iterate over versatile components.

``` xml
 <window>
     <zk forEach="${mycols}">
         <textbox if="${each.useText}"/>
         <datebox if="${each.useDate}"/>
         <combobox if="${each.useCombo}"/>
     </zk>
 </window>
```

## if

`[Optional][Default: true]`

Specifies the condition to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to false.

## unless

`[Optional][Default: false]`

Specifies the condition *not* to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to true.

## forEach

`[Optional][Default: ignored]`

It specifies a collection of objects, such that the `zk` element will be
evaluated repeatedly against each object in the collection. If not
specified or empty, this attribute is ignored. If non-collection object
is specified, it is evaluated only once as if a single-element
collection is specified.

## forEachBegin

`[Optional][Default: 0]`

It is used with the `forEach` attribute to specify the starting offset
when iterating a collection of objects. If not specified, it iterates
from the first element, i.e., 0 is assumed.

## forEachBegin

`[Optional][Default: 0]`

It is used with the `forEach` attribute to specify the index (starting
from 0) that the iteration should begin at. If not specified, the
iteration begins at the first element, i.e., 0 is assumed.

If `forEachBegin` is greater than or equals to the number of elements,
no iteration is performed.

## forEachEnd

`[Optional][Default: the last element]`

It is used with the `forEach` attribute to specify the index (starting
from 0) the iteration should ends at (inclusive). If not specified, the
iterations ends at the last element.

If forEachEnd is greater than or equals to the number of elements, the
iteration ends at the last element.

## switch

`[Optional][Default: none]`

Provide the context for mutually exclusive evaluation. The value
specified in this attribute is called the switch condition.

``` xml
 <zk switch="${condition}"/>
```

The only allowed children are the `zk` elements.

Fore more examples, please refer to [ZK_Developer's_Reference/UI_Composing/ZUML/Conditional_Evaluation](/zk_dev_ref/ui_composing/conditional_evaluation).

## case

`[Optional][Default: none]`

Provides an alternative within the switch evaluation.

``` xml
 <zk case="apple"/>
```

If the value is a string starting and ending with slash, such as
`/a[p]*/`, it is considered as a regular expression, which is used to
match the switch condition.

``` xml
 <zk case="/a[a-z]*/"/>
```

You can specify multiple cases by separating them with comma.

``` xml
 <zk case="apple, ${special}"/>
```

Fore more examples, please refer to [ZK_Developer's_Reference/UI_Composing/ZUML/Conditional_Evaluation](/zk_dev_ref/ui_composing/conditional_evaluation).

## choose

`[Optional][Default: none]`

Provide the context for mutually exclusive evaluation.

``` xml
 <zk choose="">
```

As shown, the value of the `choose` attribute is always empty, since it
is used only to identify the range of mutually exclusive conditional
evaluation.

The only allowed children are the `zk` elements.

For more examples, please refer to [ZK_Developer's_Reference/UI_Composing/ZUML/Conditional_Evaluation](/zk_dev_ref/ui_composing/conditional_evaluation).

## when

`[Optional][Default: none]`

Provides an alternative within the choose evaluation.

``` xml
 <zk when="${fruit == 'apple'}">
```

It is evaluated if the condition matches.

For more examples, please refer to [ZK_Developer's_Reference/UI_Composing/ZUML/Conditional_Evaluation](/zk_dev_ref/ui_composing/conditional_evaluation)
.
