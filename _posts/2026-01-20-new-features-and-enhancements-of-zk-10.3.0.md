---
author: James Chu
date: 2026-01-27
version: 10.3.0
category: small-talk
title: "New Features And Enhancements of ZK 10.3.0"
---

# Introduction
ZK 10.3.0 continues the evolution of ZK 10 with a strong focus on **modularity, security, theming flexibility, and developer experience**. This release brings notable improvements in Content Security Policy (CSP), multiple file downloads, modernized theming through CSS variables, and refined OSGi packaging, plus a set of security and stability updates.

These refinements are designed to help teams maintain large-scale enterprise applications more easily, adopt modern frontend security practices, and upgrade existing projects with greater confidence.

View [ZK 10.3.0 Release Note](https://www.zkoss.org/product/zk/releasenote/10.3.0).

## Download
- [Demo](https://www.zkoss.org/zkdemo/)
- [Download](https://www.zkoss.org/download/zk)

# Highlighted Features

## Enhanced Content Security Policy (CSP) Support
<!--REQUIRED ZK EDITION: CE -->
{% include edition-availability.html edition="ce" %}

Starting from **ZK 10.3.0**, ZK introduces a **system-level Content Security Policy (CSP) configuration mechanism** to enable, customize, and enforce CSP headers in a structured way. This helps reduce exposure to XSS and aligns applications with modern browser security requirements.

Key highlights:

- **Default CSP with one switch** via `<csp-enabled>` in `zk.xml`
- **Strict dynamic + nonce support** for safer inline scripts
- **Custom policies and report-only mode** for gradual rollout and auditing

For full configuration details and examples, see [Automatic CSP Through ZK Configuration](https://docs.zkoss.org/zk_dev_ref/security_tips/automatic_csp_through_zk_configuration).

## Multiple File Download Enhancements
<!--REQUIRED ZK EDITION: CE -->
{% include edition-availability.html edition="ce" %}

ZK 10.3.0 clarifies and improves support for scenarios where users need to download **multiple files** within a single workflow. While browsers typically restrict opening multiple download dialogs from one user action, ZK provides a well-defined and reliable pattern for handling such use cases through the `Filedownload` utility.

The recommended approach and usage details are documented in:

[Multiple File Downloads - ZK Component Reference](https://docs.zkoss.org/zk_component_ref/filedownload.html#multiple-file-downloads)

### Recommended Pattern: Bundle Files into a Single Download
Since most modern browsers allow only **one download dialog per user interaction**, the recommended approach is to **package multiple files into a single archive** (such as a ZIP file) and trigger the download once.

Using `org.zkoss.zul.Filedownload`, developers can:

- Generate multiple files on the server
- Bundle them into a ZIP stream
- Trigger a single download dialog for the aggregated file

Example (simplified):

```java
try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
     ZipOutputStream zip = new ZipOutputStream(bos)) {

    for (MyFile file : files) {
        zip.putNextEntry(new ZipEntry(file.getName()));
        zip.write(file.getContent());
        zip.closeEntry();
    }
    zip.finish();

    Filedownload.save(
        new ByteArrayInputStream(bos.toByteArray()),
        "application/zip",
        "files.zip"
    );
}
```

This approach ensures consistent behavior across browsers while providing a smooth user experience for batch downloads.

## Theme Modernization with CSS Variables
<!--REQUIRED ZK EDITION: CE -->
{% include edition-availability.html edition="ce" %}

ZK 10.3.0 introduces further modernization of the theming system by expanding the use of **CSS variables**. This allows developers to customize themes more flexibly without deep overrides or duplicated styles.

For example, instead of overriding multiple component selectors to change a brand color and base font size, you can set theme variables once and let the theme propagate the change across components:

```css
:root {
    /* Example variable names for illustration */
    --zk-base-font-size: 15px;
}
```

This makes it easier to keep a consistent look and feel across buttons, inputs, and typography without maintaining large override stylesheets.

`--zk-base-font-size` sets the base typography size for the theme, so changing it scales text across components that reference this variable.

### Upgrade Guide for Existing Themes
To ensure a smooth upgrade, ZK 10.3.0 provides guidance for migrating existing custom themes:

- Review overridden styles that now rely on CSS variables
- Prefer variable-based customization over hard-coded values
- Validate visual consistency after upgrading

These improvements significantly reduce the long-term cost of theme maintenance while aligning ZK with modern CSS best practices.

## Improved OSGi Support (Maven and Packaging)
<!--REQUIRED ZK EDITION: CE -->
{% include edition-availability.html edition="ce" %}

ZK 10.3.0 simplifies OSGi packaging and distribution with two key changes:

- The **default artifacts already include OSGi metadata**, so the same package is used for both OSGi and non-OSGi environments, without maintaining separate files.
- The **integrated OSGi artifacts are released together to Maven and the binary download**, making it easier to adopt OSGi with the standard distribution channels.

These changes reduce packaging complexity and make it easier to integrate ZK into modular platforms and OSGi-based systems.

## Security and Other Enhancements
Security remains our highest priority. ZK 10.3.0 updates multiple third-party libraries (such as Jython, Rhino, and PDF.js) to mitigate known vulnerabilities, updates the tbeditor to the latest Trumbowyg JS widget, and fixes 50+ bugs to improve stability and overall quality. For full details, refer to the release note.

## Spring Framework Version Note
<!--REQUIRED ZK EDITION: CE -->
{% include edition-availability.html edition="ce" %}

ZK's Spring integration module (`zkplus`) uses Spring Framework as an optional dependency, and the Spring version can be freely adjusted by the application developer. By default, the integration references Spring 5.x to maintain compatibility with Java 11 environments, which is the specification of ZK 10 and is commonly used by ZK applications.

However, Spring 5.x contains unsafe Java deserialization methods (CWE-502):
https://cwe.mitre.org/data/definitions/502.html

For users with stricter security requirements, Spring 6.x may be used instead; however, Spring 6.x requires Java 17 or later, and upgrading may involve additional migration effort. You are encouraged to select the Spring version that best aligns with your Java runtime, security policies, and application requirements.

# Summary
ZK 10.3.0 focuses on refinement and readiness for modern enterprise development. With enhanced CSP support, improved multiple file downloads, a more flexible CSS-variable-based theming system, clearer OSGi packaging, and ongoing security and stability updates, this release helps teams build and maintain secure, modular, and future-proof ZK applications with confidence.

We encourage you to upgrade to ZK 10.3.0 and take advantage of these enhancements in your next release.
