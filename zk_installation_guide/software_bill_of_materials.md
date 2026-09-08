---
title: "Software Bill of Materials"
---

{% include supported-since.html version="11.0.0" %}

# Overview

Starting with ZK 11, each new ZK version has a Software Bill of Materials (SBOM). The SBOM provides a machine-readable inventory of the libraries included in a release, helping security and compliance teams audit dependencies and meet supply-chain requirements such as the EU Cyber Resilience Act.

ZK generates SBOMs as CycloneDX 1.6 JSON documents. Test-only dependencies are excluded because they are not shipped as part of the runtime product.

# Edition Scope

The generated SBOM matches the corresponding distribution scope:

| Distribution | Scope |
|---|---|
| CE | ZK Community Edition runtime modules and dependencies |
| PE | CE plus PE modules such as `zkex` and `zml` |
| EE | CE, PE, and EE runtime modules |
| Theme package | The dependencies of the individual theme package |

Use the SBOM belonging to the exact ZK edition and version deployed by your application. An application's final inventory should also include its own libraries and any other frameworks it packages.

# Building an SBOM from Source

The ZK source build uses the CycloneDX Gradle plugin:

```bash
./gradlew cyclonedxBom
```

The CE build writes `build/reports/bom.json`. The commercial source build also provides a PE-scoped task:

```bash
./gradlew cyclonedxBomPe
```

Theme packages use the CycloneDX Maven plugin during the Maven `package` phase and produce a separately named JSON document for each theme variant.

# Using the SBOM

You can import the JSON document into dependency inventory, license review, or vulnerability-management tools that support CycloneDX. Keep the SBOM with the matching deployed release so scan results can be reproduced during an audit.

The SBOM describes the ZK distribution; it is not a vulnerability report. Re-scan it with current vulnerability data as part of your normal release and incident-response process.
