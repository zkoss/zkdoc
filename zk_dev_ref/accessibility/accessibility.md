
# Overview - Achieve AA Compliance

According to
[W3C](https://www.w3.org/WAI/fundamentals/accessibility-intro/), web
accessibility means that websites, tools, and technologies are designed
and developed so that people with disabilities can use them. This also
benefits people without disabilities, for example, people with temporary
disabilities (e.g. injured) or people who have situational limitations
under particular circumstances (e.g. no mouse access).

Since ZK 11.0.0, the za11y (zk-accessibility) module enables you to
create accessible [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
**AA (Double-A)-compliant** applications; earlier versions support
WCAG 2.0 AA. Key features include full keyboard support, assistive
technologies support, and themes designed to meet the WCAG contrast
requirements. See
[WCAG 2.1 and 2.2 Support](#wcag-21-and-22-support) for what ZK does and
what is left to your application.

{% include edition-availability.html edition="ee" %}

To meet accessibility requirements, one key point is to provide semantic
information about widgets, structures, and behaviors for assistive
technologies. With the za11y module, ZK widgets will render such
semantic information based on their purposes according to
[WAI-ARIA](https://www.w3.org/TR/wai-aria/). However, depending on an
application’s context, a widget might play different roles in different
pages and this has to be designed by application developers --
developers should fully understand the purposes, requirements, and
expectations to deliver complete accessibility.

This chapter shares with you what the ZK framework has done in terms of
accessibility in general, and how you can specify additional
application-specific accessible information. For the details of each
component, please refer to the **Accessibility** section on that component's page in the [ZK Component Reference]({{site.baseurl}}/zk_component_ref/).

# Achieve WCAG 2.1 or 2.2 AA

{% include supported-since.html version="11.0.0" %}

To make your application meet WCAG 2.1 AA:

1. Include the za11y module, as shown in
   [Enable Accessibility Support](#enable-accessibility-support) below.
2. Use [Marble]({{site.baseurl}}/zk_style_customization_guide/marble_theme) or a
   [WCAG theme]({{site.baseurl}}/zk_dev_ref/theming_and_styling/zk_official_themes#accessibility-ready-themes).
   They are designed to meet the contrast criteria, 1.4.3 Contrast
   (Minimum) from WCAG 2.0 and 1.4.11 Non-text Contrast from WCAG 2.1.
   Recheck any color you customize, including Marble's brand color.
3. Do what the criteria leave to your application. For the ones that
   WCAG 2.1 and 2.2 add, see
   [WCAG 2.1 and 2.2 Support](#wcag-21-and-22-support).

To meet WCAG 2.2 AA, follow the same steps, but don't use a
[compact theme]({{site.baseurl}}/zk_dev_ref/theming_and_styling/zk_official_themes#compact-theme-name),
such as `wcag_c`. Compact themes make some controls smaller than
the 24 × 24 CSS pixels that 2.5.8 Target Size (Minimum) asks for.

# Enable Accessibility Support

ZK accessibility module is a separate, optional jar, you have to include
it manually to enable it.

```xml
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>za11y</artifactId>
            <version>${zk.version}</version>
        </dependency>
```

To ensure za11y.jar is running as expected at run-time, you can simply
inspect a textbox. If you see ARIA attributes rendered in its DOM
elements, that means the module works successfully. Please see [Built-in Support](#built-in-support).

The tools used to check the WCAG rules in za11y, by ZK version:

- ZK 9.5.0: axe DevTools 3.5.3.
- ZK 10.0.0: Lighthouse 11.4.0.
- ZK 11.0.0: axe-core 4.13.0, for the WCAG 2.0, 2.1 and 2.2 Level A and AA
  rules. Browser tests cover what no automated rule checks, such as
  keyboard, pointer, reflow and hover behavior.

# Built-in Support

To know what default ARIA attributes are rendered by ZK, please open the
developer tool to inspect the widget.

**textbox.zul**

```xml
<textbox />
```

Visit the zul page and inspect the textbox with a browser developer
tool, you will see some aria attributes rendered:

```html
<input id="h5AP0" class="z-textbox" type="text" 
       aria-disabled="false" aria-readonly="false">
```

Some components render special ARIA attributes — see the **Accessibility** section on the relevant component's page in the [ZK Component Reference]({{site.baseurl}}/zk_component_ref/).

# Specify ARIA Attributes

You can specify arbitrary ARIA attribute as needed on a component with
[namespace "client/attribute"](/zuml_ref/client_attribute)
like:

```xml
<zk  xmlns:ca="client/attribute">
    <div ca:aria-hidden="true"/>
    <textbox ca:aria-label="${field}"/>
    <intbox ca:aria-labelledby="${price}"/>
</zk>
```

# Label with an Input Component

There are 3 ways to associate an input component with a label:

## Enclose with a label

```xml
<zk xmlns:h="native" xmlns:ca="client/attribute">
    <h:label>Address
        <textbox/>
    </h:label>
```

## Specify at aria-label

```xml
<zk xmlns:h="native" xmlns:ca="client/attribute">
    <custom-attributes field="Account:"/>
    ${field}
    <textbox ca:aria-label="${field}"/>
```

## Specify at aria-labelledby

```xml
<zk xmlns:h="native" xmlns:ca="client/attribute">
    <label value="price" id="priceLabel"/>
    <textbox ca:aria-labelledby="${priceLabel.uuid}"/>
```

# WCAG 2.1 and 2.2 Support

{% include supported-since.html version="11.0.0" %}

Since ZK 11.0.0, the za11y module supports the success criteria that
WCAG 2.1 and 2.2 add to WCAG 2.0. The tables below list the new Level A
and AA criteria, what ZK does for each, and what your application should
do.

## WCAG 2.1

| Success criterion | What ZK does | What your application should do |
|---|---|---|
| [1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html) (AA) | No ZK component locks the page to portrait or landscape. | Don't restrict a page to portrait or landscape unless one orientation is essential. |
| [1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) (AA) | Lets you set the HTML `autocomplete` attribute on the input element with `inputAttributes`. Chosenbox and Daterangebox support `inputAttributes` since 11.0.0. | Set a valid `autocomplete` value on each field that asks for information about the user. See [Identify Input Purpose](#identify-input-purpose). |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) (AA) | Messagebox, Image and Colorbox's popup fit in a viewport 320 CSS pixels wide, and the popups of Cascader and Searchbox are no wider than it. | At 320 CSS pixels wide, all content and functions must stay available without scrolling in two directions, except parts that need a two-dimensional layout, such as a data table. Avoid fixed widths. |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (AA) | Menubar moves the focus to the active menu item, so its focus indicator is visible. Portallayout's drop placeholder reaches a 3:1 contrast ratio. | Use [Marble]({{site.baseurl}}/zk_style_customization_guide/marble_theme) or a [WCAG theme]({{site.baseurl}}/zk_dev_ref/theming_and_styling/zk_official_themes#accessibility-ready-themes). Colors you customize, including Marble's brand color, need 3:1 against adjacent colors in controls, focus indicators and meaningful graphics. |
| [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) (AA) | The arrows of Spinner, Doublespinner and Timebox, the icons in Window and Panel title bars, and Grid's Detail icon stay inside their boxes when users increase text spacing. | Text must not be clipped or overlap when users increase line, paragraph, letter and word spacing. Don't give elements that contain text a fixed height. |
| [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) (AA) | Escape closes the following without moving the pointer or the focus: a `tooltip` popup, an autodrop Combobutton's popup, a collapsed Navitem's label, and a slider button's tooltip on a Rangeslider or Multislider. That tooltip also stays open when the pointer moves onto it. | Content you show on hover or focus yourself must close without moving the pointer or focus, such as with Escape, and stay open while the pointer or focus is on it or its trigger. Prefer the `tooltip` attribute. |
| [2.1.4 Character Key Shortcuts](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html) (A) | Single character keys act only on the component that has the focus, and `ctrlKeys` accepts a letter or digit only with Ctrl, Alt or Meta. | If your own JavaScript adds a shortcut made only of character keys, let users turn it off or remap it to include Ctrl, Alt or Meta, or make it work only while its component has the focus. |
| [2.5.1 Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html) (A) | ZK uses no multipoint gesture, and its swipes have a click or tap alternative by default. | Give any pinch or swipe you add yourself a click or tap alternative. Don't hide both a Carousel's arrows and its indicators (`showArrows="false"`, `showIndicators="false"`), or swiping becomes the only way to change slides. |
| [2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html) (A) | Spinner, Doublespinner and Timebox buttons step on release, and a press on the track of a Slider, Rangeslider or Multislider moves the slider button on release. Popup, Notification, Toast, Portallayout's move popup, and the dropdowns of Datebox, Daterangebox, Timepicker, Searchbox and Chosenbox close when the pointer is released outside them. | Run the actions you add yourself on click, not on mouse down. An action that starts on mouse down, such as a drag, must finish on release and let users cancel it, for example by releasing outside the target. |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) (A) | A component's visible label is its accessible name. Where ZK sets `aria-label` on a control that shows text, such as a Listbox item, the name contains that text. | If you set `ca:aria-label` or `ca:aria-labelledby` on a component with a visible label, including the text next to an input, the name must contain the label's words in the same order, preferably first: for a "Search" button, use `ca:aria-label="Search products"`. |
| [2.5.4 Motion Actuation](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html) (A) | No ZK component responds to device motion, and ZK has no API for it. | If your own JavaScript responds to device motion, also offer a control that does the same, and a way to turn the motion response off. |
| [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) (AA) | Announces to screen readers, without moving the focus: the messages of a Notification, a Toast and an input's error box, the new page range of a detailed Paging, the selected range of a Daterangebox, the current slide of a Carousel after the user changes it, and the progress of a Loadingbar at every 25%. | Other status messages your application shows, such as a result count or a "Saved" confirmation, should reach screen readers without taking the focus. |

## WCAG 2.2

| Success criterion | What ZK does | What your application should do |
|---|---|---|
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) (AA) | An input's error box no longer covers the field that receives the focus. | Don't let sticky headers, footers or non-modal windows entirely hide the focused component. CSS `scroll-padding` on the scrolling container keeps it clear of sticky bars. |
| [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) (AA) | A click on the track moves the nearest slider button of a Slider, Rangeslider or Multislider there, and a click in Colorbox's picker selects the color at that point. A click on a Portallayout panel's title bar opens a popup that moves the panel up, down, or to another column; see [Portallayout]({{site.baseurl}}/zk_component_ref/portallayout#move-a-panel-without-dragging). | Give every drag in your application a click or tap alternative, such as a button or a text input that sets the size or position. Keyboard support alone isn't enough. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) (AA) | Anchornav links are at least 24 CSS pixels tall, and the close buttons of Tab, the scrollbar buttons and frozen-column handle of Biglistbox, and the remove buttons of Chosenbox are at least 24 × 24 CSS pixels. | Make each control you add at least 24 × 24 CSS pixels, or space smaller ones so that a 24-pixel circle centered on each overlaps no other control or circle. |
| [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) (A) | Not component-specific. | If help, such as contact details, a chat or a help page, appears on several pages, keep it in the same order relative to the other content. |
| [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) (A) | Not component-specific. | In a multi-step process, fill in information the user already entered, or let them select it, such as with a "Same as shipping address" checkbox. Browser autofill doesn't count. |
| [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) (AA) | A password Textbox doesn't block pasting or password managers. | Let users paste into every login field, including verification codes, and set `autocomplete=username` and `autocomplete=current-password` so password managers can fill them in. Don't require a puzzle without another way to log in. |

## Identify Input Purpose

To tell browsers and assistive technologies what a field collects, set the
HTML `autocomplete` attribute with `inputAttributes` (see
[InputElement]({{site.baseurl}}/zk_component_ref/inputelement#inputattributes),
[Chosenbox]({{site.baseurl}}/zk_component_ref/chosenbox#inputattributes) and
[Daterangebox]({{site.baseurl}}/zk_component_ref/daterangebox#inputattributes)).
Use a token from the
[list of input purposes](https://www.w3.org/TR/WCAG21/#input-purposes):

```xml
<textbox inputAttributes="autocomplete=email"/>
<textbox type="password" inputAttributes="autocomplete=current-password"/>
<chosenbox inputAttributes="autocomplete=country-name"/>
```

Combobox's own `autocomplete` property turns its type-ahead on or off; it
doesn't set the HTML `autocomplete` attribute.

# Demo Application

This demo application shows how you can build a ZK-based application
with za11y module support. It also demonstrates key accessible features
such as high contrast themes, keyboard support, screen reader support,
mouse/touch support, landmarks and so on.

[Check demo online](https://www.zkoss.org/za11y-demo)

[Check demo source at Github](https://github.com/zkoss-demo/za11y-demo)

![Wcag demo]({{site.baseurl}}/zk_dev_ref/images/wcag_demo.png)

# Screen Reader

During the development, we have tested the accessibility with the
following screen readers:

## JAW

- proprietary, Windows
- Toggle Virtual PC Cursor: `Insert + Z` or `NumberPad +`
- [Guide](https://www.freedomscientific.com/training/jaws/)
- [Issues](https://github.com/FreedomScientific/VFO-standards-support/issues)

## NVDA

- Toggle browse/focus mode: Insert + Spacebar

## VoiceOver

- Mac built-in, activate by `Command + F5`
- [using VoiceOver to browse and navigate webpages](https://www.apple.com/voiceover/info/guide/_1134.html)

## [Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1)

- Windows 10 built-in
- start/stop narrator: `windows + ctrl + enter`
- switch scan mode: `narrator(CapsLock) + space`
