

# Timer

- Demonstration: [Timer](http://www.zkoss.org/zkdemo/userguide/#u3)
- Java API: [org.zkoss.zul.Timer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Timer.html)
- JavaScript API: [zul.utl.Timer](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.utl.Timer.html)


# Employment/Purpose

Timer is a special component that is invisible. It fires one or more
org.zkoss.zk.ui.event.Event after a specified delay, notice that the
timer won't fire any event until it is attached to a page.

# Example

```xml
<label id="now" />
<timer id="timer" delay="1000" repeats="true"
    onTimer="now.setValue(new Date().toString())" />
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
<p><code>onTimer</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)</p>
<p>Denotes the timer you specified has triggered an event. To know which
timer, invoke the <code>getTarget</code> method in the Event
class.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`*NONE`
