# HttpSessionListener

`[Required] Class: ` `org.zkoss.zk.ui.http.HttpSessionListener`

ZK Session Cleaner is a listener used to clean up memory when a HTTP
session is destroyed.

If you are using Servlet 2.3, please use
`org.zkoss.zk.ui.http.HttpSessionListener23` instead.

``` xml
    <listener>
        <description>ZK listener for cleanup when a session is destroyed</description>
        <listener-class>org.zkoss.zk.ui.http.HttpSessionListener</listener-class>
    </listener>
```

