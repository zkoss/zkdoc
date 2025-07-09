# Component Reference

Component Reference: [ Tabbox]({{site.baseurl}}/zk_component_ref/tabbox)

# DOM Structure

## Default Mold

```html
<div class="z-tabbox z-tabbox-orient z-tabbox-scroll">
    <div class="z-tabs">
        <ul class="z-tabs-content">
            <li class="z-tab">
                <a class="z-tab-content">
                    <div class="z-tab-button">
                        <i class="z-icon-times z-tab-icon"></i>
                    </div>
                    <span class="z-tab-text">
                        <img class="z-tab-image">
                    </span>
                </a>
            </li>
            <!-- other tab -->
        </ul>
    </div>
    <div class="z-tabpanels">
        <div class="z-tabpanel"></div>
        <!-- other tabpanel -->
    </div>
    <div class="z-tabbox-icon z-tabbox-left">
        <i class="z-icon-chevron-left"></i>
    </div>
    <div class="z-tabbox-icon z-tabbox-right">
        <i class="z-icon-chevron-right"></i>
    </div>
</div>
```

- Line 1: **z-tabbox-orient** represents tabbox orientation:
  - z-tabbox-top (default),
  - z-tabbox-bottom,
  - z-tabbox-left or
  - z-tabbox-right
- Line 7: [Close Icon Font](http://fortawesome.github.io/Font-Awesome/icon/times/) used.
- Line 22: [Chevron-left Icon Font](http://fortawesome.github.io/Font-Awesome/icon/chevron-left/)
  used for tab scrolling.
- Line 25: [Chevron-right Icon Font](http://fortawesome.github.io/Font-Awesome/icon/chevron-right/)
  used for tab scrolling.

## Accordion Mold

```html
<div class="z-tabbox z-tabbox-accordion">
    <div class="z-tabpanels">
        <div class="z-tabpanel">
            <div class="z-tab">
                <a class="z-tab-content">
                    <div class="z-tab-button">
                        <i class="z-icon-times z-tab-icon"></i>
                    </div>
                    <span class="z-tab-text"></span>
                </a>
            </div>
            <div class=" z-tabpanel-content"></div>
        </div>
        <!-- other tabpanel with tab inside -->
    </div>
</div>
```

- Line 7: [Close Icon Font](http://fortawesome.github.io/Font-Awesome/icon/times/) used.

# LESS Source

Basically, LESS source is correspondent to its DOM structure and each
orientation have different styles.

```css
.z-tabbox {
    /* basic style */

    /* Scrollable style */
    &-scroll {
    }
    /* icon style */
    &-icon {
    }
    /* bottom style */
    &-bottom {
    }
    /* left style */
    &-left {
    }
    /* right style */
    &-right {
    }
    /* Accordion mold */
    &-accordion {
    }
}
/* default tabs style */
.z-tabs {
    &-content {}
}
/* default tab style */
.z-tab {
    &-content {}
    &-button {}
    &-icon {}
    &-text {}
    &-image {}
}
/* default tabpanels style */
.z-tabpanels {
}
/* default tabpanel style */
.z-tabpanel {
}
```

Check complete LESS source for Tabbox from
[Github](http://github.com/zkoss/zk/blob/master/zul/src/archive/web/js/zul/tab/less/tabbox.less).

## LESS Variables

The following LESS variables are used for Tabbox component. Check other
variables from [ here](zk_style_customization_guide/integrate_with_less/how_zk_works_with_less/zk_less_variables).

| Variables                   | Default Value |
|-----------------------------|---------------|
| @tabSelectedBackgroundColor | \#FFFFFF      |

# Customize Sample

## Target Design

Assume the image below is our target design for Tabbox component.

- Default Mold
    
  ![](images/styleguide-tabbox-design.png)
- Accordion Mold
    
  ![](images/styleguide-accordion-design.png)

## Implementation Details

### Setup environment and Analyze design

- Check [ the instruction](zk_style_customization_guide/look_and_feel_customization/customize_component)
  to setup component customization environment.
- Analyze the design
  - Used Color
      
    Tab Text: 16px, \#FFFFFF

    Selected Tab Text: 16px, \#5687A8

    Border: \#E3E3E3

    Normal Background: \#5687A8

    Selected Background: \#FFFFFF

    Icon (scroll and tab close): 12px, \#FFFFFF

    Tab Close Icon Hover: 12px, \#5687A8

    Tab Icon Hover Background: \#FFFFFF

    Disabled Background: \#ACACAC
  - Size
      
    Tab Height: 48px

    Tab Horizontal Padding: 8px

    Tab Vertical Padding: 8px

    Tab Icon: 24px \* 24px

### Modify tabbox.less file to achieve target design

`Refer`[` here`](zk_style_customization_guide/integrate_with_less/how_zk_works_with_less/zk_less_functions)` for built-in zk less functions.`

- Change overall color by overriding built-in zk less variables.

```css
@import "~./zul/less/_header.less";

@baseBorderColor: #E3E3E3;
@baseBorderRadius: 0px;
@baseGradientStart: #5687A8;
@baseGradientEnd: #5687A8;
@hoverGradientStart: #4C7895;
@hoverGradientEnd: #4C7895;
@tabSelectedBackgroundColor: #FFFFFF;
```

- Modify scrollable button size

```css
.z-tabbox {
    &-icon {
        .iconFontStyle(12px, #FFFFFF);
        min-height: 48px;
        padding: 0;
        line-height: 46px;
        /* omitted */
        
        > i {
            .opacity(1); /* remove opacity */
        }
        &:hover {
            color: #FFFFFF;
        }
    }
    &-left-scroll,
    &-right-scroll {
        width: 48px;
    }
    &-up-scroll,
    &-down-scroll {
        height: 48px;
    }
    &-scroll {
        > .z-tabs {
            margin: 0 48px;
        }
    }
}
```

- Modify Tab size and text size

```css
.z-tab {
    font-size: 16px;
    /* omitted */

    &-icon {
        position: static; /* position decided by .z-tab-button, change it from absolute to static */
        /* omitted */
    }

    &-text {
        color: #FFFFFF;
        padding: 7px 12px; /* expand height to 48px by padding */
        line-height: 32px;
        /* omitted */
    }

    &-button {
        .iconFontStyle(12px, #FFFFFF);
        .displaySize(block, 24px, 24px);
        margin-top: -12px; /* for put icon in vertical middle position */
        line-height: 24px;
        .opacity(1); /* remove opacity effect */
        top: 50%; /* for put icon in vertical middle position */
        right: 8px; /* refer to horizontal padding */
        /* omitted */
        
        &:hover {
            color: #5687A8;
            background: #FFFFFF;
        }
        & + .z-tab-text {
            margin-right: 32px;
        }
    }
    &-selected {
        /* omitted */

        .z-tab-text {
            font-weight: bold;
            color: #5687A8;
        }
    }
    &-disabled {
        background: #ACACAC;
        .opacity(1);
        /* omitted */

        &:hover {
            .verGradient(#ACACAC, #ACACAC);
        }
        .z-tab-button:hover {
            .opacity(1);
        }
        .z-tab-text {
            color: #FFFFFF;
            .opacity(1);
            /* omitted */
        }
    }
}
```

- Modify Accordion size

```css
.z-tabbox {
    &-accordion {
        /* omitted */

        .z-tabpanel > .z-tab {
            /* omitted */
            &-selected {
                /* omitted */

                .z-tab-text {
                    color: #FFFFFF;
                }
            }
        }
        .z-tab-button {
            .opacity(1); /* remove opacity effect */
            &:hover {
                color: #5687A8;
            }
            /* omitted */
        }
        .z-tab-text {
            padding: 7px 8px; /* expand height to 48px by padding */
        }
    }
}
```

## Final result

- Default Mold
    
  ![](images/styleguide-tabbox.png)
- Accordion Mold
    
  ![](images/styleguide-accordion.png)


