---
author: hawk
date: 2024-02-27
version: "10.0.0"
category: small-talk
title: "New Features of ZK 10.0.0"
---

# Introduction

Welcome ZK 10 - faster, lighter, and cloud-ready. With a strong focus on
improving performance and user experience and optimizing cloud-native
scalability, ZK 10 introduces stateless components, client-side
Model-View-ViewModel (MVVM), and embraces TypeScript. Our CI/CD process
now incorporates an improved security framework aimed at enhancing the
protection of ZK apps against potential threats. These enhancements
empower developers to better utilize client-side capabilities for
building secured modern web applications.

Stateless components revolutionize ZK application development by
eliminating server-side states. This shift enables auto-scaling,
resource efficiency, and simplified cloud deployment. With stateless
components, ZK apps can be deployed across regions, scaling elastically
to meet varying workloads while delivering faster response times.
Client-side MVVM ushers in a new era of data binding, reducing server
memory usage and improving performance. Developers can seamlessly turn
their pages into client-side MVVM with the help of the ZK Linter, which
identifies compatibility issues in server MVVM code before upgrading.
Additionally, the adoption of TypeScript brings reliability and
robustness to ZK's front end, enhancing the development experience.

In summary, ZK 10's innovations mark a significant leap forward in web
application development. These features empower developers to build
cloud-native, scalable, and efficient applications, making ZK an
excellent choice for modern web applications.

