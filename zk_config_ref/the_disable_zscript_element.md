**Syntax:**

<disable-zscript>false|true</disable-zscript>

`[Default: false (enabled)]`

Specifies whether or not to disable the use of
[zscript](ZUML_Reference/ZUML/Elements/zscript) (i.e., the
interpreter). Once disabled, you can not embed anymore zscript codes
(such as Java and Groovy) in a ZUML page. ZK Loader will throw an
exception, when parsing a ZUML page with the zscript code.

It is suggested for production system, since [the performance of Java interpretation is not good]({{site.baseurl}}/zk_dev_ref/performance_tips/use_compiled_java_codes)
and the BeanShell interpreter does not work well in the clustering
environment.

```xml
<system-config>
    <disable-zscript>true</disable-zscript>
</system-config>
```
