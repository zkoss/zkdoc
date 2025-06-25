**Syntax:**
```xml
<renderer-class>a_class</renderer-class>
```

`[Required for a language definition]`

It specifies the Java class used to render a page for the given
language. It must implement
[org.zkoss.zk.ui.sys.PageRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/PageRenderer.html).

Example,

```xml
<renderer-class>org.zkoss.zul.impl.PageRenderer</renderer-class>
```


