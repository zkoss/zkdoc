Here is a sample of `/metainfo/zk/config.xml` (from zkex.jar):

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

As shown, you could specify the listener and library properties in
`/metainfo/zk/config.xml`.


