---
title: "org.zkoss.theme.atlantic.useGoogleFont.disabled"
---

**Property:** org.zkoss.theme.atlantic.useGoogleFont.disabled
{% include version-badge.html version=8.0.1 %}

Default: `false`

By default, Atlantic theme imports Google font, but some countries (e.g.
China) are blocked from accessing that font or there is no internet
available for a ZK-based application. Then this blocking will cause the
theme displaying incorrectly. In this case, you need to disable
importing Google font by the library property in zk.xml

