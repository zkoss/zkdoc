---
title: "IOS"
---

Here is the notes to set up the environment of iOS.

# Columns Menu

Several components, such as [Columns Menu]({{site.baseurl}}/zk_component_ref/grid#Columns_Menu), will
adjust the position of popup to make sure it is on the left side of the
right edge (so that it is totally visible). On the other hand, iOS
Safari assumes the width to be 980px by default. Thus, if your web page
is designed to have a different width, the calculation might be wrong.
To solve this issue, you could specify the width in a meta tag called
`viewport` as follows:

```xml
<meta name="viewport" content="width=1190" >
```

For more information, please refer to [Safari Developer Library](http://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html#//apple_ref/doc/uid/TP40006509-SW24).


![](images/install_ios_viewpoint.jpg)



# onClick Event

In IOS device (ipad/iphone) you have to specify the following CSS
(**cursor:pointer**) to make it work with onClick event.

```xml
<component style="cursor:pointer">
```


