---
title: "Performance Tips"
description: "Performance Tips: This chapter describes the tips to make your ZK application running faster."
---

This chapter describes the tips to make your ZK application running
faster. For information about identifying the bottleneck, please refer
to the [Performance Monitoring]({{site.baseurl}}/zk_dev_ref/performance_monitoring/performance_monitoring)
section.

For MVVM performance tips, please refer to [MVVM Reference]({{site.baseurl}}/zk_mvvm_ref/advanced/performance_tips)

# Improve Perceived Performance

{% include edition-availability.html edition="pe" %} {% include supported-since.html version="11.0.0" %}

A [skeleton placeholder]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#skeleton)
does not remove the bottleneck, because the query and the rendering still take the
same time. However, showing the page layout right away makes the page feel faster
to users, which is known as perceived performance. See
[Show a Skeleton Placeholder While Data Loads]({{site.baseurl}}/zk_dev_ref/performance_tips/listbox,_grid_and_tree_for_huge_data#show-a-skeleton-placeholder-while-data-loads)
for the patterns to load data behind a placeholder.
