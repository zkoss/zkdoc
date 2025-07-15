

# SwipeEvent

- Demonstration: N/A
- Java API: [org.zkoss.zk.ui.event.SwipeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SwipeEvent.html)
- JavaScript API: N/A

# Employment/Purpose

Represents an event that indicates swipe on a component and provides
information about the swipe displacement, duration, and direction.

# Example

![](/zk_component_ref/images/SwipeEventExample_Update.png)

The swipe event can be registered in any component which can be swiped
by user on tablet devices.

```xml
<tabbox height="300px" width="300px">
    <tabs>
        <tab label="tab 1" />
    </tabs>
    <tabpanels>
        <tabpanel>
            <attribute name="onSwipe"><![CDATA[
                SwipeEvent se = (SwipeEvent) event;
                lbl1.setValue("Horizontal: " + se.getSwipeX() + "px");
                lbl2.setValue("Vertical: " + se.getSwipeY() + "px");
                lbl3.setValue("Duration: " + se.getSwipeDuration() + " milliseconds");
                lbl4.setValue("Direction: " + se.getSwipeDirection());
            ]]></attribute>
            <vlayout>
                Swipe information
                <label id="lbl1"/>
                <label id="lbl2"/>
                <label id="lbl3"/>
                <label id="lbl4"/>
            </vlayout>
        </tabpanel>
    </tabpanels>
</tabbox>
```

# Supported events

Check inherited events

# Supported Children

`*NONE`



# Version History

| Version | Date       | Content                                                                                                  |
|---------|------------|----------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [ZK Client Widget support swipe event for tablet/mobile device](http://tracker.zkoss.org/browse/ZK-1241) |


