---
title: "Security & Support Policy"
description: "Security & Support Policy: To manage the software supply chain predictably, we categorize our software versions into distinct lifecycle tiers."
---

## 1. Release Version Classifications

To manage the software supply chain predictably, we categorize our software versions into distinct lifecycle tiers. Please refer to our [Product Release Matrix Table](#4-product-release-matrix-table) to see which tier your specific version occupies.

- **Active Maintenance Generation**: This is our latest major product version. This software undergoes automated security analysis, dependency vulnerability scanning, and quality checks during every release cycle within our core CI/CD pipeline (typically every 4–6 months).
- **Legacy Support Generation**: This represents the major version immediately preceding the active generation. To support our enterprise users through larger migration transitions, commercial security maintenance for Legacy generations is guaranteed for at least 5 years (or longer, depending on migration complexity) from the initial .0 release date of that generation.

## 2. Vulnerability Remediation & Patching Cadence

Security updates are triaged and delivered based on the lifecycle classification of the software:

- **Active Tier**: Vulnerabilities are addressed continuously via our regular 4–6 month release cadence.
- **Legacy Tier**: Standard security fixes and third-party dependency updates are batched and systematically back-ported once per year to maintain deployment stability.
- **High-Severity Exceptions**: For all supported tiers, critical or high-severity vulnerabilities are fast-tracked outside our scheduled release calendar to ensure rapid remediation.
- **On-Demand Triage**: If a commercial customer reports an unaddressed security issue, our security team evaluates the report independently to determine if an expedited patch or mitigation guidance can be delivered ahead of the scheduled release.

## 3. Post-Lifecycle & Custom Extended Support

Once a major version officially reaches its published End-of-Support (EOS) date, public maintenance patches conclude. However, we recognize that enterprise infrastructure timelines vary, so customers who require extended security compliance on a post-lifecycle generation may contact us directly to arrange individualized, dedicated support agreements (subject to customized commercial terms).

## 4. Product Release Matrix Table

| Software Line | Lifecycle Classification | Minimum Guaranteed Support | Official End-of-Support Date |
|---|---|---|---|
| ZK 10.x (First released in Feb. 2024) | Active Maintenance | Throughout Active Lifecycle | TBD (Superseded by ZK 11) |
| ZK 9.x (First released in Dec. 2019) | Legacy Support | Extended from 5-Year Min | December 9, 2027 |
| ZK 8.x and older (First released in Oct. 2015 or earlier) | Post-Lifecycle | Concluded | Contact Sales for Custom Support |

*(last update: June, 2026)*
