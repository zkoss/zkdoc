# Tip 1: Box Sizing

To improve performance at client side, we use the **border-box** model
for all components in ZK 7 instead of the **content-box** model. It
means a specified CSS property - width/min-width and height/min-height -
on the element will consider border width.

## Upgrade Example

In ZK 6.5, assuming you have specified a DIV with a fixed width, `102px`
including borders (2px) like:

```css
.z-div {
    border: 1px solid #000000;
    width: 100px;
}
```

However, after upgrading to ZK 7 or above, the DIV width will become
**100px** since all CSS class names start with the prefix `z-` get
`box-sizing: border-box` applied by default. If you want to keep the DIV
width as 102px in ZK 7, modify the original style as follows:

```css
.z-div {
    border: 1px solid #000000;
    width: 102px;
}
```

or

```css
.z-div {
    border: 1px solid #000000;
    width: 100px;
    box-sizing: content-box;
}
```

# Tip 2: Component Mold

Since we are no longer supporting browsers that don't support CSS 3 in
ZK 7, some components' molds are now sharing the same DOM structure with
their default mold to improve performance. However, you do not need to
change your Component.setMold() code since ZK handles this
transparently.


## Upgrade sample

In this
[smalltalk](https://www.zkoss.org/wiki/Small_Talks/2011/December/Customize_Look_and_Feel_of_ZK_Components_Using_CSS3)
we showed you how to customize the **button** component using CSS 3 with
the *os* mold based on ZK 6.5. Originally the style for an os mold
button was overridden using the class *z-button-os*.

```css
.z-button-os {
    color: #FFFFFF;
    font-weight: bold;
    /* omitted */
}
```

While in ZK 6.5, the button has 2 separate mold implementations (trendy
and os), now in ZK7 both molds share the same markup using the same CSS
class "z-button" (default mold). Here the new style override:

```css
.z-button {
    color: #FFFFFF;
    font-weight: bold;
    /* omitted */
}
```

## Brief Summary

Based on the above, when upgrading from ZK 6.5 to ZK 7.0, it is required
to modify the CSS class names (from z-component-mold to z-component) in
most situations. Check [ Tip 2 Appendix](#Tip_2_Appendix) for
the complete list of affected components.


# Tip 3: Component Zclass

Some components' zclass-es consist of several parts (separated by dashes
"-"), for instance, the zclass of the Window component with embedded
mode is "*z-window-embedded*" and the CSS class of its header part is
"*z-window-embedded-header*". All other modes have corresponding classes
following the pattern *z-window-**mode**-header*. In order to make it
easier to customize, we separate it into two CSS classes with "*zclass
modeclass*" pattern.

For example,

```html
<div class="z-window z-window-embedded">
    <div class="z-window-header"></div>
    <div class="z-window-content"></div>
</div>
```

Then, if you want to customize the content part of window for all modes,
simply override CSS class *z-window-content*.


## Upgrade sample

In this [ smalltalk](https://www.zkoss.org/wiki/Small_Talks/2011/December/Customize_Look_and_Feel_of_ZK_Components_Using_CSS3)
we showed how to customize window component's close icon for all modes
as follows:

```css
.z-window-embedded-close,
.z-window-overlapped-close,
.z-window-popup-close,
.z-window-highlighted-close,
.z-window-modal-close {
    background: url('../img/wnd-icon.png') no-repeat scroll 0 0;
}
.z-window-embedded-close-over,
.z-window-overlapped-close-over,
.z-window-popup-close-over,
.z-window-highlighted-close-over,
.z-window-modal-close-over {
    background: url('../img/wnd-icon.png') no-repeat scroll 0 -16px;
}
```

In ZK 7, you can remove *-mode* part for all modes.

```css
.z-window-close {
    background: url('../img/wnd-icon.png') no-repeat scroll 0 0;
}
.z-window-close:hover {
    background: url('../img/wnd-icon.png') no-repeat scroll 0 -16px;
}
```

## Brief Summary

To adapt this change for ZK 7, check [ Tip 3 Appendix](#Tip_3_Appendix) for the complete list of related
changes eliminating CSS classes.


# Tip 4: DOM Structure

In ZK 6.5, several components use a 3 x 3 grid structure(see image
bellow) to achieve the rounded corner style. In ZK 7, we applied CSS 3,
therefore, the complex 3 x 3 grid structure is no longer needed.

![](images/Button2.png)


## Upgrade Sample

In this
[smalltalk](https://www.zkoss.org/wiki/Small_Talks/2011/December/Customize_Look_and_Feel_of_ZK_Components_Using_CSS3)
we showed how to customize the **window** component using CSS 3 based on
3 x 3 grid structure. Originally we had to override several CSS classes
(z-component-**tl**, z-component-**tm**, z-component-**tr**, and etc.)
to add rounded corners to the window head (line 9).

```css
.z-window-embedded-tl,
.z-window-embedded-tm,
.z-window-embedded-tr {
    /* omitted */
}
.z-window-embedded-hl,
.z-window-embedded-hm,
.z-window-embedded-hr {
    border-radius: 4px 4px 0 0;
    /* omitted */
}
.z-window-embedded-cl,
.z-window-embedded-cm,
.z-window-embedded-cr {
    /* omitted */
}
.z-window-embedded-bl,
.z-window-embedded-bm,
.z-window-embedded-br {
    /* omitted */
}
```

In ZK 7, the DOM structure of the window component is simplified.

```html
<div class="z-window">
    <div class="z-window-header"></div>
    <div class="z-window-content"></div>
</div>
```

Therefore, it is sufficient to just override the *z-window* class, to
add rounded corners:

```css
.z-window {
    border-radius: 4px 4px 0 0;
    /* omitted */
}
```

## Brief Summary

To check the style after we removed 3 x 3 grid structure in ZK 7, we
recommend you to use developer tools provided by browsers such as
Firebug for FireFox, Developer Tools for Chrome to check new DOM
structure first, then move your existing customization style into the
new CSS class. Check [ Tip 4 Appendix](#Tip_4_Appendix) for
the complete list that removes the 3 x 3 (or 3x1) grid structure..


# Tip 5: CSS Class Naming

In ZK 6.5, we use abbreviations for CSS class names which can be hard to
understand what it represents sometimes. Hence, to make it more semantic
in ZK 7, we use the full-naming pattern on CSS class names. For example,

| 6.5 | 7.0 |
| --- | --- |
| z-component-**ver** | z-component-**vertical** |
| z-component-**cnt** | z-component-**content** |
| z-component-**seld** | z-component-**selected** |
| z-component**-over** | z-component**:hover** |
| z-component**-disd** | z-component**[disabled]** |

Here we can see not only abbreviations have been changed to full names,
but we also use CSS selectors like**:hover** and the attribute selector
like **\[disabled\]** to make it more intuitive.

## Upgrade Sample

In this [smalltalk](https://www.zkoss.org/wiki/Small_Talks/2012/March/Customize_Look_and_Feel_of_ZK_Components_Using_CSS3_-_Part_2)
we demonstrate how to customize comboitem style when it is selected by
overriding CSS class *z-comboitem-seld* in ZK 6.5 as follows:

```css
.z-combobox-pp .z-comboitem-over,
.z-combobox-pp .z-comboitem-seld {
    color: #2BCCDA;
    background-color: #000000;
}
```

In ZK 7, the CSS class name is change to full name
*z-comboitem-selected*, therefore, you have to modify it as follows:

```css
.z-combobox-popup .z-comboitem:hover,
.z-combobox-popup .z-comboitem-selected {
    color: #2BCCDA;
    background-color: #000000;
}
```

## Brief Summary

In most situations, to upgrade to ZK 7.0 from ZK 6.5 based on these
changes is to modify CSS class names with full naming patterns (from
z-component-*shortname* to z-component-*fullname*). Check [ Tip 5 Appendix](#Tip_5_Appendix) for the complete list of ZK 7 CSS
class naming rule.


# Tip 6: Image Icons and Font Icons

In order to reduce page loading time, we use font icons in ZK 7 to
replace original image icons. There are a lot of web icon fonts on the
market, here we integrate in ZK 7 with [Font Awesome 4.0.1](http://fortawesome.github.io/Font-Awesome/). Thus, it is easy to
use font icons in ZK application by simply replace prefix **fa** to
**z-icon**, for example, *z-icon-caret-up* represents a [triangle arrow up](http://fortawesome.github.io/Font-Awesome/icon/caret-up/) font icon.


## Upgrade Sample

In this [ smalltalk](https://www.zkoss.org/wiki/Small_Talks/2012/March/Customize_Look_and_Feel_of_ZK_Components_Using_CSS3_-_Part_2),
we customize combobox button with custom image as follows:

```css
.z-combobox-btn {
    background: url('../img/combo-btn.png') no-repeat;
}
```

However, after upgrade to ZK 7, you can see not only the image showed,
the font icon that ZK 7 uses by default also shows up. To disable the
font icon you can override the font icon CSS class as follows:

```css
.z-combobox-button {
    background: url('../img/combo-btn.png') no-repeat;
}
.z-combobox-icon {
    display: none;
}
```

or

```css
.z-combobox-button {
    background: url('../img/combo-btn.png') no-repeat;
}
.z-combobox-icon.z-icon-caret-down:before {
    content: '';
}
```


# Tip 7: Scrollbar

Since ZK 7, we provide custom scrollbar for Grid, Listbox and Tree
component by default, which means you can also customize scrollbar
style. Here we will demonstrate how to style it. Or, if you do not wish
to custom your scrollbar, we will also demonstrate how to disable it and
use browser default scrollbar instead.


## Customize Scrollbar Style

The custom scrollbar consists of two buttons to click for scrolling
left/right, an indicator to represent current scroll position and a rail
to slide indicator. Therefore, we need to override CSS class as follows:

```css
/* Two buttons to click for scrolling left/right */
.z-scrollbar-left, .z-scrollbar-right {
    background: #FFFFFF;
    color: #3AA4C3;
}
.z-scrollbar-left:hover, .z-scrollbar-right:hover {
    background: #3AA4C3;
    color: #FFFFFF;
}
/* An indicator to represent current scroll position */
.z-scrollbar-horizontal .z-scrollbar-indicator {
    background: #3AA4C3;
    border: none;
    top: 2px;
}
/* A rail to slide indicator */
.z-scrollbar-horizontal .z-scrollbar-rail {
    background: #FFFFFF;
}
/* remove font icon */
.z-scrollbar-horizontal .z-scrollbar-icon {
    display: none;
}
```

You can check the customized result.

| ![](images/ZK7_scrollbar_1.png) | ZK 7 default scrollbar style |
| ![](images/ZK7_scrollbar_2.png) | Customized scrollbar style |

## Use Browser Default scrollbar

To disable custom scrollbar provided by ZK 7. Add the library property
called *org.zkoss.zul.nativebar* in zk.xml and set it to true.

```xml
<library-property>
    <name>org.zkoss.zul.nativebar</name>
    <value>true</value>
</library-property>
```

**Note**: the value of org.zkoss.zul.nativebar is true by default (since
7.0.2)

# Tip 2 Appendix

| Component | ZK 6.5 mold | ZK 7 mold |
| --- | --- | --- |
| Button | os<br/>trendy | default |
| Textbox<br/>Intbox<br/>Decimalbox<br/>Longbox<br/>Doublebox<br/>Combobox<br/>Bandbox<br/>Datebox<br/>Timebox<br/>Spinner<br/>Doublespinner | default<br/>rounded | default |
| Splitter | default<br/>os | default |
| Tabbox | accordion<br/>accordion-lite | accordion |

# Tip 2 Appendix

| Component | ZK 6.5 mold | ZK 7 mold |
| --- | --- | --- |
| Button | os<br/>trendy | default |
| Textbox<br/>Intbox<br/>Decimalbox<br/>Longbox<br/>Doublebox<br/>Combobox<br/>Bandbox<br/>Datebox<br/>Timebox<br/>Spinner<br/>Doublespinner | default<br/>rounded | default |
| Splitter | default<br/>os | default |
| Tabbox | accordion<br/>accordion-lite | accordion |

# Tip 3 Appendix

| Component | ZK 6.5 sample | ZK 7 sample |
| --- | --- | --- |
| Splitter | z-splitter-hor<br/>z-splitter-ver | z-splitter z-splitter-horizontal<br/>z-splitter z-splitter-vertical |
| Slider | z-slider-hor<br/>z-slider-ver | z-slider z-slider-horizontal<br/>z-slider z-slider-vertical |
| Menubar | z-menubar-hor<br/>z-menubar-ver | z-menubar z-menubar-horizontal<br/>z-menubar z-menubar-vertical |
| Toolbar | z-toolbar-tabs | z-toolbar z-toolbar-tabs |
| Combobutton | z-combobutton-toolbar | z-combobutton z-combobutton-toolbar |
| Separator | z-separator-horizontal<br/>z-separator-vertical | z-separator z-separator-horizontal<br/>z-separator z-separator-vertical |
| Groupbox | z-groupbox-3d | z-groupbox z-groupbox-3d |
| Tabbox | z-tabbox<br/><br/>z-tabbox-ver<br/><br/>z-tabbox-accordion | z-tabbox z-tabbox-top<br/>z-tabbox z-tabbox-bottom<br/>z-tabbox z-tabbox-left<br/>z-tabbox z-tabbox-right<br/>z-tabbox z-tabbox-accordion |
| Window | z-window-embedded<br/>z-window-modal<br/>z-window-highlighted<br/>z-window-overlapped<br/>z-window-popup | z-window z-window-embedded<br/>z-window z-window-modal<br/>z-window z-window-highlighted<br/>z-window z-window-overlapped<br/>z-window z-window-popup |

# Tip 2 Appendix

| Component | ZK 6.5 mold | ZK 7 mold |
| --- | --- | --- |
| Button | os<br/>trendy | default |
| Textbox<br/>Intbox<br/>Decimalbox<br/>Longbox<br/>Doublebox<br/>Combobox<br/>Bandbox<br/>Datebox<br/>Timebox<br/>Spinner<br/>Doublespinner | default<br/>rounded | default |
| Splitter | default<br/>os | default |
| Tabbox | accordion<br/>accordion-lite | accordion |

# Tip 3 Appendix

| Component | ZK 6.5 sample | ZK 7 sample |
| --- | --- | --- |
| Splitter | z-splitter-hor<br/>z-splitter-ver | z-splitter z-splitter-horizontal<br/>z-splitter z-splitter-vertical |
| Slider | z-slider-hor<br/>z-slider-ver | z-slider z-slider-horizontal<br/>z-slider z-slider-vertical |
| Menubar | z-menubar-hor<br/>z-menubar-ver | z-menubar z-menubar-horizontal<br/>z-menubar z-menubar-vertical |
| Toolbar | z-toolbar-tabs | z-toolbar z-toolbar-tabs |
| Combobutton | z-combobutton-toolbar | z-combobutton z-combobutton-toolbar |
| Separator | z-separator-horizontal<br/>z-separator-vertical | z-separator z-separator-horizontal<br/>z-separator z-separator-vertical |
| Groupbox | z-groupbox-3d | z-groupbox z-groupbox-3d |
| Tabbox | z-tabbox<br/><br/>z-tabbox-ver<br/><br/>z-tabbox-accordion | z-tabbox z-tabbox-top<br/>z-tabbox z-tabbox-bottom<br/>z-tabbox z-tabbox-left<br/>z-tabbox z-tabbox-right<br/>z-tabbox z-tabbox-accordion |
| Window | z-window-embedded<br/>z-window-modal<br/>z-window-highlighted<br/>z-window-overlapped<br/>z-window-popup | z-window z-window-embedded<br/>z-window z-window-modal<br/>z-window z-window-highlighted<br/>z-window z-window-overlapped<br/>z-window z-window-popup |

# Tip 4 Appendix

| Component | ZK 6.5 DOM structure | ZK 7 DOM structure |
| --- | --- | --- |
| Button | Trendy mold<br/><br/>```html<br/>&lt;span class="z-button"&gt;<br/>    &lt;table&gt;<br/>        &lt;tr&gt;<br/>            &lt;td class="z-button-tl"&gt;<br/>                &lt;button class="z-button" /&gt;<br/>            &lt;td class="z-button-tm"&gt;&lt;/td&gt;<br/>            &lt;td class="z-button-tr"&gt;&lt;/td&gt;<br/>        &lt;/tr&gt;<br/>        &lt;tr&gt;<br/>            &lt;td class="z-button-cl"&gt;&lt;/td&gt;<br/>            &lt;td class="z-button-cm"&gt;&lt;/td&gt;<br/>            &lt;td class="z-button-cr"&gt;&lt;/td&gt;<br/>        &lt;/tr&gt;<br/>        &lt;tr&gt;<br/>            &lt;td class="z-button-bl"&gt;&lt;/td&gt;<br/>            &lt;td class="z-button-bm"&gt;&lt;/td&gt;<br/>            &lt;td class="z-button-br"&gt;&lt;/td&gt;<br/>        &lt;/tr&gt;<br/>    &lt;/table&gt;<br/>&lt;/span&gt;<br/>``` | ```html<br/>&lt;button class="z-button" /&gt;<br/>``` |
| Caption | ```html<br/>&lt;table class="z-caption"&gt;<br/>    &lt;tr&gt;<br/>        &lt;td class="z-caption-l"&gt;&lt;/td&gt;<br/>        &lt;td class="z-caption-r"&gt;&lt;/td&gt;<br/>    &lt;/tr&gt;<br/>&lt;/table&gt;<br/>``` | ```html<br/>&lt;div class="z-caption"&gt;<br/>    &lt;div class="z-caption-content"&gt;&lt;/div&gt;<br/>&lt;/div&gt;<br/>``` |
| Combobutton | ```html<br/>&lt;span class="z-combobutton"&gt;<br/>    &lt;table&gt;<br/>        &lt;tr&gt;<br/>            &lt;td class="z-combobutton-tl"&gt;<br/>                &lt;button class="z-combobutton" /&gt;<br/>            &lt;td class="z-combobutton-tm"&gt;&lt;/td&gt;<br/>            &lt;td class="z-combobutton-tr"&gt;&lt;/td&gt;<br/>        &lt;/tr&gt;<br/>        &lt;tr&gt;<br/>            &lt;td class="z-combobutton-cl"&gt;&lt;/td&gt;<br/>            &lt;td class="z-combobutton-cm"&gt;&lt;/td&gt;<br/>            &lt;td class="z-combobutton-cr"&gt;<br/>              &lt;div&gt;<br/>                &lt;div class="z-combobutton-btn-img" /&gt;<br/>              &lt;/div&gt;<br/>            &lt;/td&gt;<br/>        &lt;/tr&gt;<br/>        &lt;tr&gt;<br/>            &lt;td class="z-combobutton-bl"&gt;&lt;/td&gt;<br/>            &lt;td class="z-combobutton-bm"&gt;&lt;/td&gt;<br/>            &lt;td class="z-combobutton-br"&gt;&lt;/td&gt;<br/>        &lt;/tr&gt;<br/>    &lt;/table&gt;<br/>&lt;/span&gt;<br/>``` | ```html<br/>&lt;span class="z-combobutton"&gt;<br/>    &lt;span class="z-combobutton-content"&gt;<br/>        &lt;span class="z-combobutton-text" /&gt;<br/>        &lt;span class="z-combobutton-button"&gt;<br/>            &lt;i class="z-combobutton-icon" /&gt;<br/>        &lt;/span&gt;<br/>    &lt;/span&gt;<br/>&lt;/span&gt;<br/>``` |
| Textbox<br/>Intbox<br/>Decimalbox<br/>Longbox<br/>Doublebox | rounded mold<br/><br/>```html<br/>&lt;i class="z-component-rounded"&gt;<br/>    &lt;input class="z-component-rounded-inp" /&gt;<br/>    &lt;i class="z-component-rounded-right-edge" /&gt;<br/>&lt;/i&gt;<br/>``` | ```html<br/>&lt;input class="z-component" /&gt;<br/>``` |
| Groupbox | ```html<br/>&lt;div class="z-groupbox"&gt;<br/>    &lt;div class="z-groupbox-tl"&gt;<br/>        &lt;div class="z-groupbox-tr"&gt;&lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-groupbox-hl"&gt;<br/>        &lt;div class="z-groupbox-hr"&gt;<br/>            &lt;div class="z-groupbox-hm"&gt;<br/>                &lt;div class="z-groupbox-header"&gt;&lt;/div&gt;<br/>            &lt;/div&gt;<br/>        &lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-groupbox-cnt"&gt;&lt;/div&gt;<br/>&lt;/div&gt;<br/>``` | ```html<br/>&lt;div class="z-groupbox"&gt;<br/>    &lt;div class="z-groupbox-header"&gt;&lt;/div&gt;<br/>    &lt;div class="z-groupbox-content"&gt;&lt;/div&gt;<br/>&lt;/div&gt;<br/>``` |
| Panel | ```html<br/>&lt;div class="z-panel"&gt;<br/>    &lt;div class="z-panel-tl"&gt;<br/>        &lt;div class="z-panel-tr"&gt;&lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-panel-hl"&gt;<br/>        &lt;div class="z-panel-hr"&gt;<br/>            &lt;div class="z-panel-hm"&gt;<br/>                &lt;div class="z-panel-header"&gt;&lt;/div&gt;<br/>            &lt;/div&gt;<br/>        &lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-panel-body"&gt;<br/>        &lt;div class="z-panel-cl"&gt;<br/>            &lt;div class="z-panel-cr"&gt;<br/>                &lt;div class="z-panel-cm"&gt;<br/>                    &lt;div class="z-panelchildren"&gt;&lt;/div&gt;<br/>                &lt;/div&gt;<br/>            &lt;/div&gt;<br/>        &lt;/div&gt;<br/>        &lt;div class="z-panel-fl"&gt;<br/>            &lt;div class="z-panel-fr"&gt;<br/>                &lt;div class="z-panel-fm"&gt;&lt;/div&gt;<br/>            &lt;/div&gt;<br/>        &lt;/div&gt;<br/>        &lt;div class="z-panel-bl"&gt;<br/>            &lt;div class="z-panel-br"&gt;&lt;/div&gt;<br/>        &lt;/div&gt;<br/>    &lt;/div&gt;<br/>&lt;/div&gt;<br/>``` | ```html<br/>&lt;div class="z-panel"&gt;<br/>    &lt;div class="z-panel-head"&gt;<br/>        &lt;div class="z-panel-header"&gt;&lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-panel-body"&gt;<br/>        &lt;div class="z-panelchildren"&gt;&lt;/div&gt;<br/>    &lt;/div&gt;<br/>&lt;/div&gt;<br/>``` |
| Window | ```html<br/>&lt;div class="z-window"&gt;<br/>    &lt;div class="z-window-tl"&gt;<br/>        &lt;div class="z-window-tr"&gt;&lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-window-hl"&gt;<br/>        &lt;div class="z-window-hr"&gt;<br/>            &lt;div class="z-window-hm"&gt;<br/>                &lt;div class="z-window-header"&gt;&lt;/div&gt;<br/>            &lt;/div&gt;<br/>        &lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-window-cl"&gt;<br/>        &lt;div class="z-window-cr"&gt;<br/>            &lt;div class="z-window-cm"&gt;<br/>                &lt;div class="z-window-cnt"&gt;&lt;/div&gt;<br/>            &lt;/div&gt;<br/>        &lt;/div&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class="z-window-bl"&gt;<br/>        &lt;div class="z-window-br"&gt;&lt;/div&gt;<br/>    &lt;/div&gt;<br/>&lt;/div&gt;<br/>``` | ```html<br/>&lt;div class="z-window"&gt;<br/>    &lt;div class="z-window-header"&gt;&lt;/div&gt;<br/>    &lt;div class="z-window-content"&gt;&lt;/div&gt;<br/>&lt;/div&gt;<br/>``` |
| Tab | horizontal / vertical orient<br/><br/>```html<br/>&lt;li class="z-tab"&gt;<br/>    &lt;a class="z-tab-close"&gt;&lt;/a&gt;<br/>    &lt;div class="z-tab-hl"&gt;<br/>        &lt;div class="z-tab-hr"&gt;<br/>            &lt;div class="z-tab-hm"&gt;&lt;/div&gt;<br/>        &lt;/div&gt;<br/>    &lt;/div&gt;<br/>&lt;/li&gt;<br/>``` | ```html<br/>&lt;li class="z-tab"&gt;<br/>    &lt;a class="z-tab-content"&gt;<br/>        &lt;div class="z-tab-button"&gt;&lt;/div&gt;<br/>        &lt;span class="z-tab-text"&gt;&lt;/span&gt;<br/>    &lt;/a&gt;<br/>&lt;/li&gt;<br/>``` |

# Tip 5 Appendix

|  Category         |  ZK 6.5 class name | ZK 7 class name                                                      |
|---------------------|----------------------|----------------------------------------------------------------------|
| Layout Elements     |  -outer            | -outer                                                               |
|                     |  -body             | -body                                                                |
|                     |  -header           | -header                                                              |
|                     |  -inner            | -inner                                                               |
|                     |  **-cnt**          | -content                                                             |
|                     |  -footer           | -footer                                                              |
|                     |  -noheader         | -noheader                                                            |
|                     |  -noborder         | -noborder                                                            |
|                     |  **-nofooter**     | *deprecated*                                                         |
| Other Elements      |  -faker            | -faker                                                               |
|                     |  -text             | -text                                                                |
|                     |  **-inp**          | -input                                                               |
|                     |  **-sep**          | -separator                                                           |
|                     | -img                 | -image (for comoponent's API, such as Button.setImage())             |
|                     |                      | -icon (for comopnent's interaction, such as drop-down button on combobox) |
|                     |  **-pp**           | -popup                                                               |
|                     |  **-btn**          | -button                                                              |
| Switch Icons        |  -close            | -close                                                               |
|                     |  **-colps**        | -collapse                                                            |
|                     |  **-colpsd**       | -collapsed                                                           |
|                     |  **-exp**          | -expand                                                              |
|                     |  **-expd**         | -expanded                                                            |
| Resize Icons        |  **-max**          | -maximize                                                            |
|                     |  **-maxd**         | -maximized                                                           |
|                     |  **-min**          | -minimize                                                            |
|                     |  **-mind**         | *deprecated*                                                         |
| Split Icons         |  **-splt**         | -splitter                                                            |
|                     |  -ns               | -nosplitter                                                          |
| Orient and Position |  **-ver**          | -vertical                                                            |
|                     |  **-hor**          | -horizontal                                                          |
|                     |  -start            | -start                                                               |
|                     |  -center           | -center                                                              |
|                     |  -end              | -end                                                                 |
| Event Effect        |  **-clk**          | :active or -click                                                    |
|                     |  -focus            | :focus or -focus                                                     |
|                     |  **-over**         | :hover or -hover                                                     |
|                     |  -drag             | -drag                                                                |
|                     |  **-drop**         | *deprecated*                                                         |
|                     |  **-seld**         | -selected                                                            |
|                     |  **-ck**           | -checked                                                             |
|                     |  **-unck**         | -unchecked                                                           |
|                     |  **-disd**         | \[disabled\] or -disabled                                            |
|                     |  **-visi**         | :visited or -visited                                                 |
|                     |  **-hide**         | *deprecated*                                                         |
|                     |  -invalid          | -invalid                                                             |
|                     |  -readonly         | \[readonly\] or -readonly                                            |

- deprecated means it is never used in 7.0
