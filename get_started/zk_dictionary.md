# Introduction

ZK Framework uses a number of keywords to refer to specific concepts.
These words may have a "general use" in English different than their use
in the context of ZK.

You will find a short description of these concept below, as well as a
link to a full documentation page explaining it in details. This list is
meant to be used as a reference page. If you are new to ZK, we encourage
you to refer to it while you explore the rest of our documentation.

## [@bind](/zk_mvvm_ref/data_binding/index)

@bind is the same as declaring both @load and @save (see below).

## [@init](/zk_mvvm_ref/syntax/databindinginit)

@init is a data binding expression. It is used in the MVVM pattern. It
is declared on a component's property in the View, to target a
ViewModel's property and bind them together. @init will only trigger
once when the component is created. It will read the value from the
ViewModel and set that value on the component's property.
`<textbox disabled="@init(vm.disabled)"` will fire once when the textbox
is created. It will read the value of 'vm' (the viewModel) 'disabled'
property, and call `textbox.setDisabled(disabled)` using this value as
an argument.

## [@load](/zk_mvvm_ref/syntax/load)

@load is a data binding expression. It is used in the MVVM pattern. It
is declared on a component's property in the View, to target a
ViewModel's property and bind them together. @load will only trigger
when the component is created and every time the ViewModel triggers a
"NotifyChange" on the property. It will read the value from the
ViewModel and set that value on the component's property.
`<textbox disabled="@load(vm.disabled)"` will fire once when the textbox
is created. It will read the value of 'vm' (the ViewModel) 'disabled'
property, and call `textbox.setDisabled(disabled)` using this value as
argument. Later, if the ViewModel's property changes, and the ViewModel
triggers "NotifyChange", the value will be updated again.

## [@save](/zk_mvvm_ref/syntax/save)

@save is a data binding expression. It is used in the MVVM pattern. It
is declared on a component's property in the View, to target a
ViewModel's property and bind them together. @save will trigger when the
user changes the state of the component's property. It will read the new
value from the component after the user's action, and set that value to
the ViewModel. `<textbox value="@save(vm.textValue)"` will fire when the
user changes the value of the textbox. It will call
`viewModel.setTextValue(textValue)` using this value as argument.

## [ AU request](/zk_client_side_ref/communication)

AU requests are commands sent from the client to the server. They each
contain an event generated from the client-side, such as a user click or
a change in the UI state. Multiple AU Requests can be sent at the same
time and processed during the same execution. A single AU Request can
cause multiple AU Responses or even no response at all.

## [ AU response](/zk_client_side_ref/communication) 

AU responses are commands sent from the server to the client. They each
contains an action to be performed at the client-side. Multiple AU
Requests can be sent back at the same time at the end of the same
execution.

## [Component](/zk_dev_ref/overture/architecture_overview)

A component is a Java object existing at server-side representing a UI
element. A component can be a simple control like a [
Button](/zk_component_ref/button),
or a complex control like a [
Grid](/zk_component_ref/grid).

## [Component tree](/zk_dev_ref/ui_composing/component_based_ui)

The component tree is a group of components organized in a tree
structure. A component may have children, and these children can have
their own descendants. A component has a single parent. For example, a
window contains a div, and the div contains two buttons.

## [Composer](/zk_dev_ref/mvc/composer)

A composer is a Java class that controls part or all of a ZK page. A
composer can access components, update their properties and listen to
user actions.

## [Desktop](/zk_dev_ref/ui_composing/id_space)

A ZK desktop is a collection of pages served through the same URL. In
90% of cases, a desktop represents the content of one single browser
tab. (Note: if a browser tab contains content loaded from multiple URLs,
such as using iframes, there may be more than 1 desktop per browser
tab.)

## [Execution](/zk_dev_ref/overture/architecture_overview)

A ZK [org.zkoss.zk.ui.Execution](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html) is a transaction
between the client and the server. An execution begins when the client
browser sends an HTTP request to the server and ends when the server
sends back a response containing the result of the transaction. An
execution can contain multiple AU requests (sent from the client to the
server) and reply with multiple AU responses (from the server to the
client)

## [Lang-addon.xml](/zk_client_side_ref/language_definition)

A language definition defines a component set (aka., a language) such as
the zul language used for .zul files. A language addon is used to extend
a language definition in order to modify its default content or to add
new content to it.

## [Library property](/zk_config_ref/the_library_properties)

A library property is a configuration that affects how ZK behaves. A
library property can be set globally, for a page, or for a limited
number of ZK components. The full list of library properties can be
found [
here](/zk_config_ref/the_library_properties).

