**Syntax:**

```xml
<engine-class>a_class_name</engine-class>
```

`[Default: `org.zkoss.zk.ui.impl.UiEngineImpl`]`

It specifies which class is used to implement the UI Engine. The class
must have a default constructor (without any argument), and implement
the [org.zkoss.zk.ui.sys.UiEngine](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiEngine.html)
interface.

One instance of the UI engine is created and shared for each Web
application, so you have to synchronize the access properly.


