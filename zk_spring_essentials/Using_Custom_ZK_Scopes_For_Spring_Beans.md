### Purpose

Use ZK custom scope for Spring beans.

### Example

In this example, we will present user to enter a message which can be
set into a Spring bean in a (custom) desktop scope. In addition to
desktop scope, ZK Spring also supports `webapp` and `execution` scope
(`page` scope, `idspace` scope have been deprecated). So that it can be
shared by other pages, controllers, and view models attached to this
same desktop.

### Configuration

To enable the custom ZK scopes for your Spring Beans all you need is to
add the <zksp:zk-config/> element (and namespace declaration) to your
spring bean configuration file or use Java Config as shown below.

#### Java Config (since 4.0.0)

```java
import org.zkoss.spring.config.ZkScopesConfigurer;

@Configuration
@Import(ZkScopesConfigurer.class)
public class YourApplicationConfiguration {
    ...
}
```

#### XML Config

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:zksp="http://www.zkoss.org/2008/zkspring/core"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
            http://www.zkoss.org/2008/zkspring/core http://www.zkoss.org/2008/zkspring/core/zkspring-core-4.0.xsd">

    <!-- Enables ZK custom scopes for Spring Beans -->
    <zksp:zk-config/>
</beans>
```

#### Previous version 3.2 (or earlier)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:zksp="http://www.zkoss.org/2008/zkspring/core"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
            http://www.zkoss.org/2008/zkspring/core http://www.zkoss.org/2008/zkspring/core/zkspring-core.xsd">

    <!-- Enables ZK custom scopes for Spring Beans -->
    <zksp:zk-config/>
...
```

Note that you need to declare ZK Spring Core namespace at the start of
your configuration file.

### ZUML

Let's take a look at the main page source

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<window title="Custom Scopes Example - Main Page" border="normal" height="100px" width="400px" 
    apply="${scopedCtrl}">
    <label value="Enter Message Text:"></label>
    <textbox id="name" />
    <button id="setMsgBtn" label="Set" />
    <button id="showMsgBtn" label="Show Message" />
    <button id="showWinBtn" label="Show Window" />
</window>
```

It has one textbox to enter a message. On clicking Set button we store
this text in a `SimpleMessageBean` which is Autowired into scopesCtrl
controller.

**ATTENTION**: As seen below the "scopedCtrl"-controller has the
"prototype"-scope. This implies that a new instance is created every
time you resolve it by name, even in the same page. However you can
still reference the exact same instance using [ an implicit
variable]({{site.baseurl}}/zk_dev_ref/mvc/controller/composer#Retrieve_Composer_in_EL_Expressions).

### Java

The SimpleMessageBean is set to "desktop"-scope using the `@Scope`.

```java
@Component("msgBean")
@Scope("desktop")
public class SimpleMessageBean {

    private String msg;
    
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
}
```

Being a "prototype"-scoped bean the controller can use `@Autowired` to
get the SimpleMessageBean injected.

```java
@Component("scopedCtrl")
@Scope("desktop")
public class ScopedController extends SelectorComposer {

    @Autowired
    private SimpleMessageBean msgBean; //wire spring bean

    @Wired
    private Textbox name; //wire ZK component

    @Listen("onClick = #setMsgBtn")
    public void setMessage(Event evt) {
        msgBean.setMsg(name.getValue());
    }
    
    @Listen("onClick = #showMsgBtn")
    public void showMessage(Event evt) throws InterruptedException {
        Messagebox.show(msgBean.getMsg());
    }

    @Listen("onClick = #showWinBtn")
    public void showMessage(Event evt) throws InterruptedException {
        Window win = (Window) Executions.getCurrent().createComponents("customScopesWindow.zul", null, null);
        win.doHighlighted();
    }
}
```

The onClick listener of the "Show Window"-button (above line 21-25),
append "customScopesWindow.zul" (code below) to the current desktop.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<window title="Custom Scopes Example - Window Page" border="normal" height="100px"
    width="400px" closable="true">
    <label value="Message Text:"></label>
    <textbox id="name" value="${msgBean.msg}"/>
</window>
```

Since it is attached to the same desktop we have access
SimpleMessageBean instance stored in the desktop scope. We use our
standard approach to use DelegatingVariableResolver to access such bean
and assign its value to a textbox.
