# Build UI in Java

If you come from Java Swing, you are used to constructing a UI entirely in Java — creating a `JFrame`, attaching child widgets, and wiring listeners without touching any markup. ZK supports the same style. You can build a full ZK page as a Java object tree, with no ZUL file required (or only a minimal one as an entry point).

ZK offers two approaches for Java-first UI composition.

# Approach 1: Richlet

A Richlet is the closest ZK equivalent to a Swing application class. Extend `GenericRichlet` and override the `service(Page page)` method. ZK calls this method when a user requests the mapped URL, and everything you create inside it becomes the page.

```java
public class MyRichlet extends GenericRichlet {
    public void service(Page page) {
        page.setTitle("Hello from Java");

        Window w = new Window("My Window", "normal", false);
        new Label("Hello World!").setParent(w);

        Button b = new Button("Click me");
        b.addEventListener(Events.ON_CLICK, evt -> {
            // handle click
        });
        b.setParent(w);

        w.setPage(page); // attach the tree to the page
    }
}
```

The call to `w.setPage(page)` is required — it attaches the root component to the page, triggering the render.

For setup (URL mapping in `zk.xml` and `web.xml`) and further details, see [Richlet]({{site.baseurl}}/zk_dev_ref/ui_composing/richlet).

# Approach 2: Java Composer with a Minimal ZUL Entry Point

If your project already uses ZUL pages, or you want ZK to handle URL routing, you can keep a thin ZUL file as the page entry point and build all the UI content in Java.

The ZUL file declares only a root container and names the Composer class:

```xml
<window apply="com.example.MyComposer" />
```

Inside `MyComposer`, you receive the `Window` component and create all children programmatically:

```java
public class MyComposer extends SelectorComposer<Window> {
    @Override
    public void doAfterCompose(Window root) throws Exception {
        super.doAfterCompose(root);

        Label label = new Label("Hello World!");
        label.setParent(root);

        Button btn = new Button("Click me");
        btn.setParent(root);
    }
}
```

This keeps URL routing and page lifecycle in ZK's hands while letting you write all component logic in plain Java.

For a deeper comparison of the two styles and the hybrid pattern, see [ZUL vs. Java API]({{site.baseurl}}/zk_dev_ref/ui_composing/zul_vs_java).

# Which Approach to Choose

| | Richlet | Composer + ZUL |
|---|---|---|
| ZUL files needed | None | One minimal file per page |
| URL routing | Configured manually in `zk.xml` | Handled by ZK's normal page mapping |
| Best for | Standalone Java-first apps | Adding Java-built screens to an existing ZK project |
