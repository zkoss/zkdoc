---
author: hawk
date: 2012-12-05
version: "6.5.1"
category: small-talk
title: "New Features of ZK 6.5.1"
---

## Introduction

ZK 6.5.1 concentrates on fixing bugs and introducing a few new features
including a default command for MVVM, page visibility with HTML 5 API
and others.

ZK 6.5 series focuses on taking developers to achieve real device
transparency in one codebase and component set, exploring the area of
combined desktop & tablet UI and touch experiences. Introducing
responsive design and responsive components to always fit your device
screen resolution and tablet-specific user interaction methods such as
swiping and device orientation detection which are done automatically to
save developers time, effort and to increase massive productivity.

## The Default Command for MVVM

{% include edition-availability.html edition="ce" %}

ZK 6.5.1 brings a default command for MVVM. When a binder receives a
command, it starts to find ViewModel's command methods by matching its
name. If the binder cannot find a matched method, it invokes default
command method.

Assume that there are only two command methods in the below ViewModel. If
we trigger a command "exit", a binder invokes the default command method
`defaultAction()` because it cannot find a command method named "exit".

```java
public class OrderVM {

    @Command
    public void newOrder(){
    ...
    }
  
    @DefaultCommand
    public void defaultAction(){
    ...
    }
}
```

## Control Page Visibility with HTML 5 API in ZK

{% include edition-availability.html edition="ce" %}

In order to develop power and CPU efficient web applications, W3C
publishes a specification named Page Visibility in HTML 5 which defines
a means for site developers to programmatically determine the current
visibility state of the page. In this specification, there are two
attributes defined: `hidden` and `visibilityState`, where `hidden` is a
boolean value representing whether the current page is visible or not
and `visibilityState` represents that the current page has four states:
hidden, visible, prerender, and unloaded.

In ZK 6.5.1, the API with `onVisibilityChange` event was implemented which
provides the ability to find out when a page is visible or hidden. This
has a lot of benefit as it enables saving of CPU cycles as well as
bandwidth. The following is a very simple example:

```xml
<window title="window" border="normal">
    <attribute name="onVisibilityChange">
        if (!event.isHidden())
            lbl.setValue("Welcome back");
    </attribute>
    <label id="lbl"></label>
</window>
```

For more information please check the blog post
[here](http://blog.zkoss.org/index.php/2012/12/02/control-page-visibility-with-html5-api-in-zk/)
and the [ZK Developer's Reference](/zk_dev_ref/ui_patterns/browser_information_and_control#browser-page-visibility-state).

### Comet Server Push Support

{% include edition-availability.html edition="pe" %}

The visibility functionality has also been extended to comet server push
to reduce the server loading by default.

## Messagebox without Buttons

{% include edition-availability.html edition="ce" %}

With ZK 6.5.1, if you'd like to show a non-buttons dialog, you can use
[org.zkoss.zul.Messagebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html)
with an empty array as follows.

```java
Messagebox.show("Cancel the operation?",
    new Messagebox.Button[0], null);
```

This messagebox will show without any buttons.

## DefaultTreeNode - Empty Node Can Be Treated as a Leaf Node

{% include edition-availability.html edition="ce" %}

In ZK 6.5.1, [org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) provides a
boolean argument to its constructor for configuring to treat the zero
size of children node as a leaf node.

```java
// @param emptyChildAsLeaf whether to treat the zero size of children node as a leaf node.
DefaultTreeModel model2 = new DefaultTreeModel(root, true);
```

For more information please refer to
[ZK Developer's Reference](/zk_dev_ref/mvc/tree_model).

## Download & Other Resources

- [Download ZK 6.5 here](http://www.zkoss.org/download/zk)
- [ZK 6.5.1 Release Notes](http://www.zkoss.org/product/zk/releasenote/6.5.1)
