**Syntax:**

```xml
<automatic-timeout>true|false</automatic-timeout>
```

`[Optional]`  
{% include version-badge.html version=3.6.3 %}  
`[Default: false]`

It specifies whether or not to automatically redirect to the timeout
URI.

If `false`, it means a page will be redirected to the timeout URI, when
a user takes some actions after the timeout.

In other words, nothing would happen (no redirect) if the user does
nothing on the page.

If it is set to `true`, it is redirected as soon as timeout, no matter
the user takes any action.

Notice that this setting is applied only to the specified device
([\<device-type\>](#The_device-type_Element)), so remember to
specify the correct device. For example,

```xml
<session-config>
    <device-type>ajax</device-type>
    <automatic-timeout/> <!-- the same as <automatic-timeout>true</automatic-timeout> -->
    <timeout-uri>/timeout.zul</timeout-uri>
</session-config>
```

Please refer to [ZK Developer's Reference/UI Patterns/Session Timeout Management]({{site.baseurl}}/zk_dev_ref/ui_patterns/session_timeout_management)
for more information.

### Page-level Automatic Timeout

If you want to specify whether or not to automatically timeout for
particular pages, you can use [ the page directive](/zuml_ref/page#automaticTimeout).

Moreover, it is better to turn off the automatic timeout for the timeout
page you want to redirect to (if the page is a ZUML page). For example,

```xml
<!-- my timeout page -->
<?page automaticTimeout="false"?>
...
```

# Underlying Details

ZK relies on js setTimeout() and sends a `dummy` event to a server to
trigger a session timeout happening.
