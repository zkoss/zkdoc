# Component Reference

Component Reference: [
Window](ZK_Component_Reference/Containers/Window)

# DOM Structure

``` html
<div class="z-window z-window-mode">
    <div class="z-window-header">
        <div class="z-window-icon z-window-close">
            <i class="z-icon-times"></i>
        </div>
        <div class="z-window-icon z-window-maximize">
            <i class="z-icon-resize-full"></i>
        </div>
        <div class="z-window-icon z-window-minimize">
            <i class="z-icon-minus"></i>
        </div>
    </div>
    <div class="z-window-content"></div>
</div>
```

- Line 1: **z-window-mode** represents various window modes
    
  z-window-embedded

  z-window-overlapped

  z-window-popup

  z-window-modal

  z-window-highlighted
- Line 4: [Close Icon
  Font](http://fortawesome.github.io/Font-Awesome/icon/times/) used.
- Line 7: [Resize-full Icon
  Font](http://fortawesome.github.io/Font-Awesome/icon/resize-full/)
  used.
- Line 10: [Minus Icon
  Font](http://fortawesome.github.io/Font-Awesome/icon/minus/) used.

# LESS Source

Basically, LESS source is correspondent to its DOM structure, and each
mode have different styles.

``` css
.z-window {
    /* basic style */

    /* header style */
    &-header {
    }
    /* icon style */
    &-icon {
    }
    /* content style */
    &-content {
    }
    
    /* Embedded mode */
    &-embedded {
    }
    /* Overlapped mode */
    &-overlapped {
    }
    /* Pop-up mode */
    &-popup {
    }
    /* Modal mode */
    &-modal {
    }
    /* Highlighted mode */
    &-highlighted {
    }
}
```

Check complete LESS source for Window from
[Github](http://github.com/zkoss/zk/blob/master/zul/src/archive/web/js/zul/wnd/less/window.less).

## LESS Variables

The following LESS variables are used for Window component. Check other
variables from [
here](ZK_Style_Customization_Guide/Integrate_with_LESS/How_ZK_works_with_LESS/ZK_LESS_Variables).

| Variables              | Default Value |
|------------------------|---------------|
| @windowBorderColor     | \#9C9C9C      |
| @windowBackgroundColor | \#D9E5EF      |
| @windowFramePadding    | 4px           |

# Customize Sample

## Target Design

Assume the image below is our target design for Window component. No
border, gradient background, rounded corner or shadow effects.

<figure>
<img src="images/styleguide-window-design.png
title="styleguide-window-design.png" />
<figcaption>styleguide-window-design.png</figcaption>
</figure>

## Implementation Details

### Setup environment and Analyze design

- Check [ the
  instruction](ZK_Style_Customization_Guide/Look_and_Feel_Customization/Customize_Component)
  to setup component customization environment.
- Analyze the design
  - Used Color
      
    Title Text: 24px, \#ACACAC

    Border: \#E3E3E3

    Background: \#FFFFFF

    Icon: 12px, \#ACACAC

    Icon Hover: 12px \#FFFFFF

    Icon Hover Background: \#5687A8
  - Size
      
    Title Height: 48px

    Title Padding: 8px(horizontal) 16px(vertical)

    Content Padding: 8px(horizontal) 16px(vertical)

    Icon: 24px \* 24px

### Modify window.less file to achieve target design

`Refer`[` here`](ZK_Style_Customization_Guide/Integrate_with_LESS/How_ZK_works_with_LESS/ZK_LESS_Functions)` for built-in zk less functions.`

- Change color by overriding zk less variables.

``` css
@import "~./zul/less/_header.less";

@windowBorderColor: #E3E3E3;
@windowBackgroundColor: #FFFFFF;
@windowFramePadding: 0px;
```

- Remove rounded corners, border color and gradient background by
  overriding zk less variables.

``` css
@baseBorderRadius: 0;
@baseBorderColor: #FFFFFF;
@baseGradientStart: #FFFFFF;
@baseGradientEnd: #FFFFFF;
```

- Modify Header Title Text.

``` css
.z-window {
    &-header {
        .fontStyle(@baseTitleFontFamily, 24px, normal, #ACACAC);
        padding: 8px 15px; /* 15px = 16px - 1px(border) */
        line-height: 32px;
    }
}
```

- Modify Icons in Header.

``` css
.z-window {
    &-icon {
        font-size: 12px;
        color: #ACACAC;
        .displaySize(block, 24px, 24px);
        margin: 4px 0 0 0;
        line-height: 24px;
        /* omitted */

        &:hover {
            color: #FFFFFF;
            border-color: #5687A8;
            background: #5687A8;
        }
    }
    &-close {} /* remove special style for close icon */
}
```

- Modify Content style and remove shadow effects.

``` css
.z-window {
    &-content {
        border: 0;
        padding: 8px 15px; /* 15px = 16px - 1px(border) */
        /* omitted */
    }
    &-shadow {
        .boxShadow('none');
    }
}
```

## Final result

![](images/styleguide-window.png)

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
