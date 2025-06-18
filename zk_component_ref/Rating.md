# Rating

- Java API: <javadoc>org.zkoss.zul.Rating</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Rating</javadoc>

{% include version-badge.html version=8.6.0 %}

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

# Examples

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

## Disabled

If disabled is true, it's not allowed to be rated. (Is allowed to have
an initial rating.)

## Readonly

If true, the rating is only readable, not changeable. (Is allowed to
have an initial rating.)

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p><code>onChange</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has
rated.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`* none`
