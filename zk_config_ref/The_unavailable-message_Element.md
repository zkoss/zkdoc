**Syntax:**

<unavailable-message>*`any_valid_fragment`*</unavailable-message>

`[Optional][Default: `*`depends on device`*`]`

It specifies the message that will be displayed if the client doesn't
support this device.

``` xml
<device-config>
    <device-type>ajax</device-type>
    <unavailable-message><![CDATA[
<p style="color:red">Sorry, JavaScript must be enabled in order for you to use KillApp.</p>
    ]]></unavailable-message>
</device-config>
```


