

`Since 1.1.0`

Currently, ZATS Mimic supports many operations of ZK components,
however, there are still cases where operations are not yet covered. For
example, you create a custom component which receives custom [AU requests]({{site.baseurl}}/zk_client_side_ref/Communication/AU_Requests/Client-side_Firing),
or a new ZK component in which Mimic doesn't support yet. In such cases,
existing operation agents are not able to help you to test it.
Therefore, in ZATS Mimic1.1.0 we introduce a new agent called `AuAgent`
and it can help you perform custom operations with a condition that the
custom component must implement a particular interface:
<javadoc>org.zkoss.zk.ui.Component</javadoc>. You can then simulate your
component's custom operations by constructing your custom event data
with `AuData` and send it with `AuAgent.post()`.

About creating your custom components, please refer to [ZK Component Development Essentials]({{site.baseurl}}/zk_component_dev_essentials).

**Application with custom component**

``` xml
<mycomponent id="my" />
```

This test case simulates custom operation supported by your custom
component and verifies the result.

**Test Case**

``` java
    @Test
    public void test() throws Exception{
        DesktopAgent desktop = Zats.newClient().connect("/essentials/custom.zul");
        ComponentAgent mycomponent = desktop.query("mycomponent");
        AuData myEventData = new AuData("onMyEventName");
        myEventData.setData("mykey", "myvalue").setData("data", 10);
        mycomponent.as(AuAgent.class).post(myEventData);
        //verify result
    }
```

- Line 14,15: Construct the data carried by an AU request first, which
  would depend on how you design the component.
- Line 16: Like using other operation agents, get `AuAgent` from the
  component and invoke `post()` to perform an operation.

