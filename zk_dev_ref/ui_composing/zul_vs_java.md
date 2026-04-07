# ZUL vs. Java API

ZK offers two main approaches to build your user interface: the XML-based approach (ZUL) and the pure-Java approach (using Richlet or Java Composers). Each approach has its own strengths, and you can even mix them within the same project.

## XML-based Approach (ZUL)
ZUL is ZK's XML-based markup language. In most cases, ZUL is the default and most common way to build ZK pages because of its readability and structural clarity.

**Pros:**
- **Clear Visual Structure:** The hierarchical nature of XML directly mirrors the component tree of your UI. This makes it significantly easier to read and visualize complex layouts at a glance.
- **Strong Tooling Support:** With IDEs equipped with ZUL schemas, or tools like IntelliJ ZK Plugin, you benefit from rich auto-completion, visual editing, and schema validation.
- **Separation of Concerns:** Using ZUL encourages a clear separation between the UI layout (the view) and the application logic, adhering closely to the MVC/MVVM patterns.

**Cons:**
- **New Syntax to Learn:** Developers must familiarize themselves with ZK-specific XML tags, attributes, and syntax.
- **Limited Runtime Dynamism:** While ZUL supports EL expressions, macros, and `if/forEach` conditionals, creating deeply dynamic, data-driven (or parameterized) structures completely from XML can be restrictive without dropping into Java.

## Pure-Java Approach 
The pure-Java approach involves building the UI tree programmatically using ZK's Java component API. This can be done entirely from scratch via a [Richlet](richlet), or by creating a minimal baseline ZUL file (e.g., a simple `<window apply="MyComposer">`) and constructing its children inside the Java backend.

**Pros:**
- **Ideal for Database-Driven UI:** If your UI structure, field types, and component behaviors are stored in a database and determined dynamically at runtime, building the UI component tree in Java is far more powerful and natural than trying to mold it into XML logic.
- **Native Tooling Support:** Writing UI in Java means you instantly benefit from your IDE's native, out-of-the-box features. You get robust code completion, instantaneous refactoring, inline javadoc inspection, and compilation-time error checking without needing any specialized ZK plugins.
- **Gentle Learning Curve for Java Developers:** Team members who are already comfortable with standard Java do not need to memorize ZUL syntax. They can easily discover component properties through standard Java API.
- **Full Programmatic Power:** Building UI in Java allows you to integrate complex business logic, loops, Java design patterns, and conditionals seamlessly as the components are generated.

**Cons:**
- **Difficult to Visualize Layout:** Unlike XML, where the nested markup natively reflects the structured component tree, reading through sequential Java instantiation code makes it very challenging for developers to mentally picture what the final UI will look like.
- **Verbose Architecture:** Building deeply nested or complex static layouts entirely in Java can quickly result in verbose, hard-to-maintain boilerplate code.

## Best Practice: The Hybrid Setup

For applications requiring highly dynamic screens, you rarely need to pick just one side. A highly effective and common strategy is a hybrid approach.

You start with a **baseline ZUL file** to define static layout wrappers, headers, and context containers. For example:

```xml
<window id="baseWindow" apply="com.mycompany.DynamicFormComposer">
    <div id="dynamicFormContainer" class="form-wrapper-style" />
</window>
```

Then, all the complex, dynamic pieces (like fields driven by a database structure) are generated inside your Java `DynamicFormComposer` using the Java API, and injected into the target `dynamicFormContainer` element. This offloads the heavy dynamic work to standard Java code while keeping the static framing cleanly in ZUL.

### Using ZUL Templates
To further reduce verbose Java code, another excellent technique within the hybrid approach is to use [**ZUL snippets as templates**]({{site.baseurl}}/zk_dev_ref/ui_composing/load_zuml_in_java) (e.g., using `Executions.createComponents()`). Instead of generating every single nested dynamic element (like labels, complex input fields, and localized validation logic) purely via `new Textbox()`, you define small, reusable `.zul` files.

This grants you the benefits of both worlds:
1. **Visual Readability:** The ZUL template gives you an immediate overall visualization of what that UI component block will look like.
2. **Dynamic Control:** Your Java code remains responsible for fetching the runtime data, iterating, and deciding *how many* templates to inject, effectively controlling the dynamic generation but with drastically reduced Java code.
