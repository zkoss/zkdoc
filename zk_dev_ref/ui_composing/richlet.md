

# Overview

A richlet is a small Java program that composes a user interface in Java
for serving the user's request. Before composing UI in Java, we suggest
you to know basic concept:[ UI Composing/Component-based
UI]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui)
first.

When a user requests the content of an URL, ZK Loader checks if the
resource of the specified URL is a ZUML page or a richlet. If it is a
ZUML page, ZK Loader will create components automatically based on the
ZUML page's content as we described in the previous chapters.

If the resource is a richlet, ZK Loader hands over the processing to the
richlet. What and how to create components are all handled by the
richlet. In other words, it is the developer's job to create all the
necessary components programmatically in response to the request.

The choice between the ZUML pages and richlets depends on your
preference. However, the performance should not cause any concern since
parsing ZUML is optimized.

# Implement a Richlet

It is straightforward to implement a richlet. First, you have to
implement the
<javadoc typpe="interface">org.zkoss.zk.ui.Richlet</javadoc> interface
before mapping a URL to the richlet.

## Implement a Richlet as a Java class

A richlet must implement the
<javadoc type="interface">org.zkoss.zk.ui.Richlet</javadoc> interface.
However, you generally do not have to implement it from scratch. Rather,
you could extend <javadoc>org.zkoss.zk.ui.GenericRichlet</javadoc>, and
the only thing you have to do is to override
<javadoc method="service(org.zkoss.zk.ui.Page)">org.zkoss.zk.ui.Richlet</javadoc>.
The method is called when an associated URL is requested. For example,

```java
 package org.zkoss.reference.developer.uicomposing;

import org.zkoss.zk.ui.*;
import org.zkoss.zk.ui.event.*;
import org.zkoss.zul.*;

public class TestRichlet extends GenericRichlet {
    //Richlet//
    public void service(Page page) {
        page.setTitle("Richlet Test");

        final Window w = new Window("Richlet Test", "normal", false);
        new Label("Hello World!").setParent(w);
        final Label l = new Label();
        l.setParent(w);

        final Button b = new Button("Change");
        b.addEventListener(Events.ON_CLICK,
                new EventListener() {
            int count;
            public void onEvent(Event evt) {
                l.setValue("" + ++count);
            }
        });
        b.setParent(w);

        w.setPage(page);
    }

    @Override
    public void init(RichletConfig config) {
        super.init(config);
        //initialize resources
    }

    @Override
    public void destroy() {
        super.destroy();
        //destroy resources
    }
}
```

In Richlet, you have to compose UI on your own, but some components only
support specific child components. We recommend you to read [ZK
Component Reference](ZK_Component_Reference) before you start
to build.

As shown above (line 27), we have to invoke
<javadoc method="setPage(Page page)">org.zkoss.zk.ui.Component</javadoc>
explicitly to attach a root component to a page so it will be available
at the client.

To have better control, you can even implement the
<javadoc method="init(org.zkoss.zk.ui.RichletConfig)">org.zkoss.zk.ui.Richlet</javadoc>
and <javadoc method="destroy()">org.zkoss.zk.ui.Richlet</javadoc>
methods to initialize and to destroy any resources required by the
richlet when it is loaded.

