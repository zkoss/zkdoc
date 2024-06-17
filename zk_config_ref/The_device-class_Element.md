**Syntax:**

<device-class>*`a_class_name`*</device-class>

`[Optional]`

It specifies the implementation class. The class must implement the
<javadoc type="interface">org.zkoss.zk.device.Device</javadoc>
interface. Instead of implementing it from scratch, you can derive from
the proper implementation, such as
<javadoc>org.zkoss.zk.device.AjaxDevice</javadoc>.

``` xml
<device-config>
    <device-type>ajax</device-type>
    <device-class>my.MyAjaxDevice</device-class>
</device-config>
```

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
