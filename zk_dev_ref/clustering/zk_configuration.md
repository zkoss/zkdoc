# Turn on Serializable UI Factory

To use ZK in a clustering environment, you have to use the serializable
UI factory. It could be done by specifying the following statement in
`WEB-INF/zk.xml`:

```xml
    <system-config>
        <ui-factory-class>org.zkoss.zk.ui.http.SerializableUiFactory</ui-factory-class>
    </system-config>
```

<javadoc>org.zkoss.zk.ui.http.SerializableUiFactory</javadoc> is the UI
factory that will instantiate serializable sessions such that the
sessions, components, pages, and desktops will be serialized when a
session is about to deactivate.

# Additional settings for various servers

Please refer to the following links for detailed settings.

- [Tomcat Cluster]({{site.baseurl}}/zk_installation_guide/setting_up_servers/tomcat_cluster)
- [WebLogic Cluster]({{site.baseurl}}/zk_installation_guide/setting_up_servers/weblogic_cluster)
- [Google App Engine]({{site.baseurl}}/zk_installation_guide/setting_up_servers/google_app_engine)
- [JBoss Cluster]({{site.baseurl}}/zk_installation_guide/setting_up_servers/jboss_cluster)

# Turn on Log

`[Optional]`

If an attribute or a listener is not serializable, ZK will skip it,
i.e., not serialize it (similar to how a Servlet container serializes
the attributes of sessions). It is sometimes hard to know what is
ignored since it is common for a developer to forget to declare a value
or a listener as serializable.

To detect this problem, you can turn on the logger for
`org.zkoss.io.serializable` to the DEBUG level (). Please read [ Logger](ZK_Developer's_Reference/Supporting_Utilities/Logger)
for details.

# Disable the Use of zscript

`[Optional]`

The interpreter (BeanShell) does not work well under the clustering
environment. Since the serialization is not stable, zscript cannot be
used in a clustering environment. To avoid accidental or unintended use
it is recommended to disable zscript in your ZK application with the
following configuration (in zk.xml):

```xml
<system-config>
    <disable-zscript>true</disable-zscript>
</system-config>
```

# Configuration Not Allowed

Here is a list of configurations that can not be used in the clustering
environment. They are disabled by default. However, it is worth to
double check that none are enabled accidentally.

## Event Processing Thread

Do not enable [ the event processing thread]({{site.baseurl}}/zk_dev_ref/ui_patterns/event_threads).
The event processing thread might be suspended, while the (suspended)
thread cannot be migrated from one machine to another.

It is disabled by default. For more information, please refer to the
[Event Threads]({{site.baseurl}}/zk_dev_ref/ui_patterns/event_threads)
section.

## Global Desktop Cache

Do not use
<javadoc>org.zkoss.zk.ui.impl.GlobalDesktopCacheProvider</javadoc>
(global desktop cache). The global desktop cache is stored in the
servlet context, while only the data stored in sessions is migrated when
failover takes place.

The default is
<javadoc>org.zkoss.zk.ui.impl.SessionDesktopCacheProvider</javadoc>
instead of desktop-scoped desktop cache. Just make sure you don't
configure it wrong.

# Version History

| Version | Date       | Content                                                                            |
|---------|------------|------------------------------------------------------------------------------------|
| 5.0.7   | April 2011 | The log called `org.zkoss.io.serializable` was introduced.                         |
| 5.0.8   | June 2011  | The listener called `org.zkoss.zkplus.cluster.ClusterSessionPatch` was introduced. |
