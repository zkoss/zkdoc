---
title: "Using Maven"
---

Maven manages the ZK Pivottable libraries and their versions. This page shows the minimum configuration for Pivottable 4.0.0. For general ZK repository settings, see [How to Use Maven with ZK]({{site.baseurl}}/zk_installation_guide/maven_setup).

# Requirements for 4.0.0

{% include supported-since.html version="4.0.0" %}

ZK Pivottable 4.0.0 requires the following environment:

| Requirement | Minimum version |
|-------------|-----------------|
| Java | 17 |
| ZK | 10.3.1 |
| Keikai | 7.0.0, when exporting to Excel |

# Add the Pivottable Dependency

Define the versions in one place so that the related libraries remain aligned:

```xml
<properties>
    <maven.compiler.release>17</maven.compiler.release>
    <zk.version>10.3.1</zk.version>
    <pivottable.version>4.0.0</pivottable.version>
    <keikai.version>7.0.0</keikai.version>
</properties>
```

Add Pivottable and ZK to your application:

```xml
<dependencies>
    <dependency>
        <groupId>org.zkoss.pivot</groupId>
        <artifactId>pivottable</artifactId>
        <version>${pivottable.version}</version>
    </dependency>
    <dependency>
	<groupId>org.zkoss.zk</groupId>
	<artifactId>zul</artifactId>
	<version>${zk.version}</version>
    </dependency>
</dependencies>
```

Use `4.0.0-Eval` instead of `4.0.0` when evaluating Pivottable.

# Add Excel Export Dependencies

{% include supported-since.html version="4.0.0" %}

Pivottable 4.0.0 exports Excel files through the Keikai 7 model API. Add these dependencies only when your application exports to XLS or XLSX:

```xml
<dependency>
    <groupId>io.keikai</groupId>
    <artifactId>keikai-model</artifactId>
    <version>${keikai.version}</version>
</dependency>
<dependency>
    <groupId>io.keikai</groupId>
    <artifactId>keikai-native</artifactId>
    <version>${keikai.version}</version>
    <scope>runtime</scope>
</dependency>
```

These artifacts replace `keikai-poi`, `keikai-poiex`, and `ooxml-schemas` used by Pivottable 3.1.x. `keikai-native` is not pulled in transitively, so declare it explicitly.

# Configure Repositories

Licensed users need the ZK EE and Keikai EE repositories:

```xml
<repositories>
    <repository>
	<id>ZK EE</id>
	<url>https://maven.zkoss.org/repo/zk/ee/</url>
    </repository>
    <repository>
	<id>Keikai EE</id>
	<url>https://maven.zkoss.org/repo/keikai/ee/</url>
    </repository>
</repositories>
```

Configure the repository credentials in Maven's `settings.xml`. See [Login Authentication]({{site.baseurl}}/zk_installation_guide/maven_setup#login-authentication).

For evaluation, use the evaluation repository and the `-Eval` version:

```xml
<repository>
    <id>ZK Evaluation</id>
    <url>https://mavensync.zkoss.org/eval/</url>
</repository>
```

You can check the [evaluation repository](https://mavensync.zkoss.org/eval/org/zkoss/pivot/pivottable/) or the [licensed repository](https://maven.zkoss.org/repo/zk/ee/org/zkoss/pivot/pivottable/) for available versions.

# Upgrade from 3.1.x to 4.0.0

Pivottable 4.0.0 changes both its runtime requirements and the API used for Excel export. Complete these steps before rebuilding your application:

1. Upgrade the project to Java 17 or later.
2. Upgrade ZK to 10.3.1 or later.
3. Replace Keikai 5.13.0 with Keikai 7.0.0.
4. Remove `keikai-poi`, `keikai-poiex`, and `ooxml-schemas`. Also remove `zpoi` and `zpoiex` when upgrading from a version before 3.1.0.
5. Add `keikai-model` and `keikai-native` if the application exports Excel files.
6. Update custom export code to use the Keikai model API.

Applications that only render and interact with a Pivottable do not need the Keikai dependencies. The migration affects applications that export or customize Excel output.

See [Migrate to Pivottable 4.0.0]({{site.baseurl}}/zk_pivottable_essentials/migration_guide_4_0_0) for API mappings, custom workbook migration, style changes, exported file differences, and known limitations.
