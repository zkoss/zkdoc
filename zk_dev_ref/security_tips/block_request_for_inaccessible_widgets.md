

# Non-existing Components are Safer than Invisible Ones

Users can easily access inaccessible elements (such as disabled or
invisible ones) with a browser developer tool. For example, a hostile
user can make an invisible button visible and then click it to trigger
unexpected actions. Thus, it is recommended not to create an element if
it is not supposed to be accessible. For example, the first statement is
safer than the second one in the following example:

``` xml
<button unless="${accessible}"/>
<button visible="${accessible}"/>
```

# Block with `InaccessibleWidgetBlockService`

ZK provides the
\`<javadoc>org.zkoss.zkmax.au.InaccessibleWidgetBlockService</javadoc>\`
to block events sent from inaccessible widgets with a default set of
rules. An inaccessible widget is defined as one that is either disabled,
invisible, or read-only. It's important to note that these default rules
may not apply to all use cases.

Before 10.0.0, the Inaccessible Widget Blocking Service is not enabled
by default. Users need to enable it manually.

In ZK 10.0.0 and later, this blocking service is enabled by default to
enhance security.

## Limitation

This service is an additional filter to improve security but does not
replace verifying roles and permissions in your business logic. Always
verify access on the server side.

## Apply the Default Blocking Service

To apply it to the whole application, just specify the following in
`zk.xml` as follows:

``` xml
<listener>
    <listener-class>org.zkoss.zkmax.au.InaccessibleWidgetBlockService$DesktopInit</listener-class>
</listener>
```

Then, each time a desktop is created, an instance of
`InaccessibleWidgetBlockService` is added to the desktop to block the
requests from the inaccessible widgets.

## Default Blocking Rules

- Block all events from **disabled** and **invisible** components
- Block `onChange, onChanging, onSelect` of a **read-only** component
- **Don't** block `onOpen`

## Supported Components

All invisible components are blocked. Some components are blocked when
they are disabled/read-only, as follows:

| **Component** |
|---------------|
| Button        |
| A             |
| Listbox       |
| Menuitem      |
| Navitem       |
| Textbox       |
| Tree          |
| Intbox        |
| Spinner       |
| Doublebox     |
| Decimalbox    |
| Longbox       |
| Doublespinner |
| Timepicker    |
| Timebox       |
| Checkbox      |
| Datebox       |
| Combobox      |
| Chosenbox     |
| Selectbox     |

## Specify Events to Block

If you just want to block particular events, not all events. Then, you
can specify a list of events in `zk.xml` like below to control the
behavior of
<javadoc>org.zkoss.zkmax.au.InaccessibleWidgetBlockService</javadoc>.
For example,

``` xml
<library-property>
    <name>org.zkoss.zkmax.au.IWBS.events</name>
    <value>onClick,onChange,onSelect</value>
</library-property>
```

# Implement Your Own Blocking Rules

If you want to block a request for inaccessible widgets for the whole
application or for a particular desktop, you can implement the
<javadoc>org.zkoss.zk.au.AuService</javadoc> interface to filter out
unwanted requests. The implementation of `AuService` is straightforward.
For example, the following example blocks only `onClick` of `Button`:

``` java
public class MyBlockService implements org.zkoss.zk.au.AuService {
    public boolean service(AuRequest request, boolean everError) {
        final Component comp = request.getComponent();
        return (comp instanceof Button) && "onClick".equals(request.getCommand());
            //true means block
    }
}
```
