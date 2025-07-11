

This section describes the Maven settings required to use ZK Pivottable
in your application. Please refer to [this article]({{site.baseurl}}/zk_installation_guide/resolving_zk_framework_artifacts_via_maven)
for the Maven settings for ZK Framework.

## Dependency

Check [evaluation repository](https://mavensync.zkoss.org/eval/org/zkoss/pivot/pivottable/)
or [premium repository](https://maven.zkoss.org/repo/zk/ee/org/zkoss/pivot/pivottable/)
for available versions.

```xml
<dependencies>  
    <dependency>
        <groupId>org.zkoss.pivot</groupId>
        <artifactId>pivottable</artifactId>
        <version>2.5.1</version>
    </dependency>
</dependencies> 
```

## Repository

You would refer to different repositories in your pom.xml depending on
whether you are evaluating or you are a premium user.

### Evaluating users (60-days free evaluation)

- <http://mavensync.zkoss.org/eval>

```xml
    <repositories>
        <repository>
            <id>ZK Evaluation Repository</id>
            <url>http://mavensync.zkoss.org/eval</url>
        </repository>
    </repositories>
```

### Premium users only

- <span style="color:red">**Notice**</span>: Need [Login authentication]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Login_authentication)

  
If you are our customer, please apply for a premium maven account to use
ZK Premium Maven Repository.

- <https://maven.zkoss.org/repo/zk/ee>

```xml
<repositories>
    <repository>
        <id>ZK EE</id>
        <url>https://maven.zkoss.org/repo/zk/ee</url>
    </repository>
</repositories>
```

#### Login authentication

Please refer to the [official documentation](http://maven.apache.org/settings.html#Servers) of Apache
Maven project for storing login authentication credential in the global
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
            <!-- Please replace the following with your 
                premium username and password -->
            <username>premium</username>
            <password>2k0553cr3t</password>
        </server>
    </servers>
</settings>
```

#### Sample of pom.xml for licensed ZK Pivottable Package

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
        <zk.version>6.5.2</zk.version>
        <commons-io>1.3.1</commons-io>
        <zkpivot.version>2.0.2</zkpivot.version>
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
            <version>${commons-io}</version>
        </dependency>
        
        <!-- ZK Pivottable -->
        <dependency>
            <groupId>org.zkoss.pivot</groupId>
            <artifactId>pivottable</artifactId>
            <version>${zkpivot.version}</version>
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

#### Troubleshooting

If you have problem switching from the evaluation repository to the
licensed one, please check the followings:

- 1 **Remove evaluation repository**, [use ZK EE repository instead]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Repository)
- 2\. [Login authentication]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Login_authentication)
- 3\. [Delete maven local repository evaluation cache]({{site.baseurl}}/zk_pivottable_essentials/using_maven#Purge_local_repository_evaluation_cache)

##### Purge local repository evaluation cache

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