View [ZK 10 Release
Note](https://www.zkoss.org/product/zk/releasenote/10.0.0).

Visit the [ZK 10 Page](https://www.zkoss.org/product/zk/zk10).

## Download

![](/assets/images/small-talk/demo_button.png)
![](/assets/images/small-talk/download_button.png)

# Highlighted Features

![](/assets/images/small-talk/highlighted_features.png)

## Stateless Components Enables Cloud-Native Apps

{% include edition-availability.html edition="ee" %} ZK 10 introduces brand-new stateless components
called I-Components, allowing developers to build cloud-native, scalable
ZK apps. Stateless components compose UI in a stateless manner with no
server-side state. This enables auto-scaling, improves resource
efficiency, and simplifies deployment on modern cloud platforms.

### Structural Innovation

Each classic(stateful) ZK component consists of both a server-side Java
object and a client-side JavaScript widget. The Java component maintains
the state and syncs changes to its corresponding client widget. On the
other hand, the new stateless components don't have the server-side Java
object. They only generate the client-side widget. Without a Java
object, stateless components do not maintain the state across requests.
ZK creates immutable Java objects that only exist during each
request/response cycle.

![](/assets/images/small-talk/stateful_component_overview.jpg)

![](/assets/images/small-talk/stateless_component_overview.jpg)

To leverage Stateless Components, you will need to use a different set
of APIs:

- You can build a stateless UI with both Java and ZUL. In Java, you need
  the IComponent fluent API. In zul, you need to pass it to
  `Immutables.createComponents()`
- Since there are no server objects, developers listen to events and
  access UI states by receiving states from the client side by Java
  annotation.

For more information, read [basic setup and
usage](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Stateless_Components/Building_Stateless_UI#Setting_up).

By eliminating server-side states, stateless components make it easy to
develop ZK apps that leverage the full power of cloud infrastructure.
The apps can be deployed across regions and scale elastically based on
load. With stateless components, ZK apps gain benefits like:

- Auto-scaling based on demand
- Improved resource utilization efficiency
- Fast elastic scaling up and down
- Service-oriented architecture and modular development
- Reduced memory usage on a server
- Faster response times

Visit [ZK 10 Product Page](https://www.zkoss.org/product/zk/zk10) for
more information. Note that this new feature is an addition to the
current ZK; if you are not ready to use stateless components, you can
still upgrade your existing project to ZK 10 and enjoy other
improvements and fixes.

## Client-side MVVM

{% include edition-availability.html edition="ee" %} ZK (server) MVVM has been a beloved feature since ZK
6 as it automatically binds the View and ViewModel for you. Now, ZK 10
takes a step further and brings data binding to the browser with
client-side MVVM support. This significantly reduces server memory usage
and improves performance by handling the bindings on the client side
rather than the server. Migrating an existing MVVM app is easy - just
toggle a configuration flag and client MVVM is activated. You can choose
to migrate the whole application or a specific part on a page to client
MVVM.

Benefits of client-side MVVM include:

- Reduces memory usage on a server
- Improves response times
- Powerful data binding handled on the client side

### How Client MVVM Works

In ZK(server) MVVM, the server-side binding wires UI components to view
model data. It tracks component bindings in the server memory to sync
states. In the Client MVVM, these bindings happen entirely in a browser.
When an end-user visits a zul, ZK creates the root component and
generates JavaScript widgets only for its child components. If a
component contains lots of child components like a listbox or a grid,
this behavior can significantly reduce the server memory consumption. ZK
exposes the whole ViewModel as a JSON object to the browser and performs
data binding between JSON and js widgets. ZK's client binding then
handles syncing UI widgets' states with properties exposed by the
ViewModel.

When a user interaction changes a widget's state, the client binding
propagates the change to the ViewModel. When a ViewModel property
changes at the server, zk propagates the data as JSON objects for client
binding to update the related UI widgets.

![](/assets/images/small-talk/server_mvvm.png)

![](/assets/images/small-talk/client_mvvm.png)

For more technical information on ZK Client MVVM, visit:

- [Basic setup and
  usages](https://www.zkoss.org/wiki/Small_Talks/2022/May/ZK10_Preview:_Using_the_new_and_light_Client_MVVM)
- [Comparison and FAQ](https://www.zkoss.org/wiki/Small_Talks/2022/September/ZK10_Preview:_Knowing_what_to_expect_from_Client_MVVM)

### ZK Linter Enables Smooth Migration from Server to Client MVVM

{% include edition-availability.html edition="ce" %} ![](/assets/images/small-talk/zk_linter.png "Zk_linter.png") Upgrading from
server MVVM to client MVVM is recommended to enjoy benefits like reduced
memory usage and faster performance. However, not all server MVVM syntax
can be transparently upgraded to client MVVM due to the difference
between the server-side and client-side processing. Some patterns like
type casting and contextual parameters require tweaks to work properly
with client MVVM's client-side data binding.

To help developers smoothly transition to client MVVM, ZK provides a
tool called ZK Client MVVM Linter. This static analysis tool identifies
potential compatibility issues in server MVVM code before upgrading.

The ZK linter analyzes Zul and Java files using a predefined set of
rules covering common scenarios like:

- ContextParams that are not supported by client MVVM
- Unsupported binding parameter types
- Type casting that may cause issues

With the ZK Client MVVM Linter, you can easily assess any upgrade issue
and leverage the benefits of client MVVM with minimal effort.

For more information about using the linter tool, please refer to [this
blog](https://blog.zkoss.org/2023/08/01/zk-10-preview-introducing-zk-client-mvvm-linter/).

Note: while it is suggested to upgrade from ZK(server) MVVM to Client
MVVM to enjoy boosted performance, if you are not ready, you can still
upgrade your existing project to ZK 10 to take advantage of other new
features and fixes.

## TypeScript adoption brings robustness and reliability

{% include edition-availability.html edition="ce" %} Since ZK 10, we have migrated all the client-side
JavaScript code to [TypeScript](https://www.typescriptlang.org/), a
statically typed superset of JavaScript. This brings several key
benefits:

- Reliable auto-completion and navigation from the IDE
- Catch errors early through static type-checking
- Enforce project conventions with custom lint rules
- Safer interoperability between modules
- Closer to Java programming experience

An NPM package, [zk-types](https://www.npmjs.com/package/zk-types), with
type definitions for the ZK JavaScript APIs, is also provided. This
allows using TypeScript to customize ZK in a type-safe manner.

This transition is backward compatible -- if you have been customizing
the ZK front-end with JavaScript, no worries, these customizations will
continue to work. Overall, TypeScript adoption makes extending and
customizing ZK's frontend much more reliable and robust. For more
information, visit [this
blog](https://blog.zkoss.org/2022/12/05/zk-10-preview-customizing-zk-frontend-made-easier-and-safer-with-typescript/).

# Enhancements

![](/assets/images/small-talk/enhancements.png)

## Security Enhancements

### Enhanced Security Framework

{% include edition-availability.html edition="ce" %}

![](/assets/images/small-talk/enhanced_security_framework.png)

In addition to the rich array of new features, we introduced an enhanced
security framework to fortify our software against potential threats -
integrating three powerful security checks into our CI/CD process.

- **Synk** scanning diligently analyzes both source code and third-party
  dependencies, ensuring that our software remains resilient against
  known security vulnerabilities.
- **CodeQL PR** scanning, powered by GitHub's cutting-edge security
  analysis engine, rigorously assesses pull requests for Java,
  JavaScript, and Typescript code within our codebase, providing an
  added layer of protection against potential risks.
- Our integration of **SonarCube** scanning offers a comprehensive
  evaluation of source code across our projects, detecting and
  addressing bugs, vulnerabilities, code smells, and security
  vulnerabilities in source code.

With these proactive security measures in place, we're dedicated to
providing you with a secure and reliable framework, empowering you to
build with confidence.

### Stricter GET/POST Handling Prevents Attacks

{% include edition-availability.html edition="ce" %}
![](/assets/images/small-talk/strict_get_post_handling.png "Strict-get-post-handling.png")

ZK 10 enhances security by handling GET and POST requests more strictly.
Previously, ZK's DHtmlUpdateServlet handled both request types in the
same way. Now, ZK will respond with 404 if an AU update is sent via GET
instead of POST.

This defends against HTTP verb tampering attacks. By differentiating GET
and POST handling, ZK ensures the appropriate logic executes for each
request type and eliminates a potential attack vector. Although ZK's
architecture already prevents the forgery of AU requests, this change
adds extra safety and responds to our commitment to a secure-by-design
architecture.

### Enable InaccessibleWidgetBlockService by Default

{% include edition-availability.html edition="ee" %}
![](/assets/images/small-talk/inaccessiblewidgetblockservice.png "InaccessibleWidgetBlockService.png")

The InaccessibleWidgetBlockService is now enabled by default to enhance
security. Previous versions require developers to enable it manually.

With this change, ZK applications will block requests from inaccessible
widgets without any extra configuration needed. This prevents issues
like users making disabled buttons clickable.

The default blocking rules are:

- Block all events from disabled and invisible components
- Block onChange, onSelect, etc for read-only components
- Allow onOpen events

You can customize the blocked events and rules if needed. For details,
please see [Block
Request for Inaccessible Widgets](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Security_Tips/Block_Request_for_Inaccessible_Widgets).

#### Upgrade Notice

Some of you **send events to invisible components** to perform an
application logic, and notice that it doesn't work as before because of
this change. See [How to Disable](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Security_Tips/Block_Request_for_Inaccessible_Widgets#How_to_Disable)

### Upgade 3rd party dependencies

Upgraded the following optional dependencies to eliminate
vulnerabilities:

| Optional Dependency | Version       |
|---------------------|---------------|
| closure-compiler    | v20230802     |
| groovy              | 5.0.0-alpha-1 |
| gson                | 2.10.1        |
| jackson-databind    | 2.15.2        |
| rhino               | 1.7.14        |

## Integrate Font Awesome 6 offering Over 2,000 Free Icons

{% include edition-availability.html edition="ce" %} ZK 10 upgrades the built-in Font Awesome icon
library from 4.7.0 to **6.4.2**. This update provides a comprehensive
set of free icons and features:

- [Over 2,000 free icons](https://fontawesome.com/search?o=a&m=free)
  (mostly in **solid** style)
- Redesigned icons with a modern look
- Supports Font Awesome 6 and 4 syntax for backward compatibility

![](/assets/images/small-talk/font_awesome64.png)

To use an icon, simply specify the CSS class name at the component's
`iconSclass`, e.g.:

```xml
<button iconSclass="z-icon-house z-icon-solid"/>
```

no need to include any files or apply extra CSS. All icons are built-in
and optimized for ZK. However, if you upgrade from a previous version,
you will need to use the new names referencing Fontawesome's
documentation; for example, z-icon-home is the name in version 4.7, but
z-icon-house is the corresponding new home icon in 6.4.2.

This upgrade keeps ZK apps up-to-date with the latest Font Awesome icons
and styles. You can leverage new icons and designs quickly with the
familiar easy-to-use syntax.

## Web Accessibility Enhancements

We recently conducted a new set of accessibility tests against the
latest Lighthouse tool and implemented several improvements to ARIA
roles and attributes, aria-checked attributes, and accessible names.

## Other Changes

- Remove outdated Applet, Flash, and FusionChart components since ZK 10
- Add all new HTML5 tags in ZK 10 ZHTML
- Support loading locale-dependent resources in a relative path
- org.zkoss.zk.ui.uuidRecycle.disabled existed for an IE6 compatibility
  issue; it is now deprecated as IE6 is no longer relevant

# Important Upgrade Notes

## Java 11 Required

The binary-compatible level of ZK 10 is Java 11. Please make sure to use
Java 11/Jakarta 11 or a higher version.

## Supported Browsers

ZK 10 supports modern browsers; IE 11 (and lower IE versions) are no
longer supported.

## Adopt TypeScript

Starting from ZK 10, Typescript has been employed instead of JavaScript
on the client side. We've designed it to be as compatible as possible,
and in most cases, the upgrade is transparent for developers; however,
there may still be instances where a custom ZK JavaScript widget
requires updating.

## Upgrade tool: ZK Linter

We cleaned up many deprecated APIs in ZK 10; You can use the Java
compiler to help you locate removed APIs in your Java files and use ZK
Linter to check the removed attributes in your zul files.

We prepared a set of Linter rules that help to check against these
removed zul attributes and simplify your upgrade process. Follow
[zklinter starter
project](https://github.com/zkoss-demo/zk-client-mvvm-linter-starter/blob/master/)
to set up zk linter and scan your zul files. Make sure you include zk 10
upgrade rule in
[app.properties](https://github.com/zkoss-demo/zk-client-mvvm-linter-starter/blob/master/app.properties).

If it finds an incompatibility, it will show a warning like:

```text

INFO: /yourpath/yourpage.zul  
WARNING:    6:  6   The attribute, type, in <script> is no longer supported since ZK 10. Deprecated since 5.0.0, text/javascript is always assumed, please remove it.  
```

follow the hints to remove or replace the unsupported attribute.

### Use zklinter in Maven Project

{% include Notice.html text="A newer version of ZK Linter has been released.
Follow the [simplified
instructions here](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/Upgrade_Tips/Version_Upgrade#Upgrading_to_ZK_10_-_zklinter_Can_Find_Removed_Attributes)." %} ZK Linter is a gradle project. If you are
using Maven, follow the instructions below:

1\. Include the zklinter jar:

```xml
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zklinter</artifactId>
            <version>10.0.0-Eval</version>
        </dependency>
```

2\. add
[app.properties](https://github.com/zkoss-demo/zk-client-mvvm-linter-starter/blob/master/app.properties)

3\. put [upgrade rule
classes](https://github.com/zkoss-demo/zk-client-mvvm-linter-starter/tree/master/src/main/java/org/zkoss/zklinter/upgrade/rule)
into your project source

4\. Run zklinter with `exec-maven-plugin`:

```xml
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>3.1.1</version>
                <executions>
                    <execution>
                        <id>zklinter</id>
                        <phase>process-resources</phase>
                        <goals>
                            <goal>java</goal>
                        </goals>
                        <configuration>
                            <mainClass>org.zkoss.zklinter.App</mainClass>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
```

then run maven goal `mvn process-resources` to start scanning

### Removed API

Most of the APIs removed have been deprecated for a long time. See [Removed API](/zk_dev_ref/upgrade_tips/removed_api) for the complete
list.

## Unsupported Themes: Breeze, Sapphire, Silvertail, and Atlantic

Breeze, Sapphire, Silvertail, and Atlantic are deprecated and no longer
supported since ZK 10.

If you use Breeze, Sapphire, or Silvertail, we suggest you migrate to a
compact theme like `iceblue_c` when upgrading to ZK 10 because a compact
theme like `iceblue_c` has a similar font size, paddings, and margins as
those deprecated themes.

If you use Atlantic, we suggest you migrate to `iceblue`.

See [How to Switch Themes](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Theming_and_Styling/Switching_Themes)
for details. Use [ZK Theme
Template](https://github.com/zkoss/zkThemeTemplate) if you wish to
further customize the theme.

Check [theme demo](https://www.zkoss.org/zkthemepackdemo/) for all
themes.

### Keep 10.0.0 for Upgrade

You can still download the unsupported themes (Breeze, Sapphire,
Silvertail, and Atlantic) for ZK 10.0.0. These versions are provided to
help you upgrade to 10.0.0 without immediately breaking your layout.

We recommend using these themes temporarily during your upgrade process
to ensure visual consistency while you address other technical updates.
After resolving any upgrade issues, you should migrate to a supported
theme like iceblue_c or iceblue.

Please note that there will be no further releases for these unsupported
themes starting from ZK 10.1.0.

## Removed zkplus-legacy module

ZK's first databinding mechanism (Annotate Data Binder) was introduced
in ZK 3, and deprecated in ZK 7. In prior releases, the Annotate data
binder feature was moved to a separate package (zkplus-legacy), to help
identify its deprecated status.

In ZK 10, the Annotate Data Binder is no longer supported, and
zkplus-legacy is no longer available. If you need to upgrade a ZK
application using Annotate Data Binder, we recommend rewriting the
relevant pages to use the modern ZK MVVM databinding instead. Please
refer to [ZK MVVM
Reference](https://books.zkoss.org/zk-mvvm-book/10.0/index.html).

## Add-on Compatibility

The following add-ons have been updated to support ZK 10.

| Add-on | ZK-10 Compatible Releases | Notes |
|----|----|----|
| ZK Pivottable | 3.0.0 or later | 3.0.0 is for ZK 10 only. For ZK 9, please use 2.5.3 |
| Keikai Spreadsheet | 6.0.0 or later | 6.0.0 is for ZK 10 only. For ZK 9, please use Keikai 5 |
| ZK SpringBoot Starter | 3.2.3 or later | 3.2.3 contains auto-config for client mvvm and stateless components |
| ZATS | 10.0.0 or later | ZATS 10 is for ZK 10 only. For ZK 9, please use ZATS 3.0 or 4.0 |

Other add-ons, such as ZK Charts, ZK CKEditor, ZK Spring, ZK Calendar,
and ZK Gmaps are not affected.

# Summary

ZK 10 brings significant enhancements, including stateless components,
client-side Model-View-ViewModel (MVVM), TypeScript support, and
enhanced security. We trust that you will find these enhancements
valuable and invite you to explore this release for creating fast,
modern, and secured applications.

