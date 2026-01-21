# Automatic CSP Configuration 
{% include edition-availability.html edition="ee" %}
{% include supported-since.html version="10.3.0" %}

## The csp-enabled Element
Syntax:
`<csp-enabled>true|false</csp-enabled>`

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

## The csp-strict-dynamic-enabled Element
Syntax:
`<csp-strict-dynamic-enabled>true|false</csp-strict-dynamic-enabled>`

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

## The csp-policy Element
Syntax:
`<csp-policy>csp_header_content</csp-policy>`

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

## The csp-report-only Element
Syntax:
`<csp-report-only>true|false</csp-report-only>`

<p><code class="language-plaintext highlighter-rouge">[Default: false]</code></p>

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-report-only>true</csp-report-only>
</system-config>
```

The `csp-enabled` property must be enabled to set `csp-report-only`. This will apply the `Content-Security-Policy-Report-Only` response header instead of `Content-Security-Policy`. In this mode, any violations of the CSP policy are reported in the console or on your report URL. This policy does not prevents resources from loading on the site, even if they fail the policy.

## The csp-report-uri Element
Syntax:
`<csp-report-uri>receiver_endpoint</csp-report-uri>`

<p><code class="language-plaintext highlighter-rouge">[Default: null]</code></p>

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-report-only>true</csp-report-only>
    <csp-report-uri>/csp-violations</csp-report-uri>
</system-config>
```

Requires both `csp-enabled` and `csp-report-only`. This will apply the `Content-Security-Policy-Report-Only` response header. In this mode, any violations of the CSP policy are only reported in the console. Additionally, a report will be sent to the endpoint specified in `csp-report-uri`. This policy does not prevents resources from loading on the site, even if they fail the policy.

## The csp-header-generator-class Element
Syntax:
`<csp-header-generator-class>a_class_name</csp-header-generator-class>`

[Default: `org.zkoss.zk.ui.http.CspProviderImpl`]

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-header-generator-class>org.zkoss.zk.ui.http.CspProviderImpl</csp-header-generator-class>
</system-config>
```

Requires `csp-enabled` and a custom class implementing `org.zkoss.zk.ui.util.CspProvider` to override the default CSP header generation.