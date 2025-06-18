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
what you specified in the property [
`org.zkoss.theme.preferred`](ZK_Developer's_Reference/theming_and_styling/Switching_Themes).

Here is the built-in rule:

<table>
<thead>
<tr class="header">
<th><center>
<p>ZK Theme you specified</p>
</center></th>
<th><center>
<p>Calendar Theme</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>breeze, silvertail, sapphire</p></td>
<td><p>breeze</p></td>
</tr>
<tr class="even">
<td><p>iceblue</p></td>
<td><p>iceblue</p></td>
</tr>
<tr class="odd">
<td><p>wcag</p></td>
<td><p>wcag</p></td>
</tr>
<tr class="even">
<td><p>any dark themes including ruby, amber, emerald, aquamarine,
montana, violet and spaceblack, cardinal, mysteriousgreen, zen</p></td>
<td><p>dark</p></td>
</tr>
<tr class="odd">
<td><p>any other themes not included above</p></td>
<td><p>iceblue</p></td>
</tr>
</tbody>
</table>

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
