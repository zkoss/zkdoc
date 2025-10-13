---
title: "Setting Up ZK Pivottable"
---

We recommend to [use Maven](/zk_pivottable_essentials/using_maven), or you need to obtain required JAR manually.

# Prerequisites

- Download the latest ZK CE from [ZK download](http://www.zkoss.org/download/zk.dsp)
- Download ZK Pivottable from [ZK Pivottable download](http://www.zkoss.org/download/zkpivottable.dsp) 

## Exporting requires POI
If you need to export a Pivottable to an Excel xlsx/xls file, you need to include additional jar files. 

{% include supported-since.html version="3.1.0" %}
Customer only, need Maven account/password.
* [https://maven.zkoss.org/repo/keikai/ee/io/keikai/keikai-poiex/5.13.0/keikai-poiex-5.13.0.jar](https://maven.zkoss.org/repo/keikai/ee/io/keikai/keikai-poiex/5.13.0/keikai-poiex-5.13.0.jar)
* [https://maven.zkoss.org/repo/keikai/ee/io/keikai/keikai-poi/5.13.0/keikai-poi-5.13.0.jar](https://maven.zkoss.org/repo/keikai/ee/io/keikai/keikai-poi/5.13.0/keikai-poi-5.13.0.jar)

You also need the following 3rd party libraries that you can get from [maven central repository](https://central.sonatype.com/):

* org.apache.commons:commons-math3:jar:3.6.1
* org.apache.xmlbeans:xmlbeans:jar:5.0.3
* org.apache.poi:poi-ooxml-full:jar:5.2.2
* commons-codec:commons-codec:jar:1.15

### Older version
For older versions, you can download zpoi jar at the following URL:

No authentication required.
* [https://mavensync.zkoss.org/maven2/org/zkoss/poi/zpoiex/](https://mavensync.zkoss.org/maven2/org/zkoss/poi/zpoiex/)
* [https://mavensync.zkoss.org/maven2/org/zkoss/poi/zpoi/](https://mavensync.zkoss.org/maven2/org/zkoss/poi/zpoi/)

You also need the following 3rd party libraries that you can get from [maven central repository](https://central.sonatype.com/)
* dom4j-1.6.1.jar
* ooxml-schemas-1.1.jar
* xmlbeans-2.3.0.jar

# Install
Simply include the Pivottable jar in your ZK project, then it is
available for you.


# Jakarta EE
Since Pivottable is independent of Java EE–specific APIs, so the same jar file can work on both Java EE and Jakarta EE.