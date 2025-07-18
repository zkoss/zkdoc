# Overview

## Classic ZK overview

Classic ZK components are stored in the HttpSession on the server side.
Based on the Java EE Web application specification, a session is an
object that exists in memory on the server side. When a web browser
sends a request to the server, it also sends a session identifier. This
is commonly done with a JSESSIONID cookie or through a URL parameter.

Based on this identifier, the Web Server will retrieve the session
object from memory and make it available while processing the response
to the user's request. This allows the server-side application to store
various objects semi-permanently in the server's memory until the
session is destroyed.

In the classic use case, the page generated by ZK exists in the session.
When the user triggers an action or changes the state of a component on
the client side, a request is sent to the server and updates the "main
state" of the components that exist in the session. In this workflow,
the server-side state is authoritative, and the client state is
synchronized based on the server-side state.

## Stateless components overview

The stateless components are not stored in the server's memory. They are
transient objects which only exist during the user's request and
response cycle.

In this case, the authoritative state is located on the client side.
Updates performed with Stateless components are done on a "per action"
basis.

Each action has a set of "Action parameters", which indicates what data
needs to be retrieved from the client in order to process a given
action. This way, no server-side record of the page's state is required.
When the user triggers an action, the client-side engine will fetch the
properties and values requested by the action and send all relevant data
in the request.

The server-side action will then process any relevant update based on
that data and the event triggered by the user. At the end of that
processing, the action may modify the client's state and send a response
that will write the new state on the client side.

During this process, the action only used the information retrieved by
the action parameters. As such, it did not need to access any data
located on the server side. s.

## Differences Between Classic ZK Components and Stateless Components

![](/zk_dev_ref/images/Stateful_component_overview.jpg)

![]({{site.baseurl}}/zk_dev_ref/images/stateless_component_overview.jpg)

### Component State Management

- **Classic**: Stored in the HttpSession on the server side, maintaining
  states in the server's memory for semi-permanent object storage.
- **Stateless**: Not stored in server memory, existing only during the
  user's request-response cycle. The state is stored in a browser.

### State Authority

- **Classic**: Server-side authoritative state, with client-side state
  synchronized based on the server-side state.
- **Stateless**: Client-side authoritative state, with updates performed
  on a per-action basis.

### Data Processing and Memory Usage

- **Classic**: Maintain consistent state across user interactions,
  requiring more server memory for state retention.
- **Stateless**: Lower memory footprint due to lack of need for
  server-side state record between transactions.

### Use Cases and Suitability

- **Classic**: Suitable for applications requiring server-side
  permanence, and traditional web infrastructure.
- **Stateless**: Ideal for distributed infrastructures with session
  replication, applications with limited server-side memory, and
  services needing high scalability, like cloud-native applications.

# Advantages: Scalability, cloud readiness, and resource efficiency

The Stateless Components offer several advantages:

- **Scalability**: They adapt easily to varying workloads, making them
  ideal for cloud-native applications.
- **Cloud Readiness**: Simplifies deployment and management of
  applications in cloud environments.
- **Resource Efficiency**: Reduces server memory usage as there is no
  need to maintain component state on the server.

# Limitations

## WebSocket Not Supported

Since WebSocket is a stateful connection, it's not supported for
StatelessRichlet.

## Cannot Work with Stateful Components

Stateless and classic components cannot be used on one page together.
The basic architecture for these components is different. Using them in
one application is also not supported.

But a combination of Iframes and ZK's embedded features can effectively
bring stateless and classic components together. For example, the main
page could have an Iframe targeting a ZK stateless service. In contrast,
another panel with more direct interaction could contain a classic ZK
page added by ZK Embedded API.

# FAQ

## Are Stateless components an upgrade to classic ZK components

No. Stateless components are a branching technology from the classic ZK
components. They use the same client-side code (the JavaScript Widgets
and associated HTML and CSS code), in addition to a completely different
communication and update layer.

## How to handle use cases that require server-side permanence

While the Stateless components only exist during requests and responses,
you may need to store data that the users should not be able to modify
or data that should not be publicly accessible.

In this situation, some sort of shared permanence layer is necessary for
the application's function. For this purpose, a good option is to use a
database layer. In the stateless components demo application, the
content of the user's shopping basket is stored in a database. Since the
data layer is decoupled from the web container, it can be accessed by
any number of instances. Databases already provide replication and high
availability features, which makes them a great candidate to act as the
shared permanence layer.

## I have an existing ZK application...

... using classic ZK, do I need to migrate my code to use Stateless
components instead?

It depends on your requirements. We do not see the Stateless component
as "the next step" in ZK innovation. Instead, we see them as a
convenient tool that can be used if they are relevant to a specific
application's architecture requirements.

As a rule of thumb, consider the following.

I should use stateless components if:

- I'm developing an application for a heavily distributed infrastructure
  in which session replication between nodes is difficult to achieve
  (cloud hosting, high availability with multiple regional clusters,
  etc.)
- I'm developing smaller-scale services that do not need to know about
  each other to perform their functions.
- I do not have access to sticky sessions, which causes the active node
  for a given user to change with each request
- I am concerned about the memory footprint, I would like to minimize
  the memory used on the server side.

I should use classic ZK if:

- I already have a fully functional application, which matches my
  infrastructure needs
- My infrastructure is a classic "Database, webserver (or webserver
  cluster), gateway/reverse proxy"
- I need to store multiple data, states, and other semi-permanent
  objects between requests
- My application has a lot of interdependent systems that rely on
  server-side communication

## Comparing and contrasting the Stateless workflow, and the new ZK 10 Client-MVVM features

Both of these new features' goal is to improve the resource footprint of
a given page on the server side. There is a similar concept between both
features: removing server-side component instances.

In the case of Client-side MVVM, the ClientBindComposer will keep track
of the bindings and commands but not create corresponding ZK components
(the textboxes, grids, buttons, etc) in the server memory.

The view model being already decoupled from the view doesn't need to
know that the command comes from a server-side Java instance of Textbox,
or if it was sent by the client, and forwarded directly by the
ClientBindComposer. In the opposite direction, the client-side Textbox
JavaScript object doesn't know if the update returned by the response is
generated by a server-side Java Textbox object or forwarded directly
from the view model by the ClientBindComposer.

![](/zk_dev_ref/images/Zk10_compare_client-mvvm.png)

In the case of stateless components, the Java-side objects are also
removed. Instead of maintaining a state in the view model, and using the
ClientBindComposer to forward that state to the client-side objects, the
stateless workflow uses a list of inputs and outputs for each user
action in a pattern that is closer to MVC.

When a user triggers an action on the client side, all the state data
required to process that action is sent together with the request. As a
result, there is no state at all located in server memory.

![](/zk_dev_ref/images/Zk10_compare_stateless.png)

## Can stateless components work with server push?

Stateless components in ZK, due to their architectural nature, present
certain limitations when it comes to working with server push
mechanisms. Unlike classic ZK components that maintain their state on
the server, stateless components are designed to be transient, with
their state predominantly managed on the client side. This design choice
significantly reduces server-side memory footprint but also impacts how
stateless components interact with server push technologies.

Server push, typically used to update client-side UI elements from the
server in real time, relies on a persistent connection between the
client and the server. In the context of stateless components, it's not
supported to use server push.
