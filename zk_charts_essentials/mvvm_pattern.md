---
title: "MVVM Pattern"
---

You still can work with Charts in MVVM pattern with some exceptional
usages.

# Get Charts

Get a `Charts` by `wireComponents()`, please refer to [MVVM Reference / Wire Components](http://books.zkoss.org/zk-mvvm-book/8.0/advanced/wire_components.html)

```java
public class ShiftViewModel {
    @Wire
    Charts chart;

    //http://books.zkoss.org/zk-mvvm-book/8.0/advanced/wire_components.html
    @AfterCompose
    public void doAfterCompose(@ContextParam(ContextType.VIEW) Component view) throws Exception {
        Selectors.wireComponents(view, this, false);
        // initial series data
        initPoints();
        // hide some unnecessary options
        hideOptions();
    }
...
```

# Get ChartsEvent

Because you usually need `ChartsEvent` API, you can get it by
`@ContextParam` like:

```java
    @Command
    public void shiftPoint(@ContextParam(ContextType.TRIGGER_EVENT) ChartsEvent event) {
        // retrieve the point object.
        Point point = event.getPoint();
        // shift the point by updating its x value.
        point.setX(point.getX().intValue() + random() / 10);
    }
```
