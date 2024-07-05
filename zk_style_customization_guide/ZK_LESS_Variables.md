

LESS variables defined here are for ZK's default theme - Breeze. You can
change these variables when customizing a theme with a new look and
feel.

# Typography

Define base font styles including font family, font size and
line-height.

``` css
// Font Family
@baseTitleFontFamily:          "Helvetica Neue", Helvetica, Arial, sans-serif;
@baseContentFontFamily:        Arial, Sans-serif;

// Font Size
@baseFontSize:                 14px;
@fontSizeLarge:                floor(@baseFontSize * 1.15); // 16px
@fontSizeMedium:               ceil(@baseFontSize * 0.85); // 12px
@fontSizeSmall:                floor(@baseFontSize * 0.8); // 11px

// Line Height
@baseLineHeight:               14px;
```

# Component sizing

Define base width and height.

``` css
// Component Height
@baseHeight:                   8px;
@baseIconHeight:               @baseHeight * 2; // 16px
@baseButtonHeight:             @baseHeight * 3; // 24px
@baseBarHeight:                @baseHeight * 4; // 32px
@baseTitleHeight:              @baseHeight * 5; // 40px

// Component Width
@baseWidth:                    8px;
@baseIconWidth:                @baseWidth * 2; // 16px
@baseButtonWidth:              @baseWidth * 3; // 24px
@baseBarWidth:                 @baseWidth * 4; // 32px

// Border Radius
@baseBorderRadius:             4px;
@borderRadiusLarge:            6px;
@borderRadiusSmall:            3px;
```

# Component Basic Coloring

Define text color, border color, background color and gradient colors.

``` css
// Text color
@baseTextColor:                #000000;
@textColorGray:                #555555;
@textColorGrayDark:            #363636;
@textColorGrayLight:           #636363;

// Border color
@baseBorderColor:              #CFCFCF;
@headerBorderColor:            #9C9C9C;

// Background color
@baseBackgroundColor:          #FFFFFF;
@headerBackgroundColor:        @baseBackgroundColor;

// Gradient background
@baseGradientStart:            #FEFEFE;
@baseGradientEnd:              #EEEEEE;
```

# Icon Font

