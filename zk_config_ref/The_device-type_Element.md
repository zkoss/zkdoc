**Syntax:**

<device-type>*`device_type`*`|`**`ajax`**</device-type>

`[Optional]`  
`[Since 3.6.3]`  
`[Default: ajax]`

It specifies the device type that `<timeout-uri>` and
`<automatic-timeout>` are applied to. By default, it is `ajax`. If you
want to specify the timeout URI for mobile device, use `mil`.

Notice that only `<timeout-uri>` and `<automatic-timeout>` depend on
this. Others, such as \<session-timeout\>, are applied to all devices,
regardless what is specified here.


