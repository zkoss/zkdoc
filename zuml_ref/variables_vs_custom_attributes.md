# `<variables>` vs. `<custom-attributes>`

<!-- this page is just for reference -->
This document outlines the technical findings regarding the `<variables>` and `<custom-attributes>` tags in ZUL, based on the ZK 10 source code analysis.

## 1. Overview
Both tags are used to define key-value pairs (attributes) within a ZUL page. They are parsed into metadata objects (`VariablesInfo` and `AttributesInfo`) and applied during the component creation lifecycle by the `UiEngine`.

---

## 2. The `<variables>` Tag
The `<variables>` tag is primarily used to define variables accessible via EL expressions (`${var}`) or ZScript within an **ID Space** (usually a Window or Page).

### Internal Mechanics
- **Implementation Class:** `org.zkoss.zk.ui.metainfo.VariablesInfo`
- **Storage Target:** By default, it stores attributes on the **Space Owner** (the nearest ancestor implementing `IdSpace`, such as `Window`) or the `Page`.
- **Parsing:** Handled by `Parser.parseVariables()`.

### Unique Attributes
| Attribute | Description |
| :--- | :--- |
| `local` | **`false` (Default):** Sets the attribute in the nearest ancestor scope that already defines it, or the current scope. <br> **`true`:** Strictly sets the attribute in the current ID space, avoiding shadowing or collision with parent spaces. |
| `composite` | Determines if the value should be parsed as a `list` (Object array) or `map` (Map). |

---

## 3. The `<custom-attributes>` Tag
The `<custom-attributes>` tag is used to attach metadata or configuration directly to a **Component**.

### Internal Mechanics
- **Implementation Class:** `org.zkoss.zk.ui.metainfo.AttributesInfo`
- **Storage Target:** By default, it stores attributes on the **Component itself**.
- **Parsing:** Handled by `Parser.parseCustomAttributes()`.

### Unique Attributes
| Attribute | Description |
| :--- | :--- |
| `scope` | Explicitly defines where to store the attribute. Values include: `component` (default), `space`, `page`, `desktop`, `session`, `application`, or `request`. |
| `composite` | Same as `<variables>`, supports `list` and `map` parsing. |

---

## 4. Key Differences

| Feature | `<variables>` | `<custom-attributes>` |
| :--- | :--- | :--- |
| **Primary Target** | **Space Owner** (Window/Page) | **Component** |
| **Scope Control** | Via `local="true/false"` | Via `scope="name"` |
| **Logic Type** | Defined for the "Area" (ID Space) | Defined for the "Widget" (Component) |
| **ZUL Intent** | Defining constants for EL/ZScript | Component configuration/parameters |

### Practical Example: The Scope Difference

```xml
<window id="win">
    <div id="myDiv">
        <variables myVar="1"/>
        <custom-attributes myAttr="A"/>
    </div>
</window>
```
- `myVar` is stored on the **Window (`win`)**. Any component inside the window can access `${myVar}`.
- `myAttr` is stored on the **Div (`myDiv`)**. Only `myDiv.getAttribute("myAttr")` will find it.

---

## 5. Common Features: Composite Parsing
Both tags utilize `org.zkoss.zk.xel.impl.Utils` to parse complex string values into Java objects if the `composite` attribute is used.

- **`composite="list"`**: Converts `"a, b, c"` into `new Object[] {"a", "b", "c"}`.
- **`composite="map"`**: Converts `"k1=v1, k2=v2"` into a `LinkedHashMap`.

---

## 6. Code-Level Implementation Summary
1.  **`Parser.java`**: Detects the tags and populates the `NodeInfo` tree with `VariablesInfo` or `AttributesInfo`.
2.  **`UiEngineImpl.java`**: During `exec.createComponents()`, it iterates through these metadata objects and calls their `apply()` methods.
3.  **`VariablesInfo.apply(comp)`**: Calls `comp.getSpaceOwner().setAttribute(...)`.
4.  **`AttributesInfo.apply(comp)`**: Calls `comp.setAttribute(...)` (using the specified scope).
