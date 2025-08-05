---
title: "Captcha"
---


- Demonstration: [Capcha](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Captcha](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Captcha.html)
- JavaScript API: [zul.wgt.Captcha](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Captcha.html)

- [Available in ZK PE and EE only](http://www.zkoss.org/product/edition.dsp)

# Employment/Purpose

A `captcha` component can generate a special distortion image, also
called a CAPTCHA (Completely Automated Public Turing test to tell
Computers and Humans Apart) image. Developers could set `height`and
`width`for dimension of captcha. By default, captcha render the image
with a randomly generated text, and developers can set `value`to assign
a purposive text.

# Example

![](/zk_component_ref/images/captcha.png)

```xml
 <vbox>
     <captcha id="cpa" length="5" width="200px" height="50px"/>
 </vbox>
```

# Supported Events

- Inherited Supported Events: [ Image]({{site.baseurl}}/zk_component_ref/image#Supported_Events)

# Supported Children

`*NONE`



# Troubleshooting

## Linux

Captcha depends on Java Swing that might not work under some version of
JVM. For the information to make it work under Linux, please refer to
[ZK Installation Guide: Linux]({{site.baseurl}}/zk_installation_guide/linux).



