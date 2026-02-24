# UI Template Injection
{% include supported-since.html version="8.0.0" %}
In ZK, `<template>` is the recommended way to reuse a view pattern composed by a group of components. By defining components within a `<template>`, you can easily reuse them across different parts of your application using the `<apply>` shadow element.

The process typically involves two steps:
1. **Define a template**: Specify the UI structure.
2. **Apply a template**: Inject the template into the component tree.

```
+-------------------------+          +-------------------+
|  Define Template        | ----->   |  Apply Template   |
| (No components Created) |          | (Creates UI)      |
+-------------------------+          +-------------------+
```

## Define a Template

You can define a `<template>` inside any component. A template remains dormant and does not create any components until it is explicitly applied.

### Inline Template
Define the UI components directly within the tag:
```xml
<div>
    <template name="layout">
        <label value="This is an inline template"/>
    </template>
</div>
```

### External Template
Reference an external ZUL file using the `src` attribute:
```xml
<div>
    <template name="layout" src="/mytemplate.zul"/>
</div>
```

## Apply a Template

When you apply a template, ZK creates the components defined inside it and inserts them at the location of the `<apply>` tag.

### By Name
Apply a template defined within the current component scope:
```xml
<apply template="layout"/>
```

### By URI
Apply an external ZUL file directly:
```xml
<apply templateURI="/chapter1/banner.zul"/>
```

## Passing Parameters

You can pass data to templates to make them dynamic and reusable for different data sets.

### Dynamic Properties
Add attributes directly to the `<apply>` tag. These become available as variables (or within the `arg` map) inside the template.
```xml
<apply template="userProfile" username="John Doe" role="Admin"/>
```

### MVVM Reference Passing
In MVVM, use `@ref` to pass object references efficiently without triggering full data loading until needed in the template.
```xml
<apply template="iterate" menuItems="@ref(vm.menuHierarchy)"/>
```

### Query Strings for URI
When using `templateURI`, you can pass parameters via a query string. Note that parameters passed this way are always **Strings**.
```xml
<apply templateURI="/mytemplate.zul?mode=edit&id=123"/>
```

## Recursive Templates

Recursive template application is a powerful pattern for rendering hierarchical data like menus or trees.

```xml
<template name="menu">
    <nav label="@load(menuItem.label)" iconSclass="@load(menuItem.iconSclass)">
        <!-- Apply the same 'iterate' template for sub-menus -->
        <apply template="iterate" menuItems="@ref(menuItem.subMenus)"/>
    </nav>
</template>

<template name="iterate">
    <forEach items="@load(menuItems)">
        <apply template="@load(empty each.subMenus ? 'menuitem' : 'menu')" menuItem="@ref(each)"/>
    </forEach>
</template>

<template name="menuitem">
    <navitem label="@load(menuItem.label)" />
</template>
```

## Programmatic Usage: ShadowTemplate

For component developers working in Java, ZK provides the `ShadowTemplate` class (since 8.0.0) to apply templates programmatically.

```java
ShadowTemplate st = new ShadowTemplate(true); // true for 'autodrop'
st.setTemplate("myTemplate");
st.setDynamicProperty("data", myData);
st.apply(hostComponent);
```

### Autodrop Feature
- **`autodrop = true`**: Automatically detaches previously rendered children when the template or host changes. This is the behavior most consistent with the `<apply>` tag.
- **`autodrop = false`**: Rendered children remain even if the `ShadowTemplate` is detached or changed.

## Performance Considerations

Using shadow elements (like `<apply>` or `<forEach>`) inside templates that are rendered frequently (e.g., inside a `listbox` model template) can incur a performance cost.

```xml
<listbox model="@load(vm.listModel)">
    <template name="model">
        <!-- Warning: High rendering cost if listModel is large -->
        <apply template="rowTemplate" />
    </template>
</listbox>
```

**Why?**
Shadow elements must sync their position in the component tree relative to siblings. In large collections, adding/removing shadow elements causes recalculations for all siblings at the same level.

**Recommendation:**
If you need dynamic component selection in a large list, use [Dynamic Templates](../syntax/template) or [Children Binding](../data_binding/children_binding) instead of nested `<apply>` tags.