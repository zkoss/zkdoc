**Syntax:**

<timeout-message>a_message</timeout-message>

`[Optional]`

`[Default: `<i>`a message called `[`org.zkoss.zk.mesg.MZk`#UPDATE_OBSOLETE_PAGE](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zk/mesg/MZk`.html#UPDATE_OBSOLETE_PAGE)` defined in `[`msgzk.properties`](ZK_Messages/English/msgzk.properties)</i>`]`

It specifies the message to show when the session is timeout. Notice
that it is used only if the <timeout-uri> is **not** specified.

```xml
<session-config>
    <device-type>ajax</device-type>
    <timeout-message>Session timeout. Please reload.</timeout-message>
</session-config>
```

For more information, please refer to [ZK Developer's Reference/UI Patterns/Session Timeout Management]({{site.baseurl}}/zk_dev_ref/ui_patterns/session_timeout_management).

## Internationalization

If you want to specify a Locale-dependent message, you could specify the
key and prefix it with `label:` as follows.

```xml
<session-config>
    <device-type>ajax</device-type>
    <timeout-message>label:timeout</timeout-message>
</session-config>
```

Then, you have to prepare the zk-label properties files as described in
[ZK Developer's Reference]({{site.baseurl}}/zk_dev_ref/internationalization/labels).

```text
#zk-label.properties
timeout={
Session timeout.
(multi-line is allowed)
}
```

## JavaScript

Instead of specifying a message, you can provide a JavaScript code for
the client to evaluate. To specify a JavaScript code, you have to prefix
it with `script:`.

For example, if you have a function called `foo.timeout` to handle the
timeout effect, then you could configure `WEB-INF/zk.xml` as follows.

```xml
<session-config>
    <device-type>ajax</device-type>
    <timeout-message>script:foo.timeout('Session Timeout')</timeout-message>
</session-config>
```

The code depends on the client. For Ajax devices, it has to be
JavaScript.
