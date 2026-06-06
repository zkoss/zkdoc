# Client Binding

{% include supported-since.html version="8.0.0" %}

To interact with client-side libaries, **Client Binding** can help us publish a ZK’s data binding command on a native html element.
For example, you can publish a *doClick* command in your view model with an *onClick* event in a html Button.

## Features

**Client Binding** provides 
* 2 methods on the client-side
* 2 annotations on the server-side. 

Their relationships can be illustrated by the following diagram:

![ZK8_Client_Binding_Diagrammatic_Sketch]({{site.baseurl}}/zk_mvvm_ref/images/zk8_client_binding_chart01.jpg)

### Client-side methods

First, we have to get the client binder in order to use the client-side methods. To get the binder, simply use :

```javascript
var binder = zkbind.$('$id');
```
After we have our client binder, we can use the following two methods to interact with the view model back to our server.

**Method - command()**

```javascript
binder.command(commandName, data);
```
This method is used to trigger a command we have on our server.

**Parameters**
-   `commandName` - Command name on server-side (ViewModel).
-   `data`- JavaScript object, to pass any information you want with the command.

**Note : ** You could also pass ZK widgets in the data object and use @BindingParam to get the corresponding ZK component on the server.

**Additionally**, you could use `native component` or `client namespace` to publish a command.

```xml
<zk xmlns:n="native" xmlns:w="client">
	<button w:onClick="@command('doClick', {key1:value1, key2:value2})"/>
	<n:button onClick="@command('doClick', {key1:value1, key2:value2})"/>
</zk>
```

**Method - after()**

```javascript
binder.after(commandName, callback);
```
This method is used to place a callback at the client after a command is executed on the server.

**Parameters**
-   `commandName` - Command name on server side (ViewModel).
-   `callback`- Callback function after the command gets executed on the server.

### Server-Side annotations

On server-side, we can use the following two annotations for the client-side binding. They should be placed at the beginning of the class declaration of our View Model.

**Annotation - NotifyCommand**

```java
@NotifyCommand(value="commandName", onChange="_vm_.expression")
```

The notify command annotation allows us to trigger a command whenever the given expression changes at the server (by `@NotifyChange`). The `_vm_` here means the current view model.

Notice that the `commandName` which gets triggered is a command in our view model, and it would be triggered once in the initialization of `_vm_.expression`. If the command does not exist, it would do nothing. No matter whether the command exists in VM or not, it would pass to the following annotation - `@ToClientCommand`.

**Annotation - ToClientCommand**

```java
@ToClientCommand(commandNames)
```

The client command annotation allows us to put the commands we want for notifying the client after execution. Notice only the commands we put inside this annotation will trigger the callback following *binder.after* at client.

## Examples
Two examples for using client-binding:
- [ ZK8: Work with Polymer Components using ZK’s new client side binding API](http://blog.zkoss.org/index.php/2015/03/11/zk8-work-with-native-web-components-using-the-new-zk-client-side-data-binding-api/)
- [ZK8 Series: Interact with Client Side Libaries using ZK's New Client Side Binding](http://books.zkoss.org/wiki/Small_Talks/2015/April/ZK8_Series:_Interact_with_Client_Side_Libaries_using_ZK8's_New_Client_Side_Binding)

## Use Case: Firing an Event from JavaScript to Java

A common requirement is to fire an event from JavaScript so that Java code can react to it — for example, a standalone JS file or a third-party client-side library detects a state change in the browser, and an `EventQueue` subscriber on the server should be notified. In other words, you want to send an event from client-side code to Java.

You cannot publish to an `EventQueue` directly from JavaScript; `EventQueue` is a server-side API only. Instead, use the Client Binding API as a bridge: trigger a ViewModel command from JavaScript with `binder.command()`, then publish the event to the `EventQueue` inside that command. For a command to be invokable from the client, it must be whitelisted with `@ToServerCommand` on the ViewModel class — only the commands listed there can be triggered from client-side code, and `@ToServerCommand("*")` accepts all commands.

First, declare the command in the ViewModel and publish the event inside it:

```java
import org.zkoss.bind.annotation.BindingParam;
import org.zkoss.bind.annotation.Command;
import org.zkoss.bind.annotation.ToServerCommand;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.event.EventQueue;
import org.zkoss.zk.ui.event.EventQueues;

@ToServerCommand("updateStatus")
public class StatusVM {

    @Command
    public void updateStatus(@BindingParam("value") boolean value) {
        EventQueue<Event> eq = EventQueues.lookup("onStatusChange", EventQueues.DESKTOP, false);
        eq.publish(new Event("onStatusChange", null, value));
    }
}
```

Apply the ViewModel in the ZUL page and give the component an `id` so the client binder can be located:

```xml
<window apply="org.zkoss.bind.BindComposer"
        viewModel="@id('vm') @init('com.example.StatusVM')"
        id="win">
</window>
```

Then, from JavaScript (e.g. in a standalone JS file or a client-side library callback), obtain the client binder and trigger the command:

```javascript
var binder = zkbind.$('$win');
binder.command('updateStatus', {value: true});
```

Any existing server-side subscriber receives the event as usual, unchanged:

```java
EventQueue<Event> eq = EventQueues.lookup("onStatusChange", EventQueues.DESKTOP, true);
eq.subscribe(new EventListener<Event>() {
    @Override
    public void onEvent(Event event) throws Exception {
        boolean value = (Boolean) event.getData();
        // react to the client-initiated event
    }
});
```

With this approach, all existing `EventQueue` subscribers keep working without any modification — the only addition is the command that bridges the client-side call to the server-side publish.
