---
date: 2015-10-06
author: "Timothy Clare, Hawk Chen, Potix Corporation"
version: "8.0.0"
category: small-talk
title: "New Features of ZK 8.0.0"
---

# Introduction

The ZK team is proud to announce the release of ZK 8!

ZK 8's main focus is on providing developers with even more powerful
tools, allowing faster and more accurate development of Java Web
Applications. We are proud to announce the extensive improvement to EL,
now supporting EL3, major MVVM enhancements, and many more changes.

To understand why you need ZK 8, and how it helps you to stay true to
your Java roots, but also effortlessly keep up with the ever-evolving
world of front-end technologies, read [ZK 8
Philosophy](http://blog.zkoss.org/index.php/2015/07/14/zk-8-philosophy/)

## Download and Demo

- [Download ZK](http://www.zkoss.org/download/zk)
- [ZK 8 Key Feature Demo](http://www.zkoss.org/zk8keyfeaturedemo)


# Shadow Elements

{% include edition-availability.html edition="ee" %}

ZK 8 introduces a new concept called **Shadow Element**.

In simple terms, shadow elements help application developers compose an
html layout with some dynamic data. They are basically templates;
however, with shadow elements, applications could manage templates and
their implementation even when they are outside of the component tree.
Thus, a shadow element is not visible to users, as it is handled by ZK.

A web designer can pre-define a template based on HTML syntax for
application developers to use.

For example,

```xml
<div>
    <if test="${user.editable}">
        User Name: <textbox value="${user.name}"/>
        <forEach items="${user.phones}" var="phone">
            <label value="${phone.number}"/>
        </forEach>
    </if>
</div>
```

![]({{site.baseurl}}/assets/images/small-talk/shadow_diagram.PNG)

As shown in the diagram above, the tree is separated into two parts -
***Logical Tree*** and ***Composed Tree***.

- **Logical Tree** is created by ZK page parser to construct a page
  definition tree and then instantiate it into a "Composed Tree".
- **Composed Tree** is also separated into two parts, one is the
  component tree (green area) which is the same as before, and the other
  is the new concept (red area) ***shadow tree***, which is not
  visible for application developers but component developers.

The shadow tree in the example above with EL expression won't be alive
once the output is rendered to the client. This is because shadow
elements are not applied with dynamic data such as *@load* expressions,
so there is no reason to store them in the server side to burden the
memory consumption.

## Example

To give an example of the power available, the following demo outlines
an application using 3 dataviews (grid, list and tree) using the same
dataset and codebase.

To fully understand the power of shadow components, please refer to the
[ZK 8 Series
Smalltalk](https://www.zkoss.org/wiki/Small_Talks/2015/February/ZK8_Series:_UI_Template_Injection).

## Use Shadow Elements in MVC

We've listened to your feedback! Many of you would like to also
incorporate this shadow feature in your MVC projects. Therefore,
ShadowTemplate and CollectionTemplate are now introduced, allowing you
to apply shadow elements and templates dynamically in MVC-based Java
class.

For more information, please refer to
[ZK Developer's Reference/UI Composing/Shadow for MVC](/zk_dev_ref/ui_composing/shadow_for_mvc).

# Major MVVM Enhancements

## Performance Improvements

{% include edition-availability.html edition="ce" %}

ZK 8 has improved a lot of performance on both the client and the server
side, especially for MVVM, it now has a lower memory consumption and a
shorter response time.

**Memory Consumption**

![]({{site.baseurl}}/assets/images/small-talk/zk8_performance_test_memory_consumption.png)

**Response Time**

![]({{site.baseurl}}/assets/images/small-talk/zk8_performance_test_response_time.png)

### Summary

**Shadow Element**

1.  More lightweight and more efficient in supporting a collection data
    binding.
2.  Auto-releases the memory once it no longer contains dynamical data
    attributes.

**EE specific**

1.  Uses a merge algorithm to reduce the MVVM tracking nodes.
2.  Speeds up Bind EL expression resolving.

If you would like to reproduce the testing, please refer to [Small
Talks/2015/September/Faster And Lighter, The Performance Test On ZK8](https://www.zkoss.org/wiki/Small_Talks/2015/September/Faster_And_Lighter,_The_Performance_Test_On_ZK8)
for details.

## SmartNotifyChange

{% include edition-availability.html edition="ce" %}

ZK 8 brings about a change to the notify system.You are all used to
@NotifyChange; however, ZK 8 has a better way, @SmartNotifyChange. Its
usage is essentially the same as @NotifyChange, except it will only
notify the binder when a value has changed, unlike @NotifyChange. Thus
it is capable of a better performance.

The following shows some example code:

```java
public class OrderVM {

    //other code...

    //action command
    @SmartNotifyChange({"selected","orders","messages"})
    @Command
    public void newOrder(){
        Order order = new Order();
        getOrders().add(order); //add new order to order list
        selected = order;//select the new one
    }
}
```

for more information, please consult the [ZK MVVM
Reference]({{site.baseurl}}/zk_mvvm_ref/syntax/smartnotifychange)
and the [new form binding
blog](http://blog.zkoss.org/index.php/2015/02/03/zk8-new-form-binding-approach/).

## MVVM support at the client

{% include edition-availability.html edition="ce" %}

After listening to all your feedback, the ZK team has introduced
functionality in ZK 8 which allows developers to access ViewModel
properties at the client. The following couple of code snippets
demonstrates how to use this functionality.

### Publishing a command using native component or direct invocation

```xml
<xhtml:button n:onClick="@command('doClick', {key:value, key1:value1})"/>
```

```javascript
wgt.$binder().command('doClick', args);
```

### Subscribing to commands

```javascript
wgt.$binder().after('commandName', callbackFuncation);
```

for more information, please take a look at the [ZK 8 Series
Smalltalk](https://www.zkoss.org/wiki/Small_Talks/2015/February/ZK8_Series:_UI_Template_Injection#More_Advanced_Usage).

## BindingParam annotation supports converting from JSON to POJO automatically

{% include edition-availability.html edition="ee" %}

ZK 8 now supports the ability to convert JSON sent to ZK into objects at
the server automatically. Consider this example.

```javascript
zkbind.$(someone).command('dataChange', {data:{title: "myData"}});
```

the above code will send JSON data to the command function "dataChange";
this can be automatically converted into an appropriate object using the
BindingParam.

```java
public static class DataObject {
    private String title;
    public void setTitle(String title) {
        this.title = title;
    }
    public String getTitle() {return title;}
}

@Command
public void dataChange(@BindingParam("data") DataObject data) {
    // do something here.
}
```

for more information, please visit [ZK Configuration
Reference](/zk_config_ref/org_zkoss_bind_jsonbindingparamconverter_class).

## Children binding supports list model

{% include edition-availability.html edition="ce" %}

In ZK 8, children binding supports a ListModel! This means you can
separate the View and Model by implementing ListModel, which is used to
provide data. Additionally, when you add/update/remove the data in the
model, the corresponding components in children binding will be
re-rendered at the same time.

When using List in children binding, to update data you have to use
@NotifyChange to notify the binder of any property changes, and the
whole rendered components in children binding will be re-rendered at the
same time.

The following example outlines the usage:

```xml
<vlayout children="@load(vm.model)">
  <template name="children">
  ...
  </template>
</vlayout>
```

```java
private ListModelList model = new ListModelList();
...

@Command
public void add_model() {
  Product newProduct = new Product(++count, "Microwave oven", 999);
  model.add(newProduct);
}
```

For more information, please take a look at our [blog series on ZK 8
data
binding](http://blog.zkoss.org/index.php/2015/02/25/zk8-more-powerful-data-binding-in-mvvm-chilldren-binding-support-listmodel/).

## FormattedTimeConverter introduced

{% include edition-availability.html edition="ce" %}

ZK 8 introduces a new converter named formattedTime. This makes it
extremely easy to output a specific time using a specified format. The
following shows an example of usage:

```xml
<label value="@load(item.time) @converter('formattedTime', format='hhmmss')"/>
```

for more information, please refer to [refer to our ZK MVVM
Reference]({{site.baseurl}}/zk_mvvm_ref/data_binding/converter#use-built-in-converter).

# New components & enhancements

## Lightweight rich editor

{% include edition-availability.html edition="ee" %}

ZK 8 introduces a brand new lightweight component called Tbeditor, which
represents the JavaScript component
[Trumbowyg](http://alex-d.github.io/Trumbowyg/). Tbeditor is a rich
WYSIWYG text editor.

The following is an example of using Tbeditor in your application.

![]({{site.baseurl}}/assets/images/small-talk/zkcompref_tbeditor.png)

```xml
<tbeditor id="tb" value="this is a demo for &lt;b&gt;trumbowy&lt;/b&gt; editor!!" />
```

for more information, please consult the
[ZK Component Reference](/zk_component_ref/tbeditor).

## Timepicker Component

{% include edition-availability.html edition="ee" %}

ZK 8 introduces a new component to handle times. This component also has
a lot of functionalities, such as minimum & maximum times, along with
formatting.

![]({{site.baseurl}}/assets/images/small-talk/zkcompref_timepicker.png)

```xml
 <window title="Simple" width="300px" border="normal">
     <timebox id="tb0"/>
 </window>
```

for more information, please consult the
[ZK Component Reference](/zk_component_ref/timepicker).

## Scrollview component

{% include edition-availability.html edition="ee" %}

The Scrollview component, first introduced in ZK 6.5 with mobile and
tablet compatibility, is now also available on desktop. With the amazing
infinite scrolling feature.

For example,

```xml
<zscript><![CDATA[
public void append(Scrollview sv, int pos, boolean outBound) {
    if (outBound && pos > 0) {
        Window w = new Window("window end", "normal", false);
        sv.appendChild(w);
    }
}
]]></zscript>
<scrollview id="sv" onScroll="append(self, event.pos, event.outOfBound)" orient="horizontal">
    <window title="window1" border="normal">
            This is Window 1
        </window>
</scrollview>
```

with that, users can scroll down endlessly.

Just like in the 6.5 version, this component also provides two events.

- onScroll
- onScrolling

The only difference is that in ZK 8.0, the onScroll event will be
triggered when users scroll all the way to the top or to the end of the
page. The onScrolling event remains the same as before.

For more information, please consult the [ZK Component
Reference](/zk_component_ref/tablet_devices/scrollview#scrollview).

## Rowlayout

{% include edition-availability.html edition="ee" %}

ZK 8 introduces a new, powerful layout component named rowlayout which
allows developers to place components inside a grid. This allows for
flexible and simple layouts. The following diagram illustrates the
rowlayout/rowchildren components and their various configurable
parameters.

![]({{site.baseurl}}/assets/images/small-talk/zkcomref_rowlayout.PNG)

Using rowlayout component is simple. First, use rowlayout to divide the
horizontal space of its parent container into a number of columns. You
also have the option of specifying the column/spacing ratio. The default
number of columns is 12, and the default column/spacing ratio is 1/3,
which means the column is 3 times wider than the spacing between
columns. Spacing could be given as a ratio, a percentage or a
floating-point number.

A sample usage is demonstrated below:

```xml
<rowlayout ncols="12" spacing="1/3">
    <rowchildren colspan="3" offset="2">
    </rowchildren>
</rowlayout>
```

for more information, please consult the
[ZK Component Reference](/zk_component_ref/rowlayout).

# Support Expression Language 3 (EL3)

{% include edition-availability.html edition="ce" %}

ZK 8 introduces the new generation expression language of Java EE 7 –
Expression Language 3 (EL 3). Now we can do more complicated and more
powerful things with the newer expression language. There are many new
features in EL 3 such as new operators, lambda expressions, and
collection operations. For more information on EL3, please take a look
at the specification,
[JSR-341](https://jcp.org/aboutJava/communityprocess/final/jsr341/index.html).

Please note that EL3 and all its features (including Lambda expressions)
work for JDK 5 and above in ZK framework.

## Lambda Expressions

Each converter is implemented with the capability to interpret lambda
expressions defined in zul. The following code shows a textbox whose
value and onOK attribute are both driven by lambdas.

```xml
<textbox value="@load((x -> (x * 100) / 2.54)(vm.value))" 
    onOK="@command('click', key=((x -> (x * 2.54) / 100)(self.value)))" />
```

the syntax used is the same as the ones in Java SE 8 and behaves like an
anonymous function which is discarded after evaluation. We can name a
lambda and evaluate indirectly.

Take the lambda expression `(x -> (x * 100) / 2.54)`for example. In this
case, it will create an anonymous function which takes a value,
multiplies it by 100 and divides the result by 2.54. This function is
then applied to vm.value, where vm stands for our ViewModel.

To simplify this, let us write some pseudo code for demonstration
purposes.

```xml
myFunction = x -> (x * 100) / 2.54 //assign a lambda to myFunction temporarily
myFunction(vm.value) //execute myFunction passing vm.value as the parameter
```

while the above is just pseudo code to help you understand the
functionality better, it does demonstrate naming of lambdas, which is
also possible. The following section outlines the steps of achieving
this by using two new operators.

## New Operators

### String Concatenation

String concatenation has been introduced to make it easy to construct
strings within EL expressions. The following code snippet demonstrates
how to do so.

```xml
<label value="@load(('Hi, ' += vm.firstname += ' ' += vm.lastname))" />
```

### Assignment and Semicolons

Both assignment and semicolon operators are now implemented. Below shows
an example of both being used.

```xml
<label value="@load((incr = x -> x + 1; incr(5)))" />
```

the assignment operator in this instance assigns a lambda function to
`incr` which takes x, increments by 1 and then returns it.

```xml
incr = x -> x + 1
```

by using the ';' operator, it evaluates the left-hand side first; thus,
creating a lambda function incr, as previously discussed. Then, it
evaluates and returns the right-hand side. So in the following case:

```xml
<label value="@load((incr = x -> x + 1; incr(5)))" />
```

the value assigned to the label would be 6, as the lambda function is
first evaluated and assigned to incr, then the incr(5) call is evaluated
leading to a return value of 6.

## Collection Operations

In ZK 8 it is now possible to use collection chain operations directly.
In the example below we turn vm.names into stream() and then can create
a pipeline of commands.

```xml
<listbox model="@load((vm.names.stream()
                               .filter(x -> x.contains(vm.filter))
                               .toList()))">
```

in addition to pipelines, ZK 8's EL 3 supports easy collection
construction using brackets (\[ \]). The following example demonstrates
this.

```xml
<label value="@load(([1, 2, 3, 4].stream().sum()))" />
```

## Static Field and Method References

You can reference a Java class' static field or static method with the
syntax `Classname.Field`, such as

```xml
 
<label value="@load((Math.sqrt(16)))" />
```

please note that `java.lang.*` is imported by default.

# Custom data attribute handlers are now possible

{% include edition-availability.html edition="ce" %}

It is possible to define custom data-handlers for client attributes,
which gives extra flexibility to developers looking to integrate and use
3rd party libraries.

For example, the following demonstrates a data-handler for jQuery's mask
functionality.

**Zul File:**

```xml
<textbox xmlns:ca="client/attribute" ca:data-mask="00:00:00" onChange='Clients.log(self.value)'/>
```

**zk.xml:**

```xml
<client-config> 
    <data-handler>
        <name>mask</name><!-- the attribute name, i.e. data-mask -->
        <depends>http://igorescobar.github.io/jQuery-Mask-Plugin/js/jquery.mask.min.js</depends>
        <script>
        function (wgt, dataValue) {
            jq(wgt.$n()).mask(dataValue);

            // unformat after onChange event.
            wgt.listen({onChange: function (event) {
                event.data.value = jq(this.$n()).cleanVal();
            }});
        }
        </script>
    </data-handler>
</client-config>
```

for more information, please refer to the [ZK8: Simple but Powerful;
Using Data-handler API to Work with Front-End
Technologies](http://blog.zkoss.org/index.php/2015/08/25/zk8-simple-but-powerful-using-data-handler-api-to-work-with-front-end-technologies/).

# Font Awesome upgrade

{% include edition-availability.html edition="ce" %}

Font awesome has been upgraded to version 4.3, introducing over 40 new
icons. For more details, please check the [font-awesome
website](http://fortawesome.github.io/Font-Awesome/icons/).

# Introducing Danish language support

{% include edition-availability.html edition="ce" %}

Thanks to our contributor Flemming Birch-Rasmussen, ZK 8 now provides
support in Danish.

# Websocket Support

Provide [org.zkoss.zk.ui.sys.Storage](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/Storage.html),
[org.zkoss.zk.ui.http.ZKWebSocket](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/http/ZKWebSocket.html), and
[org.zkoss.zk.ui.annotation.Command](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/annotation/Command.html) to share data and
communicate between a ZK application and a websocket application within
the same session. We can now receive the data storage from ZK desktop
object to share or update the application data, so that the websocket
echo server can use or get the latest data from it or vice versa. This
makes it possible to embrace big data in the most efficient manner.

Please refer to [ZK Developer's Reference/Integration/Miscellenous/Websocket_Channel](/zk_dev_ref/integration/websocket_channel)

# Performance Improvement

In addition to the performance boost brought by MVVM enhancements, the
following efforts have been made in ZK 8 to further advance the overall
performance and usability.

1.  More efficient rendering on children binding.
2.  Use a direct method invoking instead of java reflection for
    component to apply properties.
3.  Use a lazy initialization of Java Object creation to reduce the
    memory footprint.
4.  Use `StringBuilder` instead of `StringBuffer` for component
    rendering.
5.  Use new string escape implementation.
6.  Use java.util.concurrent framework instead of synchronised keyword.

These optimizations may bring as much as 50% of saved memory and 75% of
shortened response time. See also
[Major MVVM Enhancements](#major-mvvm-enhancements) for
details and test cases.

# Other changes

## ZHTML component's src attribute supports encoded url in ZUL

{% include edition-availability.html edition="ce" %}

ZK 8's ZHTML components now support encoded urls, making it much easier
to specify images and other urls on the src attribute.

For example:

```xml
<x:img xmlns:x="xhtml" src="~./img/spacer.gif" xmlns:c="client" c:onBind='zk.log(this.$n().src)'/>
```

for more information, please refer to the [ZK Component
Reference](/zk_component_ref/xhtml_components).

## ZHTML supports dynamic data binding

{% include edition-availability.html edition="ce" %}

The textContent attribute now supports dynamic databinding, making it
possible to use MVVM based commands for a textContent attribute. For
example:

```xml
<label textContent="@load(each.author.name)"
    sclass="author-name z-label" />
```

## Simplified thrown exceptions

{% include edition-availability.html edition="ce" %}

Exceptions were thrown as UIExceptions and when including templates or
similar procedures, the resulting stacktrace was exceptionally hard to
follow. This also makes it difficult to create meaningful error pages
for application.

With the advent of ZK 8, exceptions are are no longer wrapped with
UIException; they will throw a RuntimeException.

## Multiple constraints can have its own error message

{% include edition-availability.html edition="ce" %}

Before, when defining constraints, only the last constraint could have a
separate error message. This has now been rectified and every constraint
can have its own custom error message.

For example:

```xml
<datebox constraint="no empty: please select a date; no future: now or never" />
```

for more information, please refer to
[ZK's Component
Reference](/zk_component_ref/inputelement).

## Datebox calendar now contains a today button

{% include edition-availability.html edition="ce" %}

In ZK 8, the Datebox calendar now contains a button that makes it easy
to reset the date to today. The button assumes the form of the current
date.

![]({{site.baseurl}}/assets/images/small-talk/zkcomref_datebox_link_of_today.PNG)

## Embedded types now allowed

{% include edition-availability.html edition="ce" %}

When parsing a page, sometimes an error would occur when HTML was
embedded in a ZHTML page. This is now fixed and the ability to use
different parsers, depending on the syntax in the page, is allowed.

For example, here we have HTML embedded inside ZHTML:

```xml
<html>
    <head>
         <!--[if lte IE 9]>
            <link rel="stylesheet" href="../assets/css/test.min.css" />
        <![endif]-->
    </head>
<body>
<u:window xmlns:u="zul" title="test" id="mainWindow" apply="org.zkoss.bind.BindComposer"
    viewModel="@id('vm') @init('test.MyVM')" height="100%" >
    &copy Test
</u:window>
</body>
</html>
```

## ForeachStatus is consistent with JSTL's varStatus properties

{% include edition-availability.html edition="ce" %}

ZK's ForEachStatus now has the same properties as varStatus, so it is
more intuitive for developers to use what they are used to as is.

```xml
<zk xmlns:n="native">
    <n:h4>1. Test case: forEach="one, two, three, four"</n:h4>
    <zscript>
    items = Arrays.asList(new Object[] { "one", "two", "three", "four" });
</zscript>
    <div style="border:1px solid blue">
        <div forEach="${items}">
            ${each} Index: ${forEachStatus.index} Count:
            ${forEachStatus.count} First: ${forEachStatus.first} Last:
            ${forEachStatus.last}
        </div>
    </div>
    Result:
    <div style="border:1px solid red;color:blue">
        <div>one Index: 0 Count: 1 First: true Last: false</div>
        <div>two Index: 1 Count: 2 First: false Last: false</div>
        <div>three Index: 2 Count: 3 First: false Last: false</div>
        <div>four Index: 3 Count: 4 First: false Last: true</div>
    </div>
    <n:h4>2. Test case: forEach="one, two, three, four" forEachStep="3"</n:h4>
    <div style="border:1px solid blue">
        <div forEach="${items}" forEachStep="3">
            ${each} Index: ${forEachStatus.index} Count:
            ${forEachStatus.count} First: ${forEachStatus.first} Last:
            ${forEachStatus.last}
        </div>
    </div>
    Result:
    <div style="border:1px solid red;color:blue">
        <div>one Index: 0 Count: 1 First: true Last: false</div>
        <div>four Index: 3 Count: 2 First: false Last: true</div>
    </div>
    <n:h4>3. Test case: forEach="one, two, three, four" forEachBegin="1" forEachStep="3"
    </n:h4>
    <div style="border:1px solid blue">
        <div forEach="${items}" forEachBegin="1" forEachStep="3">
            ${each} Index: ${forEachStatus.index} Count:
            ${forEachStatus.count} First: ${forEachStatus.first} Last:
            ${forEachStatus.last}
        </div>
    </div>
    Result:
    <div style="border:1px solid red;color:blue">
        <div>two Index: 1 Count: 1 First: true Last: true</div>
    </div>
</zk>
```

## Customizable upload error message

When the file size exceeds the maximum size limit for upload, you may
wish to display a message to alert your user. Now you can customize the
message based on your preferences. Please refer to [ZK Developer's
Reference/Internationalization](/zk_dev_ref/internationalization/warning_and_error_messages#change-particular-message).

For Example, (in WEB-INF/zk-label.properties)

```xml
MZul.2105=The request was rejected because its size ({0}) exceeds the configured maximum ({1})
```

notice that you can change the index `{0}` and `{1}` to choose the file
size unit. (Auto:{0},{1} Byte:{2},{3} KB:{4},{5} MB:{6},{7})

## Usability enhancements

The following changes are made to prevent you from doing it wrong and
getting unexpected behaviors.

### Auxheader doesn't allow you to set its size by width/height/hflex/vflex

Because an Auxheader's width and height are automatically determined by
its column span and the row span, we now forbid users to set the width
and height to avoid any confusion and unexpected behavior.

### Width/height should not be set at the same time as hflex/vflex

Width and hflex are both for determining the width of a component;
therefore, it makes no sense to apply both the width attribute and the
hflex attribute on the same component at the same time. In ZK 8, an
exception will be thrown if a component is assigned with both the width
and the hflex attribute to avoid confusion. This also applies to the
case where height and vflex are set to the same component.

