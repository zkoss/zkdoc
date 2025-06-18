

# Timer

- Demonstration: [Timer](http://www.zkoss.org/zkdemo/userguide/#u3)
- Java API: <javadoc>org.zkoss.zul.Timer</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.utl.Timer</javadoc>


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
<javadoc>org.zkoss.zk.ui.event.Event</javadoc></p>
<p>Denotes the timer you specified has triggered an event. To know which
timer, invoke the <code>getTarget</code> method in the Event
class.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/base_components/htmlbasedcomponent#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


