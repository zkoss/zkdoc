

# Detail

- Demonstration: [Grid (Master detail)](http://www.zkoss.org/zkdemo/grid/master_detail)
- Java API: [org.zkoss.zul.Detail](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Detail.html)
- JavaScript API: [zkex.grid.Detail](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.grid.Detail.html)

- {% include edition-availability.html edition="pe" %}

# Employment/Purpose

The detail component is used to display a detailed section where a
master row and

multiple detail rows are on the same row.

# Example

![](/zk_component_ref/images/detail.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<zk>
    Please open/close the +/- button, and the layout of this page shows
    properly.
    <grid fixedLayout="true" width="600px">
        <columns>
            <column width="40px" />
            <column>Product Name</column>
            <column>Price</column>
            <column>Item location</column>
        </columns>
        <rows>
            <row>
                <detail>
                    <hlayout>
                        <image width="200px" height="200px" src="/img/icon_update.png" />
                        <vlayout>
                            <label value="Item Specifics - Item Condition    " style="font-weight:bold;font-style: italic;" />
                            <hlayout>
                                <label value="Condition:" />
                                <label value="Used" style="font-weight:bold;" />
                            </hlayout>
                            <hlayout>
                                <label value="Brand:" />
                                <label value="Apple" style="font-weight:bold;" />
                            </hlayout>
                            <hlayout>
                                <label value="Technology:" />
                                <label value="DVI" style="font-weight:bold;" />
                            </hlayout>
                            <hlayout>
                                <label value="Monitor Type:" />
                                <label value="LCD/Flat Panel" style="font-weight:bold;" />
                            </hlayout>
                        </vlayout>
                    </hlayout>
                </detail>
                <label value="Apple 20-inch Aluminum Cinema Display M9177/A" />
                <label style="color:green;float:right;" value="US $202.50" />
                <label value="tulsa, ok, United States" />
            </row>
        </rows>
    </grid>
</zk>
```

# Supported Events

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
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) Denotes user has
opened or closed a component. Note:</p>
<p>unlike <code>onClose</code>, this event is only a notification. The
client sends this event after opening or closing the component.</p>
<p>It is useful to implement load-on-demand by listening to the
<code>onOpen</code> event, and creating components when the first time
the component is opened.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`
