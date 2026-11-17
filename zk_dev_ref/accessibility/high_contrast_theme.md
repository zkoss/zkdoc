---
title: "High Contrast Theme"
---

ZK provides 3 accessibility-ready [high contrast themes]({{site.baseurl}}/zk_dev_ref/theming_and_styling/zk_official_themes#accessibility-ready-themes).
They are designed to meet the WCAG contrast criteria:

- [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
  from WCAG 2.0: text needs a contrast ratio of at least 4.5:1.
- {% include supported-since.html version="11.0.0" %}
  [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
  from WCAG 2.1: the borders, icons and focus indicators that identify a
  control need at least 3:1.

When we design these themes, we rely on
[Sketch Accessibility Assistant](https://www.sketch.com/extensions/assistants/sketch-accessibility-assistant/).
After that, we verify them using
[axe - Web Accessibility Testing](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd).

To know more details, please refer to [Accessibility-ready themes]({{site.baseurl}}/zk_dev_ref/theming_and_styling/zk_official_themes#accessibility-ready-themes).

![Wcag themes]({{site.baseurl}}/zk_dev_ref/images/wcag_themes.png)
