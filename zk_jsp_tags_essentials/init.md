## init

**Syntax**

`<zk:init use="..." [`*`arg0`*`="..."] [`*`arg1`*`="..."]/>`

It defines an initiator that will be instantiated and called when the
ZUML document is loaded. The class must be specified in the `use`
attribute[^1], and it must implement
[org.zkoss.zk.ui.util.Initiator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Initiator.html).

For more information please refer to [ZUML Reference](zuml_ref/init).

Fir example,

```xml
<zk:init use="foo.MyInit"/>
...
<zk:page>
...
</zk:page>
```

Unlike ZUML, the attribute is called `use`, rather than `class`, because of the limitation of JSP.

