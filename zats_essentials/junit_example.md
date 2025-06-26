

We write the test case with JUnit 4 annotation, please refer to [JUnit 4 tutorial](http://www.vogella.com/tutorials/JUnit/article.html).

The following test case will mimic a user clicking the button and verify
whether the label's value is "Hello Mimic" or not.

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
        Assert.assertEquals("Hello Mimic", label.as(Label.class).getValue());
    }
}
```

- Before starting a test, we have to call `Zats.init()` and pass **root
  directory** where ZUL pages are stored as a parameter. Most of the
  times, it is located in your web application's content root folder. In
  our example, we use maven default project structure. This method
  initializes testing environment and starts the server emulator. (line
  5)

<!-- -->

- Of course, we start the server emulator at `@BeforeClass`, we should
  stop it by `Zats.end()` at `@AfterClass`. (line 10)

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

 
