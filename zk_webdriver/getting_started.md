---
layout: single
title: "Getting Started"
permalink: /zk_webdriver/getting_started
toc: true
---

# Getting Started

To use ZK Webdriver in your project, you'll need to add it as a test dependency.

## Prerequisites

- **JDK 11+**: Necessary for the latest ZK Webdriver versions.
- **Maven or Gradle**: To manage dependencies.

## Maven Setup

First, ensure you have the [ZK Maven repository]({{site.baseurl}}/zk_installation_guide/maven_setup) configured in your `pom.xml`.

Add the following dependency to your `<dependencies>` section with `<scope>test</scope>`:

```xml
<dependency>
    <groupId>org.zkoss.test</groupId>
    <artifactId>zk-webdriver</artifactId>
    <version>1.4.39.0.1</version>
    <scope>test</scope>
</dependency>
```

> [!NOTE]
> Check the [ZK Repository](https://mavensync.zkoss.org/maven2/org/zkoss/test/zk-webdriver/) for the latest available version.

## Gradle Setup

In your `build.gradle` file, add the ZK repository and the dependency:

```gradle
repositories {
    mavenCentral()
    maven { url 'https://mavensync.zkoss.org/maven2/' }
}

dependencies {
    testImplementation 'org.zkoss.test:zk-webdriver:1.4.39.0.1'
}
```

## System Properties

ZK Webdriver relies on several system properties for its configuration. These can be set in your build tool's test task.

### Gradle Example

```gradle
test {
    useJUnitPlatform()
    // The relative path to your web application source
    systemProperty "zkWebdriverBaseResource", "./src/main/webapp/"
    // The context path for the test server
    systemProperty "zkWebdriverContextPath", "/testapp"
}
```

- `zkWebdriverBaseResource`: Default is `./src/main/webapp/`. This is where ZK Webdriver looks for your ZUL files.
- `zkWebdriverContextPath`: The context path used by the embedded Jetty server during tests.

## WebDriver Management

ZK Webdriver comes with `webdrivermanager` to help manage browser binaries (like `chromedriver`). By default, it uses a headless Chromium browser if available.
