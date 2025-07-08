

ZK JSP Tags fully supports JSP EL allowing EL expressions to access
variables in both JSP world and ZK world, such as components.

Notice that EL expressions are evaluated by JSP container, not ZK
Loader.

# Use ZK Components as a Bean Variable in EL

Please take a look at the sample code below:

```xml
<zk:page>
    <zk:window id="myWin" title="My window's title.">
    </zk:window>
    <h1>the window ${myWin.id}'s title is:${myWin.title}</h1>
</zk:page>
```

In JSP EL, you can access ZK components as JavaBeans using its id. Or
you can even use your own Java class: For example,

```xml
<zk:page>
    <zk:window id="myWin" use="org.zkoss.jspdemo.MyWindow" myValue="this is value">
        <h1> ${self.myValue}"<h1/>
    </zk:window>
    <h1>the window ${myWin.id}'s title is:${myWin.title}</h1>
</zk:page>
```

As you can see the \<h1\> tag is inside *myWin*, you can use ZK keyword
*self* to represent the current ZK component.

# Use zscript Variable in EL

The most powerful feature in ZK JSP EL is that you can also access
zscript variables directly:

```xml
<zk:page>
    <zk:zscript>
        String zsStr = "This is a zscript variable";
    </zk:zscript>
    <zk:label value="${zsStr}"/>
</zk:page>
```

# ZK ID Space Concept in EL

In pure ZK, the variable accessibility scope is based on the concept of
ID Space(If you don't know what ID Space is for, please refer to [ZK Developer's Reference]({{site.baseurl}}/zk_dev_ref/ui_composing/id_space)).
In ZK JSP environment, it is totally the same as the pure ZK. For
example:

```xml
<zk:page>
    <zk:zscript>
        String A = "This is page scope A";
    </zk:zscript>
    <zk:window id="myWin">
        <zk:zscript>
            String A = "This is myWin's A";
        </zk:zscript>
        <zk:label value="${A}" id="innerLabel"/>
    </zk:window>
    <zk:label value="${A}" id="outerLabel"/>
</zk:page>
```

According to the result, the innerLabel will show **This is myWin's A**,
and the outerLabel will show **This is page scope A**.

# Access JSP Environment Variable in zscript

We have shown you how to access ZK variables in EL, but how about
accessing JSP variables in ZK? For example, how to access a JSP
scriptlet variable? How to access JSTL's foreach iterator variable?
According to JSP specification, if you want to use scriptlet variable in
EL or any non scriptlet area, you must put them into request, session,
or application's attributes. Like this:

```xml
<%
    String myStr = "scriptlet String";
    request.setAttribute("myStr",myStr);
%>
<zk:page>
    <zk:label value="${myStr}"/>// OK!
    <zk:zscript>
        str1 = "use " + requestScope.get("myStr")+ " in zscript.";// OK!      
        str2 = "use " + myStr + " in zscript.";// will cause failure!
        // Because ZK doesn't allow direct access to the request attributes.
    </zk:zscript>
</zk:page>
```

As you can see, you can get those variables back to zscript area using
requestScope, sessionScope, and applicationScope. To know more about how
to use these implicit ZK keywords, please refer to [ ZUML Reference: Implicit Objects](zuml_ref/EL_Expressions/Implicit_Objects).

Please be careful about using those implicit objects and their life
cycles. For example, following example will show "null" instead of "This
is scriptlet string.":

```xml
<%
    String myStr = "This is scriptlet string.";
    request.setAttribute("myStr",myStr);
%>
<zk:page>
    <zk:label value="${myStr}"/>// OK!  
    <zk:button label="push me!">
        <zk:attribute name="onClick">
            alert("str is:"+requestScope.get("myStr"));// will show null!
        </zk:attribute>
    </zk:button>
</zk:page>
```

Notice that when the button onClick event is triggered (which is an
independent request), the previous request which stores 「myStr」 was
already gone, and the requestScope is the onClick request one; not the
old one. Sometimes in JSTL foreach tag, we want to store the variable of
iterator in generated ZK components, here the **\<custom-attribute
...\>** is an approach:

```xml
<%
    String[] strArr = new String[5];
    //init myStrs...
    request.setAttribute("strArr", strArr);
%>
<zk:page>
    <c:forEach var="myStr" items="${strArr}">
        <zk:button label="push me!">
            <custom-attribute myStr="${myStr}"/>// use custom attribute to store...
            <zk:attribute name="onClick">
                alert("str is:"+self.getAttribute("myStr"));// show result
            </zk:attribute>
        </zk:button>
    </c:foreach>
</zk:page>
```

