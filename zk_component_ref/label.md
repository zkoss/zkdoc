---
title: "Label"
---


- Demonstration: [Label](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Label](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Label.html)
- JavaScript API: [zul.wgt.Label](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Label.html)


# Employment/Purpose

A label component represents a piece of text. A pure text on the zul
will be automatically converted to a label.

# Example

![](/zk_component_ref/images/ZKComRef_Label.PNG)

```xml
 <window title="Label Demo" >
 <grid>
     <rows>
         <row>Label(normal): <label id="lb1"/></row>
         <row>Label(color): <label id="lb2" style="color:red"/></row>
         <row>Label(font): <label id="lb3" style="font-weight:bold"/></row>
         <row>Label(size): <label id="lb4" style="font-size:14pt"/></row>
         <row>Label(maxlength): <label id="lb5" maxlength="5"/></row>
         <row>Label(pre): <label id="lb6" pre="true"/></row>
         <row>input:
             <textbox id="txt" rows="2"><attribute name="onChange">
                     lb1.value=self.value;
                     lb2.value=self.value;
                     lb3.value=self.value;
                     lb4.value=self.value;
                     lb5.value=self.value;
                     lb6.value=self.value;
             </attribute></textbox>
         </row>
     </rows>
 </grid>
 </window>
```

You can control how a label is displayed with the `style`, `pre` and
`maxlength` Properties.

For example, if you specify `pre` to be `true`, all white spaces, such
as new line, space and tab, are preserved.

A label component represents a piece of text.

![](/zk_component_ref/images/ZKComRef_Label_Example2.png)

```xml
<window border="normal"> 
    Hello World
</window>
```

If you want to add an attribute to a label, it has to be written as
follows:

![](/zk_component_ref/images/ZKComRef_Label_Example3.png)

```xml
<window border="normal">
    <label style="color: red" value="Hello World" />
</window>
```

# Special Character

Since ZUML is XML, not HTML, so it doesn't accept
**`&`**`nbsp;`. However, you can use
**`&`**`#160;` instead. For the whole list, please refer th
[List of XML and HTML character entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references).

# Properties

## Pre, Hyphen, Maxlength and Multiline

{% include RemovedSince.html version=10.0.0 %} Hyphen is removed. Use CSS to
achieve it.

{% include version-badge.html version="5.0.0" %}

You can control how a label is displayed using the `pre`, `multiline`
and `maxlength` properties. For example, if you specify `pre` to be
true, all white spaces, such as new lines, spaces and tabs, are
preserved.

| pre | multiline | maxlenth | Description |
|-----|-----------|----------|-------------|
| true | any | any | All white spaces are preserved, including new lines, spaces and tabs. |
| false | true | any | New lines are preserved. |
| false | false | positive | The label only show its value up to the length of "maxlength". |
| false | false | 0 | The label is displayed regularly. |

![](/zk_component_ref/images/ZKComRef_Label_Text_ZK5.png)

```xml
<window border="normal" width="300px">
    <vbox id="result">
        <label id="lb1" pre="true"></label>
        <separator bar="true"/>
        <label id="lb2" multiline="false" />
        <separator bar="true"/>
        <label id="lb3" maxlength="10" />
        <zscript><![CDATA[
            lb1.value = "    this   thing   has   spaces.\nnext line.";
            lb2.value = "    this   thing   no   space.\nnext line.";
            lb3.value = "    this is more than 10 chars.";
        ]]></zscript>
    </vbox>
</window>
```

`[For ZK3 users]`

This displaying rule is slightly different in ZK3.

| hyphen | pre | maxlenth | Description |
|---|---|---|---|
| false | false | positive | Truncated the characters that exceeds the specified
`maxlength`. |
| true | any | positive | If the length of a line exceeds `maxlength`, the line
is hyphenated. |
| false | true | any | `maxlength` is ignored. |
| any | any | 0 | `hyphen` is ignored. |

![](/zk_component_ref/images/ZKComRef_Label_Text_ZK3.png)

```xml
 
<window border="normal" width="300px">
    <vbox id="result">
    </vbox>
    <zscript><![CDATA[
        String[] s = {"this is 9", 
                        "this is ten more to show",
                        "this framework", 
                        "performance is everything"};
        for (int j = 0; j < s.length; ++j) {
            Label l = new Label(s[j]);
            l.maxlength = 9;
            l.hyphen = true;
            l.parent = result;
            Separator sep =  new Separator();
            sep.setBar(true);
            sep.parent = result;
        }
    ]]>
    </zscript>
</window>
```

The `multiline` property is similar to the `pre` property, except it
only preserves new lines and white space at the beginning of each line.

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*NONE`

