# File Upload with Servlet Thread

When the event thread is disable (default), it is recommended to use
<javadoc>org.zkoss.zul.Button</javadoc>,
<javadoc>org.zkoss.zul.Toolbarbutton</javadoc> or
<javadoc>org.zkoss.zul.Menuitem</javadoc> with upload="true" instead.
For example,

```xml
<zk>
    <zscript>
    void upload(UploadEvent event) {
        org.zkoss.util.media.Media media = event.getMedia();
        if (media instanceof org.zkoss.image.Image) {
            org.zkoss.zul.Image image = new org.zkoss.zul.Image();
            image.setContent( (org.zkoss.image.Image) media);
            image.setParent(pics);
        } else {
            Messagebox.show("Not an image: "+media, "Error", Messagebox.OK, Messagebox.ERROR);
        }
    }
    </zscript>
    <button label="Upload" upload="true" onUpload="upload(event)"/>
    <toolbarbutton label="Upload" upload="true" onUpload="upload(event)"/>
    <vbox id="pics" />
</zk>
```

If you prefer to use a dialog
(<javadoc method="get()">org.zkoss.zul.Fileupload</javadoc>), please
take a look at [ ZK Component Reference: Fileupload]({{site.baseurl}}/zk_component_ref/essential_components/fileupload#Event_Thread_Disabled)
for more inormation.

## File Upload with Event Thread

If the event thread is disabled, the developer can use
<javadoc>org.zkoss.zul.Button</javadoc> or
<javadoc>org.zkoss.zul.Toolbarbutton</javadoc> with upload="true"
instead. They behave the same no matter if the event thread is disabled
or not.

However, if the event thread is enabled, you can get uploaded Media
returned by <javadoc method="get()">org.zkoss.zul.Fileupload</javadoc>
and other overloadded static methods.

```xml
<zk>
    <button label="Upload">
    <attribute name="onClick">{
        org.zkoss.util.media.Media[] media = Fileupload.get(-1);
        if (media != null) {
            for (int i = 0; i < media.length; i++) {
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
won't return until an end user uploads the files (and/or closes the
dialog).

:
