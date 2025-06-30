**Property:**

`org.zkoss.zk.ui.sys.XMLResourcesLocator.class`

Default:  `none`` (it implies `org.zkoss.util.resource.ClassLocator`)`

It specifies the name of the class used to load `metainfo/config.xml`,
`metainfo/lang.xml` and `metainfo/lang-addon.xml`. By default, they are
loaded from the class path. If you prefer to load them from other
locations, implement the
`org.zkoss.util.resource.XMLResourcesLocator`
interface.

- Notice that you can specify the property in `WEB-INF/zk.xml`, since it
  is too late. Rather, you have to specify in the server's configuration
  (as a system property).
