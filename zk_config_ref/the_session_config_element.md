---
title: "The session-config Element"
---

The allowed child elements include `session-timeout` and
`max-desktops-per-session`. You might have multiple `session-config`
elements in one `zk.xml`.

```xml
 <session-config>
     <session-timeout>1800</session-timeout>
     <timer-keep-alive>false</timer-keep-alive>
     <max-desktops-per-session>15</max-desktops-per-session>
     <max-requests-per-session>5</max-requests-per-session>
     <max-pushes-per-session>3</max-pushes-per-session>
 </session-config>
```
