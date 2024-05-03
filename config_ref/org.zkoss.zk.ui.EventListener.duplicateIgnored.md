**Property:**

`org.zkoss.zk.ui.EventListener.duplicateIgnored`

`Default: `<i>`true`</i>`: allows one instance of event listener to be added multiple times to the listener list of a component or page.`

If set to false, components and pages will check their internal listener
list for the same instance of listener, and will return false instead of
adding it again if found.

    <library-property>
        <name>org.zkoss.zk.ui.EventListener.duplicateIgnored</name>
        <value>true</value>
    </library-property>
