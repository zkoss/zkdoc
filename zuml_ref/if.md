**Syntax:**

`if="${`*`an-EL-expr`*`}"`

It specified the condition to evaluate the associated element. In other
words, the associated element and all its child elements are ignored, if
the condition is evaluated to false.

For example, suppose you want to place either one label or another in a
column of a grid, you might use something like this:

``` xml
<row forEach="${salesPersonList}">                                      
  <label value="${each.salesPersonName}" if="${each.hasSalesPerson=='Y'}"/>
  <label value="-" style="float:center"  if="${each.hasSalesPerson!='Y'}"/>
</row>
```

#
