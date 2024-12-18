ZUML (ZK User Interface Markup Language) is based on XML. Similar to
HTML and XUL, it is used to describe UI in an easy-to-understand format.

In a ZUML document, each XML element instructs the ZK Loader which
component to create. Each XML attribute describes what value to be
assigned to the created component. Each XML processing instruction
describes how to process the whole page, such as the page title. For
example,

``` xml
<?page title="Super Application"?>
<window title="Super Hello" border="normal">
    <button label="hi" onClick='alert("hi")'/>
```

where the first line specifies the page title, the second line creates a
root component with title and border, and the third line creates a
button with label and an event listener.

For introduction of ZUML, please refer to [ZK Developer's
Reference]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML). If
you are not familiar with XML, please take a look at [XML
Background]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/XML_Background)
first.