## [ListModel](/zk_dev_ref/mvc/list_model)

A ListModel is a ZK utility class that wraps a collection. It provides
convenient APIs when binding a collection to a ZK component. For
example, it handles the selection, automatic updates, and collection
events. You can implement your own version for manual control, or simply
use the existing classes for standard collections such as
[org.zkoss.zul.ListModelList](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelList.html),
[org.zkoss.zul.ListModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelArray.html),
[org.zkoss.zul.ListModelSet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelSet.html),
[org.zkoss.zul.ListModelMap](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelMap.html)

## [Macro Component](/zk_dev_ref/ui_composing/macro_component)

A Macro Component is a component defined by the developer by combining
existing ZK components and extending their Java logic. It acts as a more
powerful version of a template. A template is just a list of components
to create and add to a page. A Macro Component will also add a
controller class, output events that other controllers can listen to,
and manage the "children" that it creates. This allows a developer to
create a reusable complex component, without creating it from the ground
up.

## [Mold](/zk_dev_ref/theming_and_styling/molds)

A mold is an appearance applied to a component. ZK provides different
appearances for some components if they have different modes of
operation.

## [MVC](/zk_dev_ref/mvc/mvc)

Model-View-Controller. A design pattern in which a "Controller" Java
class acts as the bridge between the model (the raw data) and the view
(the page / the ZK components). In this pattern, the controller access
the components directly, listen to events, and modify the component with
actions such as `component.setVisible(true);`. In this pattern, the
controller is dependent on the view. This allows easy access to the
component and their properties.

## [MVVM](/zk_mvvm_ref/intro/introduction_of_mvvm)

Model-View-ViewModel. A design pattern in which a "ViewModel" Java class
acts as the bridge between the model (the raw data) and the view (the
page / the components). The ViewModel in MVVM acts like a special
Controller for the View. It exposes data from the Model to the View
provides updates and logic when the user trigger and command from the
view. In this pattern, the ViewModel should be separated from the View
and shouldn't access the components directly. This layer of abstraction
allow multiple views to use the same ViewModel, as long as their use
that ViewModel properties and commands to interact with it.

## [Page](/zk_dev_ref/ui_composing/id_space)

A Page object represents the collection of components loaded from a zul
file. It also acts as the root of the component tree.

## [Sclass](/zk_style_customization_guide/sclass)

The sclass="customclass" attribute can be used by a developer to add a
class="customclass" attribute on the DOM node created by the component.
Its purpose it to easily add CSS styles to a ZK component.

## [Session](/zk_essentials/authentication/session)

A ZK Session object is a wrapper for the WebServer's own session object.
In a Java EE environment, an application server creates a
javax.servlet.http.HttpSession object to track client's session. ZK's
[org.zkoss.zk.ui.Session](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Session.html) is a wrapper of HttpSession.

- Get current ZK session:
  [Sessions.getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Sessions#getCurrent-boolean-).

<!-- -->

- Get current HttpSession:
  [Sessions.getCurrent().getNativeSession()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Session#getNativeSession--)

## [Shadow Component](/zk_essentials/shadow_components/)

A Shadow Component is a utility component that does not create any DOM
node at the client-side. Instead, they provide features such as applying
a template based on a variable, iterating over a collection and
instantiating a template for each entry, or acting as "conditional
statements" to control when their content should be added to the page or
not.

## [Widget](/zk_dev_ref/overture/architecture_overview)

A widget is a JavaScript object existing at client-side. It is the
client-side representation of a server-side Component. The widget role
is to pilot the DOM tree (the actual browser content) and to act as a
communication relay between user actions and server updates.

## [zk.xml](/zk_config_ref/zk_xml)

WEB-INF/zk.xml is the configuration descriptor of ZK. If you want ZK to
follow default behaviors, this file is optional. You can create it and
add configuration elements to customize how ZK behaves.

## [zscript](/zuml_ref/zscript)

a <zscript> component provide runtime code execution in ZUL files. By
default, zscript will be evaluated as Java by the BeanShell interpreter,
and act in similar ways as the java snippets from JSP files. While it is
more flexible, java code is better implemented in a Controller or a
ViewModel in most scenarios. The exceptions in zscript are difficult to
debug since it doesn't allow breakpoints due to being interpreted at
runtime. It also generally has lower performance, since it is not
compiled during application build.

## [zul file](/zuml_ref/zuml)

A zul file contains ZUML (ZK User Interface Markup Language) describing
a collection of ZK components. Conceptually, a zul page is similar to a
JSP page. Zul files are parsed by the ZK framework when the end-user
request the corresponding URL to generate the page content.