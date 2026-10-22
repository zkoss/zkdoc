---
author: jameschu
date: 2026-11-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Better CSP Support for Secure Apps"
---

**Use per-request nonces to remove unsafe-inline from script-src while keeping ZK-generated scripts working.**

## A Stronger Script Policy

Content Security Policy (CSP) limits which scripts a browser may run. It can reduce the impact of cross-site scripting, but a strict policy is difficult when a framework or application emits inline scripts.

ZK 11 improves its automatic CSP mode with per-request nonces and strict-dynamic. When enabled, ZK can generate script-src without unsafe-inline and authorize the scripts created for the current response.

![Diagram showing the server generating a nonce, adding it to the CSP header and page scripts, and the browser allowing matching scripts.](/assets/images/small-talk/zk11-sneak-peek/csp_nonce_flow.png)

*A per-request nonce connects the CSP response header with scripts generated for that response.*

## Enable Strict-Dynamic

```xml
<system-config>
    <csp-enabled>true</csp-enabled>
    <csp-strict-dynamic-enabled>true</csp-strict-dynamic-enabled>
</system-config>
```

Both settings are required. If csp-strict-dynamic-enabled is set without csp-enabled, ZK emits neither the CSP header nor a nonce and logs a warning.

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

## Know What the Change Does Not Remove

This improvement removes unsafe-inline from script-src when strict-dynamic is enabled. It does not remove every unsafe directive from the complete policy. Current ZK client code still requires unsafe-eval, and component markup still uses inline style attributes, so style-src continues to require unsafe-inline.

Raw HTML event attributes such as onclick are not authorized after script-src drops unsafe-inline. Register behavior through ZK events or JavaScript event APIs. The nonce also changes on every request, so dynamic rendered pages must not be cached and replayed with an old CSP header.

## Roll Out the Policy in Stages

CSP changes should first be deployed in report-only mode. Review violations from representative screens, third-party libraries, embedded content, and application-owned scripts. Adjust the application policy before enforcement begins.

ZK 11 reduces the framework changes required for a nonce-based script policy. The final policy, external source list, reporting endpoint, and enforcement schedule still belong to the application and its security team.

## Summary

This ZK 11 feature provides:

- Per-request nonces for ZK-generated scripts
- unsafe-inline removed from script-src in strict-dynamic mode
- cspNonce available for application-owned script elements
- Report-only configuration for staged rollout
- Clear remaining boundaries for unsafe-eval and inline styles

## Try It in ZK 11 Eval Freshly

ZK 11 is coming soon, and you can preview the improved CSP support in the latest ZK 11 Eval Freshly build (`11.0.0.FL.20261021-Eval`).

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
- [ZK Forum](https://forum.zkoss.org/)

