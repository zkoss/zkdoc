**Property:**

`org.zkoss.zk.ui.sys.XMLResourcesLocator.class`

`Default: `<i>`none`</i>` (it implies `<javadoc>`org.zkoss.util.resource.ClassLocator`</javadoc>`)`

It specifies the name of the class used to load `metainfo/config.xml`,
`metainfo/lang.xml` and `metainfo/lang-addon.xml`. By default, they are
loaded from the class path. If you prefer to load them from other
locations, implement the
<javadoc>org.zkoss.util.resource.XMLResourcesLocator</javadoc>
interface.

- Notice that you can specify the property in `WEB-INF/zk.xml`, since it
  is too late. Rather, you have to specify in the server's configuration
  (as a system property).
