```java
String l(String key);
```

  
i.e.,
[org.zkoss.xel.fn.CommonFns#getLabel(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#getLabel(java.lang.String))

Returns the label of the given key defined in [the internationalization labels]({{site.baseurl}}/zk_dev_ref/internationalization/labels).

The label is based on the current Locale
([org.zkoss.util.Locales#getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Locales.html#getCurrent())).

> For 5.0.7 and later, an implicit object called
> [labels](/zuml_ref/labels)
> was introduced, and it is more convenient to use.

For example,

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>

<window title="${c:l('app.title')}">
 ...
</window>
```


