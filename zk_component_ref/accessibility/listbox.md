 {% include
version-badge.html version=9.5.0 %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

You need to label a Listbox first, then ZK will add `aria-labelledby` on
the `z-focus-a` button.

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowDown | Select Listitems or focus on Listheaders. |
| ArrowLeft / ArrowRight | Focus on Listcells or Listheaders |
| Spacebar (on listitem) | If the checkmark is enabled, pressing Spacebar will toggle
selection of the listitem. |
| Enter / Spacebar (on listgroup) | pressing Enter/Spacebar will open or close the
listgroup. |
| Enter / Spacebar (on "select all" checkbox) | pressing Enter/Spacebar trigger select / unselect all. |
