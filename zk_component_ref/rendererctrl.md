---
title: "RendererCtrl"
description: "RendererCtrl: This interface defines the methods components like Listbox used to notify the renderer for several circumstance."
---

- Java API: [org.zkoss.zul.RendererCtrl](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/RendererCtrl.html)

# Employment/Purpose

This interface defines the methods components like Listbox used to
notify the renderer for several circumstance.

Though
`ListitemRenderer.render(org.zkoss.zul.Listitem, java.lang.Object)` is
called one item a timer, a request might have several items to render.
And, if the renderer implements this interface, `doTry()` will be called
before any rendering, and `doFinally()`will be called after all
rendering. If any exception occurs, `doCatch(java.lang.Throwable)` will
be called.

A typical use is to start a transaction and use it for rendering all
items from the same request.

# Supported events

Check inherited events

# Supported Children

`*N/A`
