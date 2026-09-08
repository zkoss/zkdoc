---
title: "The csp-strict-dynamic-enabled Element"
description: "The csp-strict-dynamic-enabled Element: It specifies whether to enable the strict-dynamic directive, which generates a per-execution nonce applied to the script and style tags of a page."
---

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

With both `csp-enabled` and `csp-strict-dynamic-enabled`, ZK generates a nonce for each request and applies it to framework-generated `<script>` and `<style>` elements.

{% include supported-since.html version="11.0.0" %}

ZK 11 omits `unsafe-inline` from `script-src` in strict-dynamic mode unless the application's custom `csp-policy` explicitly includes it. The default policy retains `unsafe-eval` and `style-src 'unsafe-inline'`:

```
script-src 'self' 'unsafe-eval' 'strict-dynamic' 'nonce-{nonce}';
style-src 'self' 'unsafe-inline';
```

Additional framework hashes can appear in the effective `script-src` header.

The nonce is prepared before page composition and is available directly through EL:

```xml
<label>${cspNonce}</label>
```

Both configuration flags must be enabled. If strict-dynamic is enabled without `csp-enabled`, ZK does not generate the nonce and logs a warning.

Nonce-bearing `<style>` elements do not make inline `style="..."` attributes CSP-safe. Keep `style-src 'unsafe-inline'`, or remove inline style attributes and supply an application-specific CSP policy/provider.

See [full documentation entry](/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).
