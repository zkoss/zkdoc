

# ZATS Mimic

## Maven Project

Please [ setup zk Maven
repository](ZK_Installation_Guide/Setting_up_IDE/Maven/Use_ZK_Maven_Artifacts/Resolving_ZK_Framework_Artifacts_via_Maven#How_to_Use_ZK_Maven_Repository)
first.

{% include version-badge.html version=9.6.0 %}

### Java EE

``` xml
    <dependency>
      <groupId>org.zkoss.zats</groupId>
      <artifactId>zats-mimic-ext96</artifactId>
      <version>3.0.0</version>
      <scope>test</scope>
    </dependency>
```

Check [CE
repository](https://mavensync.zkoss.org/maven2/org/zkoss/zats/zats-mimic-ext96/)
for the latest version.

### Jakarta EE

``` xml
    <dependency>
      <groupId>org.zkoss.zats</groupId>
      <artifactId>zats-mimic</artifactId>
      <version>4.0.0</version>
      <scope>test</scope>
    </dependency>
```

Check [CE
repository](https://mavensync.zkoss.org/maven2/org/zkoss/zats/zats-mimic/)
for the latest version.

{% include version-badge.html version=7.0.0 %}

Add the following dependency:

``` xml

    <dependency>
      <groupId>org.zkoss.zats</groupId>
      <artifactId>zats-mimic-ext7</artifactId>
      <version>${zats-version}</version>
      <scope>test</scope>
    </dependency>
```

{% include version-badge.html version=6.0.0 %}

Add the following dependency:

``` xml

    <dependency>
      <groupId>org.zkoss.zats</groupId>
      <artifactId>zats-mimic-ext6</artifactId>
      <version>${zats-version}</version>
      <scope>test</scope>
    </dependency>
```

{% include version-badge.html version=5.0.0 %} Add the following dependency:

``` xml

    <dependency>
      <groupId>org.zkoss.zats</groupId>
      <artifactId>zats-mimic</artifactId>
      <version>${zats-version}</version>
      <scope>test</scope>
    </dependency>
```

Also remember to add dependencies of your preferred **unit test
framework**, e.g. JUnit or TestNG.

The above XML is just a sample, you can use another version available in
[ZK Maven
repository](http://mavensync.zkoss.org/maven2/org/zkoss/zats/zats-mimic-ext6/).

ZATS mimic depends on Jetty (`org.eclipse.jetty:jetty-webapp`) and Rhino
(`org.mozilla:rhino`), and these dependencies are already configured in
Mimic's pom.xml. Maven's dependency management will automatically
include jetty-related jars. If not, please check your Maven setting.

## Manually

<div style="font-size:18px;">

[Download ZATS Mimic Binary](http://www.zkoss.org/download/zats)

</div>

For projects depending on **ZK 7**:

Add all jar files under zats-mimic-\[version\].zip/**dist/lib** and
**dist/lib/ext** <span style="color:red"> except </span>
**zats-mimic-ext6.jar** into your project's classpath. **Note that
please do not deploy these jars to your application server, they are for
testing only**.

For projects depending on **ZK 6**:

Add all jar files under zats-mimic-\[version\].zip/**dist/lib** and
**dist/lib/ext** <span style="color:red"> except </span>
**zats-mimic-ext7.jar** into your project's classpath. **Note that
please do not deploy these jars to your application server, they are for
testing only**.

For projects depending on **ZK 5**:

Add all jar files under zats-mimic-\[version\].zip/**dist/lib** and
**dist/lib/ext** <span style="color:red"> except </span>
**zats-mimic-ext6.jar** and **zats-mimic-ext7.jar** into your project's
classpath.

# Unit Test Framework

Also remember to add jar files of your preferred unit test framework,
e.g. JUnit.

``` xml
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
```

 
