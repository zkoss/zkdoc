# Component Reference

Component Reference: [ Nav]({{site.baseurl}}/zk_component_ref/nav), [ Navbar]({{site.baseurl}}/zk_component_ref/nav/navbar),
[ Navitem]({{site.baseurl}}/zk_component_ref/nav/navitem),
[ Navseparator]({{site.baseurl}}/zk_component_ref/nav/navseparator)

# DOM Structure

```html
<div class="z-navbar z-navbar-orient">
    <ul>
        <!-- Navitem -->
        <li class="z-navitem">
            <a class="z-navitem-content">
                <img class="z-navitem-image" />
                <i class="z-icon-font"></i>
                <span class="z-navitem-text"></span>
            </a>
        </li>
        <!-- Navseparator-->
        <li class="z-navseparator"></li>
        <!-- Nav-->
        <li class="z-nav">
            <a class="z-nav-content">
                <img class="z-nav-image" />
                <i class="z-icon-font"></i>
                <span class="z-nav-text"></span>
            </a>
            <ul><!-- second/third level --> </ul>
        </li>
    </ul>
</div>
```

- Line 1: **z-navbar-orient** represents Navbar orient
  (z-navbar-horizontal or z-navbar-vertical)
- Line 7,17: Can be any Icon Font from [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).

# LESS Source

Basically, LESS source is correspondent to its DOM structure, and each
orient have different styles.

```css
/* navbar */
.z-navbar {
    /* overall style */
    > ul { /* first level */
        ul { /* second level */
            ul { /* third level */
            }
        }
    }
    /* horizontal style */
    &-horizontal {
    }
    /* vertical style */
    &-vertical {
    }
}
/* nav, navitem */
.z-nav,
.z-navitem {
    &-content {}
    &-image {}
    &-text {}
}
/* navseparator */
.z-navseparator {
}
```

## LESS Variables

The following LESS variables are used for Navbar, Nav, Navitem and
Navseparator components. Check other variables from [ here](ZK_Style_Customization_Guide/Integrate_with_LESS/How_ZK_works_with_LESS/ZK_LESS_Variables).

| Variables                   | Default Value                                   |
|-----------------------------|-------------------------------------------------|
| @navImageSize               | 16px                                            |
| @navColor                   | \#333333                                        |
| @navBorderColor             | \#F4F4F3                                        |
| @navBackgroundColor         | \#FFFFFF (first level, each level is 3% darker) |
| @navHoverBackgroundColor    | \#E8E8E8                                        |
| @navSelectedColor           | \#FFFFFF                                        |
| @navSelectedBackgroundColor | \#372F2B                                        |
| @navSeparatorColor          | \#838383                                        |
| @navCollapsedWidth          | 32px                                            |

# Customize Sample

## Target Design

Assume the image below is our target design for Navbar component - no
border, gradient background, rounded corner or shadow effects.

![](images/styleguide-nav-design.png)

## Implementation Details

### Setup environment and Analyze design

- Check [ this instruction](ZK_Style_Customization_Guide/Look_and_Feel_customization/Customize_Component)
  to setup component customization environment.
- Analyze the design
  - Used Color
      
    Text: 14px, \#FFFFFF, bold

    1st Level Background: \#5687A8, each level is 8% darker in HSV color
    format, which is **darken(#5687A8, (@level-1) \* 5.6)** in LESS

    Hover Text: \#5687A8

    Hover Background: \#FFFFFF

    Selected Text: \#5687A8

    Selected Background: \#FFFFFF

    Disabled Text: \#FFFFFF, 50% opacity (opacity is the same with
    default style)

    Badge Text: 14px, \#FFFFFF

    Badge Text Background: 8% darker than it's background in HSV color
    format, which is **darken(#5687A8, @level \* 5.6)** in LESS
  - Size
      
    Height: 40px

    Width: 180px (minimal, same with default style)

    Horizontal Padding: 8px

    Vertical Padding: 8px

    Badge Text: 24px \* 24px with circle shape

### Modify nav.less file to achieve target design

`Refer`[` here`](ZK_Style_Customization_Guide/Integrate_with_LESS/How_ZK_works_with_LESS/ZK_LESS_Functions)` for built-in zk less functions.`

- Change color by overriding zk less variables.

```css
@import "~./zul/less/_header.less";

@navColor:                     #FFFFFF;
@navBorderColor:               #5687A8;
@navBackgroundColor:           #5687A8; /* first level */
@navHoverBackgroundColor:      #FFFFFF;
@navSelectedColor:             #FFFFFF;
@navSelectedBackgroundColor:   #FFFFFF;
@navSeparatorColor:            #4C7895;
```

- Modify LESS mixin .navLevel(@level) to adopt darkened background on
  each level.

```css
.navLevel(@level) {
    .z-nav-content,
    .z-navitem-content {
        &:hover {
            color: #5687A8; /* add text hover color here */
            background: @navHoverBackgroundColor;
        }
        &[disabled]:hover {
            color: @navColor;
            background: darken(@navBackgroundColor, (@level - 1) * 5.6);
        }
    }
    .z-nav-content,
    .z-navitem-content,
    .z-navseparator {
        background: darken(@navBackgroundColor, (@level - 1) * 5.6);
    }
}
```

- Modify Nav, Navitem size to match target design.

```css
.z-nav,
.z-navitem {
    &-content {
        height: 40px;
        line-height: 40px;
        /* omitted */
    }
}
```

- Modify Nav, Navitem text style to match target design.

```css
.z-nav,
.z-navitem {
    &-text {
        font-size: 14px;
        font-weight: bold;
        /* omitted */
    }
}
```

- Modify Badge Text style inside Nav to match target design.

```css
/* Add extra style inside .navLevel(@level) function */
.navLevel(@level) {
    /* omitted */
    .z-nav-info {
        background: darken(@navBackgroundColor, @level * 5.6);
    }
}

.z-nav-info {
    .fontStyle(@baseContentFontFamily, 14px, bold, #FFFFFF);
    .displaySize(block, 24px, 24px);
    .borderRadius(12px); /* make it circle shape */
    line-height: 24px;
    position: absolute;
    top: 8px; /* match padding */
    right: 8px; /* match padding */
    text-align: center;
    .boxShadow(none);
}
```

## Final result

![](images/styleguide-nav.png)


