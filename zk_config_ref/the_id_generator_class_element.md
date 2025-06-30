**Syntax:**

```xml
<id-generator-class>a_class_name</id-generator-class>
```

`[Default: `none`]`

It specifies which class should be used to generate the UUID of page and
components, and ID of desktops. The class must have a default
constructor (without any argument), and implement the
[org.zkoss.zk.ui.sys.IdGenerator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/IdGenerator.html)
interface.

One instance of the ID generator is created and shared for each Web
application, so you have to synchronize the access properly.

If no ID generator is specified, the default ID generation algorithm
will be used.


