**Property:**

`org.zkoss.zk.ui.activate.wait.retry.timeout`

Default: 120000` (unit: milliseconds)`

A library property to specify the timeout (in milliseconds) to wait for
the activation.

Notice that, after timeout, the activation will restart automatically.
That is, the value won't really affect the result (no aborting or
other). It is designed to avoid the annoying warning messages found in
some JVM. For example, IBM JVM shows a warning if wait() exceeds 10
minutes. To prevent the warning, you can set the value to less than 10
minutes.

If you'd like to abort the activation (and then end the waiting thread),
you also have to specify [ org.zkoss.zk.ui.activate.wait.retry.abort]({{site.baseUrl}}/zk_config_ref/org.zkoss.zk.ui.activate.wait.retry.abort)
to true.

```xml
<!-- in WEB-INF/zk.xml -->
<library-property>
    <name>org.zkoss.zk.ui.activate.wait.retry.timeout</name>
    <value>60000</value>
</library-property>
```
