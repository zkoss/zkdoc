---
title: "Upgrading to ZK 5"
date: 2010-04-28
author: "Edwin Yu, Senior Software Engineer, Zebra Enterprise Solutions"
version: "ZK 3.6 to ZK 5.0"
category: small-talk
---

# Upgrading to ZK 5

**Author:** Edwin Yu, Senior Software Engineer, Zebra Enterprise Solutions
**Date:** April 2010

## Introduction

This article shares experiences upgrading from ZK 3.6 to ZK 5.0, hoping to assist others undertaking the same migration.

## Background

Our software implementation uses programmatically-composed views rather than static ZUL. We avoid EL expressions and data binding, instead relying on custom macro components built in pure Java. We also employ custom CSS theming and don't utilize every ZK feature available.

## Upgrade Preparation

Reading [ZK 5: Upgrade Notes](https://www.zkoss.org/wiki/Small_Talks/2009/December/ZK_5:_Upgrade_Notes) beforehand is strongly recommended. One significant change involves event processing: ZK 5 disables the event processing thread by default. This affected our codebase, which expected response values from dialog interactions.

To maintain existing behavior without code modifications, we re-enabled the event thread in the ZK configuration:

```xml
<system-config>
    <disable-event-thread>false</disable-event-thread>
</system-config>
```

## Compilation with ZK 5

After replacing ZK 3.6 JARs with ZK 5.0 versions, we encountered several compilation errors:

1. **Bandbox.closeDropdown()** -- Deprecated and removed. Replace with the `close()` method.
2. **Listheader.setSort()** -- Throws exceptions. Requires try/catch wrapping. (Note: fixed in 5.0.2)
3. **RowRendererExt.DETACH_ON_UNLOAD** -- Removed. Change to `RowRendererExt.DETACH_ON_RENDER`.

Consulting the ZK 3.6 and 5.0 Javadoc resources proved essential for identifying API modifications.

## Custom ZK Theme Update

Upon deployment, the custom theme reverted to default styling with layout misalignment. The following solutions were implemented:

1. **Layout restructuring** -- Reviewed and removed unnecessary `hbox`/`vbox` nesting that caused misalignment.
2. **Cell element adoption** -- Used new `cell` components instead of nested box elements.
3. **Attribute application** -- Applied `stretch`, `start`, `center`, `end` attributes for proper alignment.
4. **Button mold override** -- ZK 5 changed the default button mold to `os`. Reverted to `trendy` via `zk.xml`.
5. **CSS class updates** -- Performed global search-and-replace of `zclass` names in custom stylesheets.
6. **DOM inspection** -- Used Firefox/Chrome developer tools to reverse-engineer CSS requirements rather than relying on outdated documentation.

The theme repair process required approximately three days, with subsequent fixes becoming routine procedural tasks.

## Selenium Tests

Build machines reported test failures after integration of ZK 5 libraries:

1. **Menu interaction** -- `selenium.click(menuItem)` alone ceased functioning. It required a preceding `selenium.mouseOver(menuItemParent)` call. (Fixed in 5.0.1)
2. **List header clicks** -- `selenium.clickAt(listheader)` displayed incorrect popup menus with multiple listeners. The workaround involved clicking adjacent components.

Overall assessment: ZK 5 produced more consistent, reliable test results compared to ZK 3, despite intermittent issues.

## Troubleshooting

When JavaScript errors lack corresponding server-side exceptions, systematic debugging approaches help.

**Recommended process:**
- Employ Firefox with Firebug plugin.
- Enable "Show Stack Trace with Errors" in Firebug's console.
- Configure debug mode in `zk.xml`:

```xml
<client-config>
    <debug-js>true</debug-js>
</client-config>
```

- Load the problematic page in Firefox and capture stack traces when errors occur.
- Report findings with use-case descriptions to support teams.

ZK Support (Enterprise Edition) efficiently addressed reported issues, typically producing patched builds within 24 hours.

## Miscellaneous

Several potential issues emerged that could not be reproduced in simplified test cases:

1. **Page ID hyphens** -- IDs containing hyphens (e.g., `<?page id="some-id"?>`) caused widgets to become unresponsive. Removing hyphens resolved the issue.
2. **Custom ID generator** -- Our `IdGenerator` produced non-alphanumeric characters (except underscores), causing JavaScript errors. Fixing character restrictions resolved the problems.

## Conclusion

The upgrade to ZK 5 introduced desired features justifying the migration effort. The documented upgrade path here may assist others undertaking similar transitions.

## Resources

- [ZK 5: Upgrade Notes](https://www.zkoss.org/wiki/Small_Talks/2009/December/ZK_5:_Upgrade_Notes) -- Essential pre-migration reading
- [ZK 5.0 Javadoc](https://www.zkoss.org/javadoc/latest/) -- API reference
