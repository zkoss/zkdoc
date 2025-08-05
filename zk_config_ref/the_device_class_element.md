---
title: "The device-class Element"
---

**Syntax:**

```xml
<device-class>a_class_name</device-class>
```

`[Optional]`

It specifies the implementation class. The class must implement the
[org.zkoss.zk.device.Device](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/device/Device.html)
interface. Instead of implementing it from scratch, you can derive from
the proper implementation, such as
`org.zkoss.zk.device.AjaxDevice`.

```xml
<device-config>
    <device-type>ajax</device-type>
    <device-class>my.MyAjaxDevice</device-class>
</device-config>
```


