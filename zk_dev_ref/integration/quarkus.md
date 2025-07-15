# Overview

Quarkus is a Java framework geared to create Kubernetes deployable
applications, as well as cloud-based applications and self-contained
services runnable from a single package (such as microservices)

For general information regarding ZK usage in Quarkus, please refer to
the smalltalk [Small Talks/2023/May/Creating and deploying ZK Apps with Quarkus](https://www.zkoss.org/wiki/Small_Talks/2023/May/Creating_and_deploying_ZK_Apps_with_Quarkus)

# Quarkus specific configuration

## Websockets

{% include version-badge.html version=10.1.0 %}
{% include edition-availability.html edition="ee" %}

Starting from ZK 10.1.0, ZK provides a plugin to support
quarkus-websockets. ZK Quarkus websocket support is activated by adding
the zk-quarkus plugin to the project:

```xml
<dependency>
    <groupId>org.zkoss.quarkus</groupId>
    <artifactId>zk-quarkus</artifactId>
    <version>1.0.0</version>
</dependency>
```

Then, websockets can be activated in the same way as other ZK
applications. Refer to the websocket guide for more information.

[ZK Developer's Reference/integration/Miscellaneous/Websocket Channel]({{site.baseurl}}/zk_dev_ref/integration/websocket_channel)

## Quarkus ArC / CDI Beans

Quarkus ArC uses CDI bean resolution internally. Currently, the ZK CDI
delegating resolver implementation is incompatible with the CDI version
used by Quarkus.

To use Quarkus ArC / CDI Beans in ZK 10.0.0, please use the
QuarkusCdiDelegatingVariableResolver available [on this tracker ticket](https://tracker.zkoss.org/browse/ZK-5458)

## Packaging

### fast-jar

Quarkus fast-jar supports ZK.

### Native executable

Quarkus native executable supports ZK.

### Uber-Jar

Uber jar require unpacking all dependencies jar into the Uber-Jar
package. As of ZK 10, this causes several conflicts between ZK
configuration files. As a result, Quarkus Uber-Jar does not support by
ZK.
