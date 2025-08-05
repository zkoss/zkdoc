
- Java API: [org.zkoss.zml.Transformer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zml/Transformer.html)

# Employment/Purpose

[org.zkoss.zml.Transformer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zml/Transformer.html) is used to translate a XML
document to another with a [XSTL](http://en.wikipedia.org/wiki/XSLT)
template.

```xml
 <?page contentType="text/html;charset=UTF-8"?>
 <x:transformer xsl="book.xsl" xmlns:x="xml">
     <book>
         <title>ZK - Ajax without the JavaScript Framework</title>
         <for-who>Web application designers and programmers who wish to implement
          rich Ajax web applications in the simplest way.</for-who>
         <author>Henri Chen and Robbie Cheng</author>
     </book>
 </x:transformer>
```

where transformer is a component of the XML component set, so we have to
specify the namespace: `xml`. Otherwise, the [native namespace](/zuml_ref/native) is assumed,
and the element is generated directly.

Then, let us assume the content of `book.xsl` is as follows.

```xml
 <xsl:stylesheet version="1.0"
 xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
     <xsl:template match="/">
         <html>
             <head>
                 <title>Book Info</title>
             </head>
             <body>
                 <h1>Book Info</h1>
                 <xsl:apply-templates select="book"/>
             </body>
         </html>
     </xsl:template>
     <xsl:template match="book">
         <dl>
             <dt>Title:</dt>
             <dd><xsl:value-of select="title"/></dd>
             <dt>Who is this book for:</dt>
             <dd><xsl:value-of select="for-who"/></dd>
             <dt>Authors</dt>
             <dd><xsl:value-of select="author"/></dd>
         </dl>
     </xsl:template>
 </xsl:stylesheet>
```

Then, the generated XML output will be XHTML as follows.

```xml

<html>
    <head>
        <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Book Info</title>
    </head>
    <body>
        <h1>Book Info</h1>
        <dl>
            <dt>Title:</dt>
            <dd> ZK - Ajax without the JavaScript Framework</dd>
            <dt>Who is this book for:</dt>
            <dd>Web application designers and programmers who wish to implement
                rich Ajax web applications in the simplest way.</dd>
            <dt>Authors</dt>
            <dd> Henri Chen and Robbie Cheng</dd>
        </dl>
    </body>
</html>
```



