The use of [Struts](http://struts.apache.org/) with ZK is
straightforward: just replace JSP pages with ZUL pages. You don't need
to modify action handlers, data models and others. All you need to do is
to map the result view to a ZUL page instead of JSP. In addition, EL
expressions will work the same way even in the ZUL page.

# Use ZUL instead of JSP

First, let us take [the Hello World example in Struts tutorial](http://struts.apache.org/2.x/hello-world-using-struts-2.html)
as an example. We could provide a ZUL page called `HelloWorld.zul` to
replace `HelloWorld.jsp` as follows.

```xml
<?page title="Hello World!"?>

<h:h2 xmlns:h="xhtml">
${messageStore.message}
</h:h2>
```

As shown, you could use the same EL expression to access the data
provided by Struts and your action handler.

Then, you map the `hello` action to `HelloWorld.zul` by modifying
`WEB-INF/classes/struts.xml` as follows.

```xml
<action name="hello" class="org.apache.struts.helloworld.action.HelloWorldAction" method="execute">
    <result name="success">/HelloWorld.zul</result>
</action>
```

Then, you could visit
http://localhost:8080/Hello_World_Struts2_Ant/hello.action as you are
used to and have the same result.

Of course, it is a ZUL document. You could have any Ajax behavior you'd
like.

## Access Data Model of Struts in Composer

The data (so-called model) provided by Struts (or the action) can be
retrieved by invoking
[org.zkoss.zk.ui.Execution#getAttribute(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#getAttribute(java.lang.String)).
For example,

```java
package foo;
import org.zkoss.zk.ui.util.Composer;
import org.zkoss.zk.ui.*;
import org.zkoss.zul.*;
import org.apache.struts.helloworld.model.MessageStore;

public class FooComposer implements org.zkoss.zk.ui.util.Composer {
    public void doAfterCompose(Component comp) {
        MessageStore mstore = Executions.getCurrent().getAttribute("messageStore");
        comp.appendChild(new Label(":"+mstore.getMessage()));
    }
}
```

# Submit Form

By replacing JSP with ZUML, you could enable a *static* page with ZK's
power. And, you could do what any ZUML documents can do. In other words,
Struts is used only for Model and Controller, while ZK for View.
However, sometimes you have to redirect back to submit-based URL (maybe
another action with parameters). It can be done easily by enclosing the
input components with HTML FORM. For example,

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<n:form action="${c:encodeURL('/login.action')}" method="POST" xmlns:n="native">
<grid>
  <rows>
    <row>
      User: <textbox name="user"/>
    </row>
    <row>
      Password: <textbox name="password"/>
    </row>
    <row>
      <button label="Login" type="submit"/>
    </row>
  </rows>
</grid>
</n:form>
```

As shown above, notice that

- Every input (including listbox and tree) shall be assigned with a name
  that will become the parameter's name when submitting the form.
- You could use [the encodeURL function](/zuml_ref/encodeurl)
  to encode an URL.

For more information, please refer to [ZK Developer's Reference/integration/Use_ZK_in_JSP#HTML_Form the Use ZK in JSP section]({{site.baseurl}}/zk_dev_ref/integration/jsp#HTML_Form_the_Use_ZK_in_JSP_section).

# Avoid Filtering ZK AU Requests

When adopting Struts, we usually apply its filter to all URL in
`web.xml` like:

```xml
    <filter>
        <filter-name>struts2</filter-name>
        <filter-class>
            org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter
        </filter-class>
     </filter>
     <filter-mapping>
        <filter-name>struts2</filter-name>
        <url-pattern>/*</url-pattern>
     </filter-mapping>  
```

(Refer to
<https://struts.apache.org/docs/create-struts-2-web-application-using-maven-to-manage-artifacts-and-to-build-the-application.html>)

But this filter will also intercept ZK AU requests and make ZK
components works abnormally. You might see a similar error message like:

`There is no Action mapped for namespace / and action name zkau. - [unknown location]`

To avoid this problem, you can add the line below in `struts.xml` to
exclude ZK au requests for struts filter

```xml
<struts>
   <constant name="struts.action.excludePattern" value="/zkau"/>
   <!-- other configurations -->
</struts>
```
