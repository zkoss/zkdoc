**Property:**

`org.zkoss.zkmax.touch.disabled`

{% include GlobalLibraryProperty.md %}

`Default: `<i>`false`</i>

{% include version-badge.html version=9.6.0 %} {% include edition-availability.html edition=ee %}
It specifies whether to disable the handling of touch events.

By default, ZK detects if a device supports touch events and listens to
them automatically. If a user doesn't want to use such a feature (e.g.
desktop mostly), specify this library property to `true`.

If enable this configuration, please also ensure that
"org.zkoss.zkmax.tablet.ui.disabled" is set to `true`.

# Version History

| Version | Date      | Content                                                                                                |
|---------|-----------|--------------------------------------------------------------------------------------------------------|
| 9.6.0   | June 2021 | [ZK-4918: support a configuration to disable touch behavior](https://tracker.zkoss.org/browse/ZK-4918) |
