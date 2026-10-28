---
title: "Setting Up ZK Pivottable"
---

ZK Pivottable is distributed separately from ZK Framework. We recommend using [Maven]({{site.baseurl}}/zk_pivottable_essentials/using_maven) to keep its required libraries and versions aligned.

# Requirements

{% include supported-since.html version="4.0.0" %}

Pivottable 4.0.0 requires Java 17 or later and ZK 10.3.1 or later.

Download ZK and Pivottable from the following pages if you need the binary distributions:

- [ZK Framework](https://www.zkoss.org/download/zk)
- [ZK Pivottable](https://www.zkoss.org/download/zkpivottable.dsp)

# Install

Add the Pivottable JAR and its required ZK libraries to your application. When using Maven, add `org.zkoss.pivot:pivottable:4.0.0`, or use `4.0.0-Eval` with the evaluation repository.

See [Using Maven]({{site.baseurl}}/zk_pivottable_essentials/using_maven) for the dependency and repository configuration.

# Exporting to Excel

{% include supported-since.html version="4.0.0" %}

Excel export in Pivottable 4.0.0 uses Keikai 7.0.0. Add the following libraries and their runtime dependencies when your application exports XLS or XLSX files:

- `io.keikai:keikai-model:7.0.0`
- `io.keikai:keikai-native:7.0.0`

The Keikai artifacts are available from the licensed Keikai repository and require Maven credentials. Maven is recommended because it resolves their transitive dependencies automatically.

Pivottable 3.1.x used `keikai-poi` and `keikai-poiex`. Do not combine those libraries with Pivottable 4.0.0. See [Migrate to Pivottable 4.0.0]({{site.baseurl}}/zk_pivottable_essentials/migration_guide_4_0_0) for the complete migration checklist.

# Jakarta EE

Pivottable does not depend on Java EE-specific or Jakarta EE-specific APIs, so the same Pivottable JAR works with both platforms.
