

`Since 1.1.0`

ZK provides the [org.zkoss.zul.Include](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Include.html) component[^1]
and
<javadoc method="createComponents(String, Component, Map)">org.zkoss.zk.ui.Execution</javadoc>
method[^2] to include and/or reuse ZUL pages or others such as servlet
or JSP. In ZATS Mimic, we can test ZUL pages which are included by outer
pages directly; simply use the `Client.connect(String)` method to
connect to the ZUL page (like how you would normally do) you want to
test.

For more details, please refer to [ZK Developer's Reference/UI_Composing/ZUML/Include]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/include), [ZK Component Reference/essential_components/Include]({{site.baseurl}}/zk_component_ref/essential_components/include), and [ZK Developer's Reference/ui_composing/ZUML/Load_ZUML_in_Java]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/load_zuml_in_java)


# Test Included ZUL Pages with Arguments

Sometimes, however, we pass some arguments, which can be retrieved from
implicit objects
[arg](ZUML_Reference/EL_Expressions/Implicit_Objects/arg) to
included ZUL pages for flexibility. ZATS Mimic therefore introduces a
new connecting method
`Client.connectAsIncluded(String, Map<String, Object>)` with the ability
to connect to an included a ZUL page with specific arguments. Following
is a typical example:

**included.zul**

```xml
<zk>
    <label id="msg" value="${arg.message}" />
</zk>
```

- **Line 2**: Value is retrieved from arguments.

**Test.java**

```java
@Test
public void test() {
    Map<String, Object> args = new HashMap<String, Object>();
    args.put("message", "Hello world!");
    Client client = Zats.newClient();
    DesktopAgent desktop = client.connectAsIncluded("/included.zul", args);
    Label msg = desktop.query("#msg").as(Label.class);
    Assert.assertEquals("Hello world!", msg.getValue());
}
```

- **Line 12-13**: Prepare arguments for included ZUL page.
- **Line 15**: Connect to included ZUL page with arguments.

