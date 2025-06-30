# Install Node.js

Node.js is now required for our ZK-Less Engine since ZK 7.0.3.

If you don't have Node.js installed yet, please follow the steps given
by the [official-website](http://nodejs.org/) to install Node.js.

Node version 0.10.30 or above is required. To check your Node.js
version, simply run:

```bash
node --version
```

# Compile LESS to DSP

Here we introduce two ways to compile LESS files to DSP files. One is by
Ant and the other is by Maven.

You could choose either one of them depends on your preferences.

## Compile LESS by Ant

- Have Node.js installed in your environment.
- Follow the online
  [document](http://ant.apache.org/manual/install.html) to install
  Apache Ant.
- Download the following necessary jars into your ***project/lib***
  folder from [zk repository](https://github.com/zkoss/zk/tree/7.0-Stable/dist/lib/ext)
  (right click -\> save as).
  - yuicompressor.jar
  - zkjszips.jar
  - commons-io.jar
  - CssCompressor.jar
  - zul.jar (extract zk-bin-7.0.X.zip file from
    [sourceforge](http://sourceforge.net/projects/zk1/files/ZK/))
- Execute the following command under your project folder to install
  ZK-Less' node package.

```bash
cd project_folder
npm install zkless-engine
```

- Write an ant script ***build.xml*** file like the following sample
  under project folder, and change the input folder and output folder as
  needed.

```xml
<?xml version="1.0"?>
<project name="less.compile" default="lessc" basedir=".">
    <target name="lessc">
        <exec executable="node">
            <!-- location of the engine's core file -->
            <arg value="${basedir}/node_modules/zkless-engine/lib/CpLess.js"/>
            <!-- input folder that contains less files-->
            <arg value="${basedir}/src/main/webapp"/>
            <!-- output folder -->
            <arg value="${basedir}/src/main/webapp"/>
            <!-- path of zul.jar -->
            <arg value="${basedir}/lib/zul.jar"/>
        </exec>
        <!-- compress the result using zk's Css Compressor -->
        <java classname="CompressCss" fork="true">
            <!-- input folder (same as above) -->
            <arg value="${basedir}/src/main/webapp"/>
            <!-- output folder (same as above) -->
            <arg value="${basedir}/src/main/webapp"/>
            <classpath>
                <!-- required jars -->
                <pathelement location="${basedir}/lib/zkjszips.jar"/>
                <pathelement location="${basedir}/lib/yuicompressor.jar"/>
                <pathelement location="${basedir}/lib/commons-io.jar"/>
                <pathelement location="${basedir}/lib/CssCompressor.jar"/>
            </classpath>
        </java>
    </target>
</project>
```

- Execute **`ant`** command in command line tool, i.e:

```bash
cd project_folder
ant lessc
```

## Compile LESS by Maven

- Have Node.js installed in your environment.
- Execute the following command to install the native LESS engine by
  [Less.js](http://lesscss.org/)

```bash
npm install -g less
```

- Modify pom.xml in maven project

```xml
<!-- Add Plugin Repository -->
<pluginRepositories>
    <pluginRepository>
        <id>zkmaven</id>
        <name>ZK Maven Plugin Repository</name>
        <url>http://mavensync.zkoss.org/maven2/</url>
    </pluginRepository>
</pluginRepositories>
<dependencies>
    <!-- only needed if using _zkmixins.less provided by ZK -->
    <dependency>
        <groupId>org.zkoss.zk</groupId>
        <artifactId>zul</artifactId>
        <version>7.0.3</version>
    </dependency>
</dependencies>
<build>
    <plugins>
        <!-- Add zkless-engine-maven-plugin -->
        <plugin>
            <groupId>org.zkoss.maven</groupId>
            <artifactId>zkless-engine-maven-plugin</artifactId>
            <version>0.9.6</version>
            <executions>
                <execution>
                    <id>compile-less</id>
                    <goals>
                        <goal>lessc</goal>
                    </goals>
                    <configuration>
                        <!-- LESS source folder -->
                        <sourceDirectory>
                            ${project.basedir}/src/main/resources
                        </sourceDirectory>
                        <!-- *.CSS.DSP output folder -->
                        <outputDirectory>
                            ${project.basedir}/src/main/resources
                        </outputDirectory>
                        <!-- Compress Option, default is true -->
                        <!--  <compress>false</compress> -->
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

- Execute **`mvn install`** command to trigger LESS compilation.

# Compile LESS to DSP during Development phase

It is not friendly to debug LESS during development by running Ant or
Maven each time you modify your LESS files.

Therefore, we provide a servlet named **ZKLessServlet** that can be used
in web project to develop LESS by simply refreshing the browser page.

**Note:** This is only recommended in development environment.

Steps to use **ZKLessServlet** within a Maven Project:

- Have Node.js installed in your environment.
- Install the native LESS engine by the following command:

```bash
npm install -g less
```

- Add maven dependency if you are using maven.

```xml
<repositories>
    <repository>
        <id>ZK CE</id>
        <name>ZK CE Repository</name>
        <url>http://mavensync.zkoss.org/maven2</url>
    </repository>
    <!-- omitted other repository -->
</repositories>
<dependencies>
    <dependency>
        <groupId>org.zkoss.maven</groupId>
        <artifactId>zkless-servlet</artifactId>
        <version>0.9.6</version>
    </dependency>
    <!-- omitted other dependency -->
</dependencies>
```

- Add servlet settings in web.xml

```xml
<web-app>
    <!-- omitted other servlets -->
    <servlet>
        <servlet-name>zkLess</servlet-name>
        <servlet-class>org.zkoss.less.ZKLessServlet</servlet-class>
        <init-param>
            <param-name>org.zkoss.less.LessResource</param-name>
            <!-- specify to the folder that contains *.less -->
            <param-value>/less</param-value>
        </init-param>
        <init-param>
            <param-name>org.zkoss.less.OutputFormat</param-name>
            <!-- specify output file suffix, default .css.dsp -->
            <param-value>.css.dsp</param-value>
        </init-param>
        <init-param>
            <param-name>org.zkoss.less.CompressOutput</param-name>
            <!-- compress output, default true -->
            <param-value>true</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>zkLess</servlet-name>
        <!-- specify to folder that contains *.less -->
        <url-pattern>/less/*</url-pattern>
    </servlet-mapping>
</web-app>
```

- Project structure and use LESS directly in zul page.

  
Remember to put all your LESS files and import resources under
**webapp/less** which is the folder specified in web.xml

Project structure should look like the following:

```java
zkMavenWebProject - src/main/webapp
    WEB-INF
        web.xml
        zk.xml
    less
        test.less
    pages
        test.zul
```

- Use test.less inside test.zul as follows

```xml
<!-- test.zul -->
<?link rel="stylesheet" href="../less/test.less"?>
<zk>
    <button label="test" />
</zk>
```

- Now you can modify LESS and see the result by refreshing your browser
  page.


