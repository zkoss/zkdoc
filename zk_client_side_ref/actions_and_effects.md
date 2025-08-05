---
title: "Actions and Effects"
---

Here we describe how to provide more effects for [client-side actions]({{site.baseurl}}/zk_dev_ref/ui_patterns/actions_and_effects).

The allowed effects are actually the names of methods defined in
[zk.eff.Actions](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.eff.Actions.html). Thus, to add a new
effect, you have to add a new method to it. For example,

```xml
zk.eff.Actions.fooIn = function (n, opts) {
    //your own effect to make the node visible, such as
    //zk(n).slideIn(this, opts);
};
```

Then, you could use it in the client-side action:

```xml
<div action="show: fooIn">
....
</div>
```

The signature of an effect method is as follows.

`function (`[`_global_.DOMElement`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/`_global_.DOMElement`.html)` n, `[`_global_.Map`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/`_global_.Map`.html)` opts);`

where `n` is the DOM element to apply the action, and `opts` is the
options specified in the client-side action.

Notice that, before invoking jQuery's effects, you should invoke
[\_global\_.jqzk#defaultAnimaOpts(zk.Widget, _global_.Map, _global_.Array, boolean)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.jqzk.html#defaultAnimaOpts(zk.Widget, _global_.Map, _global_.Array, boolean))
to prepare the initial options for animation. For example,

```javascript
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
