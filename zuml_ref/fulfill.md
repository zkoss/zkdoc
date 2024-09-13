**Syntax:**

`fulfill="`*`conditon`*`"`  
`fulfill="`*`conditon_1`*`, `*`conditon_2`*`,..."`  
`fuffill="`*`condition`*`=`*`a_uri`*`"`  
`fulfill="`*`conditon_1`*`, `*`conditon_2`*`=`*`a_uri`*`,..."`

and the fulfill condition (`condition`, `condition_1` and `condition_2`)
could be one of the following:

- *event-name*
- *target-id*.*event-name*
- *id1/id2/id3*.*event-name*
- \${*el-expr*}.*event-name*

It is used to specify when to create the child components. By default
(i.e., `fulfill` is not specified), the child components are created
right after its parent component, at the time the ZUML page is loaded.

If you want to defer the creation of the child components, you can
specify the condition with the `fulfill` attribute. The condition
consists of the event name and, optionally, the target component's
identifier or path. It means that the child elements won't be processed,
until the event is received by, if specified, the target component. If
the identifier is omitted, the same component is assumed.

If an EL expression is specified, it must return a component, an
identifier or a path.

If URI (`a_uri`) is specified, the ZUML document of the given URI will
be loaded and rendered as children of the associated component. Notice
that you could specify at most one URI in a fulfill attribute.

For more information, please refer to [ZK Developer's Reference:
On-demand
Evaluation](ZK_Developer's_Reference/UI_Composing/ZUML/On-demand_Evaluation).

# The onFulfill Event

After ZK applies the fulfill condition, i.e., creates all descendant
components, it fires the `onFulfill` event with an instance of
<javadoc>org.zkoss.zk.ui.event.FulfillEvent</javadoc> to notify the
component for further processing if any.

For example, if you use the `wireVariables` method of the
<javadoc>org.zkoss.zk.ui.Components</javadoc> class, you might have to
call `wireVariables` again to wire the new components in the `onFulfill`
event.

``` xml
<div fulfill="b1.onClick, b2.onOpen" onFulfill="Components.wireVariables(self, controller)">
    ...
</div>
```