Define icon's font color (all icon font used in ZK comes from
[font-awesome](http://fortawesome.github.io/Font-Awesome/)).

``` css
// Icon Font
@iconColor:                    #636363;
@iconHoverColor:               #636363;
@iconDisabledColor:            #AAAAAA;
```

# Component State

Define style for component states: active, focus, hover, disabled,
invalid, read-only, selected, selectedhover, checked, and collapsed.

``` css
// Active
@activeColor:                  @baseTextColor;
@activeBorderColor:            #499EB3;
@activeBackgroundColor:        #86E2F9;

// Focus
@focusColor:                   @baseTextColor;
@focusBorderColor:             #00B9FF;
@focusBackgroundColor:         @baseGradientEnd;

// Hover
@hoverColor:                   @textColorGrayLight;
@hoverBorderColor:             #8FB9D0;
@hoverBackgroundColor:         #D6F0FD;

// Disabled
@disabledColor:                #AAAAAA;
@disabledBackgroundColor:      #F0F0F0;

// Invalid
@invalidBorderColor:           #DD7777;

// Read-only
@readonlyBorderColor:          #E6E6E6;
@readonlyBackgroundColor:      #FAFAFA;

// Selected
@selectedColor:                @textColorGrayLight;
@selectedBorderColor:          @baseBorderColor;
@selectedBackgroundColor:      #BEE7FC;

// Selected Hover
@selectedHoverColor:           @textColorGrayLight;
@selectedHoverBorderColor:     @baseBorderColor;
@selectedHoverBackgroundColor: #C5E7F8;

// Checked
@checkedColor:                 #2184BA;
@checkedBorderColor:           #8E8F8F;
@checkedBackgroundColor:       #F8F8F8;

// Collapsed
@collapsedBorderColor:         @baseBorderColor;
@collapsedBackgroundColor:     #FCFCFC;
```

# Component Independent Variables

Above described are common variables that are shared among every
component. Below we will define independent variables that uniquely
belongs to each individual component.

## Button, Input, Table

Define global border and background style for specific DOM element
buttons, inputs, and tables.

``` css
// Button
@buttonBorderColor:            #A9A9A9;
@buttonGradientStart:          #FEFEFE;
@buttonGradientEnd:            #EEEEEE;
// Input
@inputBorderColor:             @baseBorderColor;
@inputBackgroundColor:         @baseBackgroundColor;
// Table
@meshTitleBorderColor:         @baseBorderColor;
@meshContentBorderColor:       #FFFFFF;
@meshBackgroundColor:          #FFFFFF;
@meshStripeBackgroundColor:    #F7F7F7;
@meshFootBackgroundColor:      #FAFAFA;
@meshTitleHoverStart:          #F2F9FE;
@meshTitleHoverEnd:            #D6F0FD;
@meshContentHoverStart:        #F2F9FE;
@meshContentHoverEnd:          #D6F0FD;
```

## Container Components

``` css
// window
@windowBorderColor:            #9C9C9C;
@windowBackgroundColor:        #D9E5EF;
@windowFramePadding:           4px;

// tabbox
@tabSelectedBackgroundColor:   #FFFFFF;

// panel
@panelBorderColor:             #9C9C9C;
@panelBackgroundColor:         #E1EDF4;
@panelBodyBackground:          #F0F6F9;
```

## Data Components

``` css
// group (group, listgroup)
@groupGradientStart:           #FFFFFF;
@groupGradientEnd:             #E9F2FB;

// paging
@pagingColor:                  @textColorBlue;
@pagingSelectedColor:          @textColorGrayDark;
@pagingBorderColor:            @baseBorderColor;
@pagingActiveBorderColor:      #A9A9A9;
@pagingBackgroundColor:        #FAFAFA;
@pagingSelectedBackgroundColor:#E6E6E6;

// biglistbox
@biglistboxBackgroundColor:    #F0F0F0;
@biglistboxFrozenBackground:   #E0E0E0;

// mesh for ie8
@meshBackgroundColorIE8:              #F5F5F5;
@meshHoverBackgroundColorIE8:         #E5F7FF;
@meshSelectedBackgroundColorIE8:      #E5F7FF;
@meshSelectedHoverBackgroundColorIE8: #D9F2FF;
@meshGroupBackgroundColorIE8:         #EDF6FF;
@meshGroupFooterBackgroundColorIE8:   #F2F9FF;
```

## Essential Components

``` css
// popup
@popupBorderColor:             @baseBorderColor;
@popupBackgroundColor:         @baseBackgroundColor;
@popupGradientStart:           @baseBackgroundColor;
@popupGradientEnd:             #F5F5F5;

// notification
@notificationInfoColor:        rgba(33, 155, 166, 0.88);
@notificationWarningColor:     rgba(234, 67, 23, 0.88);
@notificationErrorColor:       rgba(190, 0, 5, 0.88);
@notificationArrowColor:       rgba(51, 51, 51, 0.9);
@notificationInfoColorIE8:     rgb(33, 155, 166);
@notificationWarningColorIE8:  rgb(234, 67, 23);
@notificationErrorColorIE8:    rgb(190, 0, 5);
@notificationArrowColorIE8:    rgb(51, 51, 51);

// menu
@menuImageSize:                16px;
@menuActiveBorderColorTR:      #838383;
@menuActiveBorderColorBL:      #B6B6B6;
@menuPopupBackground:          #FAFAFA;
@menuSeparatorBorderColor:     #838383;
@menuSeparatorBackgroundColor: #B8B8B8;
@menuPopupSeparatorBorder:     #FFFFFF;
@menuPopupSeparatorBackground: #E0E0E0;

// navbar
@navImageSize:                 16px;
@navColor:                     #333333;
@navBorderColor:               #F4F4F3;
@navBackgroundColor:           #FFFFFF; //first level, each level is 3% darker (darken(@navBackgroundColor, 3 * level));
@navHoverBackgroundColor:      #E8E8E8;
@navSelectedColor:             #FFFFFF;
@navSelectedBackgroundColor:   #372F2B;
@navSeparatorColor:            #838383;
@navCollapsedWidth:            32px;
```

## Input Components

``` css
// calendar
@calendarTitleColor:           @textColorGrayLight;
@calendarTitleHoverColor:      @textColorGrayLight;
@calendarCellColor:            @textColorGrayLight;
@calendarSelectedColor:        #008BB6;
@calendarSelectedHoverColor:   #008BB6;
@weekendColor:                 @textColorOrange;
@weekendBackgroundColor:       #F2F2F2;
@weekColor:                    @textColorGrayLight;
@weekofyearColor:              #FFFFFF;
@weekofyearBackgroundColor:    #636363;

// slider
@sliderBorderColor:            @baseBorderColor;
@sliderActiveBorderColor:      #838383;

// errorbox (input constraint)
@errorboxColor:                #990000;
@errorboxBorderColor:          #990000;
@errorboxBackgroundColor:      #FFEEEE;

// progressmeter
@progressmeterGradientStart:   #E8F6FD;
@progressmeterGradientEnd:     #C6E9FA;

// colorbox
@colorboxBorderColor:          #9C9C9C;

// chosenbox
@chosenboxItemBorderColor:     #B3B3B3;
@chosenboxCreateIconColor:     @textColorGreen;
```

## Layout Components

``` css
// splitter (hbox, vbox, borderlayout)
@splitterSize:                 8px;
@splitterGradientStart:        #FDFDFD;
@splitterGradientEnd:          #F1F1F1;
```

## Misc Components

``` css
// mask and loading
@maskBackgroundColor:          #E0E1E3;
@loadingBackgroundColor:       #E3E3E3;

// scrollbar
@scrollbarWidth:               16px;
@scrollbarHeight:              16px;
@scrollbarBorderColor:         #838383;
@scrollbarBackgroundColor:     #DDDDDD;
@scrollbarGradientStart:       #FFFFFF;
@scrollbarGradientEnd:         #CFCFCF;

// drag and drop
@dragColor:                    #FFFFFF;
@dragBackgroundColor:          #E0EAF0;
@dragHoverBackgroundColor:     #ADD2FF;
@dragAllowBorderColor:         #11AA33;
@dragAllowBackgroundColor:     #11AA33;
@dragDisAllowBorderColor:      #C13634;
@dragDisAllowBackgroundColor:  #C13634;
```

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
