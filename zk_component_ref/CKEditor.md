

# ZK CKEditor

- Demonstration: [WYSIWYG
  Editor](http://www.zkoss.org/zkdemo/input/wysiwyg_editor)
- Java API: N/A
- JavaScript API: N/A
- Source code: [GitHub
  zkoss/zkckeditor](https://github.com/zkoss/zkckeditor) after 3.6.0.0.

# Maven

You need to include CKEditor jar in pom.xml before using it because it
has a different group id from ZK other components.

``` xml
        <dependency>
            <groupId>org.zkoss.zkforge</groupId>
            <artifactId>ckez</artifactId>
            <version>${ckez.version}</version>
        </dependency>
```

Check the latest version on [CE
repository](http://mavensync.zkoss.org/maven2/org/zkoss/zkforge/ckez/).

# Employment/Purpose

The component is a wrapper of [CKEditor](http://ckeditor.com/)

CKEditor is a popular HTML on-line text editor developed by Frederico
Caldeira Knabben. It is used inside web pages. It's a WYSIWYG editor,
which means that the text being edited on it looks as similar as
possible to the results users have when publishing it. It brings to the
web common editing features found on desktop editing applications like
Microsoft Word and OpenOffice.

# Example

![](ZKCompRef_CKEditor.png)

``` xml
<ckeditor width="850px">
<attribute name="value"><![CDATA[
<table width="200" cellspacing="1" cellpadding="1" border="1">
    <tbody>
        <tr style="background: #B7B313; color:white;">
            <td>First Name</td>
            <td>Last Name</td>
        </tr>
        <tr>
            <td>Jone</td>
            <td>Hayes</td>
        </tr>
        <tr>
            <td>Mary</td>
            <td>Bally</td>
        </tr>
    </tbody>
</table>
]]></attribute>
</ckeditor>
```

![](ZKCompRef_CKEditor2.png)

## Enable save button

It will enable the "Save" button when inside a form.

``` xml
<zk xmlns:n="http://www.zkoss.org/2005/zk/native">
    <n:form>
    <ckeditor width="50%" />
    </n:form>
</zk>
```

# Image File Browser

ZK CKEditor provides a default image file browser for browsing the
images in a server path you specify. When you click "Browse Server",
CKEditor will open a new window and list all images in the file browser.

``` xml
    <ckeditor filebrowserImageBrowseUrl="img"/>
```

<table>
<tbody>
<tr class="odd">
<td><figure>
<img src="ZKCompRef_CKEditor_filebrowser2.png"
title="ZKCompRef_CKEditor_filebrowser2.png" />
<figcaption>ZKCompRef_CKEditor_filebrowser2.png</figcaption>
</figure></td>
<td><figure>
<img src="ZKCompRef_CKEditor_filebrowser3.png"
title="ZKCompRef_CKEditor_filebrowser3.png" />
<figcaption>ZKCompRef_CKEditor_filebrowser3.png</figcaption>
</figure></td>
</tr>
</tbody>
</table>

## Custom File browser

{% include version-badge.html version=3.6.0.2 %} If you wish to customize your own
file browser, you can change the location by calling
CKeditor.setFilebrowserImageUploadUrl(page_url), and refer to [CKEditor
Developers
Guide](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/File_Browser_%28Uploader%29)
to create your custom file browser.

# File upload

{% include version-badge.html version=3.6.0.2 %}

This feature is only enabled when you specify
`filebrowserImageUploadUrl` attribute. ZK CKEditor provides a default
file upload handler for uploading the files to the folder you specify.
You can only specify a folder under the web context root because a web
application can access its own folder.

``` xml
    <ckeditor filebrowserImageBrowseUrl="img" filebrowserImageUploadUrl="img"/>
```

<table>
<tbody>
<tr class="odd">
<td><figure>
<img src="ZKCompRef_CKEditor_fileupload.png"
title="ZKCompRef_CKEditor_fileupload.png" />
<figcaption>ZKCompRef_CKEditor_fileupload.png</figcaption>
</figure></td>
<td><figure>
<img src="ZKCompRef_CKEditor_fileupload2.png"
title="ZKCompRef_CKEditor_fileupload2.png" />
<figcaption>ZKCompRef_CKEditor_fileupload2.png</figcaption>
</figure></td>
</tr>
</tbody>
</table>

## Custom File upload handler

{% include version-badge.html version=3.6.0.2 %} If you wish to customize your own
file upload handler, you can change the location by calling
CKeditor.setFileUploadHandlePage(page_url), and refer to [CKEditor
Developers
Guide](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/File_Browser_%28Uploader%29)
to create your custom file upload handler.

# Copy-Paste Images

You need to enable file upload to allow copying a local image from your
machine to CKEditor.

{% include version-badge.html version=4.17.1.0 %} If file upload is enabled,
pasting a local image will upload the image to the server. If it's
disabled, pasting a local image will insert an image with [data
URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

# Custom Configuration

## customConfigurationsPath

Prepare a javascript file for configuration like:

**config.js**

``` javascript
CKEDITOR.editorConfig = function(config) {
    //enable spell checker
    config.disableNativeSpellChecker = false;
    //Automatically enables "Spell Check As You Type" on editor startup
    config.scayt_autoStartup = true;
    //locale
    config.language = 'de';
};
```

Please refer to <http://docs.ckeditor.com/#!/api/CKEDITOR.config> for
complete configuration options.

Specify the configuration file at `customConfigurationsPath` attribute
with the absolute path.

``` xml
<ckeditor customConfigurationsPath="/config.js"/>
```

## in Java

``` xml
    <ckeditor id="editor"/>
    <zscript><![CDATA[
Map configMap = new HashMap();
configMap.put("language", "de");
editor.setConfig(configMap);
    ]]></zscript>
```

## Custom Save Button

You can implement a custom plugin to enable the save button and fire the
onChange event to the server to save the editor's content. Please refer
to [the example
zul](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/input/ckeditor.zul).

## Resizable attribute and Sizing

{% include version-badge.html version=4.16.1.1 %}

`default: true`

The ZK CKEditor container can be resizable with the resizable attribute
since 4.16.1.1.

``` xml
 <ckeditor resizable="true" .../>
```

If `resizable="true"` (default) is set, and the editor's height is unset
(from height="" or vlflex="" attributes), the whole component height
will be modified on user resizing. In this case, the editor's outer div
dimensions will resize itself according to a user dragging.

If the component is resizable and has a fixed height, it will display a
scrollbar in order to maintain its declared size, but allow the user to
modify the height of the editing space. In this case, the editor outer
div dimensions do not change.

# ReadOnly

You can make CKEditor read-only with its config.

``` xml
    <ckeditor id="editorReadOnly" width="50%" height="500px" value="This is read-only example"/>
    <zscript><![CDATA[
    editorReadOnly.setConfig(Map.of("readOnly", true));
    ]]></zscript>
```

# Plugin Installation

1.  [Download a plugin](https://ckeditor.com/cke4/addons/plugins/all)
    according to CKEditor version
      
    ZK Ckedtiror version aligns the bundled CKEditor version.
2.  put plugin folder into zkckeditor's plugins folder
      
    In ZK, you have to copy the plugin folder into the folder below:
    (assuming a Maven project)

    /resources/**web/js/ckez/ext/CKeditor/plugins/**
3.  setup in a custom config js
      
    Then provide a **config.js** mentioned at [ Custom
    Configuration](#Custom_Configuration).

{% include Notice.html text="Since ZK Ckeditor is a Java wrapper of js
CKEditor, the installed plugins just work at the client side and cannot
be controlled in Java by default." %}

## Example

1.  Download [Line Height
    plugin](https://ckeditor.com/cke4/addon/lineheight)
2.  Put its js files under
      
    `/resources/web/js/ckez/ext/CKeditor/plugins/lineheight`
3.  Setup in your custom config js

``` javascript
CKEDITOR.editorConfig = function(config) {
     config.extraPlugins = 'lineheight';
}
```

# ZK CKEditor 5

- Java API: N/A
- JavaScript API: N/A

**Note** : This section is an introduction to ZK CKEditor 5, for all
specifications of ZK CKEditor 5, please refer to this section.

## Employment/Purpose

The component is a wrapper of [CKEditor 5](http://ckeditor.com/)

Compare to CKEditor 4, CKEditor 5's undergoes significant changes and
introduces modern and convenient features such as AI support and
real-time collaboration. To adapt to the entirely new architecture of
CKEditor 5, ZK CKEditor 5 has been redesigned using a wrapper approach,
allowing existing users to transition smoothly and enjoy this
next-generation experience.

**Note on Licensing:** CKEditor 5 has a different license than CKEditor
4. Before downloading ckeditor.js, check [CKEditor's official
website](https://ckeditor.com/) to understand the terms and obtain the
appropriate license for your project.

### Difference between CKEditor 5 and 4

|                             | CKEditor 5                                                                                                                                | CKEditor 4                                                                                                 |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Architecture                | Built on a completely modular architecture, making the editor more flexible, extensible, and easier to integrate with other technologies. | Relies on a more traditional monolithic architecture.                                                      |
| Collaboration and Diversity | Emphasizes diverse editing features and collaboration tools, such as rich text editing, embedded content, and collaboration plugins.      | While feature-rich, it has comparatively limited capabilities in terms of collaboration and extensibility. |
| Modern User Experience      | Provides a modern and intuitive user interface, enhancing the overall editing experience.                                                 | Has a relatively more traditional interface.                                                               |
| Ecosystem                   | Has undergone a comprehensive upgrade in its ecosystem of plugins and tools, offering more choices and flexibility.                       | Boasts a vast ecosystem but may be comparatively restricted in certain aspects.                            |

## Maven

ZKCKEditor 5 Wrapper requires a license.  
To try out the evaluation copy, use the Evaluation repository
(https://mavensync.zkoss.org/eval/).  
To access the licensed copy, use the ZK EE repository
(https://maven.zkoss.org/repo/zk/ee). You must be logged in to access
the ZK EE repository.

``` xml
        <dependency>
            <groupId>org.zkoss.zkforge</groupId>
            <artifactId>ckez</artifactId>
            <version>${ckez.version}</version>
        </dependency>
```

## Configure CKEditor's source code path

In ZK CKEditor 4, the JAR file already contains the CKEditor source
code. However, CKEditor 5 is designed to support various editor types,
allowing users to choose their desired plugins. Therefore, in ZK
CKEditor 5, the CKEditor source code is not included. Users can
customize their desired editor style
[here](https://ckeditor.com/ckeditor-5/online-builder/), and finally, by
specifying the path to `ckeditor.js` file, and here we go!

### Where is the ckeditor.js file located?

If you use a predefined CKEditor 5 build, the path will be at the root
of the source code file. `/ckeditor.js`

If you use a customized CKEditor 5 build, the path will be inside a
**build** folder of the root. `/build/ckeditor.js`

### Set the path with Library Property in zk.xml

Specify through the official CDN

``` xml
<library-property>
    <name>org.zkforge.ckez.CKSource</name>
    <value>https://cdn.ckeditor.com/ckeditor5/40.1.0/classic/ckeditor.js</value>        
</library-property>
```

or a local path under **webapp root**

``` xml
<library-property>
    <name>org.zkforge.ckez.CKSource</name>
    <value>/ckeditor5-40.1.0/build/ckeditor.js</value>    
</library-property>
```

**Note** : Currently, ZK CKEdtitor 5.0.0 only supports 1 global CKEditor
source code.

**Note on Licensing:** CKEditor 5 has a different license than CKEditor
4. Before downloading ckeditor.js, check [CKEditor's official
website](https://ckeditor.com/) to understand the terms and obtain the
appropriate license for your project.

## Supported editor types

CKEditor 5 offers multiple types of editors, allowing users to choose
from according to their own needs.

**Note** : **Decoupled Editor**, **Multi Root Editor** and **Super
Build** are currently not supported.

## Classic Editor

Classic editor shows a boxed editing area with a toolbar, placed in a
specific position on the page.

![](ClassicEditor.jpg)

## Balloon Editor

Balloon editor lets you create your content directly in its target
location with the help of a balloon toolbar that appears next to the
selected editable document element.

![](BalloonEditor.jpg)

## Balloon Block Editor

Balloon block editor lets you create your content directly in its target
location with the help of two toolbars:

- A balloon toolbar that appears next to the selected editable document
  element (offering inline content formatting tools).
- A block toolbar accessible using the toolbar handle button
  <img src="DragIndicator.png" title="DragIndicator.png" width="15"
  alt="DragIndicator.png" /> attached to the editable content area and
  following the selection in the document (bringing additional block
  formatting tools). The
  <img src="DragIndicator.png" title="DragIndicator.png" width="15"
  alt="DragIndicator.png" /> button is also a handle that can be used to
  drag and drop blocks around the content.

<figure>
<img src="BalloonBlockEditor.jpg" title="BalloonBlockEditor.jpg"
width="700" />
<figcaption>BalloonBlockEditor.jpg</figcaption>
</figure>

## Inline Editor

Inline editor lets you create your content directly in its target
location with the help of a floating toolbar that apprears when the
editable text is focused.

![](InlineEditor.jpg)

## How to use?

Once we have set the source code, we can use the **ckeditor** component
in zul file.

``` xml
<ckeditor/>
```

If you want to preset the content of the editor, you can use `value`
attribute

``` xml
<ckeditor value="Hello ZK CKEditor 5!"/>
```

And of course, you can control it through Java API.

``` java
@Wire
private CKeditor myEditor;

public void doAfterCompose(Window comp) throws Exception {
    super.doAfterCompose(comp);
    myEditor.setValue("<div>Hello ZK CKEditor 5!</div>");
}
```

### Example

``` xml
<ckeditor width="850px">
<attribute name="value"><![CDATA[
<table width="200" cellspacing="1" cellpadding="1" border="1">
    <tbody>
        <tr style="background: #B7B313; color:white;">
            <td>First Name</td>
            <td>Last Name</td>
        </tr>
        <tr>
            <td>Jone</td>
            <td>Hayes</td>
        </tr>
        <tr>
            <td>Mary</td>
            <td>Bally</td>
        </tr>
    </tbody>
</table>
]]></attribute>
</ckeditor>
```

<figure>
<img src="CKEditor5Example.png" title="CKEditor5Example.png"
width="600" />
<figcaption>CKEditor5Example.png</figcaption>
</figure>

## Custom Configuration

If you wish to customize the configuration for each component, you can
use the `customConfigurationsPath` attribute to specify the location of
the JavaScript file under the **webapp root** for customization.

``` xml
<ckeditor customConfigurationsPath="/config.js" />
```

And configure the personalized settings in the JavaScript file.

**Note: The configuration JavaScript file must start with `{` and end
with `}` because the API will parse it as an JavaScript object.**

``` javascript
{
    toolbar: ['redo', '|', 'undo', ...]
}
```

And you can also set the configuration by `config` attribute.

``` java
@Wire
private CKeditor myEditor;

public void doAfterCompose(Window comp) throws Exception {
    super.doAfterCompose(comp);
    Map<String, Object> myConfig = new HashMap<>();
    myConfig.put("toolbar", new String[] {"bold", "italic"});
    myEditor.setConfig(myConfig);
}
```

**Note: If `customConfigurationsPath` is set too, `config` will override
the setting of `customConfigurationsPath`.**

### All available toolbar items

Run the following javascript to get all available toolbar items provided
by plugins

``` javascript
Array.from( zk.$('@ckeditor')._editor.ui.componentFactory.names() );
```

Ref:
<https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-toolbarview-item-unavailable>

## File upload

CKEditor 5 provides 4 methods for file upload, **Base 64 Upload**,
**Simple Upload**, **CKFinder** and **CKBox**.

**Base 64 Upload** directly writes file data into CKEditor content.
**CKFinder** and **CKBox** store files on the CKEditor cloud server.
Only **Simple Upload** requires users to handle the server themselves,
so in this section, we will talk about ZK CKEditor 5 Wrapper integration
for **Simple Upload**.

### Simple Upload

Before starting, make sure you have downloaded the **Simple Upload**
plugin.

According to [documentation of Simple
Upload](https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/simple-upload-adapter.html#configuration),
we must set **simpleUpload.uploadUrl** with config object before we can
upload files to our own server. This step **<span style="color:red">can
be omitted</span>** in ZK CKEditor 5 Wrapper, because the bottom layer
has already done this for you.

The only thing you need to do is set the `simpleUploadUrl` attribute to
specify the path to upload the file to the server, the path is start
from the **webapp root**.

``` xml
<ckeditor simpleUploadUrl="img"/>
```

## Supported attributes

Except the attributes mentioned in the previous sections, the following
attributes are also supported:

### height

Default: Automatically adapted according to the content height.

If height is specified, and the content height is greater than the
editor's height, a scroll bar will be automatically appear.

``` xml
<ckeditor height="30%"/>
```

### width

Default: Fill the current width (equals to )

``` xml
<ckeditor width="300px"/>
```

### readOnly

Default: `readOnly="false"`

``` xml
<ckeditor readOnly="true"/>
```

### hflex

If you put multiple ckeditor in a inline-block, they'll render according
to their `hflex` ratio.

``` xml
<hlayout>
    <ckeditor hflex="1"/>
    <ckeditor hflex="2"/>
</hlayout>
```

Or you can use `hflex="min"`, its width will be fixed to the width when
the editor is rendered.

``` xml
<ckeditor hflex="min"/>
```

### vflex

Place ckeditor in a label with a specified height and specify `vflex`
ratio.

``` xml
<div height="500px">
    <ckeditor vflex="1"/>
    <ckeditor vflex="2"/>
</div>
```

Or you can use `vflex="min"`, its height will be fixed to the height
when the editor is rendered (according to the content height).

``` xml
<ckeditor vflex="min"/>
```

## Supported Events

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
<p><code>onChange</code></p>
</center></td>
<td><p><javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p><strong><code>Description:</code></strong> Denotes the content of an
input component has been modified by the user.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onChanging</code></p>
</center></td>
<td><p><javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p><strong><code>Description:</code></strong> Denotes that user is
changing the content of an input component. Notice that the component's
content (at the server) won't be changed until <code>onChange</code> is
received. Thus, you have to invoke the <code>getValue</code>method in
the <code>InputEvent</code>class to retrieve the temporary
value.</p></td>
</tr>
</tbody>
</table>

**Note** : Unlike ZK CKEditor 4, ZK CKEditor 5 doesn't support `onSave`
event, because it doesn't provide a save button.

## Supported Children

`*NONE`

# Work with ZK6 MVVM

{% include Notice.html text="Since Ckeditor **3.6.0.1**, we have added data
binding annotation into the lang-addon.xml file, so you no more need to
add the settings below." %}

{% include version-badge.html version=6.0.0 %}

For work with ZK6 MVVM, it is required to create an addon XML and add
the server annotation as follows:

**WEB-INF/ckez-bind-addon.xml**

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<language-addon>
    <!-- The name of this addon. It must be unique -->
    <addon-name>ckezbind</addon-name>
    <!-- Specifies what other addon this depends
    <depends></depends>
    -->
    <!-- Which language this addon will be added to -->
    <language-name>xul/html</language-name>

    <component>
        <component-name>ckeditor</component-name>
        <extends>ckeditor</extends>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>value</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onChange</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_REPLACEMENT</attribute-name>
                <attribute-value>value</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_TYPE</attribute-name>
                <attribute-value>java.lang.String</attribute-value>
            </attribute>
        </annotation>
    </component>
</language-addon>
```

then add it into WEB-INF/zk.xml

``` xml
<zk>
    <language-config>
        <addon-uri>/WEB-INF/ckez-bind-addon.xml</addon-uri>
    </language-config>
</zk>
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
<td><center>
<p><code>onChange</code></p>
</center></td>
<td><p><javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p><strong><code>Description:</code></strong> Denotes the content of an
input component has been modified by the user.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onChanging</code></p>
</center></td>
<td><p><javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p><strong><code>Description:</code></strong> Denotes that user is
changing the content of an input component. Notice that the component's
content (at the server) won't be changed until <code>onChange</code> is
received. Thus, you have to invoke the <code>getValue</code>method in
the <code>InputEvent</code>class to retrieve the temporary
value.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onSave</code></p>
</center></td>
<td><p><javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p><strong><code>Description:</code></strong> Denotes the save button of
the CKEditor component has been clicked by the user.</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`


