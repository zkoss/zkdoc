---
author: hawk
date: 2021-08-10
version: "9.6.0"
category: small-talk
title: "New Features of ZK 9.6.0"
---

# Introduction

From JDK 5 to JDK 17; from Spring, SpringMVC to SpringBoot; from Java EE
to Jakarta EE. At ZK, we continue to grow with the Java ecosystem and
broaden our reach for satisfying all walks of use cases and scenarios.

In ZK 9.6, a JakartaEE-compatible package is released along with the
current JavaEE-compatible package, supporting you to either stay or
migrate to Jakarta. With the upgraded ZK embed API, using ZK components,
modules, and applications in combination with a 3rd party framework such
as AngularJS and Python has become easier than ever. Finally, with your
real-world feedback, we are thrilled to see WCAG-compatible ZK
applications in service and reaching out to the unreached.

We are proud to announce ZK 9.6.

## Download

![](/assets/images/small-talk/demo_button.png)
![](/assets/images/small-talk/download_button.png)

# Highlighted Features

![](/assets/images/small-talk/highlighted_features.png)

## Jakarta EE Support

Starting from [Jakarta EE
9](https://en.wikipedia.org/wiki/Jakarta_EE#History), the javax.\*
namespace is renamed to jakarta.\*. This means that in order to use
Jakarta EE 9 and future versions, all applications, services and web
containers previously depending on Java EE need to support the Jakarta
namespace.

Since ZK 9.6, we start to support both the current Java EE and the
Jakarta EE by providing two separate sets of artifacts. If you are
migrating to Jakarta EE 9 you will need to include the
Jakarta-compatible version of ZK:

```xml
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zkmax</artifactId>
            <version>9.6.0-jakarta</version>
        </dependency>
```

note that if you have not yet migrated to Jakarata EE and are staying in
Java EE, you DO NOT need to specify the jakarta postfix. You should
still specify 9.6.0 as your version number.

For non-maven users, two separate sets of binary files are provided, for
example <u>zkee-bin-eval-9.6.0-jakarta.zip</u> and
<u>zkee-bin-eval-9.6.0.zip</u>. Please download the file that matches
your setup.

## Multiple-Eras Calendar System

Datebox now supports Multiple-Eras Calendar systems e.g. Taiwan's ROC
(Minguo), Japanese Eras and Thai Buddhist Eras. This can be done by
specifying different locale value:

![](/assets/images/small-talk/roc_calendar.jpg "Roc-calendar.jpg")
![](/assets/images/small-talk/jp_calendar.jpg "jp-calendar.jpg")
![](/assets/images/small-talk/buddhist_calendar.jpg "buddhist-calendar.jpg")

Read [ZK Component Reference - Datebox Era Calendar](/zk_component_ref/datebox#era-calendar)
for details.

## Grid/Listbox/Tree Supports Sticky Headers

You can now add a <sclass> to enable sticky header for Grid, Listbox and
Tree. With sticky headers, when you scroll down a page where the Grid's
header becomes out of the visible range in a viewport, the header will
be floating and sticky on the top of the page. This feature is
especially helpful for mobile device users.

![ center](/assets/images/small-talk/sticky.gif " center") Read
[ZK Component Reference - Grid Sticky Header](/zk_component_ref/grid#sticky-header)
for details.

## ListModelList (Map/Set/Array) Supports Form binding

From now on, when you use form binding proxy object ZK will also create
a proxy for ListModelList, ListModelMap, ListModelSet, ListModelArray.
This allows you to use form binding in a wider range of use cases. For
example:

```xml
<grid form="@id('fx') @load(vm.property)" model="@init(fx.listModel)">
...
</grid>
```

## Improved ZK Embedded Support for 3rd Party Integration

Embedding ZK application into a non-ZK application (ex. AngularJS,
NodeJS, Python) is a powerful way to leverage ZK's components and
workflows in a larger and sophisticated user interface. The embedding
process relies on multiple mechanisms such as CORS, framework
interactions, and ZK workflows.

In this version, we made the process even easier by enhancing ZK
Embedded for [supporting zul style and script
element](https://tracker.zkoss.org/browse/ZK-4925), [supporting relative
path image](https://tracker.zkoss.org/browse/ZK-4926), [providing a
callback/event for cleanup](https://tracker.zkoss.org/browse/ZK-4943)
and more.

Please refer to [ZK Developer's
Reference](/zk_dev_ref/integration/embedded_zk_application) for details.

# Enhancements

![](/assets/images/small-talk/enhancements.png)

## WCAG Improvements

In ZK 9.5 we released the preview version of the za11y (ZK
Accessibility) package for WCAG 2 AA compliance. Now, thanks to everyone
who shared with us your testing result and real-life feedback, we were
able to integrate your feedback and make further improvements and now we
believe we have reached a well functional state.

Major WCAG enhancements done in 9.6 includes [allow to focus any
components](https://tracker.zkoss.org/browse/ZK-4866),[buttons in a
caption](https://tracker.zkoss.org/browse/ZK-4950), [listbox/tree focus
lost problem](https://tracker.zkoss.org/browse/ZK-4898), [borderlayout
keyboard resizing movement
speed](https://tracker.zkoss.org/browse/ZK-4672), [button stealing focus
problems](https://tracker.zkoss.org/browse/ZK-4865), and [cancel in
keyboard for colorbox](https://tracker.zkoss.org/browse/ZK-4273).

## Block all user keyboard input when showing the processing mask

Previously, when ZK shows the "processing" mask or when
`Clients.showBusy()` is called, ZK only blocks mouse clicking. From 9.6,
it will also block all user keyboard input. This eliminates the risk of
having a user accidentally pressing a key to duplicate an operation.

## Sort a ListModel in MVVM pattern

Previously, the only way to re-sort a `Listbox` with the built-in
comparator is to call `Listheader.sort()`. In ZK 9.6 we added the MVVM
support, you can now call `sort()` on all classes that implement
[Sortable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Sortable.html)
to sort with the built-in comparators under the MVVM pattern in a more
clean and consistent way.

## Error Log for Clients.EvalJavaScript()

In previous versions, if any JavaScript error happens during
`Clients.EvalJavaScript()`, you won't know it at the server-side. Plus
it is difficult to rely on the end-users to collect JavaScript errors
for you. These make it difficult to debug client-side issues. Now, with
this new feature, ZK will send this JavaScript error to the server and
log it, making it much easier for developers to debug client-side
issues.

Please refer to [ZK Configuration
Reference](/zk_config_ref/org_zkoss_zk_ui_scripterrorlistener_class) for details.

## Tree component supports select-all

A select-all checkbox is added to the header allowing users to select
all items. ![](/assets/images/small-talk/tree_select_all.jpg "tree-select-all.jpg")

## Stronger security for CSRF token with cryptographically random desktop ID generator

In this version, ZK adopts a new default desktop ID generator which uses
a cryptographically stronger pseudo-random number generator to generate
128 random bits (16 bytes) for improved security.

This feature is enabled by default. However if your testing application
relies on the previous Desktop ID generator and you wish to use the old
generator, specify below in zk.xml

```xml
<system-config>
    <id-generator-class>org.zkoss.zk.ui.impl.LegacyDesktopIdGenerator</id-generator-class>
</system-config>
```

# Upgrade Notes

![](/assets/images/small-talk/upgrade_notes.png)

## Jakarta Support

When migrating to Jakarta EE, in addition to choosing the
Jakarta-compatible core ZK package, if you are using the following
add-ons and extension, you will need to use the Jakarta-compatible
versions:

- ZATS Testing ([ZATS
  3](https://github.com/zkoss/zats/releases/tag/3.0.0) for JavaEE; [ZATS
  4](https://github.com/zkoss/zats/releases/tag/4.0.0) for JakartaEE)
- ZK CKEditor (Jakarta variant [available since
  4.16.1.1](https://www.zkoss.org/download/zkckeditor))
- ZK Spring (wait for Spring Framework to support Jakarta)
- ZK SpringBoot (wait for Spring Framework to support Jakarta)

## More Upgrade Notes

- The transitive dependency of jasperreports was removed in zkex. If you
  want to use jasperreports, please include it manually.
- Deprecated isEditionValid() and encodeWithZK() of
  org.zkoss.zk.fn.ZkFns and core.dsp.tld.
- Since 9.6, Datebox format with a single y pattern letter will not be
  truncated to 2 digits year according to the Unicode specification.
- For more details, please refer to [release
  note](https://www.zkoss.org/product/zk/releasenote/9.6.0).

## Discontinued Browser Support

- ZK is planning to discontinue the support for IE9, IE10 and legacy
  Edge starting from the next major version ZK 10 in 2022. If you
  require additional information please contact us at info@zkoss.org.

