

This test case performs exactly the same as the JUnit one except that it
is written in TestNG's annotation, please refer to
[1](http://testng.org/doc/index.html).

To run a TestNG test case, please refer to [Run
TestNG](http://testng.org/doc/documentation-main.html#running-testng).

``` java

public class HelloTestNg {
    @BeforeClass
    public static void init() {
        Zats.init("./src/main/webapp");
    }

    @AfterClass
    public static void end() {
        Zats.end();
    }

    @AfterMethod
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

- It has little difference to the JUnit test case. You only need to
  change `@After` to `@AfterMethod` and `import org.junit.*` to
  `import org.testng.*`.

 
