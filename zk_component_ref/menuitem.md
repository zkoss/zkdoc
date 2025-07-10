

# Menuitem

- Demonstration: [Menu](http://www.zkoss.org/zkdemo/menu) and
  [Fileupload](https://www.zkoss.org/wiki/Small_Talks/2009/July/ZK_5:_New_File_Upload#Live_Demo)
- Java API: [org.zkoss.zul.Menuitem](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html)
- JavaScript API: [zul.menu.Menuitem](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.menu.Menuitem.html)
- Style Guide: [ Menuitem in Menubar]({{site.baseurl}}/zk_style_customization_guide/menuitem_in_menubar),
  [ Menuitem in Menupopup]({{site.baseurl}}/zk_style_customization_guide/menuitem_in_menupopup)

# Employment/Purpose

A single choice in a `Menupopup` element. It acts much like a button but
it is rendered on a menu. Default `getZclass(): z-menu-item`.

Within ZK 5, the file upload has been redesigned so it can be integrated
with any widget. For example, the toolbarbutton can now be used to
upload a file. In addition to this, the display of the upload status has
been enhanced and can be customized easily.

# Example

![](/zk_component_ref/images/ZKComRef_Menuitem.png)

```xml
<menubar>
 <menu label="File">
     <menupopup>
         <menuitem label="New" onClick="alert(self.label)"/>
         <menuitem label="Open" onClick="alert(self.label)"/>
         <menuitem label="Save" onClick="alert(self.label)"/>
         <menuseparator/>
         <menuitem label="Exit" onClick="alert(self.label)"/>
     </menupopup>
 </menu>
 <menuitem label="Home"/>
</menubar>
```

# Fileupload Example

```xml
<menuitem upload="true" label="Customized Attach" onUpload='alert("File is uploaded!")'/>
```

# Properties

## Autodisable

{% include version-badge.html version=5.0.7 %}
[org.zkoss.zul.Menuitem#setAutodisable(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setAutodisable(java.lang.String))
is used to disable a menuitem automatically, when it is clicked. It is
useful to prevent the user from clicking it twice (and firing redundant
requests), which is common if the request takes too long to serve.

The simplest use is to specify it with `self` as follows. Then, the
menuitem is disabled when it is clicked.

```xml
<menuitem id="ok" label="OK" autodisable="self" />
```

If you'd like to disable several menuitems, you could specify all of
them in this property by separating with a comma. For example, the
following disables both menuitems, when one of them is clicked.

```xml
<menuitem id="ok" label="OK" autodisable="ok,cancel" />
<menuitem id="cancel" label="Cancel" autodisable="ok,cancel" />
```

The menuitem will be enabled automatically, after the request has been
served (i.e., the response has been sent back to the client). If you
prefer to enable them manually (i.e., by calling
[org.zkoss.zul.Menuitem#setDisabled(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setDisabled(boolean))
explicitly), you could prefix the ID with a plus (`+`). For example,

```xml
<menuitem id="ok" label="OK" autodisable="+self, +cancel" />
```

Then, you could enable them manually under the situation depending on
your application's requirement, such as

```java
if (something_happens) {
   ok.setDisabled(false);
   cancel.setDisabled(false);
}
```

### Enable Autodisable for All Menuitems

As described in [ZK Developer's Reference: Customization]({{site.baseurl}}/zk_dev_ref/customization/component_properties),
you could customize ZK to enable `autodisable` for all menuitem by
specifying the following in the custom language addon:

```xml
<language-addon>
    <component>
        <component-name>menuitem</component-name>
        <extends>menuitem</extends>
        <property>
            <property-name>autodisable</property-name>
            <property-value>self</property-value>
        </property>
    </component>
</language-addon>
```

## Href

In addition to handling the onClick event, you could specify the URL in
the href property
([org.zkoss.zul.Menuitem#setHref(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setHref(java.lang.String))),
such that the browser will navigate to the URL you specified directly
(without sending back any request to the server). If you prefer to visit
the URL in another browser window, you could specify the name in
[org.zkoss.zul.Menuitem#setTarget(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setTarget(java.lang.String))
(just like using a HTML A tag).

Notice that the end user could hold the `Control` key and click on the
menuitem to visit the link in a new browser window (like a HTML A tag
does).

### Href and the onClick Event

There are two ways to add behavior to a `menuitem`. Firstly, you can
specify a listener for the `onClick` event. Secondly, you could specify
a URL for the `href` property
([org.zkoss.zul.Menuitem#setHref(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setHref(java.lang.String))).
If both are specified, the `href` property has the higher priority,
i.e., the onClick event won't be sent.

```xml
<zk>
    <menubar>
        <menuitem label="click me" onClick="do_something_in_Java()"/>
        <menuitem label="don't click that one, click me" href="/another_page.zul"/>
    </menubar>
</zk>
```

### Href and SendRedirect

The href property is processed at the client. In other words, the
browser will jump to the URL specified in the href property, so your
application running on the server has no chance to process it.

If you have to process it on the server or you have to decide whether to
jump to another URL based on certain condition, you could listen to the
onClick event, process it, and then invoke
[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String))
if it jumps to another URL.

For end users, there is no difference between the use of
[org.zkoss.zul.Menuitem#setHref(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setHref(java.lang.String))
and
[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String)).

```xml
<zk>
    <menubar>       
        <menuitem label="redirect" onClick="Executions.sendRedirect(&quot;another.zul&quot;)"/>
        <menuitem label="href" href="another.zul"/>
    </menubar>
</zk>
```

Since the onClick event is sent to the server for processing, you are
able to perform additional tasks before invoking
[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String)),
such as redirecting to another page only if certain conditions are
satisfied.

On the other hand, the `href` property is processed at the client side.
Your application won't be notified when users click the menuitem.

## Upload

By specifying the upload property
([org.zkoss.zul.Menuitem#setUpload(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setUpload(java.lang.String))),
you could make a menuitem used for uploading files. For example,

```xml
<menuitem upload="true" label="Upload" onUpload='alert(event.media)'/>
```

Once the file(s) are uploaded, the onUpload event will be sent with an
instance of [org.zkoss.zk.ui.event.UploadEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html). And,
you could retrieve the uploaded files from
[org.zkoss.zk.ui.event.UploadEvent#getMedia()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html#getMedia())
and
[org.zkoss.zk.ui.event.UploadEvent#getMedias()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html#getMedias())

If you want to customize the handling of the file upload at the client,
you can specify a JavaScript class when calling this method:

```xml
<menuitem upload="foo.Upload"/> <!-- assume you implement a JavaScript class: foo.Upload -->
```

Another options for the upload can be specified as follows:

```xml
<menuitem label="Upload" upload="true,maxsize=-1,native"/>
```

where

- maxsize: the maximal allowed upload size of the component, in
  kilobytes, or a negative value if no limit.
- native: treating the uploaded file(s) as binary, i.e., not to convert
  it to image, audio or text files.

# Supported Events

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
<td><center>
<p><code>onCheck</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.CheckEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/CheckEvent.html) Denotes user has
checked the item.</p></td>
</tr>
<tr class="even">
<td><center>
<p>onUpload</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.UploadEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html) Denotes user has
uploaded a file to the component.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/base_components/labelimageelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date     | Content                                                                                                                                               |
|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.7   | May 2011 | [org.zkoss.zul.Menuitem#setAutodisable(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuitem.html#setAutodisable(java.lang.String)) was used to disable a menuitem automatically, when it is clicked. |


