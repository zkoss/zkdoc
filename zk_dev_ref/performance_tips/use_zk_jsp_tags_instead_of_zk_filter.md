---
title: "Use ZK JSP Tags instead of ZK Filter"
---

The ZK filter actually maps each HTML tag to the corresponding XHTML
components. As described in the previous section, it consumes more
memory than necessary since ZK has to maintain the states of all ZK
components (including XUL and XHTML components).

# Include ZUL pages in a JSP page

If some part of UI is made of HTML tags (such as header and banner), you
could use JSP as the main page, implement the parts with dynamic content
in ZUL, and then put them together with \<jsp:include\>. For example,

```xml
<%-- main.jsp --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
 </head>
 <body>
   <%-- the static part such as header --%>
   <div>any content you like</div>

   <%-- include the dynamic part --%>
   <jsp:include page="foo.zul"/>
...
 </body>
</head>
```

# Use ZK components directly in a JSP page with ZK JSP tags

If you prefer to use ZK components directly in a JSP page, you could use
[ZK JSP tags](http://www.zkoss.org/product/zkjsp). For example,

```xml
<%-- another.jsp --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://www.zkoss.org/jsp/zul" prefix="z" %>

<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
    <z:zkhead />
 </head>
 <body>
  <%-- any JSP content --%>
 
<z:page>
    <table>
        <tr>
            <td>Name</td>
            <td><z:textbox/></td>
        </tr>
    </table>
</z:page>
</body>
</head>
```

where `z:page` declares a ZK page and then ZK tags can be used inside
it.

The above example is equivalent to the following code snippet, if a ZUL
page is used,

```xml
<!-- another.zul -->
<?page complete="true"?>
<n:html xmlns="http://www.w3.org/1999/xhtml" xmlns:n="http://www.zkoss.org/2005/zk/native">
 <n:head>
 </n:head>
 <n:body>
  <!-- any HTML content -->

<n:table>
    <n:tr>
        <n:td>Name</n:td>
        <n:td><textbox/></n:td>
    </n:tr>
</n:table>
```

where `<?page complete="true"?>` declares that this page is a *complete*
page, i.e., it will provide HTML's html, head and body tags as shown
above.

{{ ZKDevelopersReferencePageFooter}}
