{% include version-badge.html version=10.0.0 %}

ZK Community Edition (CE) is open-source and free to use under LGPL. In most cases, you can simply download the CE jar files and start using them. Additionally, you have the freedom to modify the source code and build the jar files yourself if needed. This guide will show you how to build ZK CE from source code. 
# Steps
## 1. Clone [the repository](https://github.com/zkoss/zk)
## 2. Set a different version
* run `bin/upver.sh` to update the version number in all pom.xml files.
* We recommend using a different version number from the official release version to distinguish your custom build from the official releases, e.g. add a suffix "-xyz".

## 3. Build CE jar only
Since ZK 10, we have switched from Maven to Gradle as the build tool.

* run `./gradlew clean build -x test -x tscheck -x jscheck -PcleanZKOnly=true -PbuildZKOnly=true`
* Need to run `gradlew` to ensure using the expected gradle version
* `-x tscheck -x jscheck` : skip these checking because they requires ZK EE modules

## 4. Install jar into your maven local repository
* run `./gradlew publishToMavenLocal`


# Jakarta EE
You can use a tool like [Eclipse Transformer](https://github.com/eclipse/transformer) that transforms ZK CE JAR to Jakarta EE-compatible JAR.
``` 
