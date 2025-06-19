

# Html Macro Component

- Demonstration: N/A
- Java API: [org.zkoss.zk.ui.HtmlMacroComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlMacroComponent.html)
- JavaScript API: N/A

# Employment/Purpose

The base class for macro components.

{% include version-badge.html version=5.0.4 %} By default invoking
<javadoc method="afterCompose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
supports auto forward events and wire accessible variables to this
component.

For example, (usemacro.zul)

```xml
<?init zscript="macro.zs"?>
<?component name="username" macroURI="macro.zul" class="Username"?>
<window id="wnd">
    <username id="ua"/>
    <username label="Account"/>
</window>
```

(macro.zs)

```java
import org.zkoss.zk.ui.*;
import org.zkoss.zul.*;

public class Username extends HtmlMacroComponent {
    Button btn; // auto wire
    
    // auto forward
    public void onClick$btn () {
        System.out.println("success... and btn varible is not null : " + (btn != null));
    }
};
```

(macro.zul)

```xml
<grid id="mc_grid">
    <rows>
        <row id="r">
            <button label="${empty arg.label ? 'Username': arg.label}" id="btn"/>
        </row>
    </rows>
</grid>
```

If you want to turn off the auto wiring mechanism, please refer to the
following steps:

Turn off auto wire mechanism by specifying the Library Property
"org.zkoss.zk.ui.macro.autowire.disabled" to "true" in WEB-INF/zk.xml.
If you did not specify the Library Property, the default is false.

```xml
<library-property>
    <name>org.zkoss.zk.ui.macro.autowire.disabled</name>
        <value>true</value>
</library-property>
```

or turn off auto forward events by specifying the Library Property
"org.zkoss.zk.ui.macro.autoforward.disabled" to "true" in
WEB-INF/zk.xml. If you did not specify the Library Property, the default
is false.

```xml
<library-property>
    <name>org.zkoss.zk.ui.macro.autoforward.disabled</name>
        <value>true</value>
</library-property>
```

In the early version, if you want to apply the auto-wiring, you can
invoke
<javadoc method="wireVariables(org.zkoss.zk.ui.Component, java.lang.Object)">org.zkoss.zk.ui.Components</javadoc>
in
<javadoc method="afterCompose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
as follows.

```java
public void afterCompose() {
    super.afterCompose(); //create components

    Components.wireVariables(this, this);
    Components.addForward(this, this);
}
```

# Example

N/A

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

See also events inherited from [ HtmlBasedComponent's Supported Events]({{site.baseurl}}/zk_component_ref/base_components/htmlbasedcomponent#Supported_events).

# Supported Children

`*ALL`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date        | Content                                                                                                                                                                                                                                     |
|---------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.3   | June 2010   | The corresponding DOM element is customizable. It defaults to SPAN (the same as prior version) but you can change it to any tag by use of <javadoc method="setEnclosingTag(java.lang.String)">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>. |
| 5.0.4   | August 2010 | By default, invoking <javadoc method="afterCompose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc> supports auto forward events and wire accessible variables to this component.                                                            |


