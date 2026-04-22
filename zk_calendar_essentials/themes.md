# Overview

There are 4 themes supported:

- iceblue (**default**)
- breeze
- dark
- wcag

If no configuration specified, ZK Calendar renders in the default theme.

# Look and Feel

![](/zk_calendar_essentials/images/Zk_calendar3_themes.png)

# Follow ZK Theme by Default

By default, Calendars will automatically switch to a theme according to
what you specified in the property [ `org.zkoss.theme.preferred`]({{site.baseurl}}/zk_dev_ref/theming_and_styling/switching_themes).

Here is the built-in rule:

| ZK Theme you specified | Calendar Theme |
|:----------------------:|:--------------:|
| breeze, silvertail, sapphire | breeze |
| iceblue | iceblue |
| wcag | wcag |
| any dark themes including ruby, amber, emerald, aquamarine, montana, violet and spaceblack, cardinal, mysteriousgreen, zen | dark |
| any other themes not included above | iceblue |

# How to Switch Themes

Specify one of the following theme names above in `zk.xml` with the
library property below:

```xml
    <library-property>
        <name>org.zkoss.calendar.theme.preferred</name>
        <value>dark</value>
    </library-property>
```

This component doesn't support switching themes dynamically. You need to
modify zk.xml and restart a server to switch a theme.
