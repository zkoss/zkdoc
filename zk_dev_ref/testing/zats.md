# Overview

**ZK Application Test Suite** (**ZATS**) is a collection of tools which
can help users test their ZK-based application. This suite has following
modules:

[ ZATS Mimic]({{site.baseurl}}/zats_essentials/mimic_library), a unit-test
library that can be used with any well-known unit test framework (e.g.
JUnit and TestNG) to test your ZUL without an application server or a
browser.

ZATS Mimic enables developers to test their composer **without an
application server** and of course **without a browser** either. Through
this library, testers can mimic user interactions with applications such
as clicking or typing to verify composer's (controller layer) data and
logic. All they have to do is to **write a regular unit test case** and
use Mimic's utility class to interact with components on ZUL and then,
run the test case.

No deploying to server, no rendering on browser, the unit test case can
be executed in a very short period of time - this is very helpful for
frequent unit testing during an agile development process.

The concept is as follows:

![]({{site.baseurl}}/zk_dev_ref/images/smalltalk-zatsmimicconcept.png)

Testers write test cases to simulate user actions such as clicking or
typing with operation agents. Operation agent communicates with server
emulator and triggers the composer's event handlers to change the
component's status. Testers are able to check component's properties
from the component agent to verify the result of user action. It might
be a *label* changing its value or a *listbox* increasing by one item.
**All behaviors that reflect on the component's properties can be
verified.**

# Test Case Sample

We have an application to test here. This application only has one label
and one button with no other content at first. It has only one function:
when a user clicks the button, the label shows "Hello Mimic" as shown in
the image below. We are going to verify this behavior.

![]({{site.baseurl}}/zk_dev_ref/images/smalltalk-mimic-hello.png)

**ZUL of our simple application**

```xml

<zk>
    <window title="hello" border="normal" width="300px" apply="org.zkoss.zats.example.hello.HelloComposer">
        <label />
        <button label="Hello" />
    </window>
</zk>
```

**Composer of our simple application**

```java

public class HelloComposer extends SelectorComposer {
    
    @Wire("label")
    Label label;
    
    @Listen("onClick = button")
    public void hello(){
        label.setValue("Hello Mimic");
    }
}
```

We write the test case with JUnit 4 annotation, please refer to [JUnit 4
in 60 seconds](http://www.cavdar.net/2008/07/21/junit-4-in-60-seconds).

The following test case will mimic a user clicking the button and verify
whether or not the label's value is "Hello Mimic".

'''HelloTest.java"

```java

//remove import for brevity
public class HelloTest {
    @BeforeClass
    public static void init() {
        Zats.init("./src/main/webapp"); 
    }

    @AfterClass
    public static void end() {
        Zats.end();
    }

    @After
    public void after() {
        Zats.cleanup();
    }

    @Test
    public void test() {
        DesktopAgent desktop = Zats.newClient().connect("/hello.zul");

        ComponentAgent button = desktop.query("button");
        ComponentAgent label = desktop.query("label");
        
        //button.as(ClickAgent.class).click();
        button.click();
        assertEquals("Hello Mimic", label.as(Label.class).getValue());
    }
}
```

- Before starting a test, we have to call `Zats.init()` and pass **root
  directory** where ZUL pages are stored as a parameter. Most of the
  time, it is located in your web application's content root folder. In
  our example, we use maven default project structure. This method
  initializes testing environment and starts the server emulator. (line
  5)

<!-- -->

- Of course, since we start the server emulator at `@BeforeClass`, we
  should stop it by `Zats.end()` at `@AfterClass`. (line 10)

<!-- -->

- We should call `Zats.cleanup()` to clear desktop before opening
  another ZUL. (line 15)

<!-- -->

- The first statement of a test case is to create a client and connect
  it to a ZUL page, like a browser visiting a ZUL. The `connect()`
  returns a `DesktopAgent` and we usually retrieve `ComponentAgent` from
  it to perform user operation. (line 20)

<!-- -->

- Before we can mimic a user action to a component, we should **retrieve
  a ComponentAgent**. Empowered by selector syntax,
  `DesktopAgent .query()` is a powerful tool to retrieve it. As the ZUL
  contains only one button, we can query it by component name:
  `query("button")` (line 22)

<!-- -->

- As we do not have a browser screen to view, we cannot interact with a
  component by mouse's pointer. To mimic a user action, we have to
  convert `ComponentAgent` to one of the operation agents. The
  conversion method `as()` will check for available operation for the
  target `ComponentAgent`. For example, you cannot type something in a
  <b>Label</b>, If you try to convert it to an unsupported operation
  agent, you will get an exception. (line 25)

<!-- -->

- For convenience, `ComponentAgent` provides shortcut methods for
  commonly used operations like `click()` ; it automatically gets
  operation agent and calls it for you. (line 26)

<!-- -->

- To verify test result, we can also use `ComponentAgent.as()` to
  convert it to a ZK component then get its property by getter methods.
  (line 27)

# Version History

| Version | Date | Content  |
|---------|------|----------|
| 6.0.0   |      | overview |
