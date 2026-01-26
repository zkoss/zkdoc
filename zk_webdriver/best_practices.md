---
layout: single
title: "Best Practices"
permalink: /zk_webdriver/best_practices
toc: true
---

# Best Practices

To write reliable and maintainable tests with ZK Webdriver, follow these best practices.

## Handling AJAX Synchronously

The most common cause of flaky tests in ZK is not waiting for AJAX requests to finish. **Always** call `waitResponse()` after any interaction that might trigger an update from the server.

```java
click(saveButton);
waitResponse(); // Ensure ZK has finished processing before asserting
```

By default, `waitResponse()` waits for up to 4 seconds (configurable).

## Comprehensive Error Checking

It's a good habit to ensure that no unexpected errors occurred during the entire test execution. Use `assertNoAnyError()` at the end of each test method.

```java
@Test
public void testFlow() {
    // ... test steps ...
    assertNoAnyError(); // Checks both ZK server errors and JS console errors
}
```

## Mobile and Touch Testing

If your application supports touch devices, you can use `TouchWebDriverTestCase`. It provides a touch simulator and specialized methods like `tap()` and `swipe()`.

```java
public class MyTouchTest extends TouchWebDriverTestCase {
    @Test
    public void testSwipe() {
        connect();
        swipe(jq("@item1"), jq("@item5"));
        waitResponse();
    }
}
```

## Selecting Elements Efficiently

- Prefer **Component Type Selectors** (`jq("@component")`) over fragile CSS classes or positional selectors.
- Use **ID Selectors** (`jq("#myId")`) when IDs are stable and unique.
- Leverage **Widget Properties** via `widget()` when the DOM state doesn't provide enough information (e.g., checking if a complex component is in a specific logical state).

## Performance Optimization

- Use `SingletonWebDriverTestCase` for large suites where test isolation isn't strictly required for every class.
- Run tests in **Headless Mode** unless you are debugging a visual issue.
- Mock external services (like databases or APIs) if possible to reduce external dependencies, although ZK Webdriver is well-suited for full integration tests when needed.
