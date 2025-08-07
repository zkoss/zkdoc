**Property:**

`org.zkoss.model.selectiveComponentUpdate.enable`

{% include NestedLibraryProperty.md %}

Default:  `false`

{% include version-badge.html version="10.2.0" %}

Enable updating of selective components in the model, ensuring that not
all sequential components are re-rendered.

This attribute reverts the fix for ZK-5468 starting from ZK 10.0.0. The
fix had caused all components with a model to be re-rendered whenever
the model changed. This includes components such as Listbox and Grid
without ROD, as well as Tabbox, Searchbox, Stepbar, Organigram, and
Chosenbox.

Note: This attribute is designed exclusively for backward compatibility
and is not intended for developers to use for other purposes.
