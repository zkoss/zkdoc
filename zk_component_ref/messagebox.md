

# Messagebox

- Demonstration: [Messagebox](http://www.zkoss.org/zkdemo/userguide/#l8)
- Java API: [org.zkoss.zul.Messagebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html)
- JavaScript API: N/A

# Employment/Purpose

It provides a set of utilities to show a message and have a user to
confirm a situation.

It is typically used to alert users when an error occurs, or to prompt
users for an decision.

# Example

The simplest use of a message box is to inform the user something is
done. For example,

```java
Messagebox.show("The backup has been done.");
Messagebox.show("Failed to access the information", null, 0,  Messagebox.ERROR);
```

There are a lot of utilities that allow you to show a message in
different look, such as the buttons, icon and title. Please refer to
[org.zkoss.zul.Messagebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html) for more information.

## Take Actions Depending On Which Button Is Clicked

If you'd like to know which button is clicked, you have to implement an
event listener[^1]. For example,

```java
Messagebox.show("Something is changed. Are you sure?", 
    "Question", Messagebox.OK | Messagebox.CANCEL,
    Messagebox.QUESTION,
        new org.zkoss.zk.ui.event.EventListener(){
            public void onEvent(Event e){
                if(Messagebox.ON_OK.equals(e.getName())){
                    //OK is clicked
                }else if(Messagebox.ON_CANCEL.equals(e.getName())){
                    //Cancel is clicked
                }
            }
        }
    );
```

The invocation of
[org.zkoss.zul.Messagebox#show(java.lang.String, java.lang.String, int, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html#show(java.lang.String, java.lang.String, int, java.lang.String))
will return immediately after the invocation[^2]. Then, if the user
clicks a button, the event listener will be invoked. You could examine
the event name to know which button is clicked. If the user clicked the
Close button on the right-top corner, the `onClose` event is fired.

> ------------------------------------------------------------------------
>
> <references/>

### Listen ClickEvent

{% include version-badge.html version=6.0.0 %}

Since ZK 6, the event listener will be invoked with an instance of
[org.zkoss.zul.Messagebox.ClickEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox/ClickEvent.html), and it is easy
to retrieve the button being clicked from it. For example,

```java
Messagebox.show("Something is changed. Are you sure?", 
    "Question", Messagebox.OK | Messagebox.CANCEL,
    Messagebox.QUESTION,
        new org.zkoss.zk.ui.event.EventListener<ClickEvent>(){
            public void onEvent(ClickEvent e){
                switch (e.getButton()) {
                case Messagebox.Button.OK: //OK is clicked
                case Messagebox.Button.CANCEL: //Cancel is clicked
                default: //if the Close button is clicked, e.getButton() returns null
                }
            }
        }
    );
```

# Customization

## Assign the Order of Buttons

{% include version-badge.html version=6.0.0 %}

If you'd like to assign the order, you could use
[org.zkoss.zul.Messagebox#show(java.lang.String, org.zkoss.zul.Messagebox.Button[], org.zkoss.zk.ui.event.EventListener listener)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html#show(java.lang.String, org.zkoss.zul.Messagebox.Button[], org.zkoss.zk.ui.event.EventListener listener))
as follows.

```java
 Messagebox.show("Cancel the operation?",
    new Messagebox.Button[] {Messagebox.Button.NO, Messagebox.Button.YES},
        new EventListener<Messagebox.ClickEvent>() { //optional
            public void onEvent(Messagebox.ClickEvent event) {
                //...
            }
        });
```

The buttons will be displayed in the same order as the array specified
in the `buttons` argument.

If you don't care the order, you could use a combination of constants,
such as [org.zkoss.zul.Messagebox#OK](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html#OK). For
example,

```java
 Messagebox.show("Cancel the operation?", null, Messagebox.YES+Messagebox.NO, null);
```

## Assign the Labels of Buttons

{% include version-badge.html version=6.0.0 %}

By default, the label of a button is loaded from [the message file]({{site.baseurl}}/zk_dev_ref/internationalization/warning_and_error_messages)
based on the current locale. However, you could assign any label you'd
like.

```java
onClick='Messagebox.show("Yes and No", "Custom Labels",
    new Messagebox.Button[] {Messagebox.Button.YES, Messagebox.Button.NO},
    new String[] {"Yes, it is correct"},
    Messagebox.INFORMATION, null, null)'/>
```

The `btnLabels` argument is an array of labels you'd like to use. If it
is null or the length is shorter than the array specified the `buttons`
argument, the default label will be used.

## The Default Title

If the title is not specified in the application's name (returned by
[org.zkoss.zk.ui.WebApp#getAppName()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#getAppName())).
You could change it by invoking
[org.zkoss.zk.ui.WebApp#setAppName(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#setAppName(java.lang.String)).

Since 5.0.6, you could specify the application's name with a library
property called
[org.zkoss.zk.ui.WebApp.name]({{site.baseurl}}/zk_config_ref/org_zkoss_zk_ui_webapp_name).
For example, you could specify the following in `WEB-INF/zk.xml`:

```xml
<library-property>
    <name>org.zkoss.zk.ui.WebApp.name</name>
    <value>My Killer Application</value>
</library-property>
```

## The Template

The UI of a message box is based on a ZUL file, so you could customize
it by replacing it with your own implementation. It can be done easily
by invoking
[org.zkoss.zul.Messagebox#setTemplate(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html#setTemplate(java.lang.String)).
Notice that it affects all message boxes used in an application. It is
typically called when the application starts (i.e., in
[org.zkoss.zk.ui.util.WebAppInit#init(org.zkoss.zk.ui.WebApp)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppInit.html#init(org.zkoss.zk.ui.WebApp))
-- for more information, please refer to [ZK Developer's Reference: Life Cycle Listener]({{site.baseurl}}/zk_dev_ref/customization/life_cycle_listener)).

To implement a custom template, please take a look at [the default template](https://github.com/zkoss/zk/blob/master/zul/src/archive/web/zul/html/messagebox.zul).

## The Width and Parameters

{% include version-badge.html version=6.0.0 %}

The `params` argument in
[org.zkoss.zul.Messagebox#show(java.lang.String, java.lang.String, org.zkoss.zul.Messagebox.Button[], java.lang.String[], java.lang.String, org.zkoss.zul.Messagebox.Button, org.zkoss.zk.ui.event.EventListener, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html#show(java.lang.String, java.lang.String, org.zkoss.zul.Messagebox.Button[], java.lang.String[], java.lang.String, org.zkoss.zul.Messagebox.Button, org.zkoss.zk.ui.event.EventListener, java.util.Map))
allows you to customize a message dialog further. For example, you could
make the dialog wider with the parameter called `width` as shown below.

```java
Map params = new HashMap();
params.put("width", 500);
Messagebox.show("This is a very long statement and meaningless to see if it looks ok with the given width.",
    null, null, null, Messagebox.INFORMATION, null,
    new EventListener() {
        public void onEvent(Event event) {
            //...
        }
    }, params);
```

The parameters will be passed to the dialog template (described in the
previous section), so you could pass whatever you'd like as long as the
template recognize them. In additions, the priority of the `params`
argument is higher, i.e., it could override the default values, though
it is rarely required.

{% include version-badge.html version=7.0.1 %} User also can customize the style of
message dialog with the parameter called `sclass` as below.

```java
Map params = new HashMap();
params.put("sclass", "myMessagebox");
Messagebox.show("It's a customized style message box.",
    null, null, null, Messagebox.INFORMATION, null,
    new EventListener() {
        public void onEvent(Event event) {
            //...
        }
    }, params);
```

## Without Buttons' Dialog

{% include version-badge.html version=6.5.1 %}

If you'd like to show a non-buttons dialog, you could use
[org.zkoss.zul.Messagebox#show(java.lang.String, org.zkoss.zul.Messagebox.Button[], org.zkoss.zk.ui.event.EventListener listener)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html#show(java.lang.String, org.zkoss.zul.Messagebox.Button[], org.zkoss.zk.ui.event.EventListener listener))
with an empty array as follows.

```java
 Messagebox.show("Cancel the operation?",
    new Messagebox.Button[0], null);
```

This messagebox will show without any buttons.

# Supported events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date           | Content                                                                                                           |
|---------|----------------|-------------------------------------------------------------------------------------------------------------------|
| 6.0.0   | October 2011   | The order and labels of the buttons were assignable.                                                              |
| 6.0.0   | October 2011   | [org.zkoss.zul.Messagebox.ClickEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox/ClickEvent.html) was introduced to simplify the identification of a button. |
| 6.5.1   | September 2012 | [Messagebox with no button](http://tracker.zkoss.org/browse/ZK-1351)                                              |
| 7.0.1   | January 2014   | [Add sclass to messagebox](http://tracker.zkoss.org/browse/ZK-2087)                                               |



[^1]: If you want to make it running under clustering environment, you
    should implement
    [org.zkoss.zk.ui.event.SerializableEventListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SerializableEventListener.html).
    For more information, please refer to [ZK Developer's Reference: Clustering]({{site.baseurl}}/zk_dev_ref/clustering/programming_tips).

[^2]: Here we assume [the event thread is disabled]({{site.baseurl}}/zk_dev_ref/ui_patterns/event_threads)
    (default). If the event thread is enabled, the show method will
    suspend until the user clicks a button. Thus, you could know which
    button is clicked by simply examining the returned value.
