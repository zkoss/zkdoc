---
title: "HTML Tags"
---

Here we discuss how to use HTML tags directly in a ZUML document. There
are several ways as described in the following sections, and you could
choose one based on your requirements.

| What to consider | html component | [native namespace](/zk_dev_ref/ui_patterns/The_native_Namespace) | [XHTML components](/zk_dev_ref/ui_patterns/the_xhtml_component_set) | [JSP](/zk_dev_ref/integration/jsp) |
|---|---|---|-------------------------------------------------------------------|--------------------------------------------|
| Update Content Dynamically | Yes | No | Yes| No |
| Mix with ZUL components | No | Yes | Yes| Yes/No |
| Memory Footprint | Small | Small | Large  | Small  |
| Support EL | Yes | Yes | Yes| Yes|
| Support Data Binding | Yes | No | Yes| No |

## native namespace 
We cannot update content dynamically at the server.
However, we can modify the DOM tree directly at the client. Please
refer to the [Client-side UI Composing](/zk_dev_ref/ui_composing/client_side_ui_composing)

## JSP  
* Technically, you can modify the browser's DOM tree dynamically at the client by JavaScript. Not by ZK Java API.
* You could mix HTML tags with ZK components, if [ZK JSP Tags](/zk_jsp_tags_essentials/before_you_start) is used.
Otherwise, you could only have a JSP page to include other ZUL pages, or vice versa

In addition, you could use
[iframe]({{site.baseurl}}/zk_component_ref/iframe)
to embed a complete HTML document which might be from a different
website with different technology. Or, use
[include]({{site.baseurl}}/zk_component_ref/include)
to include an HTML fragment.
