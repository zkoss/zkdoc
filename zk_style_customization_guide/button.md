# Component Reference

Component Reference: [ Button]({{site.baseurl}}/zk_component_ref/essential_components/button)

# DOM Structure

```html
<button class="z-button">
    <img class="z-button-image" />
</button>
```

# LESS Source

Basically, LESS source is correspondent to it's DOM structure, each
state also have different styles.

```css
.z-button {
    /* normal style */

    /* hover style */
    &:hover {
    }
    /* focus style */
    &:focus {
    }
    /* active style */
    &:active {
    }
    /* disabled style */
    &[disabled] {
    }
}
```

Check complete LESS source for Button from
[Github](http://github.com/zkoss/zk/blob/master/zul/src/archive/web/js/zul/wgt/less/button.less).

## LESS Variables

The following LESS variables are used for the Button component. Check
other variables from [ here](ZK_Style_Customization_Guide/Integrate_with_LESS/How_ZK_works_with_LESS/ZK_LESS_Variables).

| Variables            | Default Value |
|----------------------|---------------|
| @baseButtonHeight    | 24px          |
| @buttonBorderColor   | \#A9A9A9      |
| @buttonGradientStart | \#FEFEFE      |
| @buttonGradientEnd   | \#EEEEEE      |

# Customize Sample

## Target Design

Assume the image below is our target design for Button component. No
border, gradient background, rounded corner or shadow effects.

![](images/styleguide-button-design.png)

## Implementation Details

### Setup environment and Analyze design

- Check [ the instruction](ZK_Style_Customization_Guide/Look_and_Feel_customization/Customize_Component)
  to setup component customization environment.
- Analyze the design
  - Used Color
      
    Text: 14px, \#FFFFFF

    Normal Background: \#5687A8

    Hover Background: \#5E94B8

    Pressed Background: \#4C7895

    Focus Background: \#436983

    Disabled Background: \#ACACAC
  - Size
      
    Height: 32px

    Horizontal Padding: 16px

    Vertical Padding: 4px

### Modify button.less file to achieve target design

`Refer `[` here`](ZK_Style_Customization_Guide/Integrate_with_LESS/How_ZK_works_with_LESS/ZK_LESS_Functions)` for built-in zk less functions.`

- Change text color and remove border and text-shadow effect:

```css
.z-button {
    .fontStyle(@baseTitleFontFamily, 14px, normal, #FFFFFF);
    text-shadow: none; /* remove text shadow */
    border: none;
    /* omitted */
}
```

- Remove rounded corner:

```css
.z-button {
    .borderRadius(0);
}
```

- Modify Normal state background:

```css
.z-button {
    .verGradient(#5687A8, #5687A8); /* no gradient, pass the same color arguments for the function */
}
```

- Modify Hover state:

```css
.z-button {
    &:hover {
        color: #FFFFFF;
        .verGradient(#5E94B8, #5E94B8); /* no gradient, pass the same color arguments for the function */
        .boxShadow(inset 0 -2px 0 #436983); /* for simulation 3d effect */
    }
}
```

- Modify Pressed state:

```css
.z-button {
    &:active {
        color: #FFFFFF;
        .verGradient(#4C7895, #4C7895); /* no gradient, pass the same color arguments for the function */
        .boxShadow(inset 0 2px 0 #3A5B72); /* for simulation 3d effect */
    }
}
```

- Modify Focus state:

```css
.z-button {
    &:focus {
        color: #FFFFFF;
        .verGradient(#436983, #436983); /* no gradient, pass the same color arguments for the function */
        .boxShadow(none);
    }
}
```

- Modify Disabled state:

```css
.z-button {
    &[disabled] {
        color: #FFFFFF;
        .verGradient(#ACACAC, #ACACAC); /* no gradient, pass the same color arguments for the function */
        .boxShadow(none);
        .opacity(1); /* no opacity needed */
    }
}
```

- Modify Size:

```css
.z-button {
    /* omitted */
    min-height: 32px;
    padding: 4px 16px;
}
```

## Final result

![](images/styleguide-button.png)

# Additional Customization

If icon font is used inside a button component as below:

```xml
<button label="Button" iconSclass="z-icon-flag" />
```

The icon color is same as label by default, if you wish to change icon
color only, add extra style like this:

```css
.z-button {
    /* omitted */

    > [class*="z-icon-"] {
        color: red;
    }
}
```


