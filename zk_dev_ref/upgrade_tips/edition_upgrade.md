# Feature comparison

ZK Framework is offered in 3 editions:
* Community Edition (CE)
* Professional Edition (PE)
* Enterprise Edition (EE)

All editions share the same core architecture and programming model. Applications developed with ZK CE can be upgraded to PE or EE without code changes in most cases.
A detailed comparison of features across editions is available on the [Feature Page](https://www.zkoss.org/whyzk/Features).

## When to Use ZK CE vs ZK EE
Choosing between ZK CE and ZK EE primarily depends on application scale, performance requirements, and enterprise-level needs.

ZK CE is typically suitable when:
* The application has small to moderate data volumes
* The number of concurrent users is limited
* Performance and memory usage are not critical constraints

You are building:
* Prototypes or proofs of concept
* Small-scale internal or departmental applications
* You are comfortable implementing certain optimizations or features manually if needed
ZK CE is fully functional and production-ready for many use cases.

ZK EE is typically used when:
* The application needs to handle large datasets or many concurrent users
* UI performance and server memory usage are important

You require enterprise-grade capabilities out of the box, such as:
* Render-on-Demand (ROD) for large grids, trees, and lists
* Lower memory footprint through features such as Client MVVM or stateless components
* Web accessibility support, including WCAG 2 compliance
* Additional ready-to-use components and themes
* The application is mission-critical, customer-facing, or expected to grow over time

ZK EE provides built-in features that reduce the need for custom performance tuning and help maintain predictable behavior as applications scale.

## Maintenance and Release Cadence
ZK CE and ZK PE/EE follow different maintenance models.
* ZK CE is typically updated as part of major ZK releases, which usually occur every 1–2 years.
* ZK PE/EE are actively maintained and receive regular updates, typically 2-3 times per year.

As a result, PE/EE users can receive fixes and improvements without waiting for a major release, which can be an important consideration for long-running or production-critical applications.

## Notes on Add-ons and Licensing

Some ZK-related products are provided as separate add-ons and are not included in ZK CE, PE, or EE. These include (but are not limited to):
ZK Charts, ZK Pivottable, and Keikai Spreadsheet.

These add-ons:
* Can be used with any ZK edition (CE, PE, or EE)
* Require separate licenses
* Are not part of the core ZK edition feature set

When upgrading from CE to PE or EE, the upgrade applies only to the ZK Framework edition itself. Add-ons must be licensed independently if needed.

# Upgrade the Library

To upgrade from CE to ZK PE or EE (or PE/EE Evaluation):

* Binary zip: download
the corresponding PE/EE (or Evaluation) binary files from the [Download Page](https://www.zkoss.org/download/zk?ee)

* Maven: specify the evaluation
repository and include required PE/EE dependencies if you use maven. [ Maven instructions here](/zk_installation_guide/maven_setup).

Download instructions for paying customers were given at the time of the
purchase. If you are not sure, [contact us](https://www.zkoss.org/support/about/contact) with your License
Certificate Number and we will help.

## Evaluation vs. Official version

We offer 60-day free Evaluation copies for users to try out ZK PE and
EE. The Evaluation copy basically has the same technical capabilities as
the commercially licensed version, except for a few differences:

1\) With the evaluation copy, it is expected to see the following
warning in your server console.

*SEVERE: This is an evaluation copy of ZK EE and will terminate after
sixty days from the first date of installation. Should you require an
open source license or commercial license for ZK EE please contact us at
info@zkoss.org for more information. Alternatively you can download ZK
CE which is licensed under the LGPL.*

Depending on the product you use, the message may be slightly different.
This message is to remind you that you are currently with an Evaluation
copy which is for evaluation only and cannot be used in a production
server.

2\) With the evaluation copy, your application will show an uptime
warning when it reaches a configured time (normally between 8 and 72
hours) and may block your ZK pages. If you are still within your 60-day
trial period, you can restart your webserver to continue your
evaluation.

If you develop your application based on the evaluation copy, when you
are ready to move to the official (paid) version, you do not need to
change your application code. All you need to do is to switch the
library from the evaluation repo/jars to the paid repo/jars, following
the download instructions we provide you at the time of your purchase.

## Include required modules

In addition to the core ZK features, PE/EE users are given access to use
certain add-ons and tools according to the package they are on.

For example, the *zuti* module is an EE-only feature and is required if
you wish to use shadow elements. The *za11y* package is also EE-only and
is required if you wish to have Web accessibility support. Some features
are located in the same repository, but others are in a separate
repository. For example, a EE user can use ZATS Mimic, ZK Spring,
ThemePack themes and ZK Calendar - they are not packaged in the core ZK.
You will need to download them from their download pages, or, include
the dependency in your maven POM file.

If you wish to use a specific feature, reference the document page of
that feature, or [ the content (jar) of binary distributions]({{site.baseurl}}/zk_installation_guide/the_content_of_zk_binary_distribution)
to see if it is already in the core package, or if you need to specify a
different jar file or dependency.

# Use PE/EE specific components and features

After upgrading to PE/EE, you can access more components, features, and
Java classes. Please read the documentation of each feature to learn how
to set it up.

## Features enabled by default

After upgrading to PE/EE, some of the features are enabled by default.
For example, the [ client render on demand]({{site.baseurl}}/zk_config_ref/org_zkoss_zul_client_rod)
feature will be enabled by default to improve the client-side
performance. Also, with EE, the Tablet UI will be enabled by default,
when a tablet or mobile device connects to your application the
tablet-supported components will switch themselves to the tablet theme.
You can manually [ disable them in zk.xml]({{site.baseurl}}/zk_config_ref/org_zkoss_zkmax_tablet_ui_disabled)
if you are not ready.

## Change of default behavior

Some of the default behavior changes after you upgraded the ZK edition.
For example in the case of server push, with CE, it uses client polling.
Once you upgrade to PE, the default push becomes comet push, and with EE
it uses servlet 3 comet. [ Learn more here]({{site.baseurl}}/zk_dev_ref/server_push/configuration).

## Require configuration

Some PE/EE features are now available for you to use, but you will have
to enable them by yourself. For example if you have a big grid or
listbox, you can [ turn on render on demand]({{site.baseurl}}/zk_dev_ref/performance_tips/turn_on_render_on_demand)
to boost its performance.

Please reference the documentation of each feature to see if any
configuration is required and [contact us](https://www.zkoss.org/support/about/contact) if you have any
questions.


