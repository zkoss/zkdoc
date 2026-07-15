---
title: "Captcha"
---

- **Demonstration:** [Captcha](https://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Captcha](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Captcha.html)
- **JavaScript API:** [zul.wgt.Captcha](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Captcha.html)

{% include edition-availability.html edition="ee" %}

# Employment/Purpose

A `captcha` component can generate a special distortion image, also called a CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) image. By default, the captcha renders the image with randomly generated text, and developers can set `value` to assign a specific text.

## Common Use Cases

- **Login / registration anti-bot protection** — place a `<captcha>` next to a textbox and validate that `textbox.getValue().equalsIgnoreCase(captcha.getValue())` before processing the form submission.
- **Customised appearance** — use `fontColor` and `bgColor` to match the captcha image to a branded colour scheme, and enable `noise` and `frame` for stronger visual obfuscation on high-risk forms.
- **Variable difficulty** — increase `length` (e.g., `length="7"`) or narrow the character pool via `exclude` to raise recognition difficulty; decrease length or widen the pool for accessibility-friendly forms.
- **Explicit challenge text** — set `value` directly when you need a predictable string (e.g., in automated integration tests or when displaying a fixed passphrase challenge).

# Example

![Captcha](/zk_component_ref/images/captcha.png)

```xml
 <vbox>
     <captcha id="cpa" length="5" width="200px" height="50px"/>
 </vbox>
```

# Properties

## BgColor

**Default Value:** `#FFFFFF`

Sets the background color of the captcha image. The value must be in `#RRGGBB` hexadecimal format (e.g., `#FFFFFF` for white, `#000000` for black). Passing a value in any other format will throw a runtime exception.

```xml
<captcha bgColor="#E0F0FF" width="200px" height="50px"/>
```

## Exclude

**Default Value:** `null` (uses the built-in exclusion list `0123456789IOilo`)

Sets the characters that will not appear in the randomly generated captcha text. Only alphanumeric characters are used during text generation; this property further restricts which of those characters may be selected. When set to `null`, the default exclusion list applies — all digits and the visually ambiguous letters `I`, `i`, `l`, `O`, and `o` are excluded, leaving only unambiguous letters.

Changing this property causes the captcha text to be regenerated.

```xml
<captcha exclude="0Oo1Il" length="6" width="200px" height="50px"/>
```

## FontColor

**Default Value:** `#508093`

Sets the color used to draw the captcha text characters. The value must be in `#RRGGBB` hexadecimal format. Passing a value in any other format will throw a runtime exception.

```xml
<captcha fontColor="#CC3300" width="200px" height="50px"/>
```

## Frame

**Default Value:** `false`

{% include supported-since.html version="5.0.4" %}

Sets whether a border is drawn around the captcha image. When `true`, the captcha engine renders a visible frame around the image boundary.

```xml
<captcha frame="true" width="200px" height="50px"/>
```

## Hflex

{% include supported-since.html version="8.0.1" %}

Sets the horizontal flexibility of the captcha component. Unlike the standard `HtmlBasedComponent` behaviour, `Captcha` allows `hflex` and `width` to be set independently without raising a conflict error. Accepted values follow the standard ZK flex syntax (e.g., `"1"`, `"min"`, `"true"`).

```xml
<captcha hflex="1" height="50px"/>
```

## Length

**Default Value:** `5`

Sets the number of characters in the randomly generated captcha text. Changing this property triggers an immediate regeneration of the captcha value and image.

```xml
<captcha length="6" width="200px" height="50px"/>
```

## Noise

**Default Value:** `false`

{% include supported-since.html version="5.0.0" %}

Sets whether the captcha engine renders random noise pixels over the image to make automated recognition harder. When `true`, additional visual interference is drawn on top of the distorted text.

```xml
<captcha noise="true" width="200px" height="50px"/>
```

## Value

**Default Value:** A randomly generated alphanumeric string of the length set by [`length`](#length).

Sets the text string that is rendered as the distorted captcha image. The value must not be blank or empty — passing a blank string throws a `WrongValueException`. When set explicitly, the auto-generated random text is replaced by the given string. To verify user input server-side, compare the submitted textbox value against `captcha.getValue()`.

```xml
<captcha value="A3kP9" width="200px" height="50px"/>
```

## Vflex

{% include supported-since.html version="8.0.1" %}

Sets the vertical flexibility of the captcha component. Unlike the standard `HtmlBasedComponent` behaviour, `Captcha` allows `vflex` and `height` to be set independently without raising a conflict error. Accepted values follow the standard ZK flex syntax (e.g., `"1"`, `"min"`, `"true"`).

```xml
<captcha width="200px" vflex="1"/>
```

# Supported Events

Captcha does not fire any own events. See inherited events from [Image]({{site.baseurl}}/zk_component_ref/image#Supported_Events).

# Supported Children

`*NONE`
