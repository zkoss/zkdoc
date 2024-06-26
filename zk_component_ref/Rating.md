

# Rating

- Java API: <javadoc>org.zkoss.zul.Rating</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Rating</javadoc>

{% include versionSince\| 8.6.0 %}

# Employment/Purpose

The rating component is a component that allows user selecting an rate
that is smaller than the maximum number.

# Examples

![](rating.gif)

## Default

``` xml
<rating rating="3"/>
```

## Custom Icon

``` xml
 <rating iconSclass="z-icon-bolt"/>
```

### CSS

``` xml
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
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`* none`

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


