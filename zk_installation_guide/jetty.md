# Deploy

1.  Download Jetty from <http://www.mortbay.org/jetty/index.html> and
    install it, if you haven't installed it yet.
2.  Stop Jetty.
3.  Unzip zk-demo-x.x.x.zip or zk-demo.x.x.tar.gz
4.  Copy dist/lib/\*.jar to \$JETTY_HOME/lib
      
    (\$JETTY_HOME is where you installed Jetty)
5.  Copy dist/lib/ext/\*.jar to \$JETTY_HOME/lib
6.  \[Optional\] Copy dist/lib/zkforge/\*.jar to \$JETTY_HOME/lib
      
    (It depends whether you need component from ZK Forge)
7.  Deploy demo/bin/zksandbox.war to Jetty by copying it to
    \$JETTY_HOME/webapps directly.
8.  Start Jetty.
9.  Browse to <http://localhost/zksandbox> or
    <http://localhost:8080/zksandbox>, depending on your configuration.

# Limitations

1.  Due to this
    [issue](https://bugs.eclipse.org/bugs/show_bug.cgi?id=401664), ZK
    may throw NullPointerException (HttpServletRequest#getContentPath()
    returns a null value ...) with Servlet 3-supported Jetty. You should
    not use the default Servlet 3 Comet server push ([Servlet 3
    Asynchronous Processing-based
    Comet](http://books.zkoss.org/wiki/Small_Talks/2012/February/New_Features_of_ZK_6#ZK_Comet_supports_Servlet_3_Asynchronous_Processing)).
    You should use ***org.zkoss.zkex.ui.comet.CometServerPush*** instead
    by applying the following config:

zk.xml

```xml
 <device-config>
     <device-type>ajax</device-type>
     <server-push-class>org.zkoss.zkex.ui.comet.CometServerPush</server-push-class>
 </device-config>
```

Refer to [The server-push-class
Element]({{site.baseurl}}/zk_config_ref/the_device-config_element/the_server-push-class_element)
and [Server Push
Configuration]({{site.baseurl}}/zk_dev_ref/server_push/configuration)


