---
title: "Button"
---


- Demonstration: [Button](http://www.zkoss.org/zkdemo/input/button) and
  [Fileupload](https://www.zkoss.org/wiki/Small_Talks/2009/July/ZK_5:_New_File_Upload#Live_Demo)
- Java API: [org.zkoss.zul.Button](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html)
- JavaScript API: [zul.wgt.Button](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Button.html)


# Employment/Purpose

You could assign a `label` and an `image` to a button by the `label` and
`image` properties. If both are specified, the `dir` property control
which is displayed up front, and the `orient` property controls whether
the layout is horizontal or vertical.

Within ZK 5, the file upload has been redesigned so it can be integrated
with any widget. For example, the button now can be used to upload a
file. In addition to this, the display of the upload status has been
enhanced and can be customized easily.

# Example

![](/zk_component_ref/images/ZKComRef_Button.jpg)

```xml
    <button label="Left" image="/img/network.gif" width="125px"/>
    <button label="Right" image="/img/network.gif" dir="reverse" width="125px"/>
    <button label="Above" image="/img/network.gif" orient="vertical" width="125px"/>
    <button label="Below" image="/img/network.gif" orient="vertical" dir="reverse" width="125px"/>
```

In addition to employing URLs to specify images, you can dynamically
assign a generated image to a button using the `setImageContent` method.
Refer to the following section for details.

**Tip:** The `setImageContent` method is supplied by all components that
have an `image` property. Simply put, `setImageContent` is used for
dynamically generated images, while `image` is used for images
identifiable by a URL.

# File Upload

A button or a [ Toolbarbutton]({{site.baseurl}}/zk_component_ref/toolbarbutton#File_Upload)
can be used to upload files. All you need to do is:

1.  Specify the `upload` attribute with `true`
2.  Handles the `onUpload` event

```xml
<button upload="true" label="Fileupload" onUpload="myProcessUpload(event.getMedia())"/>
```

When the file is uploaded, an instance of
[org.zkoss.zk.ui.event.UploadEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html) is sent to the
button. Then, the event listener can retrieve the uploaded content by
examining the return value of
[org.zkoss.zk.ui.event.UploadEvent#getMedia()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html#getMedia()).

# Custom Error Message When Fileupload Over Maxsize

1\. Write your own AuLoader

```java
package test;  

import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException; 
import org.zkoss.zk.au.http.AuUploader;   

public class MyUploader extends AuUploader {    

   protected String handleError(Throwable ex) {                 
      if(ex instanceof SizeLimitExceededException){             
         SizeLimitExceededException e = (SizeLimitExceededException) ex;            
         return e.getActualSize() + " is over our limit";       
      }         
      return super.handleError(ex);     
   } 
} 
```

2\. Apply it in the web.xml

```xml
<servlet>   
   <description>The asynchronous update engine for ZK</description>     
   <servlet-name>auEngine</servlet-name>    
   <servlet-class>org.zkoss.zk.au.http.DHtmlUpdateServlet</servlet-class>   
   <init-param>         
      <param-name>extension0</param-name>       
      <param-value>/upload=test.MyUploader</param-value>    
   </init-param> 
</servlet>
```

- Result Video Demo
  - <http://screencast.com/t/MZlxSR9JzG>

# Limitation of the Default Mold

The default mold of a button uses HTML BUTTON tag to represent it
visually. It is efficient, but it has some limitations:

1.  The look might be different from one browser to another.
2.  It doesn't support the file upload. In fact, it will become the
    trendy mold automatically if `upload` is specified.
3.  If it is disabled it can not receive mouse events and hence can not
    use ZK popup component as tooltip.

If it is an issue, you could use the trendy mold instead.

```xml
<button label="OK" mold="trendy"/>
```

## Configure to Use the Trendy Mold as Default

If you prefer to use the trendy mold as default, you could configure ZK
by adding the following to `/WEB-INF/zk.xml`

```xml
<library-property>
    <name>org.zkoss.zul.Button.mold</name>
    <value>trendy</value>
</library-property>
```

# File Download and browser processed links

Similar to [ file download link problem]({{site.baseurl}}/zk_component_ref/a#File_download_link_problem),
if you specify `href` to use a button for downloading, or if you are
using a browser-processed link such as `mailto:`, `tel:`, or other
similar user-processed instruction which would trigger a page unloading
event, you also need to specify `target`:

```xml
<button label="download" href="/myfile.pdf" target="_blank"/>
```

- If no specifying `target`, you will find event firing doesn't work
  anymore after you download a file.

# Properties

## Autodisable

[org.zkoss.zul.Button#setAutodisable(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setAutodisable(java.lang.String))
is used to disable a button automatically, when it is clicked. It is
useful to prevent the user from clicking it twice (and firing redundant
requests), which is common if the request takes long to serve.

The simplest use is to specify it with `self` as follows. Then, the
button is disabled when it is clicked.

```xml
<button id="ok" label="OK" autodisable="self" />
```

If you'd like to disable several buttons, you could specify all of them
in this property by separating with a comma. For example, the following
disables both buttons, when one of them is clicked.

```xml
<button id="ok" label="OK" autodisable="ok,cancel" />
<button id="cancel" label="Cancel" autodisable="ok,cancel" />
```

The button will be enabled automatically, after the request has been
served (i.e., the response has been sent back to the client). If you
prefer to enable them manually (i.e., by calling
[org.zkoss.zul.Button#setDisabled(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setDisabled(boolean))
explicitly), you could prefix the ID with a plus (`+`). For example,

```xml
<button id="ok" label="OK" autodisable="+self, +cancel" />
```

Then, you could enable them manually under the situation depending on
your application's requirement, such as

```java
if (something_happens) {
   ok.setDisabled(false);
   cancel.setDisabled(false);
}
```

### Enable Autodisable for All Buttons

As described in [ZK Developer's Reference: Customization]({{site.baseurl}}/zk_dev_ref/customization/component_properties),
you could customize ZK to enable `autodisable` for all button by
specifying the following in the custom language addon:

```xml
<language-addon>
    <component>
        <component-name>button</component-name>
        <extends>button</extends>
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
([org.zkoss.zul.Button#setHref(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setHref(java.lang.String))),
such that the browser will navigate to the URL you specified directly
(without sending back any request to the server). If you prefer to visit
the URL in another browser window, you could specify the name in
[org.zkoss.zul.Button#setTarget(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setTarget(java.lang.String))
(just like using a HTML A tag).

Notice that the end user could hold the `Control` key and click on the
button to visit the link in a new browser window (like a HTML A tag
does).

### Href and the onClick Event

There are two ways to add behavior to a `button` and `toolbarbutton`.
Firstly, you can specify a listener to the `onClick` event. Secondly,
you could specify a URL for the `href` property
([org.zkoss.zul.Button#setHref(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setHref(java.lang.String))).
If both are specified, the `href` property has the higher priority,
i.e., the onClick event won't be sent.

```xml
<zk>
    <window title="example">
        <button label="click me" onClick="do_something_in_Java()"/>
        <button label="don't click that one, click me" href="/another_page.zul"/>
    </window>
</zk>
```

### Href and SendRedirect

The href property is processed at the client. In other words, the
browser will jump to the URL specified in the href property, so your
application running at the server has no chance to process it.

If you have to process it at the server or you have to decide whether to
jump to another URL based on certain condition, you could listen to the
onClick event, process it, and then invoke
[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String))
if it shall jump to another URL.

For end users, there is no difference between the use of
[org.zkoss.zul.Button#setHref(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setHref(java.lang.String))
and
[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String)).

```xml
<zk>
    <window>        
        <button label="redirect" onClick="Executions.sendRedirect(&quot;another.zul&quot;)"/>
        <button label="href" href="another.zul"/>
    </window>
</zk>
```

Since the onClick event is sent to the server for processing, you are
able to perform additional tasks before invoking
[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String)),
such as redirecting to another page only if certain conditions are
satisfied.

On the other hand, the `href` property is processed at the client side.
Your application won't be notified when users click the button.

## Type

{% include supported-since.html version="5.0.4" %}

[org.zkoss.zul.Button#setType(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setType(java.lang.String))
sets the button's type. It is designed to work with the HTML `<form>`and Servlets. For example,

```xml
<n:form action="/foo/my_handler" xmlns:n="native">
  <textbox/>
  <button type="submit" label="Submit"/>
  <button type="reset" label="Reset"/>
</n:form>
```

## Upload

By specifying the upload property
([org.zkoss.zul.Button#setUpload(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setUpload(java.lang.String))),
you could make a button used for uploading files. For example,

```xml
<button label="Upload" upload="true" onUpload="handle(event.media)"/>
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
<button upload="foo.Upload"/> <!-- assume you implement a JavaScript class: foo.Upload -->
```

### Options

Some options for the upload can be specified as follows:

```xml
<button label="Upload" 
upload="true,maxsize=-1,multiple=true,accept=audio/*|video/*|image/*|MIME_type, native"/>
```

- `maxsize`: the maximal allowed upload size of the component, in
  kilobytes, or a negative value if no limit.
- `native`: treating the uploaded file(s) as binary, i.e., not to
  convert it to image, audio, or text files.
- `multiple`: {% include supported-since.html version="6.0.0" %} treating the file
  chooser allows multiple files to upload, the setting only works with
  HTML5-supported browsers
- `accept`: {% include supported-since.html version="7.0.0" %} specifies the MIME types
  of files that the server accepts, the setting only works with
  HTML5-supported browsers. [MIME type list](http://www.iana.org/assignments/media-types/media-types.xhtml).

### Customize Upload Size Exceeding Message

{% include supported-since.html version="8.0.0" %} Please refer to [ZK Developer's Reference/Internationalization]({{site.baseurl}}/zk_dev_ref/internationalization/warning_and_error_messages#Change_particular_message).

For Example, (in WEB-INF/zk-label.properties)

```xml
MZul.2105=The request was rejected because its size ({0}) exceeds the configured maximum ({1})
```

Notice that you can change the index {0} & {1} to display different file
size unit. (Auto:{0},{1} Byte:{2},{3} KB:{4},{5} MB:{6},{7})

# Inherited Functions

Please refer to [ LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement)
for inherited functions.

# Supported Events

| Name | Event Type |
|---|---|
| `onFocus` | **Event:**
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)
Denotes when a component gets the focus. |
| `onBlur` | **Event:**
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)
Denotes when a component loses the focus. |
| `onUpload` | **Event:**
[org.zkoss.zk.ui.event.UploadEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html) Denotes user has
uploaded a file to the component. |

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot |
|---|---|
| default | ![](/zk_component_ref/images/button_mold_default.png) |
| trendy | ![](/zk_component_ref/images/button_mold_trendy.png) |
| os | ![](/zk_component_ref/images/button_mold_os.png) |

# Supported Children

`*NONE`

# Version History

| Version | Date | Content |
|---|---|---|
| 5.0.4 | August 2010 | [org.zkoss.zul.Button#setType(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setType(java.lang.String)) was introduced to allow a button able to submit or reset a form. |
| 6.0.0 | December 2011 | [org.zkoss.zul.Button#setUpload(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setUpload(java.lang.String)) the **multiple** setting was introduced to allow to choose multiple files to upload at the same time. (HTML5 supported browsers only) |
| 7.0.0 | September 2013 | [org.zkoss.zul.Button#setUpload(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setUpload(java.lang.String)) the **accept** setting was introduced to allow to specify the types of files that the server accepts. (HTML5 supported browsers only) |


