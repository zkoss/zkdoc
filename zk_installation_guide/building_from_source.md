{% include version-badge.html version=10.0.0 %}

ZK Community Edition (CE) is open-source and free to use under LGPL. In
most cases, you can simply download the CE JAR files and start using
them. Additionally, you have the freedom to modify the source code and
build the JAR files yourself if needed. This guide will show you how to
build ZK CE from source code.

# Steps

## 1. Clone [the repository](https://github.com/zkoss/zk)

## 2. Set a different version

We recommend using a different version number from the official release
version to distinguish your custom build from the official releases,
e.g. add a suffix "-xyz".

1. Remove the script related to ZK EE in `bin/upver.sh`.

``` bash
...
cd $ZKCML # remove the lines starting here
upVer zkcml-parent
upVer zkex
upVer zkmax
upVer zml
upVer zkrt
upVer zuti
upVer zkthemebuilder
upVer za11y
...
```

The code above is to change the version of ZK EE modules since you don't
have those modules, remove them to make the script run without errors.
2. Run `bin/upver.sh` to update the version number in all `pom.xml`
files.

## 3. Build CE JAR only

Since ZK 10, we have switched from Maven to Gradle as the build tool.

- Run
  `./gradlew clean build -x test -x tscheck -x jscheck -PcleanZKOnly=true -PbuildZKOnly=true`
- Need to run `gradlew` to ensure using the expected Gradle version.
- `-x tscheck -x jscheck`: skip these checks because they require ZK EE
  modules.

## 4. Install JAR into your Maven local repository

- Run `./gradlew publishToMavenLocal`

# Jakarta EE

You can use a tool like [Eclipse
Transformer](https://github.com/eclipse/transformer) that transforms ZK
CE JAR to Jakarta EE-compatible JAR.
