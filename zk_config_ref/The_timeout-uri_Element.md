**Syntax:**

<timeout-uri>*`a_uri`*</timeout-uri>

`[Optional]`  
`[Since 3.6.3]`  
`[Default: `<i>`null`</i>`]`

It specifies the target URI that will be used to redirect users to, when
the desktop no longer exists – it is usually caused by session timeout.

If this element is omitted (default), an error message will be shown up
at the browser to alert users what has happened. If you want to
customize the message, please use the timeout-message element.

To reload the same URI again, you can specify an *empty* content as
follows.

``` xml
<session-config>
    <device-type>ajax</device-type>
    <timeout-uri></timeout-uri>
</session-config>
```

Notice that this setting is applied only to the specified device
(<device-type>), so remember to specify the correct device.

For more information, please refer to [ZK Developer's Reference/UI
Patterns/Session Timeout
Management](ZK_Developer's_Reference/UI_Patterns/Session_Timeout_Management).


