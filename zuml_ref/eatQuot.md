```java
java.lang.String eatQuot(java.lang.String)
```

  
i.e.,
<javadoc method="eatQuot(java.lang.String)">org.zkoss.xel.fn.StringFns</javadoc>

Eliminates single and double quotations to avoid JavaScript injection.
It eliminates all quotations. In other words, the specified string shall
NOT contain any quotations. It is used to avoid JavaScript injection.
For exmple, in DSP or JSP pages, the following codes is better to escape
with this method.

```xml
<input value="${c:eatQuot(param.some)}"/>
```


