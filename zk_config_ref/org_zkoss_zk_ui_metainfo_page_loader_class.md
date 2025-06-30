**Property:**

`org.zkoss.zk.ui.metainfo.page.Loader.class`

Default:  `none`

It specifies the name of the class used to load the page definitions.
The class must implement the
`org.zkoss.util.resource.Loader` interface and it must
have a constructor as follows.

```java
public FooLoader(org.zkoss.zk.ui.WebApp wapp) { //assume FooLoader is the implementation class
     ...
```

The default iimplementation is straightforward:

```java
private static class MyLoader extends org.zkoss.web.util.resource.ResourceLoader {
    private final WebApp _wapp;
    private MyLoader(WebApp wapp) {
        _wapp = wapp;
    }

    //-- super --//
    protected Object parse(String path, File file, Object extra)
    throws Exception {
        final Locator locator =
            extra != null ? (Locator)extra: getLocator(_wapp, path);
        return new Parser(_wapp, locator).parse(file, path);
    }
    protected Object parse(String path, URL url, Object extra)
    throws Exception {
        final Locator locator =
            extra != null ? (Locator)extra: getLocator(_wapp, path);
        return new Parser(_wapp, locator).parse(url, path);
    }
}
```

# Version History

| Version | Date        | Content                                                                                                              |
|---------|-------------|----------------------------------------------------------------------------------------------------------------------|
| 5.0.4   | August 2010 | **org.zkoss.zk.ui.metainfo.page.Loader.class** It specifies the name of the class used to load the page definitions. |
