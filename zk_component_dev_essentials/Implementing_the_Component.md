As previously mentioned a ZK Component consists of a server-side
component usually written in Java and a client based widget written in
JavaScript. Firstly let’s discuss the creation of the server-side
component.

The component’s Java class must extend
<javadoc>org.zkoss.zk.ui.AbstractComponent</javadoc> or one of its
derivative classes. There are several derived classes all providing
different levels of functionality. The derived classes are shown below.

![](images/ZKComDevEss_component_hierarchy.png")

For tutorial purpose, we use
<javadoc>org.zkoss.zk.ui.HtmlBasedComponent</javadoc>, which is the base
class for HTML-based component.

To implement a component class, we need to decide on

- The class name. Let’s name it <mp>com.foo.SimpleLabel</mp>
- The properties to support. In this case, we'd like to implement a
  property called value, which is the visual content at the client.

Let’s investigate the component properties.
