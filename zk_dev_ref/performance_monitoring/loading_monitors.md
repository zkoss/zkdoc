To know the loading of an application, you could implement
[org.zkoss.zk.ui.util.Monitor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Monitor.html) to
count the number of desktops, sessions and requests.

Once implemented, you could register it by specifying the following in
`WEB-INF/zk.xml` (assume the class is called foo.MyStatistic):

```xml
<zk>
    <listener>
        <listener-class>foo.MyStatistic</listener-class>
    </listener>
</zk>
```
