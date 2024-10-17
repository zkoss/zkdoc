# Employment/Purpose

Basically there are two approaches to use ZK in JSP pages.

1.  Use `<jsp:include>` to include a ZUL page.
2.  Use [ZK JSP Tags](http://www.zkoss.org/product/zkjsp.dsp) in a JSP
    page directly.

Here we discuss the general concepts applicable to both approaches. For
information of ZK JSP Tags, please refer to [ZK JSP Tags
Essentials](ZK_JSP_Tags_Essentials). It is also worth to take
a look at the [HTML
Tags](ZK_Developer's_Reference/UI_Patterns/HTML_Tags)
section.

# Prerequisite

## DOCTYPE

To use ZK components correctly, the JSP page must specify DOCTYPE as
follows.

``` html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
...
```

## BODY Style

By default, ZK will set the CSS style of the BODY tag to
`width:100%;height:100%` If you prefer to have the browser to decide the
height (i.e., the browser's default) for you, you could specify
`height:auto` to the BODY tag (optional).

``` xml
<body style="height:auto">
...
```

## Browser Cache

Though optional, it is suggested to disable the browser to cache the
result page. It can be done as follows.

``` xml
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="-1" />
```

In addition, you could invoke the following statement in JSP to tell ZK
to drop desktops once the user navigates to other URL. It is optional
but it saves memory since the browser page is not cached and safe to
remove if the user navigates away.

``` xml
<%
    request.setAttribute(org.zkoss.zk.ui.sys.Attributes.NO_CACHE, Boolean.TRUE);
%>
```

Notice that it has to be invoked before ZK JSP's zkhead tag, if ZK JSP
is used, or before the first `jsp:include` that includes a ZUL page.

# HTML Form

ZK input components (datebox, slider, listbox and so on) work seamlessly
with HTML form. In addition to Ajax, you could process input in batch
with Servlets.

``` xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://www.zkoss.org/jsp/zul" prefix="z" %>

<html>
  <body>
    <z:page>
    <form action="/foo/legacy">
      <table>
        <tr>
          <td>When</td><td><z:datebox name="when"/></td>
        </tr>
        <tr>
          <td>Which></td>
          <td>
            <z:listbox name="which">
                <z:listitem label="choice 1"/>
                <z:listitem label="choice 2"/>
            </z:listbox>
          </td>
        </tr>
        <tr>
          <td><z:button type="submit" label="Submit"/></td>
          <td><z:button type="reset" label="Reset"/></td>
        </tr>
    </form>
    </z:page>
  </body>
</html>
```

## The name Property

If you want to submit the values of the ZK components, you have to place
the component inside the form and then specify the `name` property.
Thus, when the form is submitted, the value of, say, the datebox will be
sent together with the name you specified. For example,

![]({{site.baseurl}}/zk_dev_ref/images/DrForm.png)

``` xml
<window title="Submit" border="normal" xmlns:n="native">
    <n:form action="/fooLegacy">
        <grid>
            <rows>
                <row>
                    When
                    <datebox name="when" />
                    Name
                    <textbox name="name" />
                </row>
                <row>
                    Department
                    <combobox name="department">
                        <comboitem label="RD" />
                        <comboitem label="Manufactory" />
                        <comboitem label="Logistics" />
                    </combobox>
                    Type
                    <listbox name="type">
                        <listitem label="New" value="new"/>
                        <listitem label="Average" value="avarage"/>
                    </listbox>
                </row>
                <row>
                    <button type="submit" label="Submit"/>
                </row>
            </rows>
        </grid>
    </n:form>
</window>
```

Once users press the submit button, a request is posted to the
`/fooLegacy` servlet with the query string as follows.

``` xml
?when=Nov+10%2C+2010&name=Mark+Gates&department=Manufactory&type=new
```

Thus, as long as you maintain the proper associations between name and
value, your servlet could work as usual without any modification.

## Components that Support the name Property

All input-types components support the `name` property, such as
`textbox`, `datebox`, `decimalbox`, `intbox`, `combobox`,`bandbox`,
`slider` and `calendar`.

In addition, the list boxes and tree controls also support the `name`
property. If the `multiple` property is true and users select multiple
items, then multiple name/value pairs are posted.

``` xml
 <listbox name="who" multiple="true" width="200px">
     <listhead>
         <listheader label="name"/>
         <listheader label="gender"/>
     </listhead>
     <listitem value="mary">
         <listcell label="Mary"/>
         <listcell label="FEMALE"/>
     </listitem>
     <listitem value="john">
         <listcell label="John"/>
         <listcell label="MALE"/>
     </listitem>
     <listitem value="jane">
         <listcell label="Jane"/>
         <listcell label="FEMALE"/>
     </listitem>
     <listitem value="henry">
         <listcell label="Henry"/>
         <listcell label="MALE"/>
     </listitem>
 </listbox>
```

![]({{site.baseurl}}/zk_dev_ref/images/html_5.png)

If both John and Henry are selected, then the query string will contain:

`who=john&who=henry`

Notice that, to use the list boxes and tree controls with the `name`
property, you have to specify the `value` property for `listitem` and
`treeitem`, respectively. They are the values being posted to the
servlets.

## Rich User Interfaces

Because a `form` component could contain any kind of components, the
rich user interfaces could be implemented independently of the existent
servlets. For example, you could listen to the `onOpen` event and
fulfill a tab panel as illustrated in the previous sections. Yet another
example, you could dynamically add more rows to a grid control, where
each row might control input boxes with the `name` property. Once user
submits the form, the most updated content will be posted to the
servlet.

# Communication with zul

## Pass Data to zul

### Query String

If the data you pass can be visible to users, you can just pass it
through a query string.

Just put a hyperlink on a page: <a href="mypage.zul?myparam=myvalue"/>

or

call
`HttpServletResponse.sendRedirect(req.getContextPath() + "/redirected.zul?myparam=myvalue")`
in a Servlet.

In ZK, you get the passed data with
`Executions.getCurrent().getParameter("mykey")`

### Session Attributes

`HttpServletRequest.getSession().setAttribute("myKey", "myValue")`

## Pass Data to JSP

### Query String

Just put a hyperlink on a page: <a href="mypage.zul?myparam=myvalue"/>

or

call
`Executions.getCurrent().sendRedirect("/redirected.zul?myparam=myvalue")`
in a ZK Controller.

### Session Attributes

`Sessions.getCurrent().setAttribute("myKey", "myValue")`
