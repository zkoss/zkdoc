<!--
================================================================================
 CANONICAL COMPONENT REFERENCE TEMPLATE
================================================================================
 This file is the single structural standard every page under zk_component_ref/
 should follow. It is NOT published (the leading underscore makes Jekyll skip it).

 HOW TO USE
   - New component doc: copy everything BELOW the "TEMPLATE SKELETON" line,
     delete the guidance comments, and fill in.
   - Existing doc: bring it into this section order and heading style WITHOUT
     changing existing heading levels (see RULES) — the docs already use H1 for
     sections; keep them that way.

 SECTION CONTRACT (order is fixed; use this exact casing and heading level)

   #  Section                  Level  Required?
   1  API links block          —      REQUIRED (Demonstration / Java API / JavaScript API)
   2  edition-availability     —      CONDITIONAL — only EE/PE components
   3  supported-since          —      CONDITIONAL — only if the whole component has a since-mark
   4  # Employment/Purpose      H1     REQUIRED
   4b   ## Common Use Cases     H2     REQUIRED — problem-domain scenarios
   5  # Example                 H1     REQUIRED (image + ZUL snippet; optional "Try it")
   6  <feature sections>        H1     OPTIONAL — component-specific topics (e.g. "File Upload")
  6b  # Accessibility           H1     CONDITIONAL — components with keyboard/ARIA support (PE/EE feature)
   7  # Properties              H1     REQUIRED if the component exposes documentable properties
   8  # Supported Events        H1     REQUIRED if the component fires events
   9  # Supported Molds         H1     REQUIRED if the component has >1 mold
  10  # Supported Children      H1     REQUIRED
  11  # Inherited Functions     H1     OPTIONAL

 RULES
   - Heading LEVELS (do not change on existing pages):
       H1 (`#`)   = top-level sections (the rows above).
       H2 (`##`)  = property names under `# Properties`; `## Common Use Cases`;
                    other second-level sub-topics.
       H3 (`###`) = finer sub-examples (e.g. "### Enable Autodisable for All Buttons").
   - Heading TEXT: Title Case, exact wording above (e.g. `# Supported Events`,
     never `# Supported events`). Casing may be normalized; the `#`-count must NOT.
   - ACCESSIBILITY: keyboard/ARIA docs live in ONE `# Accessibility` section per
     page (slot 6b, before `# Properties`). Fold any legacy `# Keyboard Navigation`
     heading into it as `## Keyboard Support`. Keyboard support is a PE/EE feature,
     so keep the `supported-since`/`edition-availability` gates inside the section.
   - Do NOT add a "Version History" section. For version info use an inline
     `{% include supported-since.html version="x.y.z" %}` where relevant.
   - API links use the **bold-label** form (see skeleton).
   - Properties: one `## PropertyName` subsection each; lead with an optional
     `**Default Value:** ...` line, then prose, then an optional ZUL example.
     ZUL example, NEVER Java signatures. For object-typed properties (value is a Java
     object — LocalDateTime, Date, TimeZone, ListModel, a renderer — not a
     String/enum/number/boolean), construct the object inline in a `<zscript>` block and
     reference it via EL, e.g.
         <zscript>
             import java.time.LocalDateTime;
             LocalDateTime startOfYear = LocalDateTime.of(2024, 1, 1, 0, 0);
         </zscript>
         <datebox defaultDateTime="${startOfYear}"/>
     never a raw `comp.setX(obj)` line. Plain String/enum/number attributes use the
     simple literal form `<comp attr="value"/>`.

 PROPERTY INCLUSION POLICY (confirmed with user — what to document, what to skip)
   - DOCUMENT ONLY properties with BOTH a setter and a getter (getter = get*/is*).
     Getter-only / write-only methods are internal — not ZUL-settable — so skip them.
   - SKIP inner-class and private methods entirely (they are not component properties).
   - SKIP universally-common, self-explanatory attributes (e.g. disabled, visible,
     width, height, style, sclass, tooltiptext); they are adequately covered by Javadoc.
   - INHERITED properties: a property's documentation HOME is the class that DECLARES ITS
     SETTER. Document a property on a page ONLY if that page's component class declares the
     setter itself. Every property whose setter is inherited belongs on the ancestor's page
     — even when this class overrides only the getter (e.g. `zclass`: setter in
     `HtmlBasedComponent` → documented on `htmlbasedcomponent`, not here). The abstract/impl
     ancestor pages DO exist (`htmlbasedcomponent`, `xulelement`, `labelelement`,
     `labelimageelement`) and are the homes for the properties those classes declare.

   - Events table columns, in this order: `Name | Event Type | Description`.
     Event Type links to the event class javadoc.
   - Multi-level books use ABSOLUTE image paths (`/zk_component_ref/images/...`);
     single-level use relative. Internal links use `{{site.baseurl}}/...` permalinks.
================================================================================
 TEMPLATE SKELETON (copy from here down)
================================================================================
-->
---
title: "ComponentName"
---

- **Demonstration:** [ComponentName](https://www.zkoss.org/zkdemo/...)
- **Java API:** [org.zkoss.zul.ComponentName](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ComponentName.html)
- **JavaScript API:** [zul.xxx.ComponentName](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.xxx.ComponentName.html)

<!-- EE/PE only — delete for CE components. edition = "ee" or "pe" -->
{% include edition-availability.html edition="ee" %}

<!-- Component-level since-mark only — delete if not applicable. -->
{% include supported-since.html version="10.0.0" %}

# Employment/Purpose

<!-- One or two paragraphs: what the component is for and when to use it. -->

## Common Use Cases

<!-- Problem-domain scenarios where this component is the right choice. -->

# Example

<!-- A representative screenshot, then a minimal runnable ZUL snippet. -->

![ComponentName Example](/zk_component_ref/images/ComponentName-Example.png)

```xml
<componentname .../>
```

<!-- Optional live demo link:
Try it
*  [ComponentName Example](https://zkfiddle.org/sample/...)
-->

<!--
# <Feature Topic>            (OPTIONAL, repeatable, H1)
Component-specific topics that don't fit Properties — e.g. "File Upload",
"Open / Close". Use H1, Title Case. Place between Example and Properties.
-->

<!--
# Accessibility             (CONDITIONAL, H1 — components with keyboard/ARIA support)
Keyboard & ARIA support. This is a PE/EE feature, so KEEP the edition/since gates
inside the section. Fold any legacy `# Keyboard Navigation` into `## Keyboard
Support`. Place between the feature sections and Properties.
-->
# Accessibility

{% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

## Keyboard Support

| Key | Description |
|-----|-------------|
| ArrowUp / ArrowDown | What the key does. |

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

<!-- Optional, component-specific H2 subsections: ## Required Settings, ## Limitations -->

# Properties

<!-- Only properties that have BOTH a setter and a getter (see PROPERTY INCLUSION POLICY). -->

## PropertyName

**Default Value:** `value`   <!-- omit if none -->

<!-- What the property does, accepted values, and any caveats. -->

```xml
<componentname propertyName="..."/>
```

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| `onEventName` | [EventClass](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventClass.html) | What the event signifies and when it fires. |

# Supported Molds

<!-- Only when the component has more than one mold. One image + note per mold. -->

**default**

![ComponentName default mold](/zk_component_ref/images/ComponentName-mold-default.png)

# Supported Children

<!-- List allowed child components, or `*ALL` if any ZK component is allowed. -->

# Inherited Functions

<!-- OPTIONAL: link to notable inherited methods from parent classes. -->
