**Property:**

`org.zkoss.web.classWebResource.cache.CSS.hours`

`Default: 8760`  
`[Since 3.6.3]`

It specifies the number of hours in that period the CSS files of class
Web resources won't be changed.

By default, it is 8760 (the same as other class Web resources). Notice
that the resource is reloaded. If you want to turn off the cache of the
CSS files of class Web resources, you can specify a non-positive value.

```xml
<library-property>
    <name>org.zkoss.web.classWebResource.cache.CSS.hours</name>
    <value>8760</value>
</library-property>
```
