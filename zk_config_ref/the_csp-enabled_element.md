# The csp-enabled Element

{% include supported-since.html version="10.3.0" %}

**Syntax:**
```xml
<csp-enabled>true|false</csp-enabled>
```

<p><code class="language-plaintext highlighter-rouge">[Default: false]</code></p>

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
</system-config>
```

Enabling this will apply the `Content-Security-Policy` response header with the default directive:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval';
```
This property must be enabled to enable other CSP properties.

See [full documentation entry](/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).