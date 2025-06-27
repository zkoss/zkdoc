

# Setting up

To set up stateless components in a ZK 10 application, you need to
include the stateless components module and define a Dispatcher Richlet
Filter in your `WEB-INF/web.xml` file.

## Including Required Jar

```groovy
dependencies {
    implementation "org.zkoss.zk:stateless:${zkVersion}"
    ...
}
```

## Dispatcher Richlet Filter

```xml
<filter>
    <filter-name>DispatcherRichletFilter</filter-name>
    <filter-class>org.zkoss.stateless.ui.http.DispatcherRichletFilter</filter-class>
    <init-param>
        <param-name>basePackages</param-name>
        <param-value><!-- your base packages --></param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>DispatcherRichletFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

# Example Application

We will use the simple shopping cart application as an example to
introduce the basic features of stateless components ([download the shopping cart example project](https://github.com/zkoss-demo/zk10-shopping-cart-demo)):
![]({{site.baseurl}}/zk_dev_ref/images/shoppingcart.png)

# Building UI with Richlet

Building user interfaces (UI) with stateless components requires
creating a
[StatelessRichlet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/stateless/ui/StatelessRichlet.html)
and mapping a URL to that richlet.

# URL Mapping

We use `@RichletMapping` to compose a URL. When users visit that URL, ZK
will invoke the corresponding method.

For example below, the `index()` URL will be **<protocal>://
<host name: port> /shoppingCart**.

```java
    @RichletMapping("/shoppingCart")
    public class DemoRichlet implements StatelessRichlet {
        @RichletMapping("")
        public List<IComponent> index() {
            //return ...
        }
    }
```

## Class-Level Mapping

At this level, `@RichletMapping` defines the base path for all methods
in a `StatelessRichlet`. For example, assigning
`@RichletMapping("/shoppingCart")` to the `DemoRichlet` class sets a
foundational path for all UI components it manages.

## Method-Level Mapping

Within the `StatelessRichlet`, each method can specify further URL
mapping. By applying `@RichletMapping("")` to a method, the specified
path appends to the class-level path.

Hence, the final URL is the combination of the class-level path and
method-level mapping one, for example:

```xml
http://localhost:8080/[CLASS_LEVEL PATH]/[METHOD_LEVEL PATH]
```

# Composing the UI with Stateless Components

Before ZK 10, ZK components are stateful, meaning that the server holds
the state. Starting from ZK 10, we provide a set of stateless components
as **Immutable objects**. Immutable objects are constructed once and can
not be changed after they are constructed. After Immutable objects are
rendered, they will be destroyed. Since the stateless component states
will not be saved on the server, they consume less memory.

With stateless components, ZK offers a streamlined, fluent API for
building user interfaces.

- Every classic component has a corresponding stateless version,
  identified by an "I" prefix, denoting "immutable."
- Stateless components employ a builder pattern, using methods like
  `of()` for initializing properties and `withSclass()` for setting
  classes.

Here's a comparison of UI composition between classic and stateless
components:

**Classic Component in ZK 9**

```java
Button button = new Button("add items");
button.setSclass("add-items");
```

**Equivalent Stateless Component in ZK 10**

```java
IButton.of("add items")
.withSclass("add-items");
```

Therefor, for the method with URL mapping, we should return a list of
components like:

```java
    @RichletMapping("")
    public List<IComponent> index() {
        return asList(
            IStyle.ofSrc(DEMO_CSS),
            IVlayout.of(
                renderShoppingCart(),
                Boilerplate.ORDER_TEMPLATE
            )
        );
    }
```

# Event Wiring

To wire an action handler method for an event, you need to call
`withAction(ActionHandler action)` with a **public method** reference:

```java
IButton.of("add item +")
    .withSclass("add-items")
    .withAction(ActionType.onClick(this::addItem)) 
```

- Line 3: it means register `addItem()` as an action handler for
  `onClick` event on `IButton`. ActionType supports all types of
  component events.

In stateless components, we use the term **action handler**, which
distinctly separates it from the event listener associated with classic
components.

Hence, when a user clicks the button above, ZK will invoke `addItem()`
declared in the Richlet.

# Obtain Component State

Since a server no longer holds a component's state (it's on the client
side), we provide `@ActionVariable` to access a UI component's state
sent from the client. When ZK invokes an action handler for an event, it
will pass the corresponding parameters you specified.

- `@ActionVariable(targetId = ActionTarget.SELF, field = "id")`
  retrieves the value from the `field` of a component with the
  `targetId` on the client.
  </li>
- `ActionTarget.SELF` represents the component associated with the event
  which is a button. Please see
  [ActionTarget](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/stateless/action/ActionTarget.html)
  for other targets.

```java
    public void addItem(@ActionVariable(targetId = ActionTarget.SELF, field = "id") String orderId) {
    }
```

- in this case, we will get a button's id

## Get User Input

If you register an action handler on an input component like ICombobox:

```java
ICombobox.of(initProductSize)
    .withReadonly(true)
    .withAction(ActionType.onChange(this::doSizeChange))
```

Declare `InputData` in the handler's signature, ZK will pass user input
to you:

```java
public void doSizeChange(InputData data, 
                         @ActionVariable(targetId = ActionTarget.PARENT, field = "id") String uuid){
    String value = data.getValue();
}
```

- in this example, value is what a user input in a Combobox

# Update Component State

ZK provides various APIs on `UiAgent` to update a component's state. You
need to call its method in an action handler method to implement your UI
logic. Then those commands to update component states will be sent to
the client after executing the method.

## Locator

When you manipulate stateless components with `UiAgent` API, you need to
pass a `Locator`. Why? Because your Richlet doesn't have any reference
to a stateless component on the server side, no setter method to call.
Instead, you need to tell ZK client engine the target component you want
to manipulate by describing its location with `Locator`.

### By Component ID

```java
Locator.ofId("myId")
```

### Self

If you declare `Self`, the event target component's Locator, on an
action handler method signature, ZK will pass it to the method. For
example, if I wire the method below with the spinner above for quantity
change:

```java
public void doQuantityChange(Self self,...)
```

- `Self` is the Locator of the spinner.

### By Relative Position

If you have a Locator, you can find another component based on it like

```java
self.nextSibling();
self.closest() //find its parent component
self.firstChild()
```

## Add Child Components

```java
public void addItem(@ActionVariable(targetId = ActionTarget.SELF, field = "id") String id) {
    UiAgent.getCurrent()
           .appendChild(Locator.ofId(SHOPPING_CART_ROWS),
                        renderShoppingCartOneItem(parseOrderId(id)));
}
```

## Change a Component's Property

```java
UiAgent.getCurrent()
    .smartUpdate(Helper.getPriceLocator(self), 
                 new ILabel.Updater().value(String.valueOf(price)))
```

- It changes a label'a value with a `price`

## Remove Components

The following code removes a component specified by `Locator`.

```java
    public void doDelete(@ActionVariable(targetId = ActionTarget.PARENT, field = "id") String id) {
        ...
        UiAgent.getCurrent().remove(Locator.ofId(id));
    }
```

### Clear Child Components

```java
UiAgent.getCurrent()
    // empty the shopping cart rows
    .replaceChildren(Locator.ofId(SHOPPING_CART_ROWS))
```

# Building UI in a zul

Many users still prefer to build UI in a zul because it's more readable
than java code. In a stateless richlet, zk also provides a way to build
UI in a zul:

```java
@RichletMapping("/zul")
public class ZulRichlet implements StatelessRichlet {
    @RichletMapping("")
    public List<IComponent> index() {
        // build UI via a zul but render it in stateless components
        return Immutables.createComponents("stateless-page.zul", null);
    }
```

Remember that zk creates stateless components based on the zul in such a
usage

## Wire Action Handlers

When using a zul, you need to apply `@Action` on a method instead of
`withAction()` to wire an action hander:

```java
    @Action(from = "#calculate", type = Events.ON_CLICK)
    public void calculate(@ActionVariable(targetId = "firstMember") int firstMemberValue,
                          @ActionVariable(targetId = "secondMember") int secondMemberValue,
                          @ActionVariable(targetId = "operation", field = "selectedIndex") int operation) 
```

- Line 1: this line wires the method as an action handler for onClick
  event on a component whose id is `calculate`. Specify a component
  selector in `from`, e.g. `#calculate` is ID selector. see
  [{{site.baseurl}}/zk_dev_ref/mvc/controller/wire_components#CSS3-like_Selectors]({{site.baseurl}}/zk_dev_ref/mvc/controller/wire_components#CSS3-like_Selectors)
