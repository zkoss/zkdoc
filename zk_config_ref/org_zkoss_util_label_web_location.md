---
title: "org.zkoss.util.label.web.location"
---

**Property:**

`org.zkoss.util.label.web.location`
{% include global-scope-only.html %}

Default: `/WEB-INF/zk-label.properties`  
{% include version-badge.html version="3.6.2" %}

It specifies which properties file for [the internationalization labels]({{site.baseurl}}/zk_dev_ref/internationalization/labels)
are named and located.

For 5.0.7 and later, it is suggested to use [the label-location element]({{site.baseurl}}/zk_config_ref/the_label_location_element)
instead, since it allows users to specify multiple properties files. In
addition, the lable-location element has higher priority.
