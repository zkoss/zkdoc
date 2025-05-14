# Objects Referenced by UI Must be Serializable
Objects that are referenced by a UI object, such as components, pages, desktop, Composer, and ViewModel have to be serializable. Otherwise, they might have no value after de-serialized, or cause an exception (depending on how it is used).
 
## Marking properties as transient
If you don't want a property to be serialized, use Java <code>transient</code> keyword when declaring the property. This tells the serialization mechanism to ignore the field when writing the object's state. After deserialization, the value of a transient field will be null.

## Attributes of UI Objects

If the value of an attribute is not serializable, it will be ignored.
Thus, it will become null after de-serialized. So, it is better to make
them all serializable (such as implementing java.io.Serializable), or
handle the serialization manually (refer to the [Clustering
Listeners](##Clustering_Listeners) section below) .

## zscript

It is OK, though not recommended, to use zscript in a clustering
environment, but there are some limitations.

- BeanShell's function is not serializable. For example, the following
  won't work:

``` xml
void foo() {
}
```

- The value of variables must be serializable

Notice that it is not recommended to use zscript in the clustering
environment. After all, the [performance of
BeanShell]({{site.baseurl}}/zk_dev_ref/Performance_Tips/Use_Compiled_Java_Codes)
is not good.

## Event Listeners

Event listeners have to be serializable. Otherwise, it will be ignored
after serialization.

The simplest way to make an event listener serializable is to implement
<javadoc type="interface">org.zkoss.zk.ui.event.SerializableEventListener</javadoc>
(available since 5.0.6), instead of
<javadoc type="interface">org.zkoss.zk.ui.event.EventListener</javadoc>.

For example,

``` java
button.addEventListener(Events.ON_CLICK,
  new SerializableEventListener() {
    public void onEvent(Event event) {
        ....
    }
  });
```

## Data Models

The data models, such as <javadoc>org.zkoss.zul.ListModel</javadoc> and
<javadoc>org.zkoss.zul.ChartModel</javadoc>, have to be serializable.
Otherwise, the UI object (such as grid) won't behave correctly. The
implementations provided by ZK are serializable. However, the items to
be stored in the data models have to be serializable too.

## Composers

If you extend from ZK built-in composer like
<javadoc>org.zkoss.zk.ui.util.GenericAutowireComposer</javadoc>, or
<javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc> you have to
make sure all of its members are serializable (or transient), since the
implementation will keep a reference in the applied component.

When implementing from
<javadoc type="interface">org.zkoss.zk.ui.Composer</javadoc> directly,
the composer could be non-serializable if you don't keep a reference in
any UI object. In other words, the composer will be dropped after
<javadoc method="doAfterCompose(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.util.Composer</javadoc>

## ViewModels

If you are using ZK MVVM then your ViewModel classes must be
serializable.

# Clustering Listeners

If there are non-serializable objects, you could implement one of the
clustering listeners to handle them manually as described below.
Basically, there are two kinds of clustering listeners for different
purposes:

- Serialization Listeners: they are called when an object is about to be
  serialized, and after it has been de-serialized. Example:
  <javadoc type="interface">org.zkoss.zk.ui.util.ComponentSerializationListener</javadoc>
  and
  <javadoc type="interface">org.zkoss.zk.ui.util.PageSerializationListener</javadoc>
- Activation Listeners: they are called when a session is about to be
  passivated, and after it has been activated. Examples:
  <javadoc type="interface">org.zkoss.zk.ui.util.ComponentActivationListener</javadoc>
  and
  <javadoc type="interface">org.zkoss.zk.ui.util.PageActivationListener</javadoc>.

To register a listener is straightforward: just implement the
corresponding listener interface. For example, you could implement
<javadoc type="interface">org.zkoss.zk.ui.util.ComponentActivationListener</javadoc>
if an object is stored in a component and wants to be called on
activation and passivation.

# Passivation Flow

When a session is about to be passivated (such as moving to another
machine), the activation listeners will be called first to notify the
passivation, and then the serialization listeners will be called before
the object is serialized.

| Sequence | Description                                                                                                                                                                                                                                                                |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1        | Invokes <javadoc method="willPassivate(org.zkoss.zk.ui.Session)" type="interface">org.zkoss.zk.ui.util.SessionActivationListener</javadoc> for each object referenced by the <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc> that will be passivated           |
| 2        | Invokes <javadoc method="willPassivate(org.zkoss.zk.ui.Desktop)" type="interface">org.zkoss.zk.ui.util.DesktopActivationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Desktop</javadoc> that will be passivated          |
| 3        | Invokes <javadoc method="willPassivate(org.zkoss.zk.ui.Page)" type="interface">org.zkoss.zk.ui.util.PageActivationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Page</javadoc> that will be passivated                   |
| 4        | Invokes <javadoc method="willPassivate(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.util.ComponentActivationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Component</javadoc> that will be passivated    |
| 5        | Invokes <javadoc method="willSerialize(org.zkoss.zk.ui.Session)" type="interface">org.zkoss.zk.ui.util.SessionSerializationListener</javadoc> for each object referenced by the <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc> that will be passivated        |
| 6        | Serializes the session                                                                                                                                                                                                                                                     |
| 7        | Invokes <javadoc method="willSerialize(org.zkoss.zk.ui.Desktop)" type="interface">org.zkoss.zk.ui.util.DesktopSerializationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Desktop</javadoc> that will be passivated       |
| 8        | Serializes desktops of the session                                                                                                                                                                                                                                         |
| 9        | Invokes <javadoc method="willSerialize(org.zkoss.zk.ui.Page)" type="interface">org.zkoss.zk.ui.util.PageSerializationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Page</javadoc> that will be passivated                |
| 10       | Serializes pages of each desktop                                                                                                                                                                                                                                           |
| 11       | Invokes <javadoc method="willSerialize(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.util.ComponentSerializationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Component</javadoc> that will be passivated |
| 12       | Serializes components of each page                                                                                                                                                                                                                                         |

# Activation Flow

When a session is about to be activated (such as moving from another
machine), the serialization listener is called after the object has been
deserialized. After all objects are deserialized, the activation
listener will be called to notify a session has been activated.

| Sequence | Description                                                                                                                                                                                                                                                                 |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1        | Deserializes the session                                                                                                                                                                                                                                                    |
| 2        | Deserializes desktops of the session                                                                                                                                                                                                                                        |
| 3        | Deserializes pages of each desktop                                                                                                                                                                                                                                          |
| 4        | Deserializes components of each page                                                                                                                                                                                                                                        |
| 5        | Invokes <javadoc method="didDeserialize(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.util.ComponentSerializationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Component</javadoc> that will be passivated |
| 6        | Invokes <javadoc method="didDeserialize(org.zkoss.zk.ui.Page)" type="interface">org.zkoss.zk.ui.util.PageSerializationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Page</javadoc> that will be passivated                |
| 7        | Invokes <javadoc method="didDeserialize(org.zkoss.zk.ui.Desktop)" type="interface">org.zkoss.zk.ui.util.DesktopSerializationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Desktop</javadoc> that will be passivated       |
| 8        | Invokes <javadoc method="didDeserialize(org.zkoss.zk.ui.Session)" type="interface">org.zkoss.zk.ui.util.SessionSerializationListener</javadoc> for each object referenced by the <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc> that will be passivated        |
| 9        | Invokes <javadoc method="didActivate(org.zkoss.zk.ui.Session)" type="interface">org.zkoss.zk.ui.util.SessionActivationListener</javadoc> for each object referenced by the <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc> that will be passivated              |
| 10       | Invokes <javadoc method="didActivate(org.zkoss.zk.ui.Desktop)" type="interface">org.zkoss.zk.ui.util.DesktopActivationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Desktop</javadoc> that will be passivated             |
| 11       | Invokes <javadoc method="didActivate(org.zkoss.zk.ui.Page)" type="interface">org.zkoss.zk.ui.util.PageActivationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Page</javadoc> that will be passivated                      |
| 12       | Invokes <javadoc method="didActivate(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.util.ComponentActivationListener</javadoc> for each object referenced by each <javadoc type="interface">org.zkoss.zk.ui.Component</javadoc> that will be passivated       |

# Working Thread Cannot Last Two or More Requests

Since the thread cannot be migrated from one machine to another, you
couldn't use a working thread that works across multiple requests. For
example, you cannot start a working thread in one request, and then
invoke it in another request, since the session might be passivated
between the requests.

It also implies you cannot use a working thread to handle a long
operation. Rather, you have to use the so-called [Echo
Event]({{site.baseurl}}/zk_dev_ref/Event_Handling/Event_Firing#Echo_an_Event).

Users of ZK 5.0.5 or prior cannot deploy the [event
queues]({{site.baseurl}}/zk_dev_ref/Event_Handling/Event_Queues)
for the session and application scope. However, users of ZK 5.0.6 or
later have no such limitation.

# Debugging Tips

`System.setProperty("sun.io.serialization.extendedDebugInfo", "true")`
can print detailed debugging information about which member field is not
serializable when a `java.io.NotSerializableException` happens.
