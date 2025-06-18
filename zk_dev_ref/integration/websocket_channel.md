# Employment/Purpose

ZK has supported a way to share the application data between a ZK
application and a websocket application within the same session. Here we
demonstrate how to use the
<javadoc>org.zkoss.zk.ui.sys.Storage</javadoc> in a desktop scope to
share the application data through the websocket channel.

# Example

## Websocket Server

```java
@ServerEndpoint(value ="/echo/",
    configurator = ZKWebSocket.class)
public class EchoServer {
    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        //since zk 8.6.4
        ZKWebSocket.initZkDesktop(session, config);
    }

    @OnMessage
    public void onMessage(String message, Session session){
        Storage<Integer> storage = ZKWebSocket.getDesktopStorage(session);
        if ("receive".equals(message)) {
            Integer count = storage.getItem("count");
            try {
                session.getBasicRemote().sendText("Received..." + count);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            try {
                storage.setItem("count", Integer.parseInt(message));
                session.getBasicRemote().sendText("Sent..." + message);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
    @OnClose
    public void onClose(Session session){
    }

}
```

As you can see above, in line 2, we have to register a
<javadoc>org.zkoss.zk.ui.http.ZKWebSocket</javadoc> class into the
configurator of the *ServerEndpoint* annotation. And in line 12 we can
use the method of
<javadoc method="getDesktopStorage(javax.websocket.Session)">org.zkoss.zk.ui.http.ZKWebSocket</javadoc>
to receive the data storage from a websocket session (the storage is a
thread-safe implementation). Note that the websocket session must have a
**dtid** value which is sent from client as follows.

```js
// Create a new instance of the websocket
var webSocket = new WebSocket("ws://localhost:8080/zkwebsocket/echo/?dtid=" + zk.$('$win').desktop.uuid);
```

## ZK Application

### MVVM Example

```xml
<window id="win" apply="org.zkoss.bind.BindComposer"
            viewModel="@id('vm') @init('org.zkoss.foo.ZKWebSocketViewModel')">
        <groupbox title="ZK">
            <hlayout>count: <label value="@load(vm.count)"/></hlayout>
            <button label="add" onClick="@command('cmd')"/>
        </groupbox>
</window>
```

```java
@ToServerCommand("update")
public class ZKWebSocketViewModel {

    private Integer count;

    @Init
    public void init(@ContextParam(ContextType.DESKTOP) Desktop desktop) {
        count = 100;
        syncToStorage(desktop);
    }

    @Command
    @NotifyChange("count")
    public void cmd(@ContextParam(ContextType.DESKTOP) Desktop desktop) {
        count++;
        syncToStorage(desktop);
    }

    @Command("update")
    @NotifyChange("count")
    public void doUpdate(@ContextParam(ContextType.DESKTOP) Desktop desktop) {
        count = desktop.<Integer>getStorage().getItem("count");
    }

    private void syncToStorage(Desktop desktop) {
        Storage<Integer> desktopStorage = desktop.getStorage();
        desktopStorage.setItem("count", count);
    }
    public Integer getCount() {
        return count;
    }
}
```

As you can see above, in line 22 and 26, we can receive the data storage
from the desktop object to share or update the application data into it,
so that the websocket echo server can use or get the latest data from it
or vice versa.

### MVC Example

```xml
<window id="win" apply="org.zkoss.foo.ZKWebSocketComposer">
        <groupbox title="ZK">
            <hlayout>count: <label id="label" /></hlayout>
            <button id="btn" label="add"/>
        </groupbox>
</window>
```

```java
public class ZKWebSocketComposer extends SelectorComposer<Window> {
    @Wire Label label;
    @Wire Button btn;
    private Integer count;

    @Override public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        count = 100;
        label.setValue("100");
        syncToStorage();
    }

    @Listen("onClick = #btn")
    public void doClick() {
        count++;
        label.setValue(String.valueOf(count));
        syncToStorage();
    }

    private void syncToStorage() {
        getSelf().getDesktop().getStorage().setItem("count", count);
    }

    @Command // this annotation is under the package of org.zkoss.zk.ui.annotation
    public void update() {
        count = getSelf().getDesktop().<Integer>getStorage().getItem("count");
        label.setValue(String.valueOf(count));
    }
}
```

As you can see above, in line 21 and 26, we can receive the data storage
from the desktop object to share or update the application data into it,
so that the websocket echo server can use or get the latest data from it
or vice versa.

**Note:** in line 24
<javadoc>org.zkoss.zk.ui.annotation.Command</javadoc> annotation has
been added since the release of ZK 8.0.0, and it is used to receive a
notification from client to server. For more details, please take a look
at the [\#Communication](#Communication) section.

## Communication

### From Websocket server to ZK application

#### MVVM Example

Here is the MVVM way to send a command from client to server.

```js
// Create a new instance of the websocket
var webSocket = new WebSocket("ws://localhost:8080/zkwebsocket/echo/?dtid=" + zk.$('$win').desktop.uuid);

// receive a message from websocket, and notify ZK application to update the component data.
webSocket.onmessage = function(event) {
    zkbind.$('$win').command('update'); // the update command has already declared in ZKWebSocketViewModel.java
};
```

#### MVC Example

Here is the MVC way to send a command from client to server.

```js
// Create a new instance of the websocket
var webSocket = new WebSocket("ws://localhost:8080/zkwebsocket/echo/?dtid=" + zk.$('$win').desktop.uuid);

// receive a message from websocket, and notify ZK application to update the component data.
webSocket.onmessage = function(event) {
    zkservice.$('$win').command('update'); // the update command has already declared in ZKWebSocketComposer.java
};
```

## Command Parameter Converter

### MVVM Example

When a user triggers a command with some data from client to server, the
data should be in a Map (or says Object) type. For example,

```js
    zkbind.$('$win').command('update', {foo: 'myfoo', bar: {title: 'myBarTitle'}});
```

In the Java code

```java
    public static class Bar {
        private String title;
        public void setTitle(String title) { this.title = title; }
        public String getTitle() { return title; }
    }
    @Command("update")
    @NotifyChange("count")
    public void doUpdate(@ContextParam(ContextType.DESKTOP) Desktop desktop, @BindingParam("foo") String myfoo, @BindingParam("bar") Bar mybar) {
        count = desktop.<Integer>getStorage().getItem("count");
    }
```

As you can see above, the data will automatically be converted into a
specific object type according to the method declaration.

**Note:** developer can implement a custom
<javadoc type="interface">org.zkoss.bind.Converter</javadoc> and specify
it into [the ZK library
properties]({{site.baseurl}}/zk_config_ref/the_library_properties/org.zkoss.bind.jsonbindingparamconverter.class).

### MVC Example

When a user triggers a command with some data from client to server, the
data should be in an array type in order. For example,

```js
    zkservice.$('$win').command('update', [{foo: "myfoo"}, {bar: "mybar"}]); // the arguments should be in order within an array.
```

In the Java code

```java
...
    public static class MyFoo {
        private String foo;
        public void setFoo(String foo) { this.foo = foo;}
        public String getFoo() { return this.foo;}
    }

    public static class MyBar {
        // omitted
    }

    @Command
    public void update(MyFoo foo, MyBar bar) {
    }
}
```

As you can see above, the data will automatically be converted into a
specific object type according to the method declaration.

**Note:** developer can implement a custom
<javadoc type="interface">org.zkoss.util.Converter</javadoc> and specify
it into [the ZK library
properties]({{site.baseurl}}/zk_config_ref/the_library_properties/org.zkoss.zk.ui.jsonserviceparamconverter.class).
