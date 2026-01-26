---
layout: single
title: "Server Management"
permalink: /zk_webdriver/server_management
toc: true
---

# Server Management

ZK Webdriver includes an embedded Jetty server to host your ZUL files during testing. You can choose between two server strategies depending on your testing needs.

## Prototype Server (Default)

The `PrototypeServer` starts a fresh Jetty instance for **each test case instance**. This ensures total isolation between tests.

### Usage
Inherit from `WebDriverTestCase` to use this strategy by default.

```java
public class MyTest extends WebDriverTestCase {
    // A new server starts before this test and stops after
}
```

**Pros**: High isolation; no side effects between tests.
**Cons**: Slower execution due to frequent server restarts.

## Singleton Server

The `SingletonServer` starts a single Jetty instance that is **shared across all test classes** in the same test suite.

### Usage
Inherit from `SingletonWebDriverTestCase` or manually register the extension.

```java
public class MySharedServerTest extends SingletonWebDriverTestCase {
    // Shares the same server instance with other tests extending this class
}
```

**Pros**: Much faster execution for large test suites.
**Cons**: Risk of side effects if tests modify global state (e.g., static variables, shared database).

## Configuration

You can configure the server using system properties in your `pom.xml` or `build.gradle`:

- `jetty.port`: Specify a fixed port (e.g., `8888`). Default is `0` (random available port).
- `zkWebdriverBaseResource`: The root directory for ZUL files and resources (default: `./src/main/webapp/`).
- `zkWebdriverContextPath`: The web application context path (e.g., `/test`).

### Shared Resource Warning
If using `SingletonServer`, ensure your tests don't conflict with each other's data if they use the same database or shared resources.
