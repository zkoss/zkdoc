ZK Community Edition (CE) is open source and free to use. You can build ZK CE from source code. This guide will show you how to build ZK CE from source code. 
# Steps
## 1. Clone [the repository](https://github.com/zkoss/zk)
## 2. Set a different version
* run `bin/upver.sh` to update version number in all pom.xml files.
* We recommend you to use a different version number from the official release version to distinguish it from the official release, e.g. add a suffix "-xyz".

## 3. Build CE jar only
* run `./gradlew clean build -x test -x tscheck -x jscheck -PcleanZKOnly=true -PbuildZKOnly=true`
* Need to run `gradlew` to ensure using the expected gradle version
* `-x tscheck -x jscheck` : skip these checking because they requires ZK EE modules

## 4. Install jar into your maven local repository
* run `./gradlew publishToMavenLocal`