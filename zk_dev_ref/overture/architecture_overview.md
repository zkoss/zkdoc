

# From the Application Developer's Perspective

Under the multi-tier Java EE web application architecture, ZK framework
belongs to web tier:

![]({{site.baseurl}}/zk_dev_ref/images/zk-web-tier.jpg)

Because ZK is designed to have a clear separation of responsibility and
provides controller/ViewModel to integrate the business and persistence
tier, you can use any business and persistence layer framework, Java
library, or database.

The ZK application runs on the server. It can access backend resources,
assemble UI with components, listen to user's activities, and then
manipulate components to update UI. All of the above activities can be
accomplished on the server. The synchronization of components' states
between the browser and the server is done automatically by ZK and
transparently to the application.

When running on the server, the application has access to full Java
technology stacks. User activities, such as Ajax and Server Push, are
abstracted to event objects. UI is composed by POJO-like components. It
is the most productive approach to develop a modern Web application.

With ZK's **Server+client Fusion architecture**, your application will
never stop running on the server. The application can enhance
interactivity by adding optional client-side functionality, such as
client-side event handling, visual effect customizing or even UI
composing without server-side coding. ZK enables seamless fusions
ranging from pure server-centric to pure client-centric. You can have
the best of two worlds: productivity and flexibility.

# From the Component Developer's Perspective

Each UI object in ZK consists of a component and a widget. A component
is a Java object running on the server representing a UI object which
can be manipulated by a Java application. A component has all the
behavior of a UI object except that it does not have a visual part. A
widget is a JavaScript object[^1] running at the client. This object
represents the UI object which interacts with the user. Therefore, a
widget usually has a visual appearance and it handles events happening
at the client.

The relationship between a component and a widget is one-to-one.
However, if a component is not attached to a page, there will not be a
corresponding widget at the client. On the other hand, the application
is allowed to instantiate widgets at the client directly without a
corresponding component.

How state synchronization and load distribution might occur depends
really on the component. The ZK Client Engine and the Update Engine will
work together to provide an elegant and robust channel to simplify the
implementation.

For example, assuming that we want to implement a component that allows
a user to click on a DOM element to show some detailed information of a
component, there are at least two approaches to implement it. Firstly,
we could load the detailed information to the client when the widget is
instantiated, and then show the details with pure client code.
Alternatively, we may choose not to load the detailed information at the
very beginning before sending a request back to the server for
fulfilling the details when the user clicks on it.

Obviously, the first approach consumes more bandwidth at the initial
request but at the same time it also provides faster responses when
users click on the DOM element. This is generally more transparent to
the application developers, and the implementation of a component can be
enhanced later as the project progresses.

> ------------------------------------------------------------------------
>
> <references/>

# Execution Flow of Loading a Page

1.  When a user visits a zk page (zul/zhtml) in a browser, a request is
    sent to the Web server. If the requested URL matches with the ZK's
    configured URL pattern. A ZK loader will be invoked to serve this
    request.
      
    For more information, please refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/zk_loader)
2.  The ZK loader loads a specified page and interprets that page to
    create ZK components accordingly and instantiates specified
    controllers (Composer/ViewModel).
      
    If a URL is mapped to a richlet, ZK invokes the richlet to handle
    all UI composition. For more information, please refer to
    [Richlet]({{site.baseurl}}/zk_dev_ref/ui_composing/richlet).
3.  After interpreting the whole page, the ZK loader will render the
    result to an HTML page. The HTML page is then sent back to the
    browser accompanied by the ZK Client Engine.
      
    ZK Client Engine is written in JavaScript. Browsers will cache ZK
    Client engine, so ZK Client engine is usually sent only once at the
    first visit.
4.  The ZK Client Engine renders the widgets into DOM elements and then
    inserts the DOM elements into the browser's DOM tree to make them
    visible to users.
5.  After that, the ZK Client Engine will sit at the browser to serve
    requests made by the users, widgets, or applications. If it goes to
    another page, the execution flow will start over again. If it is
    going to send an Ajax request back, another execution flow will
    start as described in the following section.

![]({{site.baseurl}}/zk_dev_ref/images/load-page.jpg)

# Execution Flow of Serving an Ajax Request

![]({{site.baseurl}}/zk_dev_ref/images/architecture-s.png)

