# SwipeEvent

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zk.ui.event.SwipeEvent </javadoc>
- JavaScript API: N/A

# Employment/Purpose

Represents an event that indicates swipe on a component and provides
information about the swipe displacement, duration, and direction.

# Example

<figure>
<img src="SwipeEventExample_Update.png"
title="SwipeEventExample_Update.png" />
<figcaption>SwipeEventExample_Update.png</figcaption>
</figure>

The swipe event can be registered in any component which can be swiped
by user on tablet devices.

``` xml
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

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date       | Content                                                                                                  |
|---------|------------|----------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [ZK Client Widget support swipe event for tablet/mobile device](http://tracker.zkoss.org/browse/ZK-1241) |
