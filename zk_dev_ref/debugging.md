
# Overview

This chapter provides a basic guide on troubleshooting ZK application
issues. When you interact with a component (e.g. clicking a button), but
the expected result doesn't occur. Please follow the steps below to
check. It can help you solve most basic problems or at least give you
some clues.

# Whether the Expected ZK AU Requests are Sent

When an end user interacts with a component that has an event listener.
That component will send an AJAX request to a server to invoke the
corresponding event listener. You can observe that behavior through the
developer tool. For example, in Chrome, press F12 to open it, and select
the Network tab. When you interact with a ZK component and trigger an
event, a request with the path 'zkau' will be sent as shown below:

![](/zk_dev_ref/images/aurequest.png)

- dtid: desktop ID
- cmd_0: event name
- uuid_0: event target component's UUID which is the DOM element's ID
- data_0: event-related data. Its content varies depending on an event.

## Check Event Name

After confirming that the AU request has been sent, the next step is to
check whether the event triggered is the one you expected. Based on the
interaction between the user and the component, corresponding events
should be generated. For example, clicking a button should trigger an
onClick event, and opening a popup should trigger an onOpen event. If no
event is fired, you should check for issues with the event listener
registration.

# Event Listener Execution

If an event triggered by a user has a corresponding listener method
registered on the server side, ZK will call that method. To verify
whether the method has been called, you can log messages or set
breakpoints in the Java class using your IDE.

# Expected Content in AU Response

After the event listener is executed, the component API calls (mainly
setters) made within will generate corresponding AU responses. These
responses include commands for the client widget. Hence, whether you are
setting properties, adding or removing child components, the response
content will include these commands. You can use the developer tool to
inspect if the AU response content matches the implementation of your
event listener.

![](/zk_dev_ref/images/auresponse.png)

- The response above contains no commands for zk widgets. Nothing is
  updated.
