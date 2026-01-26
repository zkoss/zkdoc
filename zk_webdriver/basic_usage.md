---
layout: single
title: "Basic Usage"
permalink: /zk_webdriver/basic_usage
toc: true
---

# Basic Usage

Writing a test with ZK Webdriver involves extending a base test class and using the provided API to interact with the browser.

## Writing Your First Test

The easiest way to start is by extending `WebDriverTestCase`. This class automatically manages an embedded Jetty server instance for each test case.

### Example Test Case

```java
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.zkoss.test.webdriver.WebDriverTestCase;
import org.zkoss.test.webdriver.ztl.JQuery;

public class MyFirstTest extends WebDriverTestCase {

    @Test
    public void testHelloWorld() {
        // Connect to the ZUL file associated with this test class
        // (By default, it looks for MyFirstTest.zul in the package path)
        connect();

        // Find a component using JQuery selector
        JQuery button = jq("@button");
        JQuery label = jq("@label");

        // Interact with the component
        click(button);

        // Wait for ZK's AJAX response to finish
        waitResponse();

        // Assert the result
        Assertions.assertEquals("Clicked!", label.text());
        
        // Ensure no ZK or JavaScript errors occurred
        assertNoAnyError();
    }
}
```

## Key API Methods

### `connect()` and `connect(String url)`
- `connect()`: Automatically navigates to the ZUL file corresponding to the test class name.
- `connect("/path/to/test.zul")`: Navigates to a specific ZUL file relative to the base resource.

### Interaction Methods
ZK Webdriver provides several methods to simulate user actions:
- `click(ClientWidget locator)`: Clicks on an element.
- `type(ClientWidget locator, String text)`: Types text into an input element (handles focus/blur automatically).
- `sendKeys(ClientWidget locator, CharSequence... keys)`: Sends raw keys to an element.
- `rightClick(ClientWidget locator)`: Simulates a right-click.
- `dblClick(ClientWidget locator)`: Simulates a double-click.

### Drag and Drop
You can perform drag and drop operations using standard Selenium actions or specialized methods:
- `clickAt(ClientWidget locator, int x, int y)`: Click at a specific offset.
- Support for `dropupload` is also available via `dropUploadFiles()`.

### AJAX Synchronization
Critical for ZK applications! Use `waitResponse()` after any interaction that triggers an AJAX request. This method waits until ZK's processing is complete and all client-side animations have finished.

```java
click(button);
waitResponse(); // Mandatory for AJAX-based updates!
```

## Asserting Results

Since ZK Webdriver runs in a real browser, you use standard JUnit assertions to verify the state of the UI.

- **Content**: `Assertions.assertEquals("Expected", jq("@label").text())`
- **Visibility**: `Assertions.assertTrue(jq("@popup").isVisible())`
- **Error Checking**: Use `assertNoAnyError()` at the end of your test to catch unexpected ZK or JavaScript errors.
