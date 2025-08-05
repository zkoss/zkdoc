---
title: "Customize Test Environment"
---



In a test case, we usually use `Zats` to initialize the test case
environment, it will load **Mimic built-in web.xml** and **zk.xml**.

```java

    @BeforeClass
    public static void init(){
        Zats.init("./src/main/webapp");
    }

    @AfterClass
    public static void end(){
        Zats.end();
    }

    @Test
    public void test(){
        DesktopAgent desktop = Zats.newClient().connect("/index.zul");
        //...

    }
```

## Custom WEB-INF Path

However, most projects have their custom configuration in **web.xml** or
need another one for testing purpose. Mimic provides a way to load
custom web descriptor by specifying your **WEB-INF** folder.

First, create your own `ZatsEnvironment` by
**`new DefaultZatsEnvironment("./src/test/env1/WEB-INF")`** with your
"WEB-INF" path as the parameter. Then, use it to **create a client** to
connect to ZUL. The rest are the same as you do under default
configuration.

```java

public class EnvironmentTest{

    static ZatsEnvironment env; 

    @BeforeClass
    public static void init(){
        env = new DefaultZatsEnvironment("./src/test/env1/WEB-INF");
        env.init("./src/main/webapp"); 
    }

    @AfterClass
    public static void end(){
        env.destroy();
    }

    @Test
    public void testCustomConfig() {

        Client client = env.newClient();
        DesktopAgent desktop = client.connect("/custom-config.zul");
        //...
    }
}
```

## Custom Context Path

Beside WEB-INF's path, you can also specify your **web application
context root path** by passing 2nd parameter to
`DefaultZatsEnvironment`'s constructor.

```java

public class EnvironmentTest{

    static ZatsEnvironment env; 

    @BeforeClass
    public static void init(){
        env = new DefaultZatsEnvironment("./src/test/env1/WEB-INF", "/myapp");
        env.init("./src/main/webapp"); 
    }
}
```

 
