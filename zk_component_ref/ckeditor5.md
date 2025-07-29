# CKEditor 5

- Java API: N/A
- JavaScript API: N/A

{% include Notice.html text="This document is written for CKEditor 5.39 to
5.41. Regarding major updates for 5.42 and later's breaking change,
please refer to <a href=\"#breaking-changes-after-ckeditor-v42\">Breaking Changes After CKEditor v42</a>" %}

# Employment/Purpose

ZK CKEditor 5 is a wrapper component that allows you to integrate [CKEditor 5](http://ckeditor.com/) into your ZK applications. Unlike ZK CKEditor 4 — which bundled the CKEditor 4 library — this new version **does not include the CKEditor 5 JavaScript widget**. You will need to download CKEditor 5 separately from CKSource and ensure you have the appropriate license for your usage.

CKEditor 5 introduces a completely new architecture and modern features such as real-time collaboration and AI support. To support this shift, ZK CKEditor 5 has been redesigned as a lightweight wrapper, enabling you to integrate the new editor while keeping the flexibility and structure of your existing ZK-based UI.

**Note on Licensing:** CKEditor 5 has a different license from CKEditor 4. Before downloading ckeditor.js, check [CKEditor's official website](https://ckeditor.com/) to understand the terms and obtain the appropriate license for your project.

## Difference between CKEditor 5 and 4

|  | CKEditor 5 | CKEditor 4 |
|----|----|----|
| Architecture | Built on a completely modular architecture, making the editor more flexible, extensible, and easier to integrate with other technologies. | Relies on a more traditional monolithic architecture. |
| Collaboration and Diversity | Emphasizes diverse editing features and collaboration tools, such as rich text editing, embedded content, and collaboration plugins. | While feature-rich, it has comparatively limited capabilities in terms of collaboration and extensibility. |
| Modern User Experience | Provides a modern and intuitive user interface, enhancing the overall editing experience. | Has a relatively more traditional interface. |
| Ecosystem | Has undergone a comprehensive upgrade in its ecosystem of plugins and tools, offering more choices and flexibility. | Boasts a vast ecosystem but may be comparatively restricted in certain aspects. |

# Maven

ZKCKEditor 5 Wrapper requires a license.  
* To try out the evaluation copy, get it from [ZK Evaluation repository](https://mavensync.zkoss.org/eval/org/zkoss/zkforge/ckez/).  
* To access the licensed copy, get it from [ZK EE repository](https://maven.zkoss.org/repo/zk/ee/org/zkoss/zkforge/ckez/). You must configure user credential for EE repository.

```xml
        <dependency>
            <groupId>org.zkoss.zkforge</groupId>
            <artifactId>ckez</artifactId>
            <version>${ckez.version}</version>
        </dependency>
```

# Configure CKEditor's source code path

In ZK CKEditor 4, the JAR file already contains the CKEditor source
code. However, CKEditor 5 is designed to support various editor types,
allowing users to choose their desired plugins. Therefore, in ZK
CKEditor 5, the CKEditor source code is not included. Users can
customize their desired editor style
[here](https://ckeditor.com/ckeditor-5/online-builder/), and finally, by
specifying the path to `ckeditor.js` file, and here we go!

## Where is the ckeditor.js file located?

If you use a predefined CKEditor 5 build, the path will be at the root
of the source code file. `/ckeditor.js`

If you use a customized CKEditor 5 build, the path will be inside a
**build** folder of the root. `/build/ckeditor.js`

## Set the path with Library Property in zk.xml

Specify through the official CDN

```xml
<library-property>
    <name>org.zkforge.ckez.CKSource</name>
    <value>https://cdn.ckeditor.com/ckeditor5/40.1.0/classic/ckeditor.js</value>        
</library-property>
```

or a local path under **webapp root**

```xml
<library-property>
    <name>org.zkforge.ckez.CKSource</name>
    <value>/ckeditor5-40.1.0/build/ckeditor.js</value>    
</library-property>
```

{% include version-badge.html version=44.1.0 %}

```xml
<library-property>
    <name>org.zkforge.ckez.CKSource</name>
    <value>https://cdn.ckeditor.com/ckeditor5/44.1.0/ckeditor5.umd.js</value>
</library-property>
```

Or `/ckeditor5-44.1.0/ckeditor5.umd.js`

Both require the UMD one.

**Note** : Currently, ZK CKEdtitor 5.0.0 only supports 1 global CKEditor
source code.

**Note on Licensing:** CKEditor 5 has a different license than CKEditor
4. Before downloading ckeditor.js, check [CKEditor's official
website](https://ckeditor.com/) to understand the terms and obtain the
appropriate license for your project.

# Supported editor types

CKEditor 5 offers multiple types of editors, allowing users to choose
from according to their own needs.

**Note** : **Decoupled Editor**, **Multi Root Editor** and **Super
Build** are currently not supported.

## Classic Editor

Classic editor shows a boxed editing area with a toolbar, placed in a
specific position on the page.

![](/zk_component_ref/images/ClassicEditor.jpg)

## Balloon Editor

Balloon editor lets you create your content directly in its target
location with the help of a balloon toolbar that appears next to the
selected editable document element.

![](/zk_component_ref/images/BalloonEditor.jpg)

## Balloon Block Editor

Balloon block editor lets you create your content directly in its target
location with the help of two toolbars:

- A balloon toolbar that appears next to the selected editable document
  element (offering inline content formatting tools).
- A block toolbar accessible using the toolbar handle button
  ![](/zk_component_ref/images/DragIndicator.png) attached to the editable content area and
  following the selection in the document (bringing additional block
  formatting tools). The ![](/zk_component_ref/images/DragIndicator.png) button is also a handle that can be used to
  drag and drop blocks around the content.

![](/zk_component_ref/images/BalloonBlockEditor.jpg)
## Inline Editor

Inline editor lets you create your content directly in its target
location with the help of a floating toolbar that apprears when the
editable text is focused.

![](/zk_component_ref/images/InlineEditor.jpg)

# How to use?

Once we have set the source code, we can use the **ckeditor** component
in zul file.

```xml
<ckeditor/>
```

If you want to preset the content of the editor, you can use `value`
attribute

```xml
<ckeditor value="Hello ZK CKEditor 5!"/>
```

And of course, you can control it through Java API.

```java
@Wire
private CKeditor myEditor;

public void doAfterCompose(Window comp) throws Exception {
    super.doAfterCompose(comp);
    myEditor.setValue("<div>Hello ZK CKEditor 5!</div>");
}
```

## Example

```xml
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

![](/zk_component_ref/images/CKEditor5Example.png)

# Custom Configuration

If you wish to customize the configuration for each component, you can
use the `customConfigurationsPath` attribute to specify the location of
the JavaScript file under the **webapp root** for customization.

```xml
<ckeditor customConfigurationsPath="/config.js" />
```

And configure the personalized settings in the JavaScript file.

**Note: The configuration JavaScript file must start with `{` and end
with `}` because the API will parse it as an JavaScript object.**

```javascript
{
    toolbar: ['redo', '|', 'undo', ...]
}
```

And you can also set the configuration by `config` attribute.

```java
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

## All available toolbar items

Run the following javascript to get all available toolbar items provided
by plugins

```javascript
Array.from( zk.$('@ckeditor')._editor.ui.componentFactory.names() );
```

Ref:
<https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-toolbarview-item-unavailable>

# File upload

CKEditor 5 provides 4 methods for file upload, **Base 64 Upload**,
**Simple Upload**, **CKFinder** and **CKBox**.

**Base 64 Upload** directly writes file data into CKEditor content.
**CKFinder** and **CKBox** store files on the CKEditor cloud server.
Only **Simple Upload** requires users to handle the server themselves,
so in this section, we will talk about ZK CKEditor 5 Wrapper integration
for **Simple Upload**.

## Simple Upload

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

```xml
<ckeditor simpleUploadUrl="img"/>
```

# Supported attributes

Except for the attributes mentioned in the previous sections, the
following attributes are also supported:

## height

Default: Automatically adapted according to the content height.

If height is specified, and the content height is greater than the
editor's height, a scroll bar will be automatically appear.

```xml
<ckeditor height="30%"/>
```

## width

Default: Fill the current width (equals to )

```xml
<ckeditor width="300px"/>
```

## readOnly

Default: `readOnly="false"`

```xml
<ckeditor readOnly="true"/>
```

## hflex

If you put multiple ckeditor in a inline-block, they'll render according
to their `hflex` ratio.

```xml
<hlayout>
    <ckeditor hflex="1"/>
    <ckeditor hflex="2"/>
</hlayout>
```

Or you can use `hflex="min"`, its width will be fixed to the width when
the editor is rendered.

```xml
<ckeditor hflex="min"/>
```

## vflex

Place ckeditor in a label with a specified height and specify `vflex`
ratio.

```xml
<div height="500px">
    <ckeditor vflex="1"/>
    <ckeditor vflex="2"/>
</div>
```

Or you can use `vflex="min"`, its height will be fixed to the height
when the editor is rendered (according to the content height).

```xml
<ckeditor vflex="min"/>
```

# Supported Events

| Name | Event Type |
|------|------------|
| `onChange` | [org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html)<br><br>**Description:** Denotes the content of an input component has been modified by the user. |
| `onChanging` | [org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html)<br><br>**Description:** Denotes that user is changing the content of an input component. Notice that the component's content (at the server) won't be changed until `onChange` is received. Thus, you have to invoke the `getValue`method in the `InputEvent`class to retrieve the temporary value. |

**Note** : Unlike ZK CKEditor 4, ZK CKEditor 5 doesn't support `onSave`
event, because it doesn't provide a save button.

# Supported Children

`*NONE`

# Breaking Changes After CKEditor v42

## How to use?

Since CKEditor 5 version 42, the CDN no longer provides separate
JavaScript source files for individual editor types. Therefore, unlike
earlier versions, CKSource can no longer automatically determine which
editor to create, so you need to specify a new property `type` for the
editor type you want to create. Additionally, you must also specify a
**licenseKey** within the config to create an editor.

type: **ClassicEditor**, **InlineEditor** or **BalloonEditor**
(BalloonBlockEditor is deprecated, and merged block options into toolbar
setting since v42)

```xml
<!-- zul -->
<ckeditor type="ClassicEditor" customConfigurationsPath="/config.js"/>
```

```javascript
// config.js
{
    licenseKey: '<YOUR_LICENSE_KEY>',
}
```

To get a licenseKey, please refer to [CKEditor 5 Start free
trial](https://portal.ckeditor.com/signup).

## Manually specify the CSS

Starting from v42, users are required to manually include CSS files in
the page. The ZK CKEditor 5 wrapper supports this by using the Library
Property `org.zkforge.ckez.CKCssSource`. When a CKEditor component is
present on the page and this Library Property is specified, the
configured CSS will automatically be included in the page if the URL is
valid, it also accepts multiple CSS source.

### Set the path with Library Property in zk.xml

Specify through the official CDN

```xml
<library-property>
    <name>org.zkforge.ckez.CKCssSource</name>
    <value>https://cdn.ckeditor.com/ckeditor5/44.0.0/ckeditor5.css</value>
</library-property>
```

or a local path under **webapp root**

```xml
<library-property>
    <name>org.zkforge.ckez.CKCssSource</name>
    <value>/editor.css</value>
</library-property>
```

or specify multiple css

```xml
<library-property>
    <name>org.zkforge.ckez.CKCssSource</name>
    <appendable>true</appendable>
    <list>
        <value>https://cdn.ckeditor.com/ckeditor5/44.0.0/ckeditor5.css</value>
        <value>/editor.css</value>
    </list>
</library-property>
```

## Toolbar Setup

There is no toolbar by default, if not specified. To specify the toolbar
content within the config, there are 2 steps:

1. Identify the desired plugin names and include them in the
**plugins** property (string array).

2. Add the toolbar item names to the **toolbar** property (string
array).

Here is a simple example:

```javascript
{
    licenseKey: '<YOUR_LICENSE_KEY>',
    plugins: ['Essentials', 'Heading', 'Bold', 'Italic', 'Link', 'Table', 'BlockQuote'],
    toolbar: ['undo', 'redo', '|', 'heading', 'bold', 'italic', 'link', 'insertTable', 'blockQuote']
}
```

To verify the relationship between plugin and toolbar item, please refer
to [Plugins in CKEditor
5](https://ckeditor.com/docs/ckeditor5/latest/framework/architecture/plugins.html).
