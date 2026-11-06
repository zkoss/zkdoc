# UI Template Injection
{% include supported-since.html version="8.0.0" %}
In ZK, `<template>` is the recommended way to reuse a view pattern composed by a group of components. By defining components within a `<template>`, you can easily reuse them across different parts of your application using the `<apply>` shadow element.

The process typically involves two steps:
1. **Define a template**: Specify the UI structure.
2. **Apply a template**: Inject the template into the component tree.

```
+-------------------------+          +-------------------+
|  Define Template        | ----->   |  Apply Template   |
| (No components created) |          | (Creates UI)      |
+-------------------------+          +-------------------+
```

## Define a Template

You can define a `<template>` inside any component. A template remains dormant and does not create any components until it is applied.

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

**Re-creation:** Setting a dynamic property re-creates the whole template, even when the value stays the same. In MVVM, a `@load` on a dynamic property runs again whenever a notification covers its expression. For example, with `foo="@load(vm.item.foo)"`, notifying `item` reloads `foo` and re-creates the template, even if `foo` did not change. Passing a value with `@ref` avoids re-creation while `templateURI` stays the same. However, `${}` EL inside the template is not refreshed when the referenced value changes, so use `@load` inside the template for values that must update.

**Keep stateful components outside the template:** A component that holds state, such as a `<textbox>` with typed text or an `<iframe>`, loses that state when the template is re-created. For example, the text typed into a `<textbox>` inside a template with `heading="@load(vm.item.title)"` is lost after a command that only calls `@NotifyChange("item")`, because the notification reloads `vm.item.title`. Place such a component beside the `<apply>` tag instead:

```xml
<hlayout>
    <apply template="header" heading="@load(vm.item.title)"/>
    <textbox placeholder="Type here"/>
</hlayout>
```

With `@ref` instead of `@load`, the template is not re-created, so a `<textbox>` inside it keeps its text.

`<if>` re-creates its body only when the value of `test` changes, so a `test` that stays `true` does not re-create its content.

The runnable example [applyRecreation.zul](https://github.com/zkoss/zkbooks/blob/master/mvvmreference/src/main/webapp/shadow/applyRecreation.zul) shows these cases. Its ViewModel is [ApplyRecreationVM.java](https://github.com/zkoss/zkbooks/blob/master/mvvmreference/src/main/java/org/zkoss/mvvm/shadow/ApplyRecreationVM.java).

### Reference Binding Passing
In MVVM, use `@ref` to pass object references efficiently without triggering full data loading until needed in the template.

```xml
<apply template="iterate" menuItems="@ref(vm.menuHierarchy)"/>
```

### Query Strings for URI
When using `templateURI`, you can pass parameters via a query string. Note that parameters passed this way are always **Strings**.

```xml
<apply templateURI="/mytemplate.zul?mode=edit&id=123"/>
```

You can access these parameters in the applied page using:
- **EL**: `${arg.mode}`
- **Java**: `Executions.getCurrent().getArg().get("mode")`

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
If you need dynamic component selection in a large list, use [Dynamic Templates](../syntax/template) or [forEach](../syntax/foreach) instead of nested `<apply>` tags.