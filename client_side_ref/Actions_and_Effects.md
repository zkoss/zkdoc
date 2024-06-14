Here we describe how to provide more effects for [client-side
actions](ZK_Developer's_Reference/UI_Patterns/Actions_and_Effects).

The allowed effects are actually the names of methods defined in
<javadoc directory="jsdoc">zk.eff.Actions</javadoc>. Thus, to add a new
effect, you have to add a new method to it. For example,

``` xml
zk.eff.Actions.fooIn = function (n, opts) {
    //your own effect to make the node visible, such as
    //zk(n).slideIn(this, opts);
};
```

Then, you could use it in the client-side action:

``` xml
<div action="show: fooIn">
....
</div>
```

The signature of an effect method is as follows.

`function (`<javadoc directory="jsdoc">`_global_.DOMElement`</javadoc>` n, `<javadoc directory="jsdoc">`_global_.Map`</javadoc>` opts);`

where `n` is the DOM element to apply the action, and `opts` is the
options specified in the client-side action.

Notice that, before invoking jQuery's effects, you should invoke
<javadoc directory="jsdoc" method="defaultAnimaOpts(zk.Widget, _global_.Map, _global_.Array, boolean)">\_global\_.jqzk</javadoc>
to prepare the initial options for animation. For example,

``` javascript
this.defaultAnimaOpts(wgt, opts, prop, true).jq
    .css(css).show().animate(anima, { //the rest depending the jQuery effect you use
        queue: false, easing: opts.easing, duration: opts.duration || 400,
        complete: opts.afterAnima
    });
```

# Version History

| Version | Date          | Content                              |
|---------|---------------|--------------------------------------|
| 5.0.6   | December 2010 | This feature was introduced in 5.0.6 |
