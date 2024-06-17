An AU service
(<javadoc type="interface">org.zkoss.zk.au.AuService</javadoc>) is a
plugin used to intercept the AU requests
(<javadoc>org.zkoss.zk.au.AuRequest</javadoc>) sent from the client.

By plugging in an AU service, you could

- Ignore some AU requests (such as [hostile
  requests](ZK_Developer's_Reference/Security_Tips/Block_Request_for_Inaccessible_Widgets))
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
<javadoc type="interface">org.zkoss.zk.ui.util.DesktopInit</javadoc> and
register it in zk.xml as described in [Life Cycle
Listener](ZK_Developer's_Reference/Customization/Life_Cycle_Listener).

``` java
public class MyDesktopInit implements DesktopInit {
    public void init(Desktop desktop, Object request) {
        desktop.addListener(new MyAuService()); //assume you have an AU service called MyAuService
    }
}
```
