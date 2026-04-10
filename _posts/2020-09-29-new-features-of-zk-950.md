---
author: hawk
date: 2020-09-29
version: "9.5.0"
category: small-talk
title: "New Features of ZK 9.5.0"
---

# Introduction

ZK is a tool created by developers, for developers. In ZK 9.5 we put our
first priority on advancing the DX - Developer Experience - by providing
a smoother upgrade path, simplified MVVM syntax and usages, easier theme
& component customization, among others.  
In addition, a preview version enabling web accessibility support has
been released with keyboard navigation, screen reader support, high
contrast themes, and other features facilitating WCAG2 compliance.  
Enjoy, and we look forward to receiving your feedback.

## Download

[Download ZK 9.5.0](http://www.zkoss.org/download/zk) | [ZK Demo](http://www.zkoss.org/zkdemo/)

![]({{site.baseurl}}/assets/images/small-talk/highlighted_features.png "Highlighted_features.png")

# Web Accessibility Support

{% include edition-availability.html edition="ee" %} We are excited to announce a **preview version** of
the za11y (ZK Accessibility) package for WCAG 2 compliance. Various
enhancements have been made on ZK components for keyboard interaction
(focus, navigation order, …) and screen reader support (aria-labels,
roles, …). In addition, accessibility-ready themes are made available
for providing sufficient color contrast and focus style.

Check out the [ZA11Y Demo](https://www.zkoss.org/za11y-demo/) and
corresponding [GitHub
Project](https://github.com/zkoss-demo/za11y-demo).

Learn more about
[ZK Developer's Reference/Accessibility](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Accessibility) and [WCAG themes](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Theming_and_Styling/ZK_Official_Themes#Accessibility-ready_themes).

![]({{site.baseurl}}/assets/images/small-talk/wcag_themes.png)

\[SPECIAL EVENT\] Feedback to ZK WCAG features and win ZK gifts. [Learn
More
\>\>](https://blog.zkoss.org/2020/10/20/feedback-to-zk-wcag-features-and-win-zk-themed-gifts/)

# Data Binding Syntax Sugar and Simplified Usage

{% include edition-availability.html edition="ce" %} ZK now provides a simplified syntax with a built-in
convention. Shortened syntax and conventions make it easier to code and
speed up your development.

## Init ViewModel Shortcut

You can apply a ViewModel on a component in a shorter way. Then, ZK will
assign a default ViewModel ID as **`vm`** without having to explicitly
specify it. Also you no longer need to specify "init".

```xml
<!-- original syntax -->
<div viewModel="@id('vm') @init('MyViewModel')" >

<!-- shortcut syntax -->
<div viewModel="@('MyViewModel')">
```

## Implicit Init Binding

Now you can apply an init property binding without specifying "init".

```xml
<!-- original syntax -->
<label value="@init(vm.greeting)"/>

<!-- shortcut syntax -->
<label value="@(vm.greeting)"/>
```

for other bindings e.g. @load, @bind, you have to specify them
explicitly.

## Implicit Command Binding

Now ZK will create a command binding at an event attribute (starting
with **on**) by default. Yo don't need to specify `command` explicitly.

```xml
<!-- original syntax -->
<button onClick="@command('hello')"/>

<!-- shortcut syntax -->
<button onClick="@('hello')"/>
```

besides, no need to apply `@Command` on a command method.

```java
    // original usage
    @Command
    @NotifyChange("name")
    public void hello(){
        ...
    }

    // simplified usage
    @NotifyChange("name")
    public void hello(){
        ...
    }
```

## Command Binding Parameter Inference

### The original syntax

```java
public void pick(@BindingParam("checked") boolean isPicked, 
                 @BindingParam("picked")Item item){...}
```

```xml
<checkbox onCheck="@command('pick', checked=self.checked, picked=each)">
```

### The shortcut syntax

Now you can declare a command method **without `@BindingParam`** and
passing parameters to that command method **without specifying a key**.
ZK will pass each parameter according to its order. So you need to make
the parameter order consistent between zul and the method.

```java
public void pick( boolean isPicked, Item item){...}
```

```xml
<checkbox onCheck="@('pick',self.checked, each)">
```

for running examples, please check [MVVM example
project](https://github.com/zkoss/zkbooks/tree/master/mvvmreference).

# Command Binding to Another ViewModel

Sometimes it's convenient to call a command in another ViewModel of the
same desktop.

```xml
    <nodom viewModel="@id('vm')@init('org.zkoss.mvvm.databinding.CommandVM')">
        <button label="hello" onClick="@('hello')"/>
    </nodom>
    <separator/>
    <nodom viewModel="@id('vmInit')@init('org.zkoss.mvvm.databinding.InitVM')">
        <button label="call the previous VM" onClick="@('$vm.hello')"/>
    </nodom>
```

- Line 6: Need to append **\$** on a ViewModel ID, so it's `$vm`.

# Bean Creation When Passing Parameters

Assume there is a Java bean:

```java
public class Item {

    private int id;
    private String name;

//getter and setter
}
```

## The Previous Usage

Pass parameters with key-value pairs in a command binding.

```xml
<button label="create" onClick="@('create', id=idbox.value, name=namebox.value)"/>
```

list all parameters in a command method signature:

```java
@Command
public void create(@BindingParam("id")int id, @BindingParam("name")String name){...}
```

## New Usage

We still need to specify the parameter key in a command binding. But now
we can just declare the Java bean in a command method, then ZK will new
the bean and set the bean's value with the command binding's parameter.

```java
    @Command
    public void create(@BindingParams Item item){
        itemList.add(item);
    }
```

# Notify Change Shortcut Method

## The Previous Method Call

```java
BindUtils.postNotifyChange(null, null, this, "value1");
```

the 1st and 2nd parameter (queue name and queue scope) are null in most
cases. Therefore, ZK provides a shortcut method below.

## New Method Call

```java
BindUtils.postNotifyChange(this, "value1");
```

# Theme Template Supports Compact Themes

{% include edition-availability.html edition="ce" %} [ZK Theme
Template](https://github.com/zkoss/zkThemeTemplate) provides an easy way
for theme customization. It is now updated to support compact themes —
you can now customize a compact theme (e.g. iceblue_c) as easy as the
standard themes, and upgrade the theme easily (continuous/incremental
compile) when you upgrade your ZK version.

# Components

## Radio/Checkbox Status CSS Class

{% include edition-availability.html edition="ce" %} CSS classes for different status are now applied to
Radio/Checkbox. This makes it much easier to custom style for different
states.

```css
.z-checkbox-on{...}
.z-checkbox-off{...}

.z-radio-on{...} 
.z-radio-off{...}
```

## Popup: Specify A Different Reference Component

{% include edition-availability.html edition="ce" %} With previous versions, when you associate a popup
to a component, that component is always taken as the reference
component to show the popup. Since ZK 9.5 you can specify another
component as the reference component with `ref=component-id`.

For example, you can associate a popup to a button while showing a popup
at a textbox:

![]({{site.baseurl}}/assets/images/small-talk/popup_reference_component.jpg)

```xml
    <textbox id="address" placeholder="target address" style="margin-bottom: 30px; display:block"/>
    <button label="show more" popup="pp, ref=address, position=end_after"/>

    <popup id="pp">
        more info
    </popup>
```

for other popup options, please refer to
[ZK Component
Reference/Essential Components/Popup](https://www.zkoss.org/wiki/ZK_Component_Reference/Essential_Components/Popup)

## Searchbox Easy Clear

{% include edition-availability.html edition="ee" %}

Searchbox now has an x icon. After you select an item, if you wish to
remove the current selected item, you can now press DELETE or click the
x icon to do so.

# Backward Compatibility: ZK 7 Form Binding

{% include edition-availability.html edition="ce" %} In ZK 8, a new MVVM form binding was introduced for
better efficiency and more features. However, it also made it difficult
for ZK 7 projects to upgrade. In ZK 9.5 we have now ported back ZK 7’s
simple form binding. If you have ZK 7 projects that use the legacy
simple form binding, you can easily upgrade to ZK 9.5 with [minimum code
changes](https://github.com/zkoss/zk-mvvm-book/blob/9.5/data_binding/legacy_support_simpleform.md).

# Notification Styles Updated

{% include edition-availability.html edition="ce" %} The Notification style for Iceblue, Iceblue_c, and
ThemePack Themes are updated to a modern look and feel while providing a
better contrast level for WCAG compliance.

## Style used in 9.1.0 and older versions

![]({{site.baseurl}}/assets/images/small-talk/zk91_info.jpg "zk91-info.jpg") ![]({{site.baseurl}}/assets/images/small-talk/zk91_warn.jpg "zk91-warn.jpg")
![]({{site.baseurl}}/assets/images/small-talk/zk91_error.jpg "zk91-error.jpg")

![]({{site.baseurl}}/assets/images/small-talk/enhancements.png)

# Introducing fetch( ) API for Redirection/SSO handling

{% include edition-availability.html edition="ce" %} Redirect (HTTP 302) including SSO handling has
always been a common challenge in Ajax. In 9.5, javascript fetch( ) API
is used instead of XHR allowing better redirect handling.

# Client API supports scrollIntoView and focus using selector

{% include edition-availability.html edition="ce" %} With this new feature, developers can now focus (or
scrollIntoView) a component specified by selector syntax with Java API,
and a browser will focus the corresponding DOM element:

```java
Clients.focus("listitem:nth-child(50)");

Clients.scrollIntoView("#mywind textbox");
```

these 2 methods don't require a component reference as a parameter, so
invoking them doesn't break the MVVM pattern. For more examples, please
see [zkbooks \> mvvmreference \>
ScrollFocusVM.java](https://github.com/zkoss/zkbooks/blob/master/mvvmreference/src/main/java/org/zkoss/mvvm/advance/ScrollFocusVM.java).

# Listbox Enhancements

Listbox is one of the most commonly used components. It is complicated
in the way that it provides a table view with selection, frozen, paging,
ROD, auto-sizing and many custom attributes. In ZK 9.5 we have made
several enhancements to cover a wider range of use cases.

- Fixed listbox sizing issue with "rows" attribute
- Listbox model now supports an array of class
- Fixed broken ROD popup & JS error during partial invalidate
- Refined the selection behavior when part of the items are selected

# iPadOS13+ Support

{% include edition-availability.html edition="ce" %} Apple has changed the implementation and now an
iPadOS13+ device no longer identifies itself with the iOS Safari User
Agent (UA) string, but with the MacOS Safari one instead. Corresponding
changes have been made in ZK 9.5 to ensure ZK detects the devices
correctly.

# Upgrade Notes

![]({{site.baseurl}}/assets/images/small-talk/upgrade_notes.png)

- Since 9.5.0, the transitive dependency of slf4j-jdk14 was removed.
  Please specify your preferred logger instead.
- Since 9.5.0, the transitive dependency of closure-compiler-unshaded
  was removed. If you wish to enable source maps, please include it
  manually.
- zAu.onError API was changed since fetch() API is now used instead of
  XHR.
- Due to ZK-4622, the DIV of grid/listbox/tree header border is removed.
  You may need to adjust the styles accordingly.
