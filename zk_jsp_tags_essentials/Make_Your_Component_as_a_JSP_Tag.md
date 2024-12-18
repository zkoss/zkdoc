ZK JSP Tags support all [ZUL components](ZK_Component_Reference). That is, every ZUL
component has a corresponding JSP tag. If you want to make your custom
ZK component(ex: a [ Composite Component]({{site.baseurl}}/zk_dev_ref/UI_Composing/Composite_Component) as a JSP tag, you could do as follows:

1\. Create a Java class like this:

``` java
public class FooTag extends org.zkoss.jsp.zul.impl.BranchTag {
    protected String getJspTagName(){
        return "foo";// the component name you defined in lang-addon.xml
    }
}
```

ZK will invoke getJspTagName() method to get the tag name. The name will
be used to look for the component definition from [the ZUL component
set](ZUML_Reference/ZUML/Languages/ZUL).

Notice that the name must be the same you specify in your [component
definition](ZK_Client-side_Reference/Language_Definition).

2\. Follow the JSP specification to declare your JSP tag in
[TLD](http://download.oracle.com/javaee/1.4/tutorial/doc/JSPTags6.html).
For example:

``` xml
<tag>
<name>foo</name>
    <tag-class>com.foo.FooTag</tag-class>
    <body-content>scriptless</body-content>
    <dynamic-attribute>true</dynamic-attribute>
    <attribute> 
        <name>if</name>
        <required>false</required>
        <rtexprvalue>true</rtexprvalue>
    </attribute>
    <attribute> 
        <name>unless</name>
        <required>false</required>
        <rtexprvalue>true</rtexprvalue>
    </attribute>
    <attribute> 
        <name>apply</name>
        <required>false</required>
        <rtexprvalue>true</rtexprvalue>
    </attribute>
    <attribute> 
        <name>use</name>
        <required>false</required>
        <rtexprvalue>true</rtexprvalue>
    </attribute>
    <attribute> 
        <name>forward</name>
        <required>false</required>
        <rtexprvalue>true</rtexprvalue>
    </attribute>
</tag>
```

Although the dynamic attribute can be set true and JSP will accept all
kinds of attributes, you still need to add the special attributes in
your JSP tag definition. The special attributes include `if`, `unless`,
`apply`, `use`, and `forward`.

3\. Use TLD in JSP document with **\<%@ taglib%\>** After the tag
definition is done, you could use it in JSP document just like any other
JSP tags. Of course, you have to specify TLD first.

