The `sclass` attribute is the way to add extra CSS Class to a component.
By default, nothing is assigned to `sclass` (i.e. empty). Once you
specify it with a non-empty value, ZK will add the specified CSS class
to the root element as an additional CSS class.

For example, assign `sclass` **foo-pretty** to a button component in zul
page like this

``` xml
<!-- index.zul -->
<button sclass="foo-pretty"/>
```

will generate the following output

``` html
<!-- HTML output -->
<button class="z-button foo-pretty" />
```

The `sclass` won't change the default CSS classes applied to a
component, so all the default CSS rules will still be applied and
inherited. This attribute is useful to fine-tune a particular component.


