# The csp-report-only Element

{% include supported-since.html version="10.3.0" %}

**Syntax:**
```xml
<csp-report-only>true|false</csp-report-only>
```

<p><code class="language-plaintext highlighter-rouge">[Default: false]</code></p>

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-report-only>true</csp-report-only>
</system-config>
```

The `csp-enabled` property must be enabled to set `csp-report-only`. This will apply the `Content-Security-Policy-Report-Only` response header instead of `Content-Security-Policy`. In this mode, any violations of the CSP policy are reported in the console or on your report URL. This policy does not prevents resources from loading on the site, even if they fail the policy.

See [full documentation entry](/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).