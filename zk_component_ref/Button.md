# Button

- Demonstration: [Button](http://www.zkoss.org/zkdemo/input/button) and
  [Fileupload](Small_Talks/2009/July/ZK_5:_New_File_Upload#Live_Demo)
- Java API: <javadoc>org.zkoss.zul.Button</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Button</javadoc>
- Style Guide: [
  Button](ZK_Style_Guide/XUL_Component_Specification/Button)

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

![](ZKComRef_Button.jpg)

``` xml
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

A button or a [
Toolbarbutton](ZK_Component_Reference/Essential_Components/Toolbarbutton#File_Upload)
can be used to upload files. All you need to do is:

1.  Specify the `upload` attribute with `true`
2.  Handles the `onUpload` event

``` xml
<button upload="true" label="Fileupload" onUpload="myProcessUpload(event.getMedia())"/>
```

When the file is uploaded, an instance of
<javadoc>org.zkoss.zk.ui.event.UploadEvent</javadoc> is sent to the
button. Then, the event listener can retrieve the uploaded content by
examining the return value of
<javadoc method="getMedia()">org.zkoss.zk.ui.event.UploadEvent</javadoc>.

# Custom Error Message When Fileupload Over Maxsize

1\. Write your own AuLoader

``` java
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

``` xml
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

``` xml
<button label="OK" mold="trendy"/>
```

## Configure to Use the Trendy Mold as Default

If you prefer to use the trendy mold as default, you could configure ZK
by adding the following to `/WEB-INF/zk.xml`

``` xml
<library-property>
    <name>org.zkoss.zul.Button.mold</name>
    <value>trendy</value>
</library-property>
```

# File Download and browser processed links

Similar to [ file download link
problem](ZK_Component_Reference/Essential_Components/A#File_download_link_problem),
if you specify `href` to use a button for downloading, or if you are
using a browser-processed link such as `mailto:`, `tel:`, or other
similar user-processed instruction which would trigger a page unloading
event, you also need to specify `target`:

``` xml
<button label="download" href="/myfile.pdf" target="_blank"/>
```

- If no specifying `target`, you will find event firing doesn't work
  anymore after you download a file.

# Properties

## Autodisable

<javadoc method="setAutodisable(java.lang.String)">org.zkoss.zul.Button</javadoc>
is used to disable a button automatically, when it is clicked. It is
useful to prevent the user from clicking it twice (and firing redundant
requests), which is common if the request takes long to serve.

The simplest use is to specify it with `self` as follows. Then, the
button is disabled when it is clicked.

``` xml
<button id="ok" label="OK" autodisable="self" />
```

If you'd like to disable several buttons, you could specify all of them
in this property by separating with a comma. For example, the following
disables both buttons, when one of them is clicked.

``` xml
<button id="ok" label="OK" autodisable="ok,cancel" />
<button id="cancel" label="Cancel" autodisable="ok,cancel" />
```

The button will be enabled automatically, after the request has been
served (i.e., the response has been sent back to the client). If you
prefer to enable them manually (i.e., by calling
<javadoc method="setDisabled(boolean)">org.zkoss.zul.Button</javadoc>
explicitly), you could prefix the ID with a plus (`+`). For example,

``` xml
<button id="ok" label="OK" autodisable="+self, +cancel" />
```

Then, you could enable them manually under the situation depending on
your application's requirement, such as

``` java
if (something_happens) {
   ok.setDisabled(false);
   cancel.setDisabled(false);
}
```

### Enable Autodisable for All Buttons

As described in [ZK Developer's Reference:
Customization](ZK_Developer's_Reference/Customization/Component_Properties),
you could customize ZK to enable `autodisable` for all button by
specifying the following in the custom language addon:

``` xml
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
(<javadoc method="setHref(java.lang.String)">org.zkoss.zul.Button</javadoc>),
such that the browser will navigate to the URL you specified directly
(without sending back any request to the server). If you prefer to visit
the URL in another browser window, you could specify the name in
<javadoc method="setTarget(java.lang.String)">org.zkoss.zul.Button</javadoc>
(just like using a HTML A tag).

Notice that the end user could hold the `Control` key and click on the
button to visit the link in a new browser window (like a HTML A tag
does).

### Href and the onClick Event

There are two ways to add behavior to a `button` and `toolbarbutton`.
Firstly, you can specify a listener to the `onClick` event. Secondly,
you could specify a URL for the `href` property
(<javadoc method="setHref(java.lang.String)">org.zkoss.zul.Button</javadoc>).
If both are specified, the `href` property has the higher priority,
i.e., the onClick event won't be sent.

``` xml
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
<javadoc method="sendRedirect(java.lang.String)">org.zkoss.zk.ui.Executions</javadoc>
if it shall jump to another URL.

For end users, there is no difference between the use of
<javadoc method="setHref(java.lang.String)">org.zkoss.zul.Button</javadoc>
and
<javadoc method="sendRedirect(java.lang.String)">org.zkoss.zk.ui.Executions</javadoc>.

``` xml
<zk>
    <window>        
        <button label="redirect" onClick="Executions.sendRedirect(&quot;another.zul&quot;)"/>
        <button label="href" href="another.zul"/>
    </window>
</zk>
```

Since the onClick event is sent to the server for processing, you are
able to perform additional tasks before invoking
<javadoc method="sendRedirect(java.lang.String)">org.zkoss.zk.ui.Executions</javadoc>,
such as redirecting to another page only if certain conditions are
satisfied.

On the other hand, the `href` property is processed at the client side.
Your application won't be notified when users click the button.

## Type

<javadoc method="setType(java.lang.String)">org.zkoss.zul.Button</javadoc>
sets the button's type. It is designed to work with the HTML <code>

<form>

</code> and Servlets. For example,

``` xml
<n:form action="/foo/my_handler" xmlns:n="native">
  <textbox/>
  <button type="submit" label="Submit"/>
  <button type="reset" label="Reset"/>
</n:form>
```

## Upload

By specifying the upload property
(<javadoc method="setUpload(java.lang.String)">org.zkoss.zul.Button</javadoc>),
you could make a button used for uploading files. For example,

``` xml
<button label="Upload" upload="true" onUpload="handle(event.media)"/>
```

Once the file(s) are uploaded, the onUpload event will be sent with an
instance of <javadoc>org.zkoss.zk.ui.event.UploadEvent</javadoc>. And,
you could retrieve the uploaded files from
<javadoc method="getMedia()">org.zkoss.zk.ui.event.UploadEvent</javadoc>
and
<javadoc method="getMedias()">org.zkoss.zk.ui.event.UploadEvent</javadoc>

If you want to customize the handling of the file upload at the client,
you can specify a JavaScript class when calling this method:

``` xml
<button upload="foo.Upload"/> <!-- assume you implement a JavaScript class: foo.Upload -->
```

### Options

Some options for the upload can be specified as follows:

``` xml
<button label="Upload" 
upload="true,maxsize=-1,multiple=true,accept=audio/*|video/*|image/*|MIME_type, native"/>
```

- `maxsize`: the maximal allowed upload size of the component, in
  kilobytes, or a negative value if no limit.
- `native`: treating the uploaded file(s) as binary, i.e., not to
  convert it to image, audio, or text files.
- `multiple`: treating the file chooser allows multiple files to upload,
  the setting only works with HTML5-supported browsers
- `accept`: specifies the MIME types of files that the server accepts,
  the setting only works with HTML5-supported browsers. [MIME type
  list](http://www.iana.org/assignments/media-types/media-types.xhtml).

### Customize Upload Size Exceeding Message

Please refer to [ZK Developer's
Reference/Internationalization](ZK_Developer%27s_Reference/Internationalization/Warning_and_Error_Messages#Change_particular_message).

For Example, (in WEB-INF/zk-label.properties)

``` xml
MZul.2105=The request was rejected because its size ({0}) exceeds the configured maximum ({1})
```

Notice that you can change the index {0} & {1} to display different file
size unit. (Auto:{0},{1} Byte:{2},{3} KB:{4},{5} MB:{6},{7})

# Inherited Functions

Please refer to [
LabelImageElement](ZK_Component_Reference/Base_Components/LabelImageElement)
for inherited functions.

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
<p><code>onFocus</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc></p>
<p>Denotes when a component gets the focus.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onBlur</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc></p>
<p>Denotes when a component loses the focus.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onUpload</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.UploadEvent</javadoc> Denotes user has
uploaded a file to the component.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  LabelImageElement](ZK_Component_Reference/Base_Components/LabelImageElement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](button_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>trendy</p>
</center></td>
<td>![](button_mold_trendy.png)</td>
</tr>
<tr class="odd">
<td><center>
<p>os</p>
</center></td>
<td>![](button_mold_os.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Version History

<table>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Date</p></th>
<th><p>Content</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>5.0.4</p></td>
<td><p>August 2010</p></td>
<td><p><javadoc method="setType(java.lang.String)">org.zkoss.zul.Button</javadoc>
was introduced to allow a button able to submit or reset a form.</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">n:form</span><span class="ot"> action=</span><span class="st">&quot;a_uri&quot;</span><span class="ot"> xmlns:n=</span><span class="st">&quot;native&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">button</span><span class="ot"> type=</span><span class="st">&quot;submit&quot;</span><span class="ot"> label=</span><span class="st">&quot;Submit&quot;</span>/&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">button</span><span class="ot"> type=</span><span class="st">&quot;reset&quot;</span><span class="ot"> label=</span><span class="st">&quot;Reset&quot;</span>/&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">n:form</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td><p>6.0.0</p></td>
<td><p>December 2011</p></td>
<td><p><javadoc method="setUpload(java.lang.String)">org.zkoss.zul.Button</javadoc>
the <em>multiple</em> setting was introduced to allow to choose multiple
files to upload at the same time. (HTML5 supported browsers only)</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">button</span><span class="ot"> upload=</span><span class="st">&quot;true,multiple=true&quot;</span><span class="ot"> label=</span><span class="st">&quot;Fileupload&quot;</span>/&gt;</span></code></pre></div></td>
</tr>
<tr class="odd">
<td><p>7.0.0</p></td>
<td><p>September 2013</p></td>
<td><p><javadoc method="setUpload(java.lang.String)">org.zkoss.zul.Button</javadoc>
the <em>accept</em> setting was introduced to allow to specify the types
of files that the server accepts. (HTML5 supported browsers only)</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">button</span><span class="ot"> upload=</span><span class="st">&quot;true,accept=audio/*|video/*|image/*|MIME_type&quot;</span><span class="ot"> label=</span><span class="st">&quot;Fileupload&quot;</span>/&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>
