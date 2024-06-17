If a widget has a lot of child widgets, the performance will be better
if you rerender only the portion(s) that don't have a lot of child
widgets (and are not changed).

For example, <javadoc directory="jsdoc">zul.wgt.Groupbox</javadoc>
rerenders only itself and the caption child, if any, when `setClosable`
is called, as follows.

``` javascript
setClosable: function (closable) {
    if (this._closable != closable) {
        this._closable = closable;
        if (this.desktop)
            this.rerender(zk.Skipper.nonCaptionSkipper);
   }
}
```

It invokes
<javadoc method="rerender(zk.Skipper)" directory="jsdoc">zk.Widget</javadoc>
with a skipper (an instance of
<javadoc directory="jsdoc">zk.Skipper</javadoc>). The skipper decides
what to skip (i.e., not to rerender), detach the skipped portion(s), and
attach them back after rerendering. Thus, the skipped part won't be
rerendered, nor unbound/bound, so the performance is better.

In the above example, we use the
<javadoc method="nonCaptionSkipper" directory="jsdoc">zk.Skipper</javadoc>
instance to do the job. It skips all child widgets except the one called
caption (i.e., `child != this.caption`).

In addition to passing a skipper to
<javadoc method="rerender(zk.Skipper)" directory="jsdoc">zk.Widget</javadoc>,
the widget has to implement the mold method (redraw) to handle the
skipper:

``` javascript
function (out, skipper) {
    out.push('<fieldset', this.domAttrs_(), '>');
    var cap = this.caption;
    if (cap) cap.redraw(out);

    out.push('<div id="',  this.uuid, '$cave"', this._contentAttrs(), '>');
    if (!skipper)
        for (var w = this.firstChild; w; w = w.nextSibling)
            if (w != cap) w.redraw(out);
    out.push('</div></fieldset>');
}
```

As shown above, the mold method is also called with the skipper, and the
implementation should not redraw the skipped part. In this case, all
child widgets except caption are not redrawn.

You can implement your own skipper. Refer to
<javadoc directory="jsdoc">zk.Skipper</javadoc> for details.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
