# Automatic CSP Configuration 
{% include edition-availability.html edition="ee" %}
{% include supported-since.html version="10.3.0" %}

You can specify the following elements in `zk.xml` to enable and configure Content Security Policy (CSP) for your ZK application. These configurations will automatically apply the appropriate CSP headers to all ZK pages, providing an additional layer of security against cross-site scripting (XSS) and other code injection attacks.

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

With both `csp-enabled` and `csp-strict-dynamic-enabled`, ZK generates a per-request nonce, adds it to its script and style elements, and includes `strict-dynamic` in `script-src`.

{% include supported-since.html version="11.0.0" %}

In strict-dynamic mode, ZK 11 removes `unsafe-inline` from the generated `script-src` unless your custom `csp-policy` explicitly requests it. The default policy still includes `unsafe-eval`, which is required by current ZK client-side code, and `style-src 'unsafe-inline'` for style attributes.

The effective header therefore contains directives equivalent to:

```
script-src 'self' 'unsafe-eval' 'strict-dynamic' 'nonce-{nonce}';
style-src 'self' 'unsafe-inline';
```

The actual `script-src` also contains hashes used by ZK's framework-generated links. Inspect the response header instead of copying those implementation-specific hashes into your configuration.

ZK prepares the nonce before composing the page, so it is directly available through `${cspNonce}`. You do not need to instantiate `CspProviderImpl`.

```xml
<label>${cspNonce}</label>
```

For a complete native page, you can stamp your own script explicitly. ZK preserves an author-supplied nonce and does not add a duplicate:

```xml
<?page complete="true"?>
<html xmlns="http://www.zkoss.org/2005/zk/native"
      xmlns:u="http://www.zkoss.org/2005/zul">
    <head>
        <zkhead/>
        <script nonce="${cspNonce}">
            window.applicationReady = true;
        </script>
    </head>
    <body><u:label value="Ready"/></body>
</html>
```

Standard ZUL `<script>` components and the `<?script?>` processing instruction are stamped automatically. `Clients.evalJavaScript()` also continues to work under the nonce-based policy.

## Limitations of Removing unsafe-inline

- Removing `unsafe-inline` from `script-src` does not permit HTML attributes such as `onclick`. Register listeners through ZK or JavaScript event APIs.
- A nonce authorizes `<style>` elements but does not authorize `style="..."` attributes. The default ZK policy therefore retains `style-src 'unsafe-inline'`.
- The nonce changes for every request. Do not cache a rendered dynamic ZUL document and reuse its header or markup.
- Enabling only `csp-strict-dynamic-enabled` does not produce a nonce or header. ZK logs a warning; both switches are required.

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

If you want to use the strict-dynamic directive, you must also enable `<csp-strict-dynamic-enabled>`. This ensures that nonce values are generated and applied during page rendering. If a custom policy explicitly includes `script-src 'unsafe-inline'`, ZK preserves that token; omit it to use the tighter ZK 11 behavior.

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
