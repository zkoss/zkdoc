---
title: "org.zkoss.bind.viewModel.autoNotifyChange.enable"
---

**Property:**

`org.zkoss.bind.viewModel.autoNotifyChange.enable`

{% include global-scope-only.html %}

Default:  `false`

Enable posting NotifyChange when a setter method is called.

If the feature is turned on, every setter method in `@Command` and
`@GlobalCommand` will post NotifyChange after being called.
