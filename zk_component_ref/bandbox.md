

# Bandbox

- Demonstration:
  [Bandbox](http://www.zkoss.org/zkdemo/combobox/customizable_combobox)
- Java API: [org.zkoss.zul.Bandbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Bandbox.html)
- JavaScript API: [zul.inp.Bandbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Bandbox.html)

# Employment/Purpose

A bandbox is a special text box that embeds a customizable popup window
(aka., a dropdown window). Like comboboxes, a bandbox consists of an
input box and a popup window. The popup window is opened automatically,
when a user presses Alt+DOWN or clicks the magnifier button.

Unlike comboboxes, the popup window of a bandbox could be anything. It
is designed to give developers the maximal flexibility. A typical use is
to represent the popup window as a search dialog.

# Example

![](/zk_component_ref/images/ZKComRef_Bandbox_Example.png)

```xml
    <bandbox>
        <bandpopup>
            <listbox style="max-width:300px"
                     onSelect="bd.value=self.selectedItem.label;bd.close();">
                <listhead>
                    <listheader label="Name"/>
                    <listheader label="Description"/>
                </listhead>
                <listitem>
                    <listcell label="John"/>
                    <listcell label="CEO"/>
                </listitem>
                <listitem>
                    <listcell label="Joe"/>
                    <listcell label="Engineer"/>
                </listitem>
                <listitem>
                    <listcell label="Mary"/>
                    <listcell label="Supervisor"/>
                </listitem>
            </listbox>
        </bandpopup>
    </bandbox>
```

# Keyboard Navigation bandbox

- `Alt+DOWN` to pop up the list.
- `Alt+UP` or `ESC` to close the list.

# Properties

## The Close Method

A popup window could contain any components, so it is the developer’s
job to close the popup and copy any needed value from it.

```xml
<listbox width="200px"
   onSelect="bd.value=self.selectedItem.label; bd.close();">
```

In the above example, we copy the selected item's label to the bandbox,
and then close the popup.

## Autodrop

![](/zk_component_ref/images/ZKComRef_Bandbox_Autodrop.PNG)

By default, the popup window won't be opened until user clicks the
button, or presses `Alt+DOWN` on the keyboard. However, you can set the
`autodrop` property to true and as soon as the user types a character
the popup will be opened. This is helpful for novice users, but it might
be annoying for experienced users.

```xml
<zk>
    <bandbox id="bd" autodrop="true">
        <bandpopup>
            ...
        </bandpopup>
    </bandbox>
</zk>
```

## The onOpen Event

If the user opens the popup window the `onOpen` event is sent to the
application. By using the `fulfill` attribute with the `onOpen` value as
shown below, you can defer the creation of the popup window.

```xml
<bandbox id="test">
    <bandpopup fulfill="test.onOpen">
     ...
    </bandpopup>
</bandbox>
```

Alternatively, you can prepare the popup window in Java by listening to
the `onOpen` event, as depicted below.

```xml
<zk>
    <bandbox id="band" onOpen="prepare()"/>
    
    <zscript>
         void prepare() 
         {
             if (band.getPopup() == null) {
                 //create child elements
             }
         }
    </zscript>
</zk>
```

## The onChanging Event

Since a bandbox is also a text box, you are also able to listen to an
`onChanging` event. By listening to this event, you can manipulate the
popup window in any fashion. The code below illustrates capturing the
user key and displaying information accordingly.

```xml
<zk>
    <bandbox id="band" autodrop="true" onChanging="suggest()"/>
    <zscript>
         void suggest() 
         {
             if (event.value.startsWith("A")) {
                 //do something
             } else if (event.value.startsWith("B")) {
                 //do another
             }
         }
    </zscript>
</zk>
```

Notice that, when the `onChanging` event is received, the content of the
bandbox has not changed. Therefore, you cannot get the `value` property
of the bandbox. Instead, you should call
[org.zkoss.zk.ui.event.InputEvent.getValue()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html#getValue--).

## Constraint

You could specify what value to accept for input controls by the use of
the `constraint`property. It could be a combination of `no empty`,
and/or a regular expression.

To specify two or more constraints, use comma to separate them as
follows.

```xml
<bandbox constraint="no empty,/^A/"/>
```

To specify a regular expression, you may have to use the character `/`
to enclose the regular expression as follows.

```xml
<bandbox constraint="/^A/"/>
```

Notes:

- The above statement is XML, so do *not* use `\\` to specify a
  backslash. However typing `\\` is necessary, if writing in Java.

```java
new Bandbox().setConstraint("/.+@.+\\.[a-z]+/");
```

- You are allowed to mix regular expressions with other constraints by
  separating them with a comma.

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<bandbox constraint="/^A/: only allowed the item start with A"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<bandbox constraint="/^A/: ${c:l('err.startwith.required')}"/>
```

## IconSclass

{% include version-badge.html version=8.6.2 %} Specify the sclass name of the
Bandbox button icon. For built-in icon, please see
[LabeliImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement).

# Inherited Functions

Please refer to [ Textbox]({{site.baseurl}}/zk_component_ref/textbox) for inherited
functions.

# Supported Events

| Name | Event Type |
|---|---|
| onOpen | <strong>Event:</strong>
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html)
Denotes user has opened or closed a component. Note: unlike onClose,
this event is only a notification. The client sends this event after
opening or closing the component. |

- Inherited Supported Events: [ Textbox]({{site.baseurl}}/zk_component_ref/textbox#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot |
|---|---|
| default | ![](/zk_component_ref/images/bandbox_mold_default.png) |
| rounded | ![](/zk_component_ref/images/bandbox_mold_rounded.png) 
{% include version-badge.html version=5.0.0 %} |

# Supported Children

`*`[` Bandpopup `]({{site.baseurl}}/zk_component_ref/bandpopup)
