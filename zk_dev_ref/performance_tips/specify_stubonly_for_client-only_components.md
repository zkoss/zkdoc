

# Overview

It is common that the states of some components are not required to be
maintained on the server. A typical example is that an application might
use some components, such as `hbox`, for layout and won't access it
again after rendered. To minimize the memory footprint, ZK supports a
special property called `stubonly`
([org.zkoss.zk.ui.Component#setStubonly(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setStubonly(java.lang.String))).
Once specified with `true`, its states won't be maintained on the server
(and all states are maintained at the client). For example,

```xml
<hbox stubonly="true">
</hbox>
```

- Notice this feature is available since ZK 5.0.4 EE, and available in
  CE since ZK 6.0.0.

## Values of Stubonly: true, false and inherit

The default value of the `stubonly` property is `inherit`. It means the
value is the same as its parent's, if any, or `false`, if no parent at
all. Thus, if a component's `stubonly` is specified with `true`, all its
descendants are stub-only too, unless `false` is specified explicitly.
For example, in the following snippet, only `textbox` is <i>not</i>
stub-only, while `hbox`, `splitter`, `listbox`, `listitem` and labels
are all stub-only.

```xml
<hbox stubonly="true">
  a stub-only label
  <textbox stubonly="false"/>
  <splitter/>
  <listbox>
    <listitem label="also stubonly"/>
  </listbox>
</hbox>
```

# Limitation of Stub Components

When a component is stub only, it will be replaced with a special
component called a stub component
([org.zkoss.zk.ui.StubComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/StubComponent.html)) after rendered. In
addition, the adjacent stub components might be merged to minimize the
memory further. Thus, the application should not access the component
again on the server, if it is specified as stub only.

## Invalidation

While a stub component cannot be invalidated directly, it is safe to
invalidate its parent. ZK will rerender all non-stub components and
retain the states of stub components at the client. For example, in the
following snippet, it is safe to click the `invalidate` button. From an
end user's point of view, there is no difference whether `stubonly` is
specified or not.

```xml
 <window>
  <button label="self.parent.invalidate()"/>
  <vbox stubonly="true">
  stubonly <textbox/>
  </vbox>
</window>
```

It is a special case that
[paging]({{site.baseurl}}/zk_component_ref/supplementary/paging) and
`stubonly` cannot be applied at the same time. For example,

```xml
<listbox mold="paging" pageSize="1" >
    <listitem >
        <listcell stubonly="true"/>
    </listitem>
    <listitem>
        <listcell />
    </listitem>
</listbox>
```

Although paging will
[invalidate]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui#Invalidate_a_Component)
`listbox` and its children, `stubonly` needs the referred widget in
client side which is detached during paging and throws mounting error.

## Detach and Reuse

The detailed information of a stub component is stored at the client. It
is removed when the component is removed. Thus, you can't reuse a
component if the component has some stub components and it is detached.
For example, the following code won't work:

```java
public class MyListener implements EventListener {
   private static Window win;
   public void onEvent(Event evt) throws Exception{
      if (win ==null) {    
         win = new Window();
         win.setTitle("Hello!");
         win.setClosable(true);
         Label testLabel = new Label("My Label");
         testLabel.setStubonly("true");
         win.appendChild(testLabel);
      }
      win.setParent(evt.getTarget().getFellow("mainWindow"));
      win.doModal();
    }
 }
```

In the above example[^1], `win` is reused but it also has a stub
component (a label). When the window is closed, all the information at
the client is removed (since Window's onClose() method detaches the
window). Thus, if the event is executed again, the client can restore
the detailed information back.

> ------------------------------------------------------------------------
>
> <references/>

## Event Handling

ZK will preserve all registered event listeners and handlers when
converting a stub-only component to a stub component. In other words,
the listener will be called if the corresponding event is fired.
However, since the original component no longer exists, the event is
fired in the most generic format: an instance of
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html), rather than a derived
class.

For example, in the following snippet,
[org.zkoss.zk.ui.event.StubEvent:onStub](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/StubEvent.html)
will be generated to `System.out`.

```xml
<textbox stubonly="true" 
onChange='System.out.println(event.getClass().getName()+":"+event.getName())'/>
```

In addition, the target
([org.zkoss.zk.ui.event.Event#getTarget()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html#getTarget())) is
the stub component rather than the original one, `Textbox`.

## Client-side Programming

The client-side widget of a component is the same no matter if it is
stub only. Thus, the application can have the full control by
registering the client side event listener, such as

```xml
<textbox stubonly="true" w:onChange="doSomething(this.value)" xmlns:w="client"/>
```

In other words, the stub-only components behave the same at the client.

Refer to [Client Side Programming](https://www.zkoss.org/wiki/Small_Talks/2010/April/Client_Side_Programming)
and [ZK Client-side Reference: General Control]({{site.baseurl}}/zk_client_side_ref/general_control) for more
information.

# Version History

| Version | Date       | Content                                                                                                                            |
|---------|------------|------------------------------------------------------------------------------------------------------------------------------------|
| 6.0.2   | June, 2012 | [Bug: stubonly doesn't work](http://tracker.zkoss.org/browse/ZK-1182), and change the event handle from origin event to StubEvent. |

{{ ZKDevelopersReferencePageFooter}}

[^1]: Please refer to [ZK-1094](http://tracker.zkoss.org/browse/ZK-1094)
    for a real case.
