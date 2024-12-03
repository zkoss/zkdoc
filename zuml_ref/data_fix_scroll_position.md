To prevent conflict with 'next' and 'previous' button on the virtual
keyboard on iPad. The input element should apply data-fixScrollPosition
attribute[^1].

``` xml
<div xmlns:ca="client/attribute">
<textbox xmlns:ca="client/attribute" ca:data-fixScrollPosition="true"></textbox>
</div>
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: For more information, please refer to
    <http://tracker.zkoss.org/browse/ZK-1285>
