---
title: "The Format of Properties Files"
---



In this section, we will discuss the format of a properties file, such
as `zk-label.properties`.

A properties file is a simple text file. The file contains a list of
`key=value` pairs, such as

```properties
# This is the default LabelsBundle.properties file
s1=computer
s2=disk
s3=monitor
s4=keyboard
```

The default encoding of a properties file is assumed to be **UTF-8**. If
you want to use a different encoding, please refer to [the Use Encoding Other Than UTF-8 section](#Use_Encoding_Other_Than_UTF-8).

A properties file is usually used to contain the internationalization
labels of an application, but technically you could use it in any
situation you'd like[^1].

> ------------------------------------------------------------------------
>
> <references/>

# Specify a Value with Multiple Lines

By default, a property is a text specified right after the equal sign.
If the property's value has multiple lines, you could use the following
format:

```properties
multilines={
line 1
line 2
}
```

Notice that the curly braces must be followed by a line break
immediately, and the right brace (`}`) must be the only character in the
line.

Then you should put the value in a multiple-line label:

```xml
<label multiline="true" value="${labels.multilines}"/>
```

## Render Multiple Lines

Alternatively, you can write a value with `<br>`:

```properties
lines=1st line <br> 2nd line
```

Then render it in an HTML `span`

```xml
<zk xmlns:h="native">
    <h:span>${labels.lines}</h:span>
</zk>
```

# Specify Segmented Keys

Since all internationalization labels are stored in the same scope, it
is common to separate them by naming the key with dots (**.**) like the
Java package name. For the sake of description, we call them segmented
keys. For example,

```properties
order.fruit.name = Orange
order.fruit.description = A common fruit
```

It can be simplified by use of the following syntax:

```properties
order.fruit.  {
name = Orange
description = A common fruit
}
```

As shown, the segmented key could be specified by specifying the prefix
and a following right brace (**{**).

The segmented key could be accessed in two ways.

First, with an implicit object called
[labels](/zuml_ref/labels):

```xml
<textbox value="${labels.order.fruit.name}"/>
```

Second, with an EL function called
[l](/zuml_ref/l)
[l2](/zuml_ref/l2):

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<label value="${c:l('order.fruit.name')}">
```

## Under the hood

The `labels` object is actually the map returned by
[org.zkoss.util.resource.Labels#getSegmentedLabels()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/resource/Labels.html#getSegmentedLabels()).
Furthermore, if the key of a property contains dots (`.`), i.e.,
segmented, all properties with the same prefix are grouped as another
map. For example, `${labels.order}` (i.e.,
`Labels.getSegmentedLables().get("order")`) will return a map containing
an entry (`fruit`) in the above example.

# Specify a Comment

You could put a comment line by starting with the sharp sign (**\#**),
such as

```properties
#This is a comment line that will be ignored when loaded
```

# Use EL Expressions

EL expressions are allowed for a property's value. For example, you
could reference a property's value in another property, such as

```properties
first=the first label
second=come after ${first} 
```

Segmented keys are also allowed:

```properties
group1.first=the first group
group2.second=come after ${group1.first} 
```

In addition to referencing another property, you could reference any
implicit object specified in [ZUML Reference: Implicit Objects](/zuml_ref/implicit_objects__predefinedvariables_) if
it is part of an HTTP request (excluding component/page).

For example,
[param](/zuml_ref/param)
references to a request's parameter:

```properties
message=Thank ${param.user} for using
```

> ------------------------------------------------------------------------
>
> <references/>

# Use Encoding Other Than UTF-8

By default, the encoding of properties files is assumed to be `UTF-8`.
If you prefer another encoding, please specify it in a library property
called `org.zkoss.util.label.web.charset`. It also means all properties
files must be encoded in the same character set.

For more information, please refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/org_zkoss_util_label_web_charset).

# Version History

| Version | Date     | Content                                                                                                                      |
|---------|----------|------------------------------------------------------------------------------------------------------------------------------|
| 5.0.7   | Mar 2011 | labels implicit object was introduced to access properties without declaring taglib. Also allows label keys of a.b.c format. |

[^1]: If it is used for internationalization labels, it will be loaded
    automatically. If you want to use it in other situations, you have
    to invoke
    [org.zkoss.util.Maps#load(java.util.Map, java.io.InputStream, boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Maps.html#load(java.util.Map, java.io.InputStream, boolean))
    or similar to load it manually.
