Events for the same desktop are processed sequentially. It simplifies
the GUI programming and component development. However, it means an
event handler that spends a lot of time to execute will block any
following handlers. Worse of all, the user, due to the limitation of
HTTP, got no hint but the small busy dialog shown at the left-top corner
on the browser.

There are basically two approaches:

1.  Handle everything in an event thread and have the user wait but show
    a more visible message to notify them
2.  Handle the long operation in an independent thread, such that the
    user can access other functions

The first approach could be done with a technique called *echo events*
as described in [the Use Echo Events
section]({{site.baseurl}}/zk_dev_ref/ui_patterns/long_operations/use_echo_events).

The second approach can be done in several ways, such as starting a
working thread to do the long operation and then using a timer to check
if the data is ready and show to the client. However, there is a simple
approach: use [an event
queue]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues)
to run an asynchronous listener as described in [the Use Event Queues
section]({{site.baseurl}}/zk_dev_ref/ui_patterns/long_operations/use_event_queues).

In addition to the above approaches, there is a special mechanism called
piggyback, which could be used to piggy back UI updates without extra
network traffic.
