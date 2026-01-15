# The csp-policy Element

{% include supported-since.html version="10.3.0" %}

**Syntax:**
```xml
<csp-policy>csp_header_content</csp-policy>
```

<p><code class="language-plaintext highlighter-rouge">[Default: `script-src 'self' 'unsafe-inline' 'unsafe-eval'`]</code></p>

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-policy>
        script-src 'self' 'strict-dynamic' https://www.google-analytics.com
    </csp-policy>
</system-config>
```

Or

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-policy>
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self';
    frame-ancestors 'none'
    </csp-policy>
</system-config>
```

Both `csp-enabled` and `csp-policy` are required to apply a custom `Content-Security-Policy` response header.

If you want to use the strict-dynamic directive, you must also enable `<csp-strict-dynamic-enabled>`. This will ensure that nonce headers are generated and applied correctly during page rendering.

See [full documentation entry](/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).