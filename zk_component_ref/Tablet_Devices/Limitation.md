{% include ZKComponentReferencePageHeader %}

# Unsupported Component

In Tablet/mobile device, there are some different design against desktop
browser, which make some ZK components are not supported.

## Frozen

Frozen component is implemented by cheating the browser to show
scrollbar as desired. However, tablet/mobile devices have no scrollbar
so this feature is not applicable in tablet/mobile devices.

# Unsupported API

In Tablet device, we use some kind of the HTML5 new feature to generate
the component output as tablet mold, so there are some limitation as
follows.

## NumberInputElement

`[7.0.3]`

Fall back to use Desktop implementation for NumberInputElement with
"format" and "locale" attributes in Tablet mold.

`[6.5.0]`

In Tablet mold, all of the ZK components that extend from
NumberInputElement cannot support *format* and *locale* attributes, due
to the output of the component which the input type is number.

# Version History

| Version | Date         | Content                                                                                                              |
|---------|--------------|----------------------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012   |                                                                                                                      |
| 7.0.3   | August, 2014 | Fall back to use Desktop implementation for NumberInputElement with "format" and "locale" attributes in Tablet mold. |

{% include ZKComponentReferencePageFooter %}
