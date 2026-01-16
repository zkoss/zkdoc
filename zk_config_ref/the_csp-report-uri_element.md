# The csp-report-uri Element

{% include supported-since.html version="10.3.0" %}

**Syntax:**
```xml
<csp-report-uri>receiver_endpoint</csp-report-uri>
```

<p><code class="language-plaintext highlighter-rouge">[Default: null]</code></p>

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-report-only>true</csp-report-only>
    <csp-report-uri>/csp-violations</csp-report-uri>
</system-config>
```

Requires both `csp-enabled` and `csp-report-only`. This will apply the `Content-Security-Policy-Report-Only` response header. In this mode, any violations of the CSP policy are only reported in the console. Additionally, a report will be sent to the endpoint specified in `csp-report-uri`. This policy does not prevents resources from loading on the site, even if they fail the policy.

See [full documentation entry](/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).