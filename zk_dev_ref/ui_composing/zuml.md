There are two ways to compose UI: XML-based approach and pure-Java
approach. Here we will describe XML-based approach. For pure-Java
approach, please refer to the next chapter.

The declaration language is called ZK User Interface Markup Language
(ZUML). It is based on XML. Each XML element instructs ZK Loader to
create a component. Each XML attribute describes what value to be
assigned to the created component. Each XML processing instruction
describes how to process the whole page, such as the page title. For
example,

```xml
<?page title="Super Application"?>
<window title="Super Hello" border="normal">
    <button label="hi" onClick='alert("hi")'/>
```

where the first line specifies the page title, the second line creates a
root component with title and border, and the third line creates a
button with label and an event listener.

**Auto-completion with Schema**

When working with a ZUML document, it is suggested to use [ZK
Studio](http://www.zkoss.org/product/zkstudio.dsp) since it provides a
lot of features to simplify editing, such as *content assist* and
*visual editor*.

If you prefer not to use ZK Studio, you could specify the XML schema in
a ZUML document as shown below. Many XML editors work better, such as
when with auto-complete, if XML schema is specified correctly.

```xml
 <window xmlns="http://www.zkoss.org/2005/zul"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://www.zkoss.org/2005/zul http://www.zkoss.org/2005/zul/zul.xsd">
```

The ZUL schema can be downloaded from
[<http://www.zkoss.org/2005/zul/zul.xsd>](http://www.zkoss.org/2005/zul/zul.xsd).
In addition, you can find `zul.xsd` under the `dist/xsd` directory in
the [ZK binary
distribution]({{site.baseurl}}/zk_installation_guide/zk_background/the_content_of_zk_binary_distribution).

This section is about the general use of ZUML. For a complete reference,
please refer to [ZUML Reference](ZUML_Reference).
