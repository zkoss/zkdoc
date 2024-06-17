# If and Unless

The component creation can be conditional. By specifying the `if`,
`unless` attribute or both, developers can control whether to create the
associated component. It is also the most straightforward way.

For example, suppose that we want to use
[label](ZK_Component_Reference/Essential_Components/Label),
if readonly, and
[textbox](ZK_Component_Reference/Input/Textbox), otherwise:

``` xml
<label value="${customer.label}" if="${param.readonly == 'true'}"/>
<textbox value="${customer.value}" unless="${param.readonly == 'true'}"/>
```

Besides, if a parent component is ignored (not created), all of its
child components are ignored too.

Here is another example:

``` xml
<window if="${a==1}" unless="${b==2}">
    ...    
</window>
```

- [window](ZK_Component_Reference/Containers/Window) is
  created only if `a` is 1 and `b` is not 2.

# Switch and Case

With the `switch` and `case` attributes of [the `zk`
element](ZUML_Reference/ZUML/Elements/zk), you can evaluate a
section of a ZUML document only if a variable matches a certain value.
It is similar to Java's switch statement.

For example,

``` xml
<zk switch="${fruit}">
    <zk case="apple">    
    Evaluated only if ${fruit} is apple    
    </zk>
    <zk case="${special}">
    Evaluated only if ${fruit} equals ${special}
    </zk>
    <zk>
    Evaluated only if none of the above cases matches.
    </zk>
</zk>
```

ZK Loader will evaluate from the first case to the last case, until it
matches the switch condition, which is the value specified in the switch
attribute. The evaluation is mutually exclusive conditional. Only the
first matched case is evaluated.

The zk element without any case is the default – i.e., it always matches
and is evaluated if all the cases above it failed to match.

## Multiple Cases

You can specify a list of cases in one case attribute, such that a
section of a ZUML document has to be evaluated if one of them matches.

``` xml
<zk switch="${fruit}">
    <zk case="apple, ${special}">    
    Evaluated if ${fruit} is either apple or ${special}    
    </zk>
</zk>
```

## Regular Expressions

Regular expressions are allowed in the `case` attribute too, as shown
below.

``` xml
<zk switch="${fruit}">
    <zk case="/ap*.e/">
    Evaluate if the regular expression, ap*.e"., matches the switch condition.
    </zk>
</zk>
```

## Used with forEach

Like any other elements, you can use the [forEach
attribute](ZK_Developer's_Reference/UI_Composing/ZUML/Iterative_Evaluation)
(so are if and unless). The `forEach` attribute is evaluated first, so
the following is the same as multiple cases.

``` xml
<zk case="${each}" forEach="apple, orange">
```

is equivalent to

``` xml
<zk case= "apple, orange">
```

# Choose and When

The `choose` and `when` attributes of [the `zk`
element](ZUML_Reference/ZUML/Elements/zk) are the third
approach of conditional evaluation.

As shown below, it is enclosed with a `zk` element with the `choose`
attribute, and the ZK Loader will evaluate its child elements (the `zk`
elements with the `when` attribute) one-by-one until the first one
matches:

``` xml
<zk choose="">
    <zk when="${fruit == 'apple'}">    
    Evaluated if the when condition is true.
    </zk>
    <zk><!-- default -->
    Evaluated if none of above cases matches.
    </zk>
</zk>
```

You don't have to assign any value to the `choose` attribute, which is
used only to identify the range of the mutually exclusive conditional
evaluation.
