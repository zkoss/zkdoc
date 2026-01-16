# The csp-strict-dynamic-enabled Element

{% include supported-since.html version="10.3.0" %}

**Syntax:**
```xml
<csp-strict-dynamic-enabled>true|false</csp-strict-dynamic-enabled>
```

<p><code class="language-plaintext highlighter-rouge">[Default: false]</code></p>

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-strict-dynamic-enabled>true</csp-strict-dynamic-enabled>
</system-config>
```

With both `csp-enabled` and `csp-strict-dynamic-enabled`,  the `Content-Security-Policy` response header will be applied to ZK pages with the directive:

```
script-src 'self' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' 'nonce-{nonce}';
```

The nonce is generated per execution and applied to all `<script>` and `<style>` tags in the page.

In order to retrieve the nonce for manual handling during page load, you need to first initialize the `CspProviderImpl` class, and then use EL or `execution.getAttribute` to retrieve the nonce in a ZUL page or composer. For example:
```xml
<zscript><![CDATA[
    org.zkoss.zk.ui.util.CspProvider provider = new org.zkoss.zk.ui.http.CspProviderImpl();
    provider.getCspNonce();
]]></zscript>

<label>${cspNonce}</label>
```

or 

```xml
<zscript><![CDATA[
    org.zkoss.zk.ui.util.CspProvider provider = new org.zkoss.zk.ui.http.CspProviderImpl();
    provider.getCspNonce();
]]></zscript>

<label>${execution.getAttribute('cspNonce')}</label>
```

See [full documentation entry](/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).