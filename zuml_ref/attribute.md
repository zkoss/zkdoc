

**Syntax:**

`<attribute name="`*`myName`*`" [trim="true|`**`false`**`"] [if="`*`if-condition`*`"] [unless="`*`unless-condition`*`"]>`*`myValue`*</attribute>

It defines a XML attribute of the enclosing element. The content of the
element is the attribute value, while the `name` attribute specifies the
attribute name. It is useful if the value of an attribute is
sophisticated, or the attribute is conditional.

```xml
 <button label="Hi">
   <attribute name="onClick">alert("Hi")</attribute>
 </button>
```

It is equivalent to

```xml
 <button label="Hi" onClick="alert(&quot;Hi&quot;)"/>
```

Another example:

```xml
 <button>
   <attribute name="label" if="${param.happy}">Hello World!</attribute>
 </button>
```

In addition, you can specify a XML fragment as the value of the
attribute. The XML fragment is so-called the native content.

```xml
 <html>
     <attribute name="content">
         <ol>
             <li forEach="apple, orange">${each}</li>
         </ol>
     </attribute>
 </html>
```

where `ol` and `li` are part of the native content. They are not ZK
components. They will be eventually converted to a String instance and
assigned to the specified attribute. If values has three elements, the
above example is equivalent to the following:

```xml
 <html>
     <attribute name="content">
         <ol>
             <li>apple, orange</li>
             <li>orange</li>
         </ol>
     </attribute>
 </html>
```

## name

`[Required]`

Specifies the attribute name.

## trim

`[Optional][Default: false]`

Specifies whether to omit the leading and trailing whitespaces of the
attribute value.

## if

`[Optional][Default: true]`

Specifies the condition to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to false.

## unless

`[Optional][Default: false]`

Specifies the condition *not* to evaluate this element. This element is
ignored if the value specified to this attribute is evaluated to true.

#
