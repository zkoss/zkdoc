# Employment/Purpose

Here we describe how to start a ZK execution in a foreign Ajax channel.
For example, JSF 2 allows developers to send back JavaScript code to
update the browser in JSF's Ajax channel.

## [org.zkoss.zkplus.embed.Bridge](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/embed/Bridge.html)

Starting an execution in a foreign Ajax channel is straightforward:
invoke
[org.zkoss.zkplus.embed.Bridge#start(javax.servlet.ServletContext, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.zkoss.zk.ui.Desktop)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/embed/Bridge.html#start(javax.servlet.ServletContext, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.zkoss.zk.ui.Desktop)).
Then, you are allowed to access the components, post events and do
anything you like. At the end, you invoke
[org.zkoss.zkplus.embed.Bridge#getResult()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/embed/Bridge.html#getResult()) to
retrieve the JavaScript code snippet and send it back to the client to
execute. Finally, you invoke
[org.zkoss.zkplus.embed.Bridge#close()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/embed/Bridge.html#close()) to
close the execution.

```java
Bridge bridge = Bridge.start(svlctx, request, response, desktop);
try {
    //execution started, do whatever you want

    String jscode = bridge.getResult();

    //send jscode back with the foreign Ajax channel.
} finally {
    bridge.close(); //end of execution and cleanup
}
```

# Example

## Start Execution in JSF 2 ActionListener

In JSF 2.0 developers can initiate Ajax request using jsf.ajax.request
[^1] For e.g.

```xml
...
   <h:commandButton id="save" value="Save"
    onclick="jsf.ajax.request(this, event, {execute:'@all'}); return false;" actionListener="${myBean.saveDetails}">
   </h:commandButton>
...
```

and in your ActionListener

```java
@ManagedBean
@SessionScoped
public class MyBean {

   public void saveDetails(ActionEvent e)  throws IOException {

      ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
      ServletContext svlctx = (ServletContext) ec.getContext();
      HttpServletRequest request = (HttpServletRequest) ec.getRequest();
      HttpServletResponse response = (HttpServletResponse) ec.getResponse();
      Component comp = getComponent();
      Bridge bridge = Bridge.start(svlctx, request, response,comp.getDesktop());
      try {
              // update ZK component(s) state here
              //comp.appendChild(new SomethingElse()); ...

              //Send back bridge.getResult() with the response writer (eval)
              PartialResponseWriter responseWriter =
                FacesContext.getCurrentInstance().getPartialViewContext().getPartialResponseWriter();
              responseWriter.startDocument();
              responseWriter.startEval();
              responseWriter.write(bridge.getResult());
              responseWriter.endEval();
              responseWriter.endDocument();
              responseWriter.flush();
              responseWriter.close();
      } finally {
              bridge.close();
      }
  }

  private Component getComponent() {
      //locate the component that you want to handle
  }
}
```


# Version History

| Version | Date           | Content                                                                                                                          |
|---------|----------------|----------------------------------------------------------------------------------------------------------------------------------|
| 5.0.5   | September 2010 | [org.zkoss.zkplus.embed.Bridge](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/embed/Bridge.html) was introduced to simplify the starting of an execution in foreign Ajax channel |

[^1]: For more information on
    [jsf.ajax.request](https://javaserverfaces.dev.java.net/nonav/docs/2.0/jsdocs/symbols/jsf.ajax.html#.request)
    read official JSF Javascript docs for
    [jsf.ajax](https://javaserverfaces.dev.java.net/nonav/docs/2.0/jsdocs/symbols/jsf.ajax.html).
