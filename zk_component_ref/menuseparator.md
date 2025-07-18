

# Menuseparator

- Demonstration: [Menu](http://www.zkoss.org/zkdemo/menu)
- Java API: [org.zkoss.zul.Menuseparator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menuseparator.html)
- JavaScript API:
  [zul.menu.Menuseparator](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.menu.Menuseparator.html)


# Employment/Purpose

Used to create a separator between menu items..

# Example

![](/zk_component_ref/images/ZKComRef_Menuseparator.png)

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
 <menuseparator/>
 <menuitem label="Home"/>
</menubar>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

[ Menu]({{site.baseurl}}/zk_component_ref/menu#Use_Cases)

[ Menubar]({{site.baseurl}}/zk_component_ref/menubar#Use_Cases)



