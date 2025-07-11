# Html Macro Component

- Java API: [org.zkoss.zk.ui.HtmlMacroComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlMacroComponent.html)

## Employment/Purpose

The Html Macro Component serves as the base class for macro components in ZK. By default, invoking the `afterCompose()` method of `org.zkoss.zk.ui.HtmlMacroComponent` supports auto forwarding events and wiring accessible variables to the component. This feature facilitates the development of reusable components with predefined behaviors, reducing the amount of manual coding required for event handling and variable access.

## Example

The Html Macro Component example demonstrates the creation of a reusable "Username" macro component containing a Button component that responds to the `onClick` event.

1. **macro.zul**:
```xml
<grid id="mc_grid">
	<rows>
		<row id="r">
			<button label="${empty arg.label ? 'Username': arg.label}" id="btn"/>
		</row>
	</rows>
</grid>
```

2. **macro.zs**:
```java
import org.zkoss.zul.*;
import org.zkoss.zk.ui.*;

public class Username extends HtmlMacroComponent {
	Button btn; // auto wire
	
	// auto forward
	public void onClick$btn () {
		System.out.println("Success... and btn variable is not null: " + (btn != null));
	}
}
```

3. **usemacro.zul**:
```xml
<?init zscript="macro.zs"?>
<?component name="username" macroURI="macro.zul" class="Username"?>
<window id="wnd">
	<username id="ua"/>
	<username label="Account"/>
</window>
```

The above code snippets showcase the definition of the "Username" macro component, its usage in a ZUL file, and the handling of the `onClick` event for the Button component within the macro.

## Configuration

To customize the auto wiring mechanism for macro components, you can modify the Library Properties in the `WEB-INF/zk.xml` file.

### Turn off auto wire mechanism
To disable auto-wiring, set the `org.zkoss.zk.ui.macro.autowire.disabled` property to `true`.

```xml
<library-property>
	<name>org.zkoss.zk.ui.macro.autowire.disabled</name>
    <value>true</value>
</library-property>
```

### Turn off auto forward events
To disable auto forwarding of events, set the `org.zkoss.zk.ui.macro.autoforward.disabled` property to `true`.

```xml
<library-property>
	<name>org.zkoss.zk.ui.macro.autoforward.disabled</name>
    <value>true</value>
</library-property>
```

## Supported Children

`*ALL`: Indicates that the `HtmlMacroComponent` can have any kind of ZK component as its child element. This means that you can include any ZK component within the custom component that extends `HtmlMacroComponent`, providing flexibility and customization options for your designs.