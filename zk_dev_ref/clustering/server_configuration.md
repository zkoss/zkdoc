The configuration of a Web server really depends on the server itself.
There is no standard approach.

# Load Balancer (Required)

Be sure to configure [sticky session](http://wiki.metawerx.net/wiki/StickySessions) on your load
balancer because ZK only works correctly on this setting.

Check ZK DesktopImpl.java, you will see there are lots of `synchronized`
used in many methods including:

- generate desktop ID
- addPage(), removePage()
- enableServerPush()
- processing server push update

The keyword `synchronized` only works in a single JVM, so it’s
impossible to keep the same state between 2 different nodes with session
replication if 2 nodes receive requests at roughly the same time.

Each AU request changes a Desktop's status of a session, if 2 AU
requests are processed by 2 different clustering nodes and each one has
its own session, then one session state might override another session.

## Session Replication vs Sticky Sessions

While sticky sessions are the recommended approach for ZK clustering, some environments require session replication for high availability. For detailed session replication setup and troubleshooting, see [Session Replication]({{site.baseurl}}/zk_dev_ref/clustering/session_replication).

# Apache + Tomcat

For configuring Apache + Tomcat, please refer to

- [How to Run ZK on Apache + Tomcat clustering, Part I](https://www.zkoss.org/wiki/Small_Talks/2007/April/How_to_Run_ZK_on_Apache_+_Tomcat_clustering,_Part_I)
- [How to Run ZK on Apache + Tomcat clustering, Part II](https://www.zkoss.org/wiki/Small_Talks/2007/May/How_to_Run_ZK_on_Apache_+_Tomcat_clustering,_Part_II)

More detail settings

- [ Tomcat Cluster]({{site.baseurl}}/zk_installation_guide/setting_up_servers/tomcat_cluster)

# Google App Engine

For configuring Google App Engine, please refer to

- [ZK Installation Guide: Google App Engine]({{site.baseurl}}/zk_installation_guide/setting_up_servers/google_app_engine)

# Apache + JBoss

For configuring JBoss, please refer to

- [ JBoss Cluster]({{site.baseurl}}/zk_installation_guide/setting_up_servers/jboss_cluster)

# Glassfish

For configuring Glassfish, please refer to

- [ Glassfish Cluster]({{site.baseurl}}/zk_installation_guide/setting_up_servers/glassfish_cluster)

# WebLogic

For configuring WebLogic, please refer to

- [ WebLogic Cluster]({{site.baseurl}}/zk_installation_guide/setting_up_servers/weblogic_cluster)
