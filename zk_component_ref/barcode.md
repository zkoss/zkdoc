

# Barcode

- Demonstration:
  [Barcode](https://blog.zkoss.org/2018/09/05/8-6-preview-barcode-and-barcodescanner/)
- Java API: [org.zkoss.zkmax.zul.Barcode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Barcode.html)
- JavaScript API:
  [zkmax.barcode.Barcode](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.barcode.Barcode.html)
- <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

A `barcode` component is used to generate a barcode at the browser, and
decode the barcode on the server side. There are many properties to
dealing with the barcode component. First, you could use the `type`
property to specify the type of barcode, for example: qrcode, code128,
code 128A...., after choose the type you want, you could generate the
barcode of the code. And every barcode image could response to a certain
value, the property `value` is for barcode image which wants to stand
for.

# Example

![](/zk_component_ref/images/qrcode.png)

```xml
 <barcode type="qr" value="https://www.zkoss.org/" height="100px"/>
```

![](/zk_component_ref/images/code128.png)

```xml
 <barcode type="code128" value="https://www.zkoss.org/" height="100px"/>
```

# type

The Barcode has 18 types for 1D and 1 type for 2D by default. After
choosing the type of barcode, and you can render the barcode as the type
you choose.

```xml
 <barcode type="qr"/>
```

Note: the type that barcode supported can be referenced as Supported
Barcode Type (Default).

# value

value is a string attribute that barcode component want to render.

```xml
 <barcode type="qr" value="https://www.zkoss.org"/>
```

Note: Some of the type only support a specific format of value.

# height

Height is a string attribute to define the height of barcode component.

```xml
 <barcode type="qr" value="https://www.zkoss.org" height="100px"/>
```

Note:

\(1\) height is a string as a format of "number+px"

\(2\) In type of qr, the width is as same as the height.

# displayValue

The displayValue is the boolean attribute to decide whether the show the
value under the barcode or not.

```xml
 <barcode type="code128" displayValue="true"/>
```

Note: This displayValue attribute is only implement for 1D format.

# fontSize

Default: `10`

It's an integer attribute that decides the text font size under the 1D
barcode.

```xml
 <barcode type="code128" fonSize="20"/>
```

Note: This attribute is only implement for 1D format.

# barWidth

The barWidth is a integer attribute that deciding the single bar width
of barcode image.

```xml
 <barcode type="code128" barWidth="2"/>
```

Note: This attribute is only implement for 1D format.

# registerLibrary

registerLibrary(function () {}, library_name, \[array of types\] ) is a
client-side, class-level method to register a custom library into
barcode widget. If you register the own custom library into Barcode,
every single widget can use the custom library. The way to registering
is zkmax.barcode.Barcode.registerLibrary(...). For example: you can
register the library as the

<script>

below.

```xml
<?script src="mybarcodeLibrary.js"?>
<script>
    ...
    zk.afterLoad('zkmax.barcode', function () {
        zkmax.barcode.Barcode.registerLibrary(function mybarcode(wgt) {
            ...
             };
         }, 'library-name', ['type1', 'type2', ...]);
    });
    ...
</script>
```

Note:

\(1\) registerLibrary is the pure-client-side method.

\(2\) If you want to register the custom library for all the web
application, you can add <javascript src="mybarcodeLibrary.js"/>the
source file at WEB-INF/lang-addon.xml.

myRegister.js

```xml
    zk.afterLoad('zkmax.barcode', function () {
        zkmax.barcode.Barcode.registerLibrary(function mybarcode(wgt) {
            ...
             };
         }, 'library-name', ['type1', 'type2', ...]);
    });
```

WEB-INF/lang-addon.xml

```xml
    <javascript src="mybarcodeLibrary.js">
    <javascript src="myRegister.js">
```

# Supported Barcode Type (Default)

| Name | Barcode Type |
|---|---|
| 1D CODE Family | CODE39, CODE128, CODE128A, CODE128B, CODE128C, |
| 1D EAN Family | EAN13, EAN8, EAN5, EAN2, |
| 1D MSI Family | MSI, MSI10, MSI11, MSI1010, MSI1110, |
| 1D Others | UPC, ITF14,ITF, PHARMACODE, CODABAR |
| 2D | QR |

# Supported Children

`*NONE`



# Version History



| Version | Date        | Content                                            |
|---------|-------------|----------------------------------------------------|
| 8.6.0   | Apirl, 2018 | [org.zkoss.zkmax.barcode.Barcode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/barcode/Barcode.html) |


