---
title: "Setting Up ZK Charts"
---

# Prerequisites

## Download the Jar and Install Manually

- [Download the latest ZK](https://www.zkoss.org/download/zk)
- [Download the latest ZK Charts](https://www.zkoss.org/download/zkcharts)

The exact steps depend on your IDE, but the important part is to
include both the ZK Charts and ZK JAR files in your project. The project
should be a ZK Project or a Web Application Project, depending on your
environment. Then, place the charts JAR under the **WEB-INF/lib**
folder.

## Maven Project

If your project is managed by Maven already, you can adopt ZK Charts
easily by simply adding a dependency like the following [^1]:

```xml
<dependency>
    <groupId>org.zkoss.chart</groupId>
    <artifactId>zkcharts</artifactId>
    <!-- This is just an example. Please use the latest version. -->
    <version>12.5.0.0-Eval</version>
</dependency>
```

If you didn't setup zk maven repository yet, you have to [setup zk maven repository]({{site.baseurl}}/zk_installation_guide/maven_setup) as well.

### Evaluating users (60-days free evaluation)

- https://mavensync.zkoss.org/eval

**Note**: ZK Charts evaluation version is put in **ZK PE-eval / EE-eval** maven repository. Please add the following config if you want to
try the evaluation version.

```xml
<repositories>
    <repository>
        <id>ZK PE/EE Evaluation</id>
        <url>https://mavensync.zkoss.org/eval/</url>
    </repository>
</repositories>
```

### Premium users only

- <span style="color:red">**Notice**</span>: Need [Login authentication]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Login_authentication)

If you are our customer, please apply for a premium maven account to use
ZK Premium Maven Repository.

- https://maven.zkoss.org/repo/zk/ee

```xml
<repositories>
    <repository>
        <id>ZK EE</id>
        <url>https://maven.zkoss.org/repo/zk/ee</url>
    </repository>
</repositories>
```

- Login authentication

Please refer to the [official documentation](https://maven.apache.org/settings.html#Servers) of Apache
Maven project for storing login authentication credentials in the global
settings file.

- Location (if not already existed, you can create it manually)
  - Maven installation root: <u>\$M2_HOME/conf/settings.xml</u> - OR -
  - User's Maven root: <u>\${user.home}/.m2/settings.xml</u>

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
        http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
        <server>
            <id>ZK EE</id>
            <!-- Same as the repository name used in your pom.xml -->
            <!-- Please replace the following with 
                your premium username and password -->
            <username>your account</username>
            <password>your password</password>
        </server>
    </servers>
</settings>
```

- Sample of pom.xml for using licensed ZK Charts

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
        http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>zkcharts</groupId>
    <artifactId>sample</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <properties>
        <!-- please change the version accordingly -->
		<!-- ZK Framework version. -->
		<zk.version>9.6.5-Eval</zk.version>
		<!-- ZK Charts version. Please use the latest available release. -->
        <zkcharts.version>12.5.0.0-Eval</zkcharts.version>
        <commons-io.version>2.16.1</commons-io.version>
    </properties>
    <packaging>war</packaging>
    <name>The sample Project</name>
    <repositories>
        <repository>
            <id>ZK CE</id>
            <name>ZK CE Repository</name>
            <url>https://mavensync.zkoss.org/maven2</url>
        </repository>
        <repository>
            <id>ZK EE</id>
            <url>https://maven.zkoss.org/repo/zk/ee</url>
        </repository>
    </repositories>
    <dependencies>
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zkbind</artifactId>
            <version>${zk.version}</version>
        </dependency>
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zul</artifactId>
            <version>${zk.version}</version>
        </dependency>
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zkplus</artifactId>
            <version>${zk.version}</version>
        </dependency>
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zhtml</artifactId>
            <version>${zk.version}</version>
        </dependency>

        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>${commons-io.version}</version>
        </dependency>

        <!-- ZK Charts -->
        <dependency>
            <groupId>org.zkoss.chart</groupId>
            <artifactId>zkcharts</artifactId>
            <version>${zkcharts.version}</version>
        </dependency>

    </dependencies>
</project>
```

# Display Version

You can display ZK Charts version in a zul page with EL:

```xml
<?import org.zkoss.chart.Version ?>

    Charts ${Version.UID}
```

To know bundled Highcharts version, evaluate the javascript variable
below:

```javascript
Highcharts.version
```

# Default License Loading Path

ZK Charts loads a license file from the default path:

`WEB-INF/classes/metainfo/chart/license`

If the license is loaded successfully, you should see some license
information printed on your application console like:

```text
*** Potix Corporation License Information ***

     Licensed Company: test1
     Certificate Number: AABB12345
     Licensed Product: ZK Charts
     Maximum Licensed Number: 1 Developer
     Expiry Date: YYYY/MM/DD

     To renew, obtain more licenses, or if you require help, please contact info@zkoss.org.
```
