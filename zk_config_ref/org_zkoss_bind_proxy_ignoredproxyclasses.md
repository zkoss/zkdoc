**Property:**

`org.zkoss.bind.proxy.IgnoredProxyClasses`

`Default: `<i>`java.util.Date, java.sql.Date, java.sql.Timestamp, java.math.BigDecimal, java.math.BigInteger`</i>

It specifies the name of the classes which would not be proxied.

    <library-property>
        <name>org.zkoss.bind.proxy.IgnoredProxyClasses</name>
            <appendable>true</appendable>
            <list>
                <value>java.util.Date</value>
                <value>java.sql.Date</value>
                <value>java.sql.Timestamp</value>
                <value>java.math.BigDecimal</value>
                <value>java.math.BigInteger</value>
            </list>
    </library-property>
