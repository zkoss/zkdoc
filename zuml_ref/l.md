```java
String l(String key);
```

  
i.e.,
<javadoc method="getLabel(java.lang.String)">org.zkoss.xel.fn.CommonFns</javadoc>

Returns the label of the given key defined in [the internationalization labels]({{site.baseurl}}/zk_dev_ref/internationalization/labels).

The label is based on the current Locale
(<javadoc method="getCurrent()">org.zkoss.util.Locales</javadoc>).

> For 5.0.7 and later, an implicit object called
> [labels](ZUML_Reference/EL_Expressions/Implicit_Objects/labels)
> was introduced, and it is more convenient to use.

For example,

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>

<window title="${c:l('app.title')}">
 ...
</window>
```


