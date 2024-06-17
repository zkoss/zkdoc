# AfterSizeEvent

- JavaDoc:<javadoc>org.zkoss.zk.ui.event.AfterSizeEvent</javadoc>

# Employment/Purpose

Represents an event that resizes and provides the new size of a
component.

# Example

Resize the window component to show different sized images accordingly.

``` xml
<window title="AfterSizeEvent" border="normal" width="250px" height="200px" 
maximizable="true" sizable="true">
    <attribute name="onAfterSize"><![CDATA[
        int width = event.getWidth();
        if (width >= 600){
            Clients.log(">600");
        }else if (width >= 400 && width < 600){
            Clients.log("400 ~ 600");
        }else{
            Clients.log("<400");
        }
    ]]></attribute>
</window>
```

# Version History

| Version | Date       | Content                                                                                |
|---------|------------|----------------------------------------------------------------------------------------|
| 6.5.2   | March 2013 | [Add onAfterSize event to get component size](http://tracker.zkoss.org/browse/ZK-1672) |
