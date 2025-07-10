**Property:**

`org.zkoss.zk.ui.activate.wait.retry.abort`

Default: `false`

A library property indicates that, if the time waiting for activation is
longer than the value specified in [ org.zkoss.zk.ui.activate.wait.retry.timeout]({{site.baseurl}}/zk_config_ref/org_zkoss_zk_ui_activate_wait_retry_timeout),
the activation will be aborted and the thread will end.

It has no function if [ org.zkoss.zk.ui.activate.wait.retry.timeout]({{site.baseurl}}/zk_config_ref/org_zkoss_zk_ui_activate_wait_retry_timeout)
is not specified (with a positive value).

```xml
<!-- in WEB-INF/zk.xml -->
<library-property>
    <name>org.zkoss.zk.ui.activate.wait.retry.abort</name>
    <value>true</value>
</library-property>
<library-property>
    <name>org.zkoss.zk.ui.activate.wait.retry.timeout</name>
    <value>60000</value>
</library-property>
```
