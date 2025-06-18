

# Toolbarbutton

- Demonstration: [Toolbar](http://www.zkoss.org/zkdemo/menu/toolbar) and
  [Fileupload](https://www.zkoss.org/wiki/Small_Talks/2009/July/ZK_5:_New_File_Upload#Live_Demo)
- Java API: <javadoc>org.zkoss.zul.Toolbarbutton</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.wgt.Toolbarbutton</javadoc>


# Employment/Purpose

The behavior of `Toolbarbutton` is similar to the `button`except the
appearance is different. The `button`component uses HTML BUTTON tag,
while the `toolbarbutton`component uses HTML DIV tag.

A `toolbarbutton`could be placed outside a `toolbar`. However
`toolbarbutton`s change their appearance if they are placed inside a
`toolbar`.

`Toolbarbutton` supports `getHref()`. If `getHref()` is not null, the
`onClick` handler is ignored and this element is degenerated to HTML's A
tag.

Within ZK 5, the file upload has been redesigned so it can be integrated
with any widget. For example, the toolbarbutton can now be used to
upload a file. In addition to this, the display of the upload status has
been enhanced and can be customized easily.

See also : [
Button]({{site.baseurl}}/zk_component_ref/essential_components/button),
[
Toolbar]({{site.baseurl}}/zk_component_ref/essential_components/toolbar)

# Example

![](/zk_component_ref/images/ZKComRef_Toolbarbutton_Example.png)

```xml
<window title="toolbar demo" border="normal" width="300px">
    <caption>
        <toolbarbutton label="button3" image="/img/network.gif" />
        <space />
        <toolbarbutton label="button4" image="/img/network.gif"
            dir="reverse" />
    </caption>
    <toolbar>
        <toolbarbutton label="button1" image="/img/network.gif" />
        <space />
        <toolbarbutton label="button2" image="/img/network.gif" />
    </toolbar>
    <hbox>
        <toolbarbutton label="button5" image="/img/network.gif"
            orient="vertical" />
        <space />
        <toolbarbutton label="button6" image="/img/network.gif"
            orient="vertical" dir="reverse" />
    </hbox>
</window>
```

# Toggle Mode

{% include version-badge.html version=6.0.0 %}

![](/zk_component_ref/images/Toolbarbutton_togglemode.png)

In the toggle mode (`mode="toggle"`), the toolbarbutton will display as
checked after a user clicked it, and will be released after the next
click. It will fire <javadoc>org.zkoss.zk.ui.event.CheckEvent</javadoc>
when state changed.

```xml
<window title="Toolbarbutton" border="normal" width="250px" >
    <toolbar >
        <toolbarbutton label="File system" mode="toggle" >
            <attribute name="onCheck"><![CDATA[
                if(event.isChecked()){
                    result.setValue("Activated:"+event.getTarget().getLabel());
                }else{
                    result.setValue("Deactivated:"+event.getTarget().getLabel());
                }
            ]]></attribute>         
        </toolbarbutton> 
    </toolbar>
    
    <label id="result" />
</window>
```

# File Upload

Any toolbarbutton[^1] can be used to upload files. All you need to do
is:

1.  Specify the `upload` attribute with true
2.  Handles the `onUpload` event.

```xml
<toolbarbutton upload="true" label="Fileupload" onUpload="myProcessUpload(event.getMedia())"/>
```

When the file is uploaded, an instance of
<javadoc>org.zkoss.zk.ui.event.UploadEvent</javadoc> is sent to the
button. Then, the event listener can retrieve the uploaded content by
examining the return value of
<javadoc method="getMedia()">org.zkoss.zk.ui.event.UploadEvent</javadoc>.

> ------------------------------------------------------------------------
>
> <references/>

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
<p>onCheck</p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.CheckEvent</javadoc> Denotes when
toolbarbutton is checked , only available in toggle mode . (since ZK
6.0.0)</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  Button]({{site.baseurl}}/zk_component_ref/essential_components/button#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content                               |
|---------|------|---------------------------------------|
| 6.0.0   | 2/10 | Introduce Toggle Mode to Toobarbutton |
|         |      |                                       |



[^1]: Any <javadoc>org.zkoss.zul.Button</javadoc> can be used to upload
    files too.
