```java
Object new1(Object cls, Object arg);
```

  
i.e.,
<javadoc method="new_(java.lang.Object, java.lang.Object)">org.zkoss.xel.fn.CommonFns</javadoc>

Instantiates the given class with an argument. It assumes the given
class has a proper constructor.

**Parameters**

- cls - the class. It could be an instance of either String or Class.
- arg - the argument to be passed to the constructor.

# Usage

`${c:new1('java.lang.Integer', 2)}`


