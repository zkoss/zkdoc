---
title: "Drag Points"
---

## Enabling drag and drop

You can enable draggable-points for one or all series, then users can
drag to move a data point in a chart:

![](images/draggable-point.gif)

`DraggablePointComposer.java`

```java
    private Charts chart;
...

        //enable drag and drop for a specific series
        chart.getSeries().getDragDrop().setDraggableY(true);
        //enable drag and drop for all series
        chart.getPlotOptions().getSeries().getDragDrop().setDraggableX(true);
```

## Listening to dragstart, drag and drop events

`applicable to version 10.3.3.0`

With drag and drop enabled, it is possible to register a client-side
javascript handler which will be invoked when the relevant action is
performed:

- dragStart: when the user starts dragging
- drag: during drag, when the user moves the element
- drop: once the user releases the drag, and the element is dropped

In this client-side handler, we can use the [zAu.send function]({{site.baseurl}}/zk_client_side_ref/client_side_firing)
to forward this event to the server.

Note: avoid sending the drag handler if not necessary, since this
handler may fire a large number of requests while the user is dragging.

```java
    @Wire
    private Charts chart; //use the chart component as anchor
    
    private void enableDraggablePoints() {
        //enable drag and drop for a specific series
        chart.getSeries().getDragDrop().setDraggableY(true);
        //create an object to hold the point value
        JSONObject pointValue = new JSONObject();
        //create an object to hold the point.events value
        JSONObject eventsValue = new JSONObject();
        //set the content of the point.events.drop callback
        eventsValue.put("drop", new JavaScriptValue("function(e){zAu.send(new zk.Event(zk.$('#"+chart.getUuid()+"'), 'onPointDrop', {pointData: e.newPoint, serieIndex: e.origin.points[e.newPointId].point.series.index, pointIndex:e.origin.points[e.newPointId].point.index}, {toServer:true}));}"));
        pointValue.put("events", eventsValue);
        chart.getPlotOptions().getSeries().addExtraAttr("point", pointValue);
    }

    @Listen("onPointDrop=#chart")
    public void handleDrop(Event event) {
        Map data = (Map) event.getData();
        Map pointData = (Map) data.get("pointData");
        Double y = (Double) pointData.get("y");
        int serieIndex = (int) data.get("serieIndex");
        int pointIndex = (int) data.get("pointIndex");
        Clients.log("new point data: " + y + " series (" +serieIndex+"), point (" +pointIndex+ ")");
    }
```

Here is a decompressed version of the handler script for clarification:

```javascript
function(e){ // callback from dragStart, drag, or drop, e is the highcharts event containing the point data
    zAu.send( // send an event to the server
        new zk.Event( // create a new event with the following parameters
            zk.$('#"+chart.getUuid()+"'), // retrieve the charts component as the event target. The component is retrieved using the zk.$('#uuid') syntax.
            'onPointDrop', // create a custom event. This custom event name will be used when registering the event listener, either with addEventListener, or using @Listen
            {pointData: e.newPoint, serieIndex: e.origin.points[e.newPointId].point.series.index, pointIndex:e.origin.points[e.newPointId].point.index}, //retrieve point data and pass it with the event
            {toServer:true} //indicate that the event should be sent immediately, and not wait for piggybacking on the next request
        )
    );
}
```

Demo sample [in github](https://github.com/zkoss/zkchartsessentials/blob/master/src/main/java/org/zkoss/zkcharts/essentials/customizing/DraggablePointComposer.java)

Reference: [Highcharts API Rerenence](https://api.highcharts.com/highcharts/plotOptions.series.dragDrop)
