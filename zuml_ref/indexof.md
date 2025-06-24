```java
int indexOf(Object value, Object element);
```

  
i.e.,
[org.zkoss.xel.fn.CommonFns#indexOf(java.lang.Object, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#indexOf(java.lang.Object, java.lang.Object))

Returns the index within the value of the first occurrence of the
specified element.

**Parameters:**

- value - the value to test. If it is an instance of String,
  String.indexOf() is called. If it is a collection or an array, all of
  its elements are examined one-by-one. If it is a map, Map.keySet()
  will be examined one-by-one.
- element - the element to test.

# Version History

| Version | Date        | Content                    |
|---------|-------------|----------------------------|
| 5.0.7   | March, 2011 | This method was introduced |
