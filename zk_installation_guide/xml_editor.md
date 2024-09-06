If you are using a XML editor, you could specify the schema directly in
your ZUL document, such that the validation and **Content Assist** will
be enabled automatically. Here is an example.

``` xml
<zk
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://www.zkoss.org/2005/zul http://www.zkoss.org/2005/zul/zul.xsd">
...
</zk>
```

Notice that you have to specify the schema location in the root element,
and the root element could be any valid ZUL component, such as window.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
