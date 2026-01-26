---
layout: single
title: "Examples"
permalink: /zk_webdriver/examples
toc: true
---

# Real-world Examples

The following examples are adapted from the official ZK codebase to demonstrate typical testing scenarios using ZK Webdriver.

## 1. Verifying Component State via ZK Log

This example shows how to interact with components and verify their state through ZK's internal logging mechanism (`zk.log`).

```java
public class GroupboxVisibilityTest extends WebDriverTestCase {
    @Test
    public void testGroupboxToggle() {
        connect();
        
        // Click on the caption to toggle groupbox
        click(jq(".z-caption-content span"));
        waitResponse(true); // Wait for animation
        
        click(jq(".z-groupbox-title-content"));
        waitResponse(true);
        
        // Click buttons that trigger zk.log() on the server
        click(jq("@button").get(0));
        waitResponse();
        
        click(jq("@button").get(1));
        waitResponse();
        
        // Assert the combined ZK log contents
        assertEquals("true\ntrue", getZKLog());
    }
}
```

## 2. Checking CSS and Rendering Consistency

Validating that styles are correctly applied to components after rendering or updates.

```java
public class ColumnAlignmentTest extends WebDriverTestCase {
    @Test
    public void testAlignment() {
        connect();
        
        // Verify alignment of specific columns and footers
        assertEquals("right", jq(".z-column:eq(2)").css("text-align"));
        assertEquals("right", jq(".z-footer:eq(2)").css("text-align"));

        // Iterate through rows to check consistent alignment
        JQuery rows = jq(".z-row");
        for (int i = 0; i < rows.length(); i++) {
            assertEquals("right", 
                rows.eq(i).find(".z-row-inner:eq(2)").css("text-align"));
        }
    }
}
```

## 3. Manual Input without Auto-Blur

Sometimes you need more control over the input process, such as typing without immediately triggering a blur event.

```java
public class ChosenboxInputTest extends WebDriverTestCase {
    @Test
    public void testInputWidth() {
        connect();
        
        JQuery input = jq("@chosenbox input").first();
        
        // Focus manually
        focus(input);
        
        // Use Selenium's WebElement directly for raw typing
        WebElement webElement = toElement(input);
        webElement.clear();
        webElement.sendKeys("Long input string...");
        
        waitResponse(true);
        
        // Assert based on calculated dimensions
        assertTrue("Input width should increase", input.outerWidth() > 50);
    }
}
```

## 4. Mobile Emulation

ZK Webdriver makes it easy to test mobile-responsive layouts using Chrome's mobile emulation.

```java
public class TabletLayoutTest extends WebDriverTestCase {
    @Override
    protected ChromeOptions getWebDriverOptions() {
        return super.getWebDriverOptions()
                .setExperimentalOption("mobileEmulation", 
                    Collections.singletonMap("deviceName", "iPad"));
    }

    @Test
    public void testTabletView() {
        connect();
        // Interactions will now simulate touch behaviors
        click(jq("@menu"));
        waitResponse();
        assertTrue(jq(".tablet-sidebar").isVisible());
    }
}
```
