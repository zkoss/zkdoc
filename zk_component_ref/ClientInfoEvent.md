# ClientInfoEvent

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zk.ui.event.ClientInfoEvent </javadoc>
- JavaScript API: N/A

# Employment/Purpose

The onClientInfo event is used to notify the client's information, such
as orientation change, time zone and screen resolutions.

**Note:** All root components of all pages of the desktop will receives
this event.

# Example

To register this event can resize the layout to fit the whole screen for
user.

``` xml
<tabbox id="tbx" height="400px" width="600px">
        <attribute name="onClientInfo"><![CDATA[
            ClientInfoEvent oe = (ClientInfoEvent) event;
            String orient = oe.getOrientation();
            lbl.setValue(orient);
            if (orient.equals("portrait")) {
                tbx.setHeight("600px");
                tbx.setWidth("400px");
            } else {
                tbx.setHeight("400px");
                tbx.setWidth("600px");
            }
        ]]></attribute>
        <tabs>
            <tab label="tab 1" />
        </tabs>
        <tabpanels>
            <tabpanel>
                Current Orientation: <label id="lbl"/>
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

| Version | Date       | Content                                                                                              |
|---------|------------|------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Add a way to listen onOrientationChange for tablet device](http://tracker.zkoss.org/browse/ZK-1273) |