In addition, you could implement
<javadoc method="getLanguageDefinition()">org.zkoss.zk.ui.Richlet</javadoc>
to use a different language as default (for example, implementing a
richlet for [mobile devices](http://code.google.com/p/zkreach/)). By
default, [ZUL](ZUML_Reference/ZUML/Languages/ZUL) (aka.,
xul/html) is assumed.

## Richlet Must Be Thread-Safe

Like a servlet, a single instance of richlet is created and shared with
all users for all requests for the mapped URL. A richlet must handle the
concurrent requests, and be careful to synchronize access to shared
resources. In other words, a richlet (the implementation of the
`service` method) must be thread-safe.

## Don't Share Components

When a request (not Ajax request but regular HTTP request) is made by a
user, a <javadoc>org.zkoss.zk.ui.Desktop</javadoc> and a
<javadoc>org.zkoss.zk.ui.Page</javadoc> are created first, and then
<javadoc method="service(org.zkoss.zk.ui.Page)">org.zkoss.zk.ui.Richlet</javadoc>
is invoked to serve the request[^1]. In other words, each request is
served with an individual desktop and page. Therefore, we *cannot* share
components among different invocations of
<javadoc method="service(org.zkoss.zk.ui.Page)">org.zkoss.zk.ui.Richlet</javadoc>.

For example, the following code is illegal:

```java
public class MyRichlet extends GenericRichlet {
    private Window main; //Not a good idea to share
    public void service(Page page) {
        if (main == null) {
            main = new Window();
        }
        main.setPage(main); //ERROR! Causes an exception if the same URL is requested twice!
...
```

Why? Each desktop should have its own set of component instances[^2].
When the URL associated **MyRichlet** is requested a second time, an
exception will be thrown because the **main** window is already
instantiated and associated with the first desktop created from the
first request. We cannot assign it to the second desktop.

> ------------------------------------------------------------------------
>
> <references/>

# Map URL to a Richlet

To map URL to a richlet, there are two steps.

1.  Turn on the support of Richlet (in `WEB-INF/web.xml`)
2.  Map URL pattern to Richlet (in `WEB-INF/zk.xml`)

## Turn on Richlet

By default, richlets are disabled. To enable them, please add the
following declaration to `WEB-INF/web.xml`. Once enabled, you can add as
many richlets as you want without modifying `web.xml`.

With servlet-mapping:

```xml
<servlet-mapping>
    <servlet-name>zkLoader</servlet-name>
    <url-pattern>/zk/*</url-pattern>
</servlet-mapping>
```

You can use `RichletFilter` instead.

```xml
<filter>
    <filter-name>RichletFilter</filter-name>
    <filter-class>org.zkoss.zk.ui.http.RichletFilter</filter-class>
</filter>

<filter-mapping>
    <filter-name>RichletFilter</filter-name>
    <url-pattern>/zk/*</url-pattern>
</filter-mapping>
```

where you can replace `/zk/*` with any pattern you like, such as
`/do/*`. Notice that you *cannot* map it to an extension (such as
`*.do`) since it will be considered as a ZUML page (rather than a
richlet).

## Map URL pattern to Richlet

For each richlet you implement, you can define it in `WEB-INF/zk.xml`
with the statement similar to the following:

```xml
<richlet>
    <richlet-name>Test</richlet-name><!-- your preferred name -->
    <richlet-class>org.zkoss.zkdemo.TestRichlet</richlet-class><!-- your class name, of course -->
</richlet>
```

After defining a richlet, you can map it to any number of URLs using the
`richlet-mapping` element as shown below.

```xml
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/test</url-pattern>
</richlet-mapping>
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/some/more/*</url-pattern>
</richlet-mapping>
```

**Note:** With Richlet Filter (since ZK 7.0.0), you should add the
prefix of url-pattern of the filter-mapping into the url-pattern of
richlet-mapping. For example,

```xml
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/test</url-pattern>
</richlet-mapping>
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/zk/some/more/*</url-pattern>
</richlet-mapping>
```

As you can see in the highlight above, the **/zk** is added which is
according to the filter-mapping.

Then, you can visit
[<http://localhost:8080/PROJECT_NAME/zk/test>](http://localhost:8080/PROJECT_NAME/zk/test)
to request the richlet.

The URL specified in the `url-pattern` element must start with `/`. If
the URI ends with `/*`, it is matched to all requests with the same
prefix. To retrieve the request's actual URL, you can check the value
returned by the `getRequestPath` method of the current page.

```java
 public void service(Page page) {
     if ("/some/more/hi".equals(page.getRequestPath()) {
         ...
     }
 }
```

> ---- **Tip**: By specifying `/*` as the `url-pattern`, you can map all
> unmatched URLs to your richlet.

# Load ZUML in Richlet

<javadoc>org.zkoss.zk.ui.Execution</javadoc> provides a collection of
methods, such as
<javadoc method="createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)">org.zkoss.zk.ui.Execution</javadoc>,
allowing developers to load ZUML documents dynamically. You could load a
ZUML document from any source you like, such as database. Please refer
to the [Load ZUML in
Java]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/load_zuml_in_java)
for details.

# Use Spring in Richlet

To use Spring-managed beans in richlets you need the context loader
listener that creates spring application context as described in [ZK
Spring Essentials/Getting Started with ZK Spring/Setting Up ZK
Spring]({{site.baseurl}}/zk_spring_essentials/getting_started_with_zk_spring/setting_up_zk_spring).
Then you could load Spring beans by using a utility class
<javadoc>org.zkoss.zkplus.spring.SpringUtil</javadoc>:

```java
    Object bean = SpringUtil.getBean(beanName);
```

[^1]: A normal HTTP request; not an Ajax request. Ajax requests are
    handled in the same way as ZUML. For more information please refer
    to the [Event
    Handling]({{site.baseurl}}/zk_dev_ref/event_handling)
    section

[^2]: For more information, please refer to [Component-based
    UI]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui)
    section
