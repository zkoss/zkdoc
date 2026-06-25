---
title: "Barcode"
---

- **Demonstration:** [Barcode](https://blog.zkoss.org/2018/09/05/8-6-preview-barcode-and-barcodescanner/)
- **Java API:** [org.zkoss.zkmax.zul.Barcode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Barcode.html)
- **JavaScript API:** [zkmax.barcode.Barcode](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.barcode.Barcode.html)

{% include edition-availability.html edition="pe" %}

# Employment/Purpose

The `barcode` component generates and displays barcodes at the browser. It supports multiple barcode types (1D and 2D), allowing you to encode strings into barcode images. The barcode value can be bound to data properties for dynamic updates, making it useful for product labeling, inventory tracking, QR code generation, and other identification scenarios.

## Common Use Cases

### Rendering a QR Code

Use `type="qr"` to generate a 2D QR code. The `height` attribute controls both height and width for QR codes (they are always square).

```xml
<barcode type="qr" value="https://www.zkoss.org/" height="150px"/>
```

### Rendering a 1D Barcode with Value Label

For 1D barcodes, enable `displayValue="true"` to show the encoded text below the bars. Use `fontSize` to control the label size and `barWidth` to control bar thickness.

```xml
<barcode type="code128" value="12345678"
    displayValue="true" fontSize="14" barWidth="3"/>
```

### Data-Binding the Value

Use EL to bind the `value` attribute to a ViewModel property so the barcode updates automatically when the data changes.

```xml
<barcode type="qr" value="@load(vm.productUrl)" height="120px"/>
```

# Example

![](/zk_component_ref/images/qrcode.png)

```xml
<barcode type="qr" value="https://www.zkoss.org/" height="100px"/>
```

![](/zk_component_ref/images/code128.png)

```xml
<barcode type="code128" value="https://www.zkoss.org/" height="100px"/>
```

# Properties

## type

**Default Value:** `CODE128`

Sets the encode/decode type of the barcode. The built-in types are grouped below. Some types have character and length limits; see [Wikipedia: Barcode](https://en.wikipedia.org/wiki/Barcode) for details.

| Family | Accepted Values |
|---|---|
| CODE family | `CODE39`, `CODE128`, `CODE128A`, `CODE128B`, `CODE128C` |
| EAN family | `EAN13`, `EAN8`, `EAN5`, `EAN2` |
| ITF family | `ITF14`, `ITF` |
| MSI family | `MSI`, `MSI10`, `MSI11`, `MSI1010`, `MSI1110` |
| Others (1D) | `UPC`, `PHARMACODE`, `CODABAR` |
| 2D | `QR` |

```xml
<barcode type="qr" value="https://www.zkoss.org/"/>
```

## value

**Default Value:** `""`

Sets the string that will be encoded into the barcode image. Some types only support a specific character set or length.

```xml
<barcode type="qr" value="https://www.zkoss.org"/>
```

## displayValue

**Default Value:** `false`

Sets whether to display the encoded value as text beneath the barcode. Applies to 1D barcode types only.

```xml
<barcode type="code128" displayValue="true"/>
```

## fontSize

**Default Value:** `10`

Sets the font size (in pixels) of the text rendered beneath a 1D barcode when `displayValue` is `true`. Applies to 1D barcode types only.

```xml
<barcode type="code128" fontSize="20"/>
```

## barWidth

**Default Value:** `2`

Sets the width (in pixels) of a single bar in the 1D barcode image. Increasing this value proportionally increases the total barcode width. Applies to 1D barcode types only.

```xml
<barcode type="code128" barWidth="3"/>
```

# Supported Children

`*NONE`