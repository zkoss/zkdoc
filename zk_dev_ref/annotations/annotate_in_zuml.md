Annotations can be applied to the declarations of components and
properties in ZUML pages.

# Annotate Properties

To annotate a property, you could specify an annotation expression as
the value of the property. In other words, if the value of the property
is an annotation expression, it is considered as an annotation for the
property, rather than a value to be assigned.

The format of an annotation expression:

**`@`***`annotation-name`*` `**`()`**  
**`@`***`annotation-name`*` `**`(`**` `*`attr-name1`*` `**`=`**` `*`attr-value1`***`,`**` `*`attr-name2`*` `**`=`**` `*`attr-value2`*` `**`)`**  
**`@`***`annotation-name`*` `**`(`**` `*`attr-name1`*` `**`=`**` `**`{`**` `*`attr-value1-1`***`,`**` `*`attr-value1-2`*` `**`},`**` `*`attr-name2`*` `**`=`**` `*`attr-value2`*` `**`)`**

As shown, an annotation consists of an annotation name and any number of
attributes, and an attribute consists of an attribute name and an
attribute value. The name of an annotation must start with a letter
('a' - 'z' or 'A' - 'Z'), an underscore ('\_'), or a dollar sign ('\$').

If an attribute has multiple values, these values have to be enclosed
with the curly braces (as shown in the third format).

For example,

```xml
<listitem label="@bind(datasource='author',value='selected')"/>
```

where an annotation called `bind` is annotated to the `label` property,
and the `bind` annotation has two attributes: `datasource` and `value`.

If the attribute name is not specified, the name is assumed to be
`value`. For example, the following two statements are equivalent:

```xml
<textbox value="@bind(vm.p1.firstName)"/>
<textbox value="@bind(value=vm.p1.firstName)"/>
```

Here is a more complex example.

```xml
<textbox value="@save(vm.person.firstName,  before={'cmd1', 'cmd2'})"/>
```

where it annotates the `value` property with an annotation named `save`,
and the annotation has two attributes: `value` and `before`. The value
of the `before` attribute is a two-element array: `'cmd1'` and `'cmd2'`.
Notice that the quotations, `'` and `"`, will be preserved, so they will
be retrieved exactly the same as they are specified in the ZUML
document.

To annotate the same property with multiple annotations, you could
specify them one-by-one and separate them with a space, as shown below.

```xml
<textbox value="@bind(vm.value1) @validator('validator1')" errorMessage="@bind(vm.lastMessage1)" />
```

In addition, you could annotate with multiple annotations that have the
same name. For example,

```xml
<textbox value="@bind(vm.first) @bind(vm.second)"/>
```

where two annotations are annotated to the `value` property.

# Annotate Components

To annotate a component, you could specify an annotation expression in a
specific attribute called `self` as shown below.

```xml
<label self="@title(value='Hello World')"/>
```

where `self` is a keyword to denote the annotation which is used to
annotate the component declaration, rather than any property.

# The annotation Namespace

ZK Loader detects the annotation automatically. However, it may not be
what you expect. Here we discuss how to resolve these conflicts.

## Specify both value and annotation

If you'd like to specify both the value and the annotations of a given
property, you could specify a namespace called annotation to distinguish
them. For example,

```xml
<textbox value="a property's value" a:value="@save(vm.user)" xmlns:a="annotation"/>
```

Then, the textbox's value property will be assigned with a value,
`"a property's value"`, and an annotation, `@save(vm.user)`.

## Specify a value that looks like an annotation

If the value of a property looks like an annotation, you could specify a
namespace other than annotation to tell ZK Loader not to interpret it as
an annotation. For example,

```xml
<textbox u:value="@value()" xmlns:u="zul"/>
```

Then, `@value()` will be considered as a value rather than an
annotation, and assigned to the textbox's value property directly.

# Version History

| Version | Date          | Content                                                                                                                                                        |
|---------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 6.0.0   | December 2011 | The new syntax was introduced. For ZK 5's syntax, please refer to ZK 5's Developer's Reference. Though not recommended, it is OK to use ZK 5's syntax in ZK 6. |
