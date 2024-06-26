

# Fisheye

- Demonstration:
  [Fisheye](http://www.zkoss.org/zkdemo/menu/fisheye_menu)
- Java API: <javadoc>org.zkoss.zkex.zul.Fisheye</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkex.menu.Fisheye</javadoc>
- Style Guide: [
  Fisheyebar](ZK_Style_Guide/XUL_Component_Specification/Fisheyebar)
- [Available in ZK PE and EE
  only](http://www.zkoss.org/product/edition.dsp)

# Employment/Purpose

A fisheye item

# Example

![](ZKComRef_fisheyebar.png)

``` xml
<zk>
    <div height="450px">
        <checkbox label="Attach icon edge at bottom"
            onCheck='fsb.attachEdge=self.checked?"bottom":"top"' />
        <checkbox label="Vertical orient"
            onCheck='fsb.orient=self.checked?"vertical":"horizontal"' />
        <separator bar="true" />
        <fisheyebar id="fsb" style="position:absolute;margin:80px 150px;"
            attachEdge="top" itemWidth="80" itemHeight="80" itemMaxHeight="160" itemMaxWidth="160">
            <fisheye image="/img/Centigrade-Widget-Icons/FolderABlue-128x128.png" label="Folder"
                onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/ReadingGlass-128x128.png" label="Reading Glasses"
                onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/Briefcase-128x128.png" label="Project"
                onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/MailboxFlag-128x128.png"
                label="Email" onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/Globe-128x128.png"
                label="Globe" onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/Spyglass-128x128.png" label="Spyglass"
                onClick="alert(self.label)" />
        </fisheyebar>
    </div>
</zk>
```

# Properties

## Dynamic Images

For example you can create an image using the Java2D libraries and then
set the content of the fisheye to the created image, below is an example
of how to do this.

``` xml
<?page title="Auto Generated index.zul"?>
<zk>
    <window title="test of autodisable">
        <fisheyebar><fisheye id="fish1" /></fisheyebar>
        
        <zscript>
        import java.awt.*;
        import java.awt.image.*;
        import java.awt.geom.*;
        
        
        void draw() {
            BufferedImage bi = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
            Graphics2D g2d = bi.createGraphics();
            Line2D line = new Line2D.Double(0, 0, bi.getWidth(), bi.getHeight());
            g2d.setColor(Color.blue);
            g2d.setStroke(new BasicStroke(100));
            g2d.draw(line);
            fish1.setImageContent(bi);
        }
        
        draw();
        </zscript> 
    </window>
</zk>
```

{% include version-badge.html version=5.0.0 %}

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  LabelImageElement](ZK_Component_Reference/Base_Components/LabelImageElement#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date         | Content                         |
|---------|--------------|---------------------------------|
| 5.0.0   | January 2010 | Fisheye supports dynamic images |


