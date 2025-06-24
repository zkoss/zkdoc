An AU service
([org.zkoss.zk.au.AuService](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/AuService.html)) is a
plugin used to intercept the AU requests
([org.zkoss.zk.au.AuRequest](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/AuRequest.html)) sent from the client.

By plugging in an AU service, you could

- Ignore some AU requests (such as [hostile requests]({{site.baseurl}}/zk_dev_ref/security_tips/block_request_for_inaccessible_widgets))
- Change the default way of handling an AU request
- Handle application-specific AU requests

To plug an AU service to a desktop, you could invoke
<javadoc method="addListener(java.lang.Object)" type="interface">org.zkoss.zk.ui.sys.Desktop</javadoc>.
You could plug as many AU services as you want. Once plugged, all AU
requests will go through the AU services (unless it was ignored by other
AU service).

If you want to plug a particular component, you could invoke
<javadoc method="setAuService(org.zkoss.zk.au.AuService)" type="interface">org.zkoss.zk.ui.Component</javadoc>.
Unlike desktops, a component can have at most one AU service.

If you want to plug an AU service, you could implement
[org.zkoss.zk.ui.util.DesktopInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/DesktopInit.html) and
register it in zk.xml as described in [Life Cycle Listener]({{site.baseurl}}/zk_dev_ref/customization/life_cycle_listener).

```java
public class MyDesktopInit implements DesktopInit {
    public void init(Desktop desktop, Object request) {
        desktop.addListener(new MyAuService()); //assume you have an AU service called MyAuService
    }
}
```
