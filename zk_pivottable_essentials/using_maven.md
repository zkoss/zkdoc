---
title: "Using Maven"
---

This section describes the Maven settings required to use ZK Pivottable
in your application. Please refer to [this section]({{site.baseurl}}/zk_installation_guide/maven_setup)
for the Maven settings for ZK Framework.

# Dependency

Check [evaluation repository](https://mavensync.zkoss.org/eval/org/zkoss/pivot/pivottable/)
or [premium repository](https://maven.zkoss.org/repo/zk/ee/org/zkoss/pivot/pivottable/)
for available versions.

```xml
<dependencies>  
    <dependency>
        <groupId>org.zkoss.pivot</groupId>
        <artifactId>pivottable</artifactId>
        <version>${pivottable.version}</version>
    </dependency>
</dependencies> 
```

## Migrate to Keikai-poi
{% include supported-since.html version="3.1.0" %}
For improved security and maintainability, Pivottable now uses keikai-poi 5.13.0 (or the latest version of Keikai 5.x) instead of zpoi. This change is required for users who need to export pivot tables to Excel (.xlsx) files.

```xml
<dependency>
    <groupId>io.keikai</groupId>
    <artifactId>keikai-poiex</artifactId>
    <version>5.13.0</version>
</dependency>
```

keikai-poiex is at a different repository that you need to specify it explicitly:
```xml
<repository>
  <id>Keikai EE</id>
  <name>Keikai EE Repository</name>
  <url>https://maven.zkoss.org/repo/keikai/ee/</url>
</repository>
```
<!--
https://tracker.zkoss.org/browse/ZKPVT-98
-->

# Configure Repository

You would refer to different repositories in your pom.xml depending on
whether you are evaluating or you are a premium user.

Please check [Add ZK Maven Repository to Your Projects](/zk_installation_guide/maven_setup#add-zk-maven-repository-to-your-projects)

## Sample of pom.xml for licensed ZK Pivottable Package

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
        http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>zkpvt</groupId>
    <artifactId>sample</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <properties>
        <!-- please change the version accordingly -->
        <zk.version>9.6.5</zk.version>
        <zkpivot.version>3.0.0</zkpivot.version>
        <zkpoi.version>3.8.1</zkpoi.version>
    </properties>
    <packaging>war</packaging>
    <name>The sample Project</name>
    <repositories>
        <repository>
            <id>ZK CE</id>
            <name>ZK CE Repository</name>
            <url>http://mavensync.zkoss.org/maven2</url>
        </repository>
        <repository>
            <id>ZK EE</id>
            <url>https://maven.zkoss.org/repo/zk/ee</url>
        </repository>
    </repositories>
    <dependencies>
        <dependency>
          <groupId>org.zkoss.pivot</groupId>
          <artifactId>pivottable</artifactId>
          <version>${zkpivot.version}</version>
        </dependency>
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zul</artifactId>
            <version>${zk.version}</version>
        </dependency>
        <!-- Optional: ZK Pivottable dependency (export to excel format) -->
        <dependency>
            <groupId>org.zkoss.poi</groupId>
            <artifactId>zpoiex</artifactId>
            <version>${zkpoi.version}</version>
        </dependency>
        
    </dependencies>
</project>
```

### Troubleshooting

If you have problem switching from the evaluation repository to the
licensed one, please check the followings:

- **Remove evaluation repository**, [use ZK EE repository instead]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Repository)
- [Login authentication]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Login_authentication)
- [Delete maven local repository evaluation cache]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Purge_local_repository_evaluation_cache)

#### Purge local repository evaluation cache

- 1\. Add purge-local-repository plugin in pom.xml

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <version>2.6</version>
                <executions>
                    <execution>
                        <id>purge-local-dependencies</id>
                        <phase>clean</phase>
                        <goals>
                            <goal>purge-local-repository</goal>
                        </goals>
                        <configuration>
                            <manualIncludes>
                                <manualInclude>org.zkoss.pivot:pivottable
                                </manualInclude>
                                <manualInclude>org.zkoss.poi:zpoiex
                                </manualInclude>
                            </manualIncludes>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

- 2\. Invoke **maven clean** to delete local repository evaluation cache

```xml
mvn clean
```

## Version History

| Version | Date      | Content               |
|---------|-----------|-----------------------|
| 2.0.0   | June 2012 | Add Maven information |
