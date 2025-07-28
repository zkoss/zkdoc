## Caption

<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %} {% include version-badge.html version=6.5.0 %}

A layout region may have a caption, which is specified by declaring a
child component `<caption>`.

```xml
<borderlayout>
    <north>
        <caption label="search" image="/img/live.gif"/>
        <div>
        Content
        </div>  
    </north>
</borderlayout>
```

## Closable

{% include version-badge.html version=8.5.2 %} Default: `true`

Whether users can open or close the region. Require
`collapsible="true"`. Notice you need to click the icon on the title or
on the splitter to open/close a region. Clicking a title slides a region
instead of opening it. ![](/zk_component_ref/images/Closable.gif)

## Slidable

{% include version-badge.html version=8.5.2 %} Default: `true`

Whether users can slide (preview) the region when clicking on the title
of the collapsed region. It opens the region like a drawer overlapping
on the `<center>`, so it doesn't affect the size of `<center>` which is
different from opening the region. Require `collapsible="true"`.

![](/zk_component_ref/images/layout_slidable.gif)
