---
layout: single
title: "Advanced Configuration"
permalink: /zk_webdriver/advanced_configuration
toc: true
---

# Advanced Configuration

For more complex testing scenarios, ZK Webdriver allows you to customize the environment further, including using custom configuration files and Docker.

## Custom ZK and Web Configuration

Sometimes you need to test with specific `zk.xml` or `web.xml` settings that differ from your production configuration. ZK Webdriver provides extensions to load external configuration files.

### `ExternalZkXml`

Allows loading a specific `zk.xml` file for a test class.

```java
public class MyConfigTest extends WebDriverTestCase {
    @RegisterExtension
    public static final ExternalZkXml CONFIG = new ExternalZkXml("/test/custom-zk.xml");
}
```

### `ExternalWebXml`

Allows overriding the `web.xml` for the embedded Jetty server.

```java
public class MyWebXmlTest extends WebDriverTestCase {
    @RegisterExtension
    public static final ExternalWebXml WEB_CONFIG = new ExternalWebXml("/test/custom-web.xml");
}
```

## Docker Support

If your CI environment requires running browsers in containers, you can use `DockerWebDriverTestCase`. This class automatically manages a remote WebDriver instance running inside a Docker container (using Docker Compose).

### Usage
```java
public class MyDockerTest extends DockerWebDriverTestCase {
    // This test will run against a browser in a Docker container
}
```

> [!NOTE]
> This requires Docker and Docker Compose to be installed on the host machine.

## Headless Mode

By default, ZK Webdriver attempts to run in **headless mode** to speed up tests and work better in CI environments. You can override this behavior by overriding `isHeadless()` in your test class:

```java
@Override
protected boolean isHeadless() {
    return false; // Show the browser window during test
}
```
