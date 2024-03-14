# File Upload

<javadoc>org.zkoss.zul.Button</javadoc>,
<javadoc>org.zkoss.zul.Toolbarbutton</javadoc> and
<javadoc>org.zkoss.zul.Menuitem</javadoc> support file upload
out-of-box. In other words, you just need to enable it with the steps
below:

1.  Specify `upload` attribute with `true` to enable file upload
2.  Assign an `onUpload` event listener to the component [^1]

For example:

``` xml
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
    <vlayout id="pics" />
</zk>
```

You can control the maximal allowed number of files, the maximal allowed
size, and other options. Please refer to
[org.zkoss.zul.Button.setUpload()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setUpload-java.lang.String-).

``` xml
<menupopup>
    <menuitem label="Upload" upload="true,maxsize=-1,native"/>
</menupopup>
```

> ------------------------------------------------------------------------
>
> <references/>

## Open File Upload Dialog

If you want the file upload on another component rather than those
components above (Button, Toolbarbutton, Menu), you can call
[FileUpload.get()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Fileupload.html#get--)
in an event listener.

Here is an example:

``` xml
    <a iconSclass="z-icon-upload" ...
       apply="org.zkoss.reference.developer.uipattern.UploadComposer"/>
```

``` java

public class UploadComposer extends SelectorComposer {

    @Listen(Events.ON_CLICK + "= a")
    public void handleUpload(MouseEvent e) {
        Fileupload.get(1, new EventListener<UploadEvent>() {
            public void onEvent(UploadEvent event) throws Exception {
                Media[] medias = event.getMedias();
                System.out.println("upload " +  medias[0].getName());
            }
        });
    }
}
```

# File Download

[Filedownload](ZK_Component_Reference/Essential_Components/Filedownload)
provides a set of utilities to prompt a user to download a file from the
server to a local folder. For example,

``` xml
<button label="Download a file" onClick='Filedownload.save("~./zklogo.png", null);'/>
```

<figure>
<img src="10000000000002AF000001BB582C2DD7.png"
title="10000000000002AF000001BB582C2DD7.png" />
<figcaption>10000000000002AF000001BB582C2DD7.png</figcaption>
</figure>

The file could be a static resource, an input stream, a file, a URL and
others. Please refer to [ZK Component
Reference](ZK_Component_Reference/Essential_Components/Filedownload)
and <javadoc>org.zkoss.zul.Filedownload</javadoc> for more information.

## File Download Link

Clicking a file download link terminates client engine to work, please
refer to
[ZK_Component_Reference/Essential_Components/A#File_Download_Link](ZK_Component_Reference/Essential_Components/A#File_Download_Link)
for correct usages.

[^1]: If you enabled the use of event threads, you could use
    <javadoc method="get()">org.zkoss.zul.Fileupload</javadoc> and
    related. For more information, please refer to [the Event Thread
    section](ZK_Developer's_Reference/UI_Patterns/Event_Threads/File_Upload).
