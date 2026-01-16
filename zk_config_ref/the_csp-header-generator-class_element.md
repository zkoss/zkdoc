# The csp-header-generator-class Element

{% include supported-since.html version="10.3.0" %}
**Syntax:**
```xml
<csp-header-generator-class>a_class_name</csp-header-generator-class>
```

[Default: `org.zkoss.zk.ui.http.CspProviderImpl`]

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-header-generator-class>org.zkoss.zk.ui.http.CspProviderImpl</csp-header-generator-class>
</system-config>
```

Requires `csp-enabled` and a custom class implementing `org.zkoss.zk.ui.util.CspProvider` to override the default CSP header generation.

See [full documentation entry](/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).