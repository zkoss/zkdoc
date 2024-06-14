ZATS Mimic also supports the testing of
<javadoc>org.zkoss.zk.ui.Richlet</javadoc>.[^1] Simply customize a few
configurations for
[DefaultZatsEnvironment](http://www.zkoss.org/javadoc/latest/zats/org/zkoss/zats/mimic/DefaultZatsEnvironment.html)
and the test code would be no different to testing a ZUML file. ZATS
Mimic's built-in web configuration does not support Richlet, however, we
can specify the folder containing custom web configuration (**web.xml**
and **zk.xml**) for the testing environment through the constructor of
\[<http://www.zkoss.org/javadoc/latest/zats/org/zkoss/zats/mimic/DefaultZatsEnvironment.html#DefaultZatsEnvironment(java.lang.String>)
DefaultZatsEnvironment\] when testing `Richlet`.

Following is a simple `Richlet` example, we assume that the **web.xml**
and **zk.xml** are placed in the **src/main/webapp/WEB-INF** folder:

**web.xml**

``` xml
<servlet-mapping>
    <servlet-name>zkLoader</servlet-name>
    <url-pattern>/zk/*</url-pattern>
</servlet-mapping>
```

**zk.xml**

``` xml
<richlet>
    <richlet-name>MyRichlet</richlet-name>
    <richlet-class>foo.MyRichlet</richlet-class>
</richlet>
<richlet-mapping>
    <richlet-name>MyRichlet</richlet-name>
    <url-pattern>/foo</url-pattern>
</richlet-mapping>
```

**MyRichlet.java**

``` java
public class MyRichlet extends GenericRichlet {
    public void service(Page page) throws Exception {
        final Label message = new Label("foo");
        Button button = new Button("go");
        button.addEventListener(Events.ON_CLICK, new EventListener() {
            public void onEvent(Event event) throws Exception {
                message.setValue("bar");
            }
        });
        button.setId("btn");
        message.setId("msg");
        button.setPage(page);
        message.setPage(page);
    }
}
```

- **Line 12, 14, 16**: After clicking the button, text of the label will
  be changed.

------------------------------------------------------------------------

Following is a typical example of testing `Richlet`:

``` java
@Test
public void test() {
    DefaultZatsEnvironment env = new DefaultZatsEnvironment("./src/main/webapp/WEB-INF");
    try {
        env.init("./src/main/webapp");
        DesktopAgent desktop = env.newClient().connect("/zk/foo");
        Label msg = desktop.query("#msg").as(Label.class);
        Assert.assertEquals("foo", msg.getValue());
        desktop.query("#btn").click();
        Assert.assertEquals("bar", msg.getValue());
    }
    finally {
        env.destroy();
    }
}
```

- **Line 12**: Specify the folder containing web configuration for
  testing `Richlet`.
- **Line 22**: Release `DefaultZatsEnvironment` manually when the
  testing is done.

**Notes**

<references/>

[^1]: For more details, please refer to
    [ZK_Developer%27s_Reference/UI_Composing/Richlet](ZK_Developer%27s_Reference/UI_Composing/Richlet)
