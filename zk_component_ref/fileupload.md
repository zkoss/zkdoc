# Fileupload

- Demonstration: [File Upload](http://www.zkoss.org/zkdemo/file_handling/file_upload)
- Java API: [org.zkoss.zul.Fileupload](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Fileupload.html)
- JavaScript API:
  <javadoc directory="jsdoc">zul.wgt.Fileupload</javadoc>


# Employment/Purpose

There are two ways to use [org.zkoss.zul.Fileupload](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Fileupload.html) as
a component to upload files, or invoke
<javadoc method="get()">org.zkoss.zul.Fileupload</javadoc> to open a
dialog to upload files.

# Use as a Component

[org.zkoss.zul.Fileupload](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Fileupload.html) itself is a component. You
can use it directly as follows.

```xml
<fileupload label="Upload">
   <attribute name="onUpload">
   org.zkoss.util.media.Media media = event.getMedia();
   //then, you can process media here
   </attribute>
</fileupload>
```

[org.zkoss.zul.Fileupload](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Fileupload.html) is actually a button with
`upload=true`. In other words, the above is equivalent to

```xml
<button label="Upload" upload="true">
...
```

Please refer to [Button: Upload]({{site.baseurl}}/zk_component_ref/essential_components/button#Upload)
for details.

# Invoke the Static Method: get

Fileupload provides a set of static methods to simplify file uploading,
such as <javadoc method="get()">org.zkoss.zul.Fileupload</javadoc>,
<javadoc method="get(java.lang.String, java.lang.String)">org.zkoss.zul.Fileupload</javadoc>,
and so on.

The behavior is a little bit different depending on if the event thread
is enabled (default: it is disabled[^1]).

> ------------------------------------------------------------------------
>
> <references/>

## Creating a custom template for the Static Method: get

When using the static method Fileupload.get(...) to display a generic
upload popup, the popup content is defined by a ZUL file, so you could
customize it by replacing it with your own implementation. It can be
done easily by invoking
<javadoc method="setTemplate(java.lang.String)">org.zkoss.zul.Fileupload</javadoc>.
Notice that it affects all Fileupload popups subsequently created in an
application. It is typically called when the application starts (i.e.,
in
<javadoc method="init(org.zkoss.zk.ui.WebApp)" type="interface">org.zkoss.zk.ui.util.WebAppInit</javadoc>
-- for more information, please refer to [ZK Developer's Reference: Life Cycle Listener]({{site.baseurl}}/zk_dev_ref/customization/life_cycle_listener)).

To implement a custom template, please take a look at [the default template for ZK 9](https://github.com/zkoss/zk/blob/v9.6.5/zul/src/archive/web/zul/html/fileuploaddlg.zul)
or [the default template for ZK 10](https://github.com/zkoss/zk/blob/master/zul/src/main/resources/web/zul/html/fileuploaddlg.zul).

## Example Usage

When the event thread is disabled (default), the execution won't be
suspended when
<javadoc method="get()">org.zkoss.zul.Fileupload</javadoc> is called. In
other words, the returned value is always null. To retrieve the uploaded
files, the developer has to listen the `onUpload` event, which is sent
when the uploading is completed.

By default, the `onUpload` event is sent to all root components. For
example, [org.zkoss.zul.Div](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Div.html) will, in the following
example, receive the `onUpload` event since it is the root component:

```xml
<div onUpload="processMedia(event.getMedias());">
    <zscript deferred="true"><![CDATA[
    import org.zkoss.util.media.Media;
 
    public void processMedia(Media[] media) {
        if (media != null) {
            for (int i = 0; i < media.length; i++) {
                if (media[i] instanceof org.zkoss.image.Image) {
                    image.setContent(media[i]);
                } else {
                    Messagebox.show("Not an image: " + media[i], "Error",
                            Messagebox.OK, Messagebox.ERROR);
                    break; //not to show too many errors
                }
            }
        }
    }
]]></zscript>
    <vbox>
        <button label="Upload" onClick="Fileupload.get(-1);" />
        <image id="image" />
    </vbox>
</div>
```

### Specify the Callback Event Listener

{% include version-badge.html version=6.5.3 %}

If you prefer the event being sent to the callback event listener,
specify the event listener when invoke Fileupload.get().

**Note**: the target of the upload event is always null.

For example:

```xml
<zk>
    <vbox>
       <button label="Upload">
            <attribute name="onClick">
                Fileupload.get(new EventListener(){
                    public void onEvent(UploadEvent event) {
                        org.zkoss.util.media.Media media = event.getMedia();
                        if (media instanceof org.zkoss.image.Image) {
                            org.zkoss.image.Image img = (org.zkoss.image.Image) media;
                            if (img.getWidth() > img.getHeight()){
                                if (img.getHeight() > 300) {
                                    pics.setHeight("300px");
                                    pics.setWidth(img.getWidth() * 300 / img.getHeight() + "px");
                                }
                            }
                            if (img.getHeight() > img.getWidth()){
                                if (img.getWidth() > 400) {
                                    pics.setWidth("400px");
                                    pics.setHeight(img.getHeight() * 400 / img.getWidth() + "px");
                                }
                            }
                            image.setContent(img);
                        } else {
                            Messagebox.show("Not an image: "+media, "Error", Messagebox.OK, Messagebox.ERROR);
                        }
                    }
                })
            </attribute>
        </button>
        <image id="image" />
    </vbox>
</zk>
```

### Specify the Target Component

{% include version-badge.html version=5.0.2 %}

If you prefer the event being sent to a particular component, specify
the component in the desktop's attribute called
`org.zkoss.zul.Fileupload.target`.

For example, we could have the button to receive the onUpload event as
follows:

```xml
<zk>
    <zscript deferred="true"><![CDATA[
    import org.zkoss.util.media.Media;

    Executions.getCurrent().getDesktop().setAttribute(
            "org.zkoss.zul.Fileupload.target", uploadBtn);

    public void processMedia(Media[] media) {
        if (media != null) {
            for (int i = 0; i < media.length; i++) {
                if (media[i] instanceof org.zkoss.image.Image) {
                    image.setContent(media[i]);
                } else {
                    Messagebox.show("Not an image: " + media[i], "Error",
                            Messagebox.OK, Messagebox.ERROR);
                    break; //not to show too many errors
                }
            }
        }
    }
]]></zscript>
    <vbox>
        <button id="uploadBtn" label="Upload"
            onUpload="processMedia(event.getMedias());"
            onClick="Fileupload.get(-1);" />
        <image id="image" />
    </vbox>
</zk>
```

## Event Thread Enabled (deprecated)

If the event thread is enable, the uploaded file will be returned
directly by <javadoc method="get()">org.zkoss.zul.Fileupload</javadoc>
and other static methods, such as:

```xml
<zk>
    <button label="Upload">
    <attribute name="onClick">{
        org.zkoss.util.media.Media[] media = Fileupload.get(-1);
        if (media != null) {
            for (int i = 0; i &lt; media.length; i++) {
                if (media[i] instanceof org.zkoss.image.Image) {
                    org.zkoss.zul.Image image = new org.zkoss.zul.Image();
                    image.setContent(media[i]);
                    image.setParent(pics);
                } else {
                    Messagebox.show("Not an image: "+media[i], "Error", Messagebox.OK, Messagebox.ERROR);
                    break; //not to show too many errors
                }
            }
        }
    }</attribute>
    </button>
    <vbox id="pics" />
</zk>
```

As shown, <javadoc method="get(int)">org.zkoss.zul.Fileupload</javadoc>
won't return until the end user uploads the files (and/or closes the
dialog).

# Temporary File Created During Uploading

This component depends on Apache Commons Fileupload
([DiskFileItemFactory](https://commons.apache.org/proper/commons-fileupload/apidocs/org/apache/commons/fileupload/disk/DiskFileItemFactory.html)),
so `org.apache.commons.io.FileCleanerTracker` will delete those
temporary files created during uploading. Please refer to [Resource cleanup](https://commons.apache.org/proper/commons-fileupload/using.html)

You can verify this cleanup by enforcing garbage collecting with
JVisualVM.

# Example

Here is an example that uses [org.zkoss.zul.Fileupload](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Fileupload.html)
as a component:

```xml
<image id="img" />
Upload your hot shot:
<fileupload label="Upload" onUpload="img.setContent(event.media)" />
```

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ Button]({{site.baseurl}}/zk_component_ref/essential_components/button#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date     | Content                                                                                                                                                   |
|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.2   | May 2010 | Able to specify a target for the onUpload event sent by <javadoc method="get()">org.zkoss.zul.Fileupload</javadoc>. Used if the event thread is disabled. |

[^1]: Prior to 5.0, it is default to enabled. Refer to [ ZK Configuration Reference: disable-event-thread]({{site.baseurl}}/zk_config_ref/the_system-config_element#The_disable-event-thread_Element).
