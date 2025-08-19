---
title: "Data Binding"
---



Data binding synchronizes data between View and ViewModel according to
component definition's annotation. The annotation specifies when to save
(or load) which attribute, how to convert, validate and render the data.
It can be found in `metainfo\zk\lang-addon.xml` of zkbind.jar. Please
refer to [ZK Client-side Reference/Language Definition]({{site.baseurl}}/zk_client_side_ref/language_definition)
about how to configure language definition and its addon. If you want
data binding can works on your newly-created component, you should
define its own annotations.

# Annotation Attributes

Here is the attribute list used in lang-addon.xml:

| Attribute Name | Description |
|---|---|
| ACCESS | Access privilege. The value can be "both", "save", or
"load"(**default value**); default value is used if not
specify. |
| CONVERTER | System converter for special properties.
(**optional**) e.g. SelectedItem in listbox. see [org.zkoss.bind.converter.sys.ListboxSelectedItemConverter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/bind/converter/sys/ListboxSelectedItemConverter.html) |
| VALIDATOR | System validator for special properties.
(**optional**) |
| SAVE_EVENT | Save trigger event. It takes effect only when ACCESS attribute
is "both" or "save". |
| LOAD_EVENT | Load trigger event; It takes effect only when ACCESS attribute
is "both" or "load". |
| LOAD_REPLACEMENT | The replacement attribute for loading. It's used when there is
a issue to load to original attribute.; e.g. value of textbox, it loads
to "rawValue". |
| LOAD_TYPE | Type of attribute for loading; e.g. rawValue of textbox is
java.lang.String. |
| SAVE_REPLACEMENT | The replacement attribute for saving. It's used when there is a
issue to save to original attribute.; e.g. selectedItem of selectbox, it
save the value selecteIndex via converter to the bean. (selectedItem is
not existed in selectbox). |
| RENDERER | A special renderer for binding |
|  |  |

# Example

Let's take a look at some examples.

**Textbox's data binding annotation**

```xml

    <component>
        <component-name>textbox</component-name>
        <extends>textbox</extends>
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
                <attribute-value>rawValue</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_TYPE</attribute-name>
                <attribute-value>java.lang.String</attribute-value>
            </attribute>
        </annotation>
    </component>
```

- We use <extends> to append data binding annotations based on original
  component definition. If you write these annotation attributes in a
  component definition file ( `metainfo\zk\lang.xml`, you don't have to
  use <extends> .
- **ZKBIND** is zkbind system's annotation name. It means we use
  annotation of data binding 2.
- The <property-name> is the target property we want data binding to
  synchronize.
- Because Textbox is a component for input, its access privilege is
  "both".
- As the SAVE_EVENT is onChange, you can find when your cursor focus on
  a Textbox is blured, Textbox's value is saved.
- Here we use LOAD_REPLACEMENT for a "loading empty value" issue related
  to "constraint" attribute. It is common that when we load textbox
  first time, its value is empty. If we also define constraint as "not
  empty", then the first time loading triggers error message to display.
  This error misleads users, so we use another replacement attribute to
  load the value for not triggering error message.

**Selectbox's data binding annotation**

```xml

    <component>
        <component-name>selectbox</component-name>
        <extends>selectbox</extends>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <attribute>
                <attribute-name>RENDERER</attribute-name>
                <attribute-value>itemRenderer=org.zkoss.bind.impl.BindSelectboxRenderer</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>selectedItem</property-name>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onSelect</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_EVENT</attribute-name>
                <attribute-value>onAfterRender</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_REPLACEMENT</attribute-name>
                <attribute-value>selectedIndex</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>CONVERTER</attribute-name>
                <attribute-value>org.zkoss.bind.converter.sys.SelectboxSelectedItemConverter</attribute-value>
            </attribute>
        </annotation>
```

- We set RENDERER to render selectbox's item when model data comes from
  data binding. (line 7,8)
- Normally users should specify when to reload properties. But if you
  think the property requires reloading after a specific event, you can
  set that event's name as value of LOAD_EVENT. (line 19,20)
- The reason we use SAVE_REPLACEMENT is that Selectbox has no
  "selectedItem" attribute, so we save to another replacement attribute
  "selectedIndex". (line 27,28) Because those 2 attributes have
  different type, we have to use a converter, [org.zkoss.bind.converter.sys.SelectboxSelectedItemConverter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/bind/converter/sys/SelectboxSelectedItemConverter.html)
  to convert selectedItem. (line 31,32)



