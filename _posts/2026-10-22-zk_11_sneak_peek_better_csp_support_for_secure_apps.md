---
author: jameschu
date: 2026-11-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Better CSP Support for Secure Apps"
---

**Remove unsafe-inline from script-src in strict-dynamic mode while keeping ZK-generated scripts working.**

## CSP in Enterprise Applications

For enterprise teams, Content Security Policy (CSP) can be part of a customer’s security requirements or deployment review. CSP lets an application tell the browser which resources it may load and which scripts it may execute, adding protection against cross-site scripting (XSS) and other content injection attacks.

Applying CSP to an interactive application requires accounting for the scripts and styles used by its UI framework. Framework-generated initialization scripts, dynamic JavaScript execution, and inline styles can require specific policy permissions. These compatibility considerations are shared by other UI frameworks as well.

ZK 11 builds on ZK’s existing CSP configuration support, making it easier to apply a nonce-based script policy while keeping framework-generated scripts working.

## What Changes in ZK 11

ZK 10.3.0 introduced automatic CSP configuration through `zk.xml`, including policy customization, report-only mode, and nonce support with `strict-dynamic`.

ZK 11 builds on this foundation by omitting `unsafe-inline` from the generated `script-src` directive in strict-dynamic mode, unless a custom policy explicitly includes it. Framework-generated scripts receive the nonce automatically, allowing them to run under the policy without requiring developers to add nonce attributes manually.

For application-owned script elements, the current nonce is available through `${cspNonce}` during page rendering.

![Diagram showing the server generating a nonce, adding it to the CSP header and page scripts, and the browser allowing matching scripts.](/assets/images/small-talk/zk11-sneak-peek/csp_nonce_flow.png)

*A per-request nonce connects the CSP response header with scripts generated for that response.*

## Enable Strict-Dynamic

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-strict-dynamic-enabled>true</csp-strict-dynamic-enabled>
</system-config>
```

For each response, ZK creates a fresh nonce and includes it in the CSP header. Framework-generated script elements and ZUL script components receive the same nonce automatically.

The effective script policy can then use a nonce and strict-dynamic instead of authorizing all inline script blocks.

## Use the Nonce in Application-Owned Scripts

The current nonce is available as cspNonce while a page is rendered. A complete native page can apply it to an application-owned script element.

```xml
<script nonce="${cspNonce}">
    window.applicationReady = true;
</script>
```

An explicitly supplied nonce is preserved, so the rendered element does not receive duplicate nonce attributes. Existing framework paths such as Clients.evalJavaScript() continue to use ZK's authorized script handling.

## CSP Compatibility Considerations

A CSP policy needs to accommodate the browser operations used by the framework and application. As with other interactive UI frameworks, some ZK functionality relies on dynamic JavaScript execution and inline styling.

ZK 11’s default policy therefore retains `unsafe-eval` for current client-side functionality and `unsafe-inline` in `style-src` for inline style attributes. The ZK 11 enhancement specifically removes `unsafe-inline` from the generated script policy in strict-dynamic mode; it does not remove these separate permissions.

Also, note that if an application supplies its own csp-policy, explicitly including script-src 'unsafe-inline' preserves that setting.

## Roll Out the Policy in Stages

CSP changes should first be deployed in report-only mode, where it reports violations without blocking resources, allowing teams to review compatibility before enforcement.  Review violations from representative screens, third-party libraries, embedded content, and application-owned scripts. Adjust the application policy before enforcement begins.

## Summary

This ZK 11 feature provides:

- Per-request nonces for ZK-generated scripts

- unsafe-inline removed from script-src in strict-dynamic mode

- cspNonce available for application-owned script elements

- Report-only configuration for staged rollout

- Clear remaining boundaries for unsafe-eval and inline styles

## Try It in ZK 11 Eval Freshly

ZK 11 is coming soon, and you can preview the improved CSP support in the latest ZK 11 Eval Freshly build (11.0.0.FL.20261021-Eval).

To try it in your existing ZK application, update your Maven `pom.xml` with the following configuration:

**1. Add the ZK Evaluation Maven Repository**

```xml
<repositories>
    <repository>
        <id>ZK Evaluation</id>
        <url>https://mavensync.zkoss.org/eval/</url>
    </repository>
</repositories>
```

**2. Update your ZK version and core dependency**

```xml
<properties>
    <zk.version>11.0.0.FL.20261021-Eval</zk.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.zkoss.zk</groupId>
        <artifactId>zk</artifactId>
        <version>${zk.version}</version>
    </dependency>
</dependencies>
```

Make sure all ZK dependencies use the same evaluation version to avoid version conflicts.

Once configured, enable CSP in report-only mode on a staging environment. Confirm the effective response header and nonce behavior, review violations from representative screens and third-party integrations, and move to enforcement only after the report is clean.

For more details, see the [ZK Maven Setup Guide](https://docs.zkoss.org/zk_installation_guide/maven_setup).

## Resources

- [Automatic CSP Configuration](https://docs.zkoss.org/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration)

- [csp-strict-dynamic-enabled configuration](https://docs.zkoss.org/zk_config_ref/the_csp-strict-dynamic-enabled_element)

- [ZK GitHub repository](https://github.com/zkoss/zk)
