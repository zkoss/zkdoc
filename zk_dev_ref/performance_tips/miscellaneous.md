# Button: use the `os` mold if there are a lot of buttons

The `trendy` mold of a button provides a better and more consistent
look, especially for Internet Explorer 6. Unfortunately, the browser
(particularly, Internet Explorer) will be slowed down if there are a lot
of buttons (with `trendy`) in the same page.

`Notice that the default mold is ``os`` in ZK 5, while ``trendy`` in ZK 3.6.`  
` There is no difference between ``os`` and ``trendy``.`

The default mold can be changed easily. For example,

```xml
<library-property>
    <name>org.zkoss.zul.Button.mold</name>
    <value>trendy</value>
</library-property>
```

Refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/the_library_properties/class.mold)
for more information.

# Prolong the Period to Check Whether a File Is Modified

ZK caches the parsed result of a ZUML page and re-compiles it only if it
is modified. In a production system, ZUML pages are rarely modified so
you can prolong the period to check whether a page is modified by
specifying `file-check-period` in `WEB-INF/zk.xml` as shown below. By
default, it is 5 seconds.

```xml
<desktop-config>
    <file-check-period>600</file-check-period><!-- unit: seconds -->
</desktop-config>
```

{{ ZKDevelopersReferencePageFooter}}
