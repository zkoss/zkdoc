For sophisticated pages, the performance can be improved if we defer the
creation of child components until they become visible. The simplest way
to do this is by the use of the `fulfill` attribute. In the following
example, the children of the second tab panel are created only if it
becomes visible.

```xml
<tabbox>
    <tabs>
        <tab label="Preload" selected="true"/>
        <tab id="tab2" label="OnDemand"/>
    </tabs>
    <tabpanels>
        <tabpanel>
            This panel is pre-loaded since no fulfill specified
        </tabpanel>
        <tabpanel fulfill="self.linkedTab.onSelect">
            This panel is loaded only if tab2 receives the onSelect event
        </tabpanel>
    </tabpanels>
</tabbox>
```

For more information, please refer to the [On-demand
Evaluation]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/on-demand_evaluation)
section.

{{ ZKDevelopersReferencePageFooter}}
