---
title: "Cookie Handling"
---

 

`Since 1.1.0`

# Cookie Validation

In order to provide the handling of [HTTP cookies](http://www.ietf.org/rfc/rfc2965.txt) for developers, ZATS Mimic
introduces a group of methods on
[Client](http://www.zkoss.org/javadoc/latest/zats/org/zkoss/zats/mimic/Client.html).
ZATS Mimic seamlessly maintains cookies after connecting with a ZK
application. It can read the current cookies and verify the behaviors of
the ZK application. Following is a typical example of cookie validation:

**cookie.zul**

```xml
<zk>
    <div apply="CookieComposer">
        <button id="change" label="change" />
    </div>
</zk>
```

**CookieComposer.java**

```java
public class CookieComposer extends SelectorComposer<Component> {
    public void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
        setCookie("foo", "bar");
    }

    @Listen("onClick=#change")
    public void change() {
        setCookie("foo", "hello");
    }

    public void setCookie(String name, String value) {
        HttpServletResponse resp = (HttpServletResponse)Executions.getCurrent().getNativeResponse();
        resp.addCookie(new Cookie(name, value));
    }
}
```

- **Line 13**: This will add a cookie at the beginning.
- **Line 16, 18**: Changes the cookie from server-side when the user
  clicks the button.

**Test.java**

```java
@Test
public void Test() {
    Client client = Zats.newClient();
    DesktopAgent desktop = client.connect("/cookie.zul");
    Assert.assertEquals("bar", client.getCookie("foo"));
    Assert.assertEquals(null, client.getCookie("not existed"));
    desktop.query("#change").click();
    Assert.assertEquals("hello", client.getCookie("foo"));
}
```

- **Line 13-15**: After connecting to a ZUL page, we can get the cookies
  and verify them.
- **Line 16-17**: ZATS Mimic maintains all cookies during any
  operations.

# Set Cookie in a Test Case

Usually, developers use cookies to retain some information between
individual connections. For example, it can trace activities of users or
remember some useful information for users. ZATS Mimic allows us to add,
change or remove cookies through the `Client` which comes in very handy
for testing the above cases. Following is a simple example on using a
cookie to remind a user of his/her last read page number:

**cookie.zul**

```xml
<zk>
    <div apply="CookieComposer">
        <label id="msg" value="first time reading" />
    </div>
</zk>
```

- **Line 3**: Reminds user of his/her last read page number here.

**CookieComposer**

```java
public class CookieComposer extends SelectorComposer<Component> {
    @Wire
    private Label msg;
    
    public void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
        Execution exec = Executions.getCurrent();
        Cookie[] cookies = ((HttpServletRequest)exec.getNativeRequest()).getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if("page".equals(cookie.getName()))
                    msg.setValue("last read page: " + cookie.getValue());
            }
        }
    }
}
```

- **Line 20-21**: This will show the last read page according to the
  cookie stored at client-side.

**Test.java**

```java
@Test
public void test() {
    Client client = Zats.newClient();
    client.setCookie("page", "99");
    DesktopAgent desktop = client.connect("/cookie.zul");
    String msg = desktop.query("#msg").as(Label.class).getValue();
    Assert.assertEquals("last read page: 99", msg);
}
```

- **Line 12-14**: We can append a new cookie before connecting with a
  page for testing.

 
