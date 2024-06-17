# How to Use Maven with ZK

This chapter describes how to use the Maven repository hosted by ZK. (We
assume you have known [Maven](https://maven.apache.org/)) Here
introduces you with a simple example of using ZK maven repository in
your maven build environment.

# Choosing ZK Edition

ZK has 3 editions:

- **CE** (compact edition). Suits for personal use.
- **PE** (professional edition)
- **EE** (enterprise edition)

Please check [the description about ZK
Editions](http://www.zkoss.org/product/edition.dsp) to know the
differences among them and find the proper edition for you.

# Add ZK Maven Repository to Your Projects

According to which ZK edition you use, add the corresponding repository
to your project's pom.xml.

## CE (Freely avaialable under LGPL)

- <https://mavensync.zkoss.org/maven2>

``` xml
 <repositories>
    <repository>
      <id>ZK CE</id>
      <url>https://mavensync.zkoss.org/maven2</url>
    </repository>
  </repositories>
```

## PE-eval / EE-eval (60-days free evaluation)

The evaluation version has the exactly same features as the official
(non-evaluation) ones. You use it to develop a POC and try ZK features
before you adopt the official ones. This can eliminate the potential
technical problems in advance.

``` xml
 <repositories>
    <repository>
      <id>ZK PE/EE Evaluation</id>
      <url>https://mavensync.zkoss.org/eval/</url>
    </repository>
  </repositories>
```

- **Note:** Version number appending with *-Eval* has released since
  Jul. 18 2014. If you use it, please specify the version to *\*-Eval*
  for all of ZK dependencies. For example:

``` xml
<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zk</artifactId>
    <version>8.5.0-Eval</version>
</dependency>
```

## PE / EE (premium users only)

- <span style="color:red">**Notice**</span> : Needs [Login
  authentication](#Login_authentication)

If you are our customer or ZOL licensed user you can contact
info@zkoss.org to apply for a premium maven account to use ZK PE/EE (or
any other licensed ZK product) maven repository.

- <https://maven.zkoss.org/repo/zk/ee>

``` xml
 <repositories>
    <repository>
      <id>ZK EE</id>
      <url>https://maven.zkoss.org/repo/zk/ee</url>
    </repository>
  </repositories>
```

### Login authentication

Licensed Professional and Enterprise customers will be given a set of
user names and password upon your request. According to the [official
doc](http://maven.apache.org/settings.html#Servers) of Apache Maven,
users can create global settings for maven.

- Location (if not-existed, you can create it manually)
  - The Maven install: <u>\$M2_HOME/conf/settings.xml</u>
  - A user's install: <u>\${user.home}/.m2/settings.xml</u>

<!-- -->

- Servers Element
- If you add [ ZK PE](#ZK_PE) or [ ZK EE](#ZK_EE)
  as your repository, you need to add login authentication like
  following example

``` xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
        http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
        <server>
            <id>ZK EE</id><!-- Same as your repository name -->
            <!-- Your premium user name and password -->
            <username>ryanwu</username> 
            <password>2k055ecret</password> 
        </server>
    </servers>
</settings>
```

### Sample of pom.xml for licensed Professional Package

``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>zkpe</groupId>
    <artifactId>sample</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <properties>
        <!-- please check available version in the repository and specify it -->
        <zk.version>9.1.0</zk.version>
    </properties>
    <packaging>war</packaging>
    <name>The sample Project</name>
    <description>The sample Project</description>
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
            <artifactId>zkex</artifactId>
            <version>${zk.version}</version>
        </dependency>
    </dependencies>
</project>
```

### Sample of pom.xml for licensed Enterprise Package

``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>zkee</groupId>
    <artifactId>sample</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <properties>
        <!-- please check available version in the repository and specify it -->
        <zk.version>9.1.0</zk.version>
        <zkspring.version>3.2.0</zkspring.version>
        <zats.version>2.0.0</zats.version>
        <zkjsp.version>2.6.0</zkjsp.version>
        <zkcalendar.version>2.1.5</zkcalendar.version>
        <zkgmap.version>3.0.4</zkgmap.version>
    </properties>
    <packaging>war</packaging>
    <name>The sample Project</name>
    <description>The sample Project</description>
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
        <!-- ZK EE -->
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zkmax</artifactId>
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
            <!-- available since ZK 8 -->
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zuti</artifactId> 
            <version>${zk.version}</version>
        </dependency>


        <!-- ZK Spring -->
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zkspring-core</artifactId>
            <version>${zkspring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zkspring-security</artifactId>
            <version>${zkspring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zkspring-webflow</artifactId>
            <version>${zkspring.version}</version>
        </dependency>

        <!-- ZK JSP -->
        <dependency>
            <groupId>org.zkoss.zk</groupId>
            <artifactId>zuljsp</artifactId>
            <version>${zkjsp.version}</version>
        </dependency>

        <!-- ZK Calendar -->
        <dependency>
            <groupId>org.zkoss.calendar</groupId>
            <artifactId>calendar</artifactId>
            <version>${zkcalendar.version}</version>
        </dependency>

        <!-- ZK Google Maps -->
        <dependency>
            <groupId>org.zkoss.zkforge</groupId>
            <artifactId>gmapsz</artifactId>
            <version>${zkgmap.version}</version>
        </dependency>

        <!-- ZK additional Theme/s more themes -> https://maven.zkoss.org/repo/zk/ee/org/zkoss/theme/ -->
        <dependency>
            <groupId>org.zkoss.theme</groupId>
            <artifactId>breeze</artifactId>
            <version>${zk.version}</version>
        </dependency>
        <dependency>
            <groupId>org.zkoss.theme</groupId>
            <artifactId>deepsea</artifactId>
            <version>${zk.version}</version>
        </dependency>
 
        <!-- or add the whole theme pack
        <dependency>
            <groupId>org.zkoss.theme</groupId>
            <artifactId>theme-pack</artifactId>
            <version>${zk.version}</version>
        </dependency>
         -->
        <!-- ZATS Mimic -->
        <dependency>
            <groupId>org.zkoss.zats</groupId>
            <artifactId>zats-mimic-ext7</artifactId>
            <version>${zats.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

## Trouble Shooting

If you have problems switching from the evaluation repository to the
licensed one, please check the followings:

- 1\. Remove evaluation repository, [ use PE / EE repository
  instead](#PE_.2F_EE_.28premium_users_only.29)
- 2\. Check if [ Login authentication](#Login_authentication)
  is set up correctly
- 3\. [ Delete cached local
  copy](#Purge_local_repository_evaluation_cache)

### Purge local repository evaluation cache

1\. Add purge-local-repository plugin in pom.xml

``` XML
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
                                <manualInclude>org.zkoss.zk:zkex</manualInclude>
                                <manualInclude>org.zkoss.zk:zkmax</manualInclude>
                            </manualIncludes>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

- line 16: ZK PE
- line 17: ZK EE

2\. Invoke **maven clean** to delete local zkex & zkmax repository

``` xml
mvn clean
```

# Adding ZK library dependencies

Depending upon your project requirements your project might depend on
different ZK edition. You can declare these dependencies in the pom.xml
file, and Maven can resolve them by automatically connecting to [ZK
Maven repository](http://mavensync.zkoss.org/maven2). Here is how you
can declare a dependency for the main ZK library and zul library for
your project.

## EE

``` xml
<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zkmax</artifactId>
    <version>${zk.version}</version>
</dependency>
```

## PE

``` xml
<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zkex</artifactId>
    <version>${zk.version}</version>
</dependency>
```

## CE

``` xml
<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zul</artifactId>
    <version>${zk.version}</version>
</dependency>
```

## Optional

``` xml
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
```

For Maven to successfully resolve these dependencies **groupid** and
**artifactid** must match with those published on ZK Maven repository as
they constitute what is known as Maven repository coordinates. For a
complete list of all ZK library groupid and artifactid combinations
please take a look at a [sample
pom.xml](ZK_Installation_Guide/Setting_up_IDE/Maven/Use_ZK_Maven_Repository_without_IDE#Sample_of_pom.xml)
file that lists dependencies for all publically available ZK libraries
on ZK Maven repository.

# Sample of pom.xml

Here is a sample pom.xml for a simple Java project that uses the ZK
maven repository.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"   
xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <modelVersion>4.0.0</modelVersion>
  <groupId>zk.app</groupId>
  <artifactId>MyZKMavenApp</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <repositories>
    <repository>
      <id>ZK CE</id>
      <name>ZK CE Repository</name>
      <url>https://mavensync.zkoss.org/maven2</url>
    </repository>
    <repository>
      <id>ZK EVAL</id>
      <name>ZK Evaluation Repository</name>
      <url>https://mavensync.zkoss.org/eval</url>
    </repository>
  </repositories>
  <dependencies>
....
  </dependencies>
</project>
```

## Required Dependencies

The following are required dependencies you need to include one of them
in your pom.xml according to which ZK edition you use.

### ZK CE

``` xml
<dependencies>
    <dependency>
      <groupId>org.zkoss.zk</groupId>
      <artifactId>zul</artifactId>
      <version>${zk.version}</version>
    </dependency>
</dependencies>
```

### ZK PE

``` xml
<dependencies>
    <dependency>
      <groupId>org.zkoss.zk</groupId>
      <artifactId>zkex</artifactId>
      <version>${zk.version}</version>
    </dependency>
</dependencies>
```

### ZK EE

``` xml
<dependencies>
    <dependency>
      <groupId>org.zkoss.zk</groupId>
      <artifactId>zkmax</artifactId>
      <version>${zk.version}</version>
    </dependency>
</dependencies>
```

## Optional Dependencies

The following dependencies are optional and available for all editions.
You can include them according to your needs.

``` xml
<dependencies>
<!-- It's available since ZK 8. If you want to use shadow component/template injection, include this -->
    <dependency>
      <groupId>org.zkoss.zk</groupId>
      <artifactId>zuti</artifactId> 
      <version>${zk.version}</version>
    </dependency>
<!-- If you want to use data binding, include this -->
    <dependency>
      <groupId>org.zkoss.zk</groupId>
      <artifactId>zkbind</artifactId>
      <version>${zk.version}</version>
    </dependency>
<!-- If you want to use zk xhtml component set, include this -->
    <dependency>
      <groupId>org.zkoss.zk</groupId>
      <artifactId>zhtml</artifactId>
      <version>${zk.version}</version>
    </dependency>
<!-- If you want to use third party framework e.g. hibernate, spring, you can include this -->
    <dependency>
      <groupId>org.zkoss.zk</groupId>
      <artifactId>zkplus</artifactId>
      <version>${zk.version}</version>
    </dependency>
</dependencies>
```

## Check Available ZK Version

Please visit each edition's corresponding ZK Maven repository with a
browser to check the available ZK versions. As of Oct. 2023, the latest
version is 10.0.0-Beta.

## Summary of JAR files

There's something you need to know about ZK's edition and package(s).

<table>
<thead>
<tr class="header">
<th scope="col"></th>
<th width="100px"><p>CE</p></th>
<th width="100px"><p>PE</p></th>
<th width="100px"><p>EE</p></th>
<th scope="col"><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>zk.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK core functions, such as ZK Loader and Update Engine.</p></td>
</tr>
<tr class="even">
<td><p>zul.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK XUL components (http://www.zkoss.org/2005/zul)</p></td>
</tr>
<tr class="odd">
<td><p>zhtml.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK XHTML components (http://www.w3c.org/1999/xhtml)</p></td>
</tr>
<tr class="even">
<td><p>zcommon.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>The common library that ZK depends on</p></td>
</tr>
<tr class="odd">
<td><p>zcommons-el.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK EL expressions (renamed as zel.jar since 6.0)</p></td>
</tr>
<tr class="even">
<td><p>zel.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK EL expressions (since 6.0)</p></td>
</tr>
<tr class="odd">
<td><p>zkbind.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>data binding, required when developing with MVVM</p></td>
</tr>
<tr class="even">
<td><p>zweb.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>The Web library that ZK depends on</p></td>
</tr>
<tr class="odd">
<td><p>zkplus.jar</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK extra utilities integrated easily with other
frameworks.</p></td>
</tr>
<tr class="even">
<td><p>zkex.jar</p></td>
<td></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK additional components and features for PE</p></td>
</tr>
<tr class="odd">
<td><p>zkmax.jar</p></td>
<td></td>
<td></td>
<td><p>V</p></td>
<td><p>ZK additional components and features for EE</p></td>
</tr>
<tr class="even">
<td><p>zuti.jar</p></td>
<td></td>
<td></td>
<td><p>V</p></td>
<td><p>shadow components for EE</p></td>
</tr>
<tr class="odd">
<td><p>client-bind.jar</p></td>
<td></td>
<td></td>
<td><p>V</p></td>
<td><p>Client MVVM for EE</p></td>
</tr>
<tr class="even">
<td><p>stateless.jar</p></td>
<td></td>
<td></td>
<td><p>V</p></td>
<td><p>core of stateless components for EE</p></td>
</tr>
<tr class="odd">
<td><p>stateless-immutable.jar</p></td>
<td></td>
<td></td>
<td><p>V</p></td>
<td><p>immutables of stateless components for EE</p></td>
</tr>
<tr class="even">
<td><p>zml.jar</p></td>
<td><p>V<br />
(only ZK 3)</p></td>
<td><p>V</p></td>
<td><p>V</p></td>
<td><p>ZK XML components for generating XML output</p></td>
</tr>
</tbody>
</table>

This will be helpful when you modify your dependencies of projects.

# BOM

ZK provides a ["bill of materials"
(BOM)](http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#Dependency_Management)
which can be used by your projects simplify a pom.xml. You can use it as
a parent POM or import it like:

``` xml
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.zkoss.zk</groupId>
                <artifactId>zk-bom</artifactId>
                <version>9.0.1-Eval</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

For a complete example, you can reference [pom.xml of this
project](https://github.com/zkoss-demo/gettingStarted/tree/master/getZkUp).
You can also read [a spring boot
document](https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html)
to understand BOM usage.

# Version History

| Version | Date      | Content                                                                                             |
|---------|-----------|-----------------------------------------------------------------------------------------------------|
| N/A     | July 2014 | Self-signed certificate related section removed as EE maven repository is certified since Feb. 2014 |
