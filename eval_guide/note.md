---
title: "Note"
permalink: /eval-guide/note
---

## Note on methodology and scope

This guide is based on hands-on implementation of comparable applications across multiple frameworks, supported by documentation review and tooling-assisted development.

While we have made every effort to ensure accuracy and fairness, frameworks evolve rapidly and ecosystems vary widely. Some capabilities, particularly those available through third-party libraries, may not be fully represented.

The Level 1 (Employee Manager) measurements were taken on Spring Boot 3.3.4 with JDK 17, on an Apple M1 Pro, with all six applications sharing one backend module and rendering 15 rows per page. Response time there is the time until data rows are painted in a real browser, not a server-side request timing. Those browser figures are **n=3 and preliminary**; run-to-run spread on the same application reached about 20%, and we intend to re-run them at a higher iteration count. All timings were taken over loopback, so the cold-visit figures do not charge any framework a realistic network transfer cost for its payload, and every application was launched with `mvn spring-boot:run`, which caps JIT compilation — the absolute milliseconds are therefore pessimistic against a production launch, uniformly across the six.

We welcome feedback from the community and will continue to refine this guide over time.
