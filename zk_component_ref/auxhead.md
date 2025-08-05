---
title: "Auxhead"
---


- Demonstration: [Grid (Merged Header)](http://www.zkoss.org/zkdemo/grid/merged_header)
- Java API: [org.zkoss.zul.Auxhead](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Auxhead.html)
- JavaScript API: [zul.mesh.Auxhead](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.mesh.Auxhead.html)

# Employment/Purpose

Used to define a collection of auxiliary headers (`Auxheader`).

# Example

![](/zk_component_ref/images/ZKComRef_Auxheader.png)

```xml
<grid>
    <auxhead>
        <auxheader label="H1'07" colspan="6" />
        <auxheader label="H2'07" colspan="6" />
    </auxhead>
    <auxhead>
        <auxheader label="Q1" colspan="3" />
        <auxheader label="Q2" colspan="3" />
        <auxheader label="Q3" colspan="3" />
        <auxheader label="Q4" colspan="3" />
    </auxhead>
    <columns>
        <column label="Jan" />
        <column label="Feb" />
        <column label="Mar" />
        <column label="Apr" />
        <column label="May" />
        <column label="Jun" />
        <column label="Jul" />
        <column label="Aug" />
        <column label="Sep" />
        <column label="Oct" />
        <column label="Nov" />
        <column label="Dec" />
    </columns>
    <rows>
        <row>
            <label value="1,000" />
            <label value="1,100" />
            <label value="1,200" />
            <label value="1,300" />
            <label value="1,400" />
            <label value="1,500" />
            <label value="1,600" />
            <label value="1,700" />
            <label value="1,800" />
            <label value="1,900" />
            <label value="2,000" />
            <label value="2,100" />
        </row>
    </rows>
</grid>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Auxheader`]({{site.baseurl}}/zk_component_ref/auxheader)
