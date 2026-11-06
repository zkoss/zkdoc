# &lt;apply>
# Syntax

```xml
<apply templateURI="..." />
```

```xml
<apply template="template1" arg="value">
	<template name="template1">
	    ...
	    <label value="@load(arg)" />
	</template>
</apply>
```

# Description

**Purpose:**

 The apply tag allows you to choose which `<template>` to be
 applied. You specify the template's name using the **template** attribute or the template's URI using the **templateURI** attribute.

 There are two ways to pass parameters to the applied shadow:
 First, you can use an additional attribute in ZUL, like:
 `<apply templateURI="/WEB-INF/mypage" arg="something" />`

 Second, you can use the query string:
 `<apply templateURI="/WEB-INF/mypage?arg=something" />`

 With the query string, you can pass only the String values.
 The parameter can be accessed with the <tt>arg</tt> variable in EL expressions.

# Example

```xml
<apply templateURI="@load(vm.templateURI)"/>
```

```xml
<apply template="@load(vm.template)" arg="@ref(vm.xxx)">
	<template>Default</template>
	<template name="a">
	    <label value="@load(arg)" />
	</template>
	<template name="b">...</template>
</apply>
```

# Re-creation

An `<apply>` tag re-creates its template when one of its properties is set again. ZK removes the components created by the previous application and creates them again. Any state held by those components, such as the text typed into a `<textbox>`, is lost.

These changes re-create the template:

- `template` or `templateURI` is set to a different value. Setting the same value again does not re-create it.
- A dynamic property is set, such as an attribute bound with `@load`. The template is re-created even when the new value equals the old one.

```xml
<apply template="editor" heading="@load(vm.item.title)"/>
<template name="editor">
    <hlayout>
        <label value="@load(heading)"/>
        <!-- Text typed here is lost each time vm.item.title is reloaded -->
        <textbox placeholder="Type here"/>
    </hlayout>
</template>
```

Keep stateful components outside the template, or pass the dynamic properties with `@ref`. See [UI Template Injection](../shadow_elements/ui_template_injection) for details and the runnable example [applyRecreation.zul](https://github.com/zkoss/zkbooks/blob/master/mvvmreference/src/main/webapp/shadow/applyRecreation.zul).
