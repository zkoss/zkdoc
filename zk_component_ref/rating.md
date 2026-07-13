---
title: "Rating"
---

- **Demonstration:** [Rating](https://www.zkoss.org/zkdemo/input/rating)
- **Java API:** [org.zkoss.zul.Rating](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Rating.html)
- **JavaScript API:** [zul.wgt.Rating](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Rating.html)

{% include supported-since.html version="8.6.0" %}

# Employment/Purpose

The rating component is a component that allows users to select a rating
value that is smaller than the maximum number.

It is ideal for various applications, including e-commerce platforms
where customers can rate products to share their satisfaction, and media
sites where users can evaluate movies or articles. It is also useful for
students to provide feedback on courses and instructors in educational
environments. Additionally, social media platforms can utilize the
Rating component to allow users to express opinions on posts, enhancing
engagement. Overall, it serves as a versatile tool for collecting user
feedback across different domains.

## Common Use Cases

- **E-commerce product reviews:** Let shoppers rate purchased items on a scale of 1–5 stars, then surface the aggregate score alongside product listings.
- **Course or content feedback:** Embed a rating widget at the end of a tutorial or article so learners can signal quality without filling out a full form.
- **Media and entertainment:** Allow users to rate movies, tracks, or episodes; combine with `readonly="true"` to render an aggregate score that cannot be altered.
- **Social engagement:** Give community members a quick way to upvote or score posts; set `cancelable="true"` (the default) so a mis-click can be corrected immediately.
- **Survey and polling:** Use multiple `<rating>` components — one per criterion — inside a `<grid>` to build compact Likert-scale questionnaires.

# Example

![](/zk_component_ref/images/rating.gif)

## Default

```xml
<rating rating="3"/>
```

## Custom Icon

```xml
 <rating iconSclass="z-icon-bolt"/>
```

### CSS

```xml
    <style>
        .myGiftIcon:before {
            content: '🎁';
        }
        .gift .z-rating-icon{
            opacity: 0.5;
        }
        .gift .z-rating-selected, .gift .z-rating-hover{
            opacity: 1;
        }
    </style>
    <rating iconSclass="myGiftIcon" sclass="gift" rating="3"/>
```

# Accessibility

{% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowRight | Increases the rating value. |
| ArrowDown / ArrowLeft | Decreases the rating value. |
| Home | Sets the rating value to 0. |
| End | Sets the rating to its maximum value. |

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

# Properties

## IconSclass

Specify the CSS class name of the rating icon.

## Orient

The orientation is default to `horizontal`, could be changed to vertical
if `vertical` is specified.

## Rating

This is the rating value, which has an initial value if specified to an
integer larger than 0.

## Cancelable

If true, by clicking the previously rated icon again, the rating will be
canceled and set to 0.

## Max

Represents the maximum number of ratings. Also, icons will be rendered
as the max size.

## Readonly

If true, the rating is only readable, not changeable. (Is allowed to
have an initial rating.)

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onChange` | [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes user has rated. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`* none`