1.  The execution flow starts from a widget or the application. This is
    usually caused by the user's activity (or the application's
    requirement) and is done by posting a client-side event
    ([zk.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html)) to a widget
    ([zk.Widget#fire(zk.Event,int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#fire(zk.Event,int))).
2.  The event is then bubbled up to the widget's parent, parent's
    parent, and finally the ZK Client Engine[^2]. The ZK Client Engine
    then decides whether and when to send the event back to the server
    in an Ajax request.
3.  If necessary, the ZK Client Engine will send an Ajax request to the
    ZK Update Engine on the server[^3].
4.  Upon receiving Ajax requests, the ZK Update engine will invoke
    [org.zkoss.zk.ui.sys.ComponentCtrl#service(org.zkoss.zk.au.AuRequest,boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/ComponentCtrl.html#service(org.zkoss.zk.au.AuRequest,boolean))
    for handling an AU request. ZK also wraps a AU request into
    [Execution](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html)
    object.
5.  How the AU request can be handled is really up to a component. But,
    the component that handles the request usually updates the states,
    if necessary, and then notifies the application by posting events to
    the current execution
    ([org.zkoss.zk.ui.event.Events#postEvent(org.zkoss.zk.ui.event.Event)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Events.html#postEvent(org.zkoss.zk.ui.event.Event))).
6.  If any event is posted, the ZK Update Engine will process them
    one-by-one by invoking the event listeners.
7.  The event listener, provided by an application, may choose either to
    update the backend resources or the components or to post other
    events.
8.  Finally, the ZK Update Engine collects all updates of components,
    including states change, attachment and detachment for optimization
    and then send a collection of commands back to the client.
9.  The ZK Client Engine evaluates each of these commands to update the
    widgets accordingly. Then the widgets will update the browser's DOM
    tree to make them available to the user.

> ------------------------------------------------------------------------
>
> <references/>

## When to Send an Ajax Request

When the ZK Client Engine receives a bubbled-up client-side event
([zk.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html)), it will decide whether
and when to send the event back to the server for further processing:

1.  If there is a non-deferrable event listener registered on the
    server, the Ajax request will be sent immediately.
2.  If there is a deferrable event listener registered on the server,
    the request will be queued at the client and it will be sent when
    another event is triggered and a non-deferrable event listener
    registered for it.
3.  If the widget declares that the event is important
    ([org.zkoss.zk.ui.sys.ComponentCtrl#CE_IMPORTANT](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/ComponentCtrl.html#CE_IMPORTANT)),
    the event will be queued for later transmission too.
4.  If none of the above cases or the widget has no corresponding
    component on the server, the event will be dropped.

A non-deferred event listener is an event listener
([org.zkoss.zk.ui.event.EventListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventListener.html))
that does not implement
[org.zkoss.zk.ui.event.Deferrable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Deferrable.html). In
other words, to minimize the traffic from the client, you might want to
implement an event listener with
[org.zkoss.zk.ui.event.Deferrable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Deferrable.html) if
applicable.

[^1]: It depends on the client. For Ajax-enabled browsers, it is a
    JavaScript object. For [ZK Reach for Android](http://code.google.com/p/zkreach/), it is a Java object
    running on an Android device.

[^2]: A widget could choose to stop this bubble-up propagation by use of
    [zk.Event#stop(_global_.Map)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html#stop(_global_.Map))

[^3]: . From the server's viewpoint, an Ajax request is another type of
    HTTP request.


# Page: created for each ZUML

A page (<javadoc type="interface">org.zkoss.zk.ui.Page</javadoc> ) is a
collection of components. A page confines components belonging to it,
such that they will be displayed in a certain portion of the browser. A
page is automatically created when ZK loader interprets a ZUML page.

# Desktop: for serving the same URL request

A ZUML page might include another ZUML pages directly or indirectly.
Since these pages are created for serving the same URL request, they are
collectively called a desktop. In other
word, a **desktop is a collection of pages for serving the same URL
request for one user**. As a ZK application interacts with user, more
pages might be added to a desktop and some might be removed from a
desktop. Similarly, a component might be added to or removed from a
page.

<!--![](zk_basic_desktop.jpg) -->

Notice that both pages and desktops are created and remove implicitly.
There are no API to create or remove them. A page is create each time
ZUML loads a page. A page is removed when ZK finds it is no longer
referenced. A desktop is created when the first ZUML page is loaded.


