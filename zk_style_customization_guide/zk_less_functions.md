# ZK DSP Functions

ZK provides many useful theme functions that can be used in [ DSP]({{site.baseurl}}/zk_dev_ref/supporting_utilities/dsp)
files. Here we will introduce these functions that are used for CSS
style.

## Core Functions

Core functions are defined in
[core.dsp.tld](http://github.com/zkoss/zk/blob/master/zweb/src/archive/web/WEB-INF/tld/web/core.dsp.tld).
Here we will only introduce functions that are related to CSS style. To
use these functions in a DSP page, declare tag library with it's prefix
as follows:

```html
<%-- *.css.dsp file --%>
<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>
```

| Function | Usage |
| --- | --- |
| encodeURL | ```html<%-- Background image from ZK JAR file --%>.myDiv {    background: ${c:encodeURL('~./path/to/image.png')};}``` |
| encodeThemeURL | ```html<%-- Background image from Theme JAR file --%>.myDiv {    background: ${c:encodeThemeURL('~./path/to/image.png')};}``` |
| if | ```html<%-- If Statement for Specific Browser --%>.myDiv {    background: rgba(200, 200, 200, 0.8);    <c:if test="${zk.ie <= 8}">        <%-- ie8 doesn't support rgba --%>        background: rgb(200, 200, 200);     </c:if>}``` |

## Theme Functions

Theme functions are defined in
[theme.dsp.tld](http://github.com/zkoss/zk/blob/master/zweb/src/archive/web/WEB-INF/tld/web/theme.dsp.tld).These
functions are focused on CSS 3 supported styles. To use these functions
in a DSP page, declare tag library with it's prefix as follows:

```html
<%-- *.css.dsp file --%>
<%@ taglib uri="http://www.zkoss.org/dsp/web/theme" prefix="t" %>
```

| Function | Usage |
| --- | --- |
| gradient | ```html<%-- Gradient Background --%>.myDiv {    ${t:gradient('ver', '#FFFFFF 0%; #EEEEEE 100%')};}``` |
| box<br />box2<br />box3 | ```html<%-- Flexible Box Layout Module --%>.myDiv1 {    ${t:box('box-flex', '1')};}}.myDiv2 {    ${t:box2('box-flex', '1', 'box-orient', 'horizontal')};}}.myDiv3 {    ${t:box3('box-flex', '1', 'box-orient', 'horizontal', 'box-pack', 'center')};}``` |
| boxShadow | ```html<%-- Box Shadows --%>.myDiv {    ${t:boxShadow('1px 1px 0 rgba(0, 0, 0, 0.2)')};}``` |
| borderRadius | ```html<%-- Rounded Corners --%>.myDiv {    ${t:borderRadius('5px')};}``` |
| transform | ```html<%-- Transform --%>.myDiv {    ${t:transform('translate3d(0, 0, 0)')};}``` |
| applyCSS3 | ```html<%-- Apply all the other CSS 3 styles --%>.myDiv {    ${t:applyCSS3('transition-property', 'opacity')};    ${t:applyCSS3('transition-duration', '350ms')}}``` |

# ZK LESS Function

Since ZK LESS engine compile LESS files into DSP pages, you can use the
DSP functions mentioned above inside a LESS file. These functions are
already defined to ZK LESS mixins. To use ZK LESS mixins, simply import
***\_zkmixins.less*** in your \*.less file.

For example,

```html
@import "~./zul/less/_zkmixins.less";

/* omitted */
```

Here we define mixins according to [ Core Functions](#Core_Functions) and [ Theme Functions](#Theme_Functions) and extra useful mixins:

## Core Functions in Mixins

| Function | Usage and Output |
| --- | --- |
| Background Image | **Usage**<br />```html.z-component1 {    .encodeURL(background-image, '~./path/to/image1.png');}.z-component2 {    .encodeThemeURL(background-image, '~./path/to/image2.png');}.z-component3 {    .encodeThemeURL(background, '~./path/to/image3.png', center center);}```<br />**Output**<br />```html.z-component1 {    background-image: url(${c:encodeURL('~./path/to/image.png')});}.z-component2 {    background-image: url(${c:encodeThemeURL('~./path/to/image.png')});}.z-component3 {    background: url(${c:encodeThemeURL('~./path/to/image.png')}) center center;}``` |

## Theme Functions in Mixins

| Function | Usage and Output |
| --- | --- |
| Gradient Background | **Usage**<br />```html.z-component1 {    .gradient('ver', '#333333 0%; #555555 50%; #666666 100%');}.z-component2 {    .horGradient(#333333, #666666);}.z-component3 {    .verGradient(#333333, #666666);}.ie8 .z-component4 {    .gradientFallback(#333333, #666666);}.z-component1:hover {    .resetGradient();    background: #777777;}```<br />**Output**<br />```css.z-component1 {    ${t:gradient('ver', '#333333 0%; #555555 50%; #666666 100%');}.z-component2 {    ${t:gradient('hor', '#333333 0% #666666 100%');}.z-component3 {    ${t:gradient('ver', '#333333 0% #666666 100%');}.ie8 .z-component4 {    /* average of #333333 and #666666 */    background: #4d4d4d;}.z-component1:hover {    background: none;    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);    background: #777777;}``` |
| Rounded Corner | **Usage**<br />```html.z-component1 {    .borderRadius(3px);}.z-component2 {    .topBorderRadius(3px);}.z-component3 {    .rightBorderRadius(3px);}.z-component4 {    .bottomBorderRadius(3px);}.z-component5 {    .leftBorderRadius(3px);}```<br />**Output**<br />```css.z-component1 {    ${t:borderRadius('3px 3px 3px 3px');}.z-component2 {    ${t:borderRadius('3px 3px 0 0');}.z-component3 {    ${t:borderRadius('0 3px 3px 0');}.z-component4 {    ${t:borderRadius('0 0 3px 3px');}.z-component5 {    ${t:borderRadius('3px 0 0 3px');}``` |
| Box Shadow | **Usage**<br />```html.z-component {    .boxShadow(inset 1px 1px 0 #222222);}```<br />**Output**<br />```css.z-component {    ${t:boxShadow('inset 1px 1px 0 #222222');}``` |

## Other Useful Mixins

| Function | Usage and Output |
| --- | --- |
| Element Size | **Usage**<br />```html.z-component1 {    .size(16px, 16px);}.z-component2 {    .displaySize(inline-block, 16px, 16px);}```<br />**Output**<br />```css.z-component1 {    width:16px;    height: 16px;}.z-component2 {    display: inline-block;    width:16px;    height: 16px;}``` |
| Font Style | **Usage**<br />```html@fontFamily: Arial, Sans-serif;.z-component-text {    .fontStyle(@fontFamily, 14px, 600, #555555);    font-style: italic;}.z-component-iconfont {    .iconFontStyle(12px, #ACACAC);}```<br />**Output**<br />```css.z-component-text {    font-family: Arial, Sans-serif;    font-size: 14px;    font-weight: 600;    font-style: normal;    color: #555555;    font-style: italic; /* override */}.z-component-iconfont {    font-size: 12px;    color: #ACACAC;}``` |
| Opacity | **Usage**<br />```html.z-component1 {    .opacity(1);}.z-component2 {    .opacity(0.6);}```<br />**Output**<br />```css.z-component1 {    opacity: 1;    filter: alpha(opacity=100);}.z-component2 {    opacity: 0.6;    filter: alpha(opacity=60);}``` |


