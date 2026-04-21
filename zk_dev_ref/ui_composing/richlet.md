
# Overview

A **Richlet** is a small Java class that builds a ZK page entirely in Java code, without any ZUML markup. It gives you full programmatic control over component creation — useful when the UI structure is highly dynamic, generated from data, or when you simply prefer Java over XML.

If you are deciding between ZUML pages and richlets, see [UI Composing: ZUL vs. Java]({{site.baseurl}}/zk_dev_ref/ui_composing/zul_vs_java) for a comparison. For the component model that both approaches share, start with [Component-based UI]({{site.baseurl}}/zk_dev_ref/ui_composing/component_based_ui).

**How ZK routes a request:**

```
HTTP Request
     │
     ▼
 ZK Loader
     │
     ├─── ZUML page? ──► parses markup, creates components automatically
     │
     └─── Richlet?   ──► calls Richlet.service(page) — you create components
```

The choice between ZUML and richlets is a matter of preference; parsing ZUML is optimized and carries no significant performance penalty.

# Implement a Richlet

It is straightforward to implement a richlet. First, you have to
implement the
[org.zkoss.zk.ui.Richlet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html) interface
before mapping a URL to the richlet.

## Implement a Richlet as a Java class

A richlet must implement the
[org.zkoss.zk.ui.Richlet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html) interface.
However, you generally do not have to implement it from scratch. Rather,
you could extend [org.zkoss.zk.ui.GenericRichlet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/GenericRichlet.html), and
the only thing you have to do is to override
[org.zkoss.zk.ui.Richlet#service(org.zkoss.zk.ui.Page)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html#service(org.zkoss.zk.ui.Page)).
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
support specific child components. We recommend you to read [ZK Component Reference](/zk_component_ref/introduction)) before you start
to build.

As shown above (line 27), we have to invoke
[org.zkoss.zk.ui.Component#setPage(Page page)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setPage(Page page))
explicitly to attach a root component to a page so it will be available
at the client.

To have better control, you can even implement the
[org.zkoss.zk.ui.Richlet#init(org.zkoss.zk.ui.RichletConfig)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html#init(org.zkoss.zk.ui.RichletConfig))
and [org.zkoss.zk.ui.Richlet#destroy()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html#destroy())
methods to initialize and to destroy any resources required by the
richlet when it is loaded.

In addition, you could implement
[org.zkoss.zk.ui.Richlet#getLanguageDefinition()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html#getLanguageDefinition())
to use a different language as default (for example, implementing a
richlet for [mobile devices](http://code.google.com/p/zkreach/)). By
default, [ZUL](/zuml_ref/zul) (aka.,
xul/html) is assumed.

## Richlet Must Be Thread-Safe

A richlet works exactly like a Servlet: **one instance is created and shared across all concurrent requests** for the mapped URL. This means instance fields are inherently shared state and are unsafe without synchronization. Keep shared data out of fields — declare variables that belong to a single request as local variables inside `service()` instead.

## Don't Share Components

When a request (not Ajax request but regular HTTP request) is made by a
user, a [org.zkoss.zk.ui.Desktop](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Desktop.html) and a
[org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html) are created first, and then
[org.zkoss.zk.ui.Richlet#service(org.zkoss.zk.ui.Page)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html#service(org.zkoss.zk.ui.Page))
is invoked to serve the request[^1]. In other words, each request is
served with an individual desktop and page. Therefore, we *cannot* share
components among different invocations of
[org.zkoss.zk.ui.Richlet#service(org.zkoss.zk.ui.Page)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Richlet.html#service(org.zkoss.zk.ui.Page)).

For example, the following code is **incorrect**:

```java
public class MyRichlet extends GenericRichlet {
    private Window main; // WRONG: shared instance field
    public void service(Page page) {
        if (main == null) {
            main = new Window();
        }
        main.setPage(page); // ERROR on second request: main is already attached to the first desktop
    }
}
```

Each desktop must have its own component instances[^2]. When the URL is requested a second time, `main` is still attached to the first desktop and cannot be reassigned — ZK throws an exception.

**Correct pattern** — create components as local variables inside `service()`:

```java
public class MyRichlet extends GenericRichlet {
    public void service(Page page) {
        Window main = new Window(); // local variable: one per request
        main.setPage(page);
    }
}
```

# Map URL to a Richlet

To map URL to a richlet, there are two steps.

1.  Turn on the support of Richlet (in `WEB-INF/web.xml`)
2.  Map URL pattern to Richlet (in `WEB-INF/zk.xml`)

## Turn on Richlet

By default, richlets are disabled. To enable them, please add the
following declaration to `WEB-INF/web.xml`. Once enabled, you can add as
many richlets as you want without modifying `web.xml`.

There are two ways to enable richlets. Choose based on your deployment setup:

| Approach | When to use |
|---|---|
| `servlet-mapping` | Simpler; preferred when you control `web.xml` and do not need other filters to intercept the richlet URL first. |
| `RichletFilter` | Necessary when your container requires a filter chain (e.g., Spring Security filters must run before ZK), or when corporate policy disallows new servlet mappings. |

**Option 1 — servlet-mapping:**

```xml
<servlet-mapping>
    <servlet-name>zkLoader</servlet-name>
    <url-pattern>/zk/*</url-pattern>
</servlet-mapping>
```

**Option 2 — RichletFilter:**

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

Replace `/zk/*` with any prefix pattern you prefer, such as `/do/*`. You *cannot* use an extension pattern (e.g., `*.do`) — ZK would treat it as a ZUML page instead of a richlet.

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

Then, you can visit http://localhost:8080/CONTEXT_PATH/zk/test
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

**Tip**: By specifying `/*` as the `url-pattern`, you can map all unmatched URLs to your richlet.

# Load ZUML in Richlet

[org.zkoss.zk.ui.Execution](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html) provides a collection of
methods, such as
[org.zkoss.zk.ui.Execution#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)),
allowing developers to load ZUML documents dynamically. You could load a
ZUML document from any source you like, such as database. Please refer
to the [Load ZUML in Java]({{site.baseurl}}/zk_dev_ref/ui_composing/load_zuml_in_java)
for details.

# Use Spring in Richlet

To use Spring-managed beans in richlets you need the context loader
listener that creates spring application context as described in [ZK Spring Essentials/Getting Started with ZK Spring/Setting Up ZK Spring]({{site.baseurl}}/zk_spring_essentials/setting_up_zk_spring).
Then you could load Spring beans by using a utility class
[org.zkoss.zkplus.spring.SpringUtil](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/SpringUtil.html):

```java
    Object bean = SpringUtil.getBean(beanName);
```

[^1]: A normal HTTP request; not an Ajax request. Ajax requests are
    handled in the same way as ZUML. For more information please refer
    to the [Event Handling]({{site.baseurl}}/zk_dev_ref/event_handling/event_handling)
    section

[^2]: For more information, please refer to [Component-based UI]({{site.baseurl}}/zk_dev_ref/ui_composing/component_based_ui)
    section
