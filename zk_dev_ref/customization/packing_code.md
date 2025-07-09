

There are two ways to pack the customization code: part of the Web
application, or an independent JAR file. Packing as part of the Web
application is straightforward. All you have to do is to specify the
customization in `WEB-INF/zk.xml` as described in [ZK Configuration Reference](zk_configuration_reference).

In many cases, it is better to pack the customization code as an
independent JAR file, such that it can be managed separately and reused
in multiple Web applications.

# Where to Configure a JAR File

The configuration of a JAR file can be placed in a file called
`config.xml`, and it must be placed under `/metainfo/zk`. If the JAR
file also provides the component definitions, you have to prepare
another file called `lang-addon.xml` under the same directory[^1].

The content of `/metainfo/zk/config.xml` is similar to `WEB-INF/zk.xml`,
except only a subset of configurations is allowed. Here is a sample
(zkex.jar 's config.xml)[^2]:

```xml
<config>
    <config-name>zkex</config-name><!-- used to resolve dependency -->
    <depends>zk</depends>

    <version>
        <version-class>org.zkoss.zkex.Version</version-class>
        <version-uid>5.0.6</version-uid>
        <zk-version>5.0.0</zk-version><!-- or later -->
    </version>

    <listener>
        <listener-class>org.zkoss.zkex.init.WebAppInit</listener-class>
    </listener>

    <library-property>
        <name>org.zkoss.zul.chart.engine.class</name>
        <value>org.zkoss.zkex.zul.impl.JFreeChartEngine</value>
    </library-property>
    <library-property>
        <name>org.zkoss.zul.captcha.engine.class</name>
        <value>org.zkoss.zkex.zul.impl.JHLabsCaptchaEngine</value>
    </library-property>
</config>
```

> ------------------------------------------------------------------------
>
> <references/>

# How to Initialize a JAR File

Sometimes you have to initialize a JAR file. It can be done by
implementing
[org.zkoss.zk.ui.util.WebAppInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppInit.html), and
then specifying it as a listener in `/metainfo/zk/config.xml`. For
example,

```java
public class MyJARInit implements WebAppInit {
    public void init(WebApp wapp) throws Exception {
        //do whatever init you need
    }
}
```

Notice that many configurations can be done by accessing
[org.zkoss.zk.ui.util.Configuration](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Configuration.html) directly. If you
want to access it in
[org.zkoss.zk.ui.util.WebAppInit#init(org.zkoss.zk.ui.WebApp)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppInit.html#init(org.zkoss.zk.ui.WebApp)),
invoke
[org.zkoss.zk.ui.WebApp#getConfiguration()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#getConfiguration()) as
follows.

```java
    public void init(WebApp wapp) throws Exception {
        Configuration config = wapp.getConfiguration();
...
```

[^1]: For more information, please refer to [ZK Client-side Reference: Language Definition]({{site.baseurl}}/zk_client_side_ref/language_definition).

[^2]: For more information, please refer to [ZK Configuration Reference: JAR File's config.xml]({{site.baseurl}}/zk_config_ref/jar_file's_config.xml).
