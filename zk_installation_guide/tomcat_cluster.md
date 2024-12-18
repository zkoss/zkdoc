# Setup Tomcat Cluster environment

- Please refer to [Tomcat
  Document](http://tomcat.apache.org/tomcat-7.0-doc/cluster-howto.html)
  to set up cluster environment.
- For configuring with Apache http server, refer to
  - [ How to Run ZK on Apache + Tomcat clustering, Part
    I](Small_Talks/2007/April/How_to_Run_ZK_on_Apache_+_Tomcat_clustering,_Part_I)
  - [ How to Run ZK on Apache + Tomcat clustering, Part
    II](Small_Talks/2007/May/How_to_Run_ZK_on_Apache_+_Tomcat_clustering,_Part_II)

## Using more than 3 nodes with ZK

- Use DeltaManager instead of BackupManager, please refer to
  [cluster-manager](http://tomcat.apache.org/tomcat-7.0-doc/config/cluster-manager.html)
  for more information.

## Sample of server.xml

``` xml
<Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster" channelSendOptions="6">
    <Manager className="org.apache.catalina.ha.session.DeltaManager"
        expireSessionsOnShutdown="false"
        notifyListenersOnReplication="true"/>

    <Channel className="org.apache.catalina.tribes.group.GroupChannel">
        <Membership className="org.apache.catalina.tribes.membership.McastService"
            address="228.0.0.4"
            port="45564"
            frequency="500"
            dropTime="3000"/>
        <Receiver className="org.apache.catalina.tribes.transport.nio.NioReceiver"
            address="auto"
            port="5001"
            selectorTimeout="100"
            maxThreads="6"/>

        <Sender className="org.apache.catalina.tribes.transport.ReplicationTransmitter">
            <Transport className="org.apache.catalina.tribes.transport.nio.PooledParallelSender"/>
        </Sender>
        <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpFailureDetector"/>
        <Interceptor className="org.apache.catalina.tribes.group.interceptors.MessageDispatch15Interceptor"/>
        <Interceptor className="org.apache.catalina.tribes.group.interceptors.ThroughputInterceptor"/>
    </Channel>

    <Deployer className="org.apache.catalina.ha.deploy.FarmWarDeployer"
        tempDir="/tmp/war-temp/"
        deployDir="/tmp/war-deploy/"
        watchDir="/tmp/war-listen/"
        watchEnabled="false"/>

    <ClusterListener className="org.apache.catalina.ha.session.JvmRouteSessionIDBinderListener"/>    
    <ClusterListener className="org.apache.catalina.ha.session.ClusterSessionListener"/>
</Cluster>
```

**Note**, if there are multiple tomcat nodes on one machine, the
*Receiver* port (line 14) should be different for each of them.

# Additional setting in ZK project

You have to configure the following settings to make ZK project work in
a tomcat cluster environment.

## web.xml

- Add the `distributable` element in `WEB-INF/web.xml`.

``` xml
<?xml version="1.0"?>
<web-app  xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
    version="2.5">

    <distributable/>

</web-app>
```

## zk.xml

``` xml
<zk>
    <system-config>
        <ui-factory-class>org.zkoss.zk.ui.http.SerializableUiFactory</ui-factory-class>
    </system-config>
    <!-- clustering environment, since ZK 5.0.8-->
    <listener>
        <listener-class>org.zkoss.zkplus.cluster.ClusterSessionPatch</listener-class>
    </listener>
</zk>
```

- Line 3, turn on Serializable UI Factory for ZK, please refer to this [
  ZK
  Configuration]({{site.baseurl}}/zk_dev_ref/Clustering/ZK_Configuration).
- Line 7, if there are more than three Tomcat cluster nodes, or you are
  using a different cluster-manager such as
  [Hazelcast](https://hazelcast.com/) and other solutions instead, you
  also need to add the cluster session patch settings.

# Version History
