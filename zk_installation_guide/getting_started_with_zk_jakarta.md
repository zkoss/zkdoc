---
title: "Getting started with ZK-Jakarta"
---

This guide's purpose is to provide an easy-to-setup environment to
develop a ZK application using ZK 9.6 and a Jakarta-compliant run
environment in Eclipse.

# Disclaimer

Please make sure that you are using the up-to-date versions of the
softwares described in this example when installing yourself.

# Environment setup

Please refer to the [ the eclipse and maven quick start guide](/zk_installation_guide/create_and_run_your_first_zk_application_with_eclipse_and_maven)
environment setup.

# Project configuration

This section details the configuration steps necessary to run your
project in a servlet 5.0 context.

## Maven dependencies configuration

ZK supports the Jakarta servlet configuration starting from ZK
9.6.0-jakarta. When updating your pom file, you need to include the
-jakarta suffix in your dependencies version configuration:

```xml
<dependency>
<zk.version>9.6.0-jakarta</zk.version>
<!--<zk.version>9.6.0-jakarta-Eval</zk.version> -->
...
<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zk</artifactId>
    <version>${zk.version}</version>
</dependency>
```

For a more in-depth look at the pom.xml file configuration, please refer
to the [ the Resolving ZK Framework Artifacts via Maven page](/zk_installation_guide/maven_setup)
.

If your project uses the servlet-API dependency, you will need to update
your pom file to use the Jakarta servlet-API instead. See
[here](https://mvnrepository.com/artifact/jakarta.servlet/jakarta.servlet-api)
for a list of available versions.

For example, you may need to replace

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>${servlet.version}</version>
    <scope>provided</scope>
</dependency>
```

by

```xml
<dependency>
    <groupId>jakarta.servlet</groupId>
    <artifactId>jakarta.servlet-api</artifactId>
    <version>${servlet.version}</version>
    <scope>provided</scope>
</dependency>
```

## Jakarta in ZK add-ons and plugins

Some ZK addons and plugins do not interact with the servlet APIs and can
be used interchangeably in a ZK javax or jakarta servlet. Some ZK addons
do interact with the servlet APIs and require the developer to select a
compatible version with their servlet container.

For example, Keikai does require using the matching version.

If used in a javax container: 5.12.2

if used in a jakarta container: 5.12.2-jakarta

Note: use latest version, 5.12.2 is the earliest Keikai release with a
-jakarta version.

## Addons and plugins transitive dependencies

Maven will automatically [resolve transitive dependencies](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)
provided by a given dependencies.

In the case of ZK addons such as Keikai, the addons list default ZK core
dependencies using javax.servlet. If you are updating to jakarta
version, you will need to either manually define the core zk libraries
originally loaded by the addons (zk, zkbind, zkplus, zkmax, etc.), or
use dependency management to lock the -jakrata versions of the these
jars.

Using maven's dependency tree command is a great way to review what
dependencies are loaded transitively by the addons, in order to lock
them with the -jakarta version instead.

# Java classes

If you have replaced the servlet-API dependency for you project, you
will need to refactor Java classes which imports related classes.

For example, you may have a custom servlet implementing
`javax.servlet.Servlet`, or you may be using the
`javax.servlet.http.HttpServletRequest`

In this case you will need to replace these imports by the equivalent
one from the Jakarta Servlet-API library. In most cases, the imported
class will use the same name and package structure:

| Original package                      | Migrated package                        |
|---------------------------------------|-----------------------------------------|
| Javax.servlet                         | jakarta.servlet                         |
| Javax.servlet.Servlet                 | jakarta.servlet.Servlet                 |
| Javax.servlet.http.HttpServletRequest | jakarta.servlet.http.HttpServletRequest |
| Etc.                                  |                                         |

We recommend that you also refer to the update guide for your preferred
run environment.

# Running the project in debug mode

There are three approaches to running a project in debug mode in
eclipse. Since servlet 5.0 is still a new implementation, not every
launch plugin may currently provide servlet 5.0 support.

At time of writing, the jetty integration for eclipse provide jetty
support up to jetty 9, which is not compatible with Jakarta servlet.

## Run from maven

Refer to the approach described in [ the eclipse and maven quick start](/zk_installation_guide/create_and_run_your_first_zk_application_with_eclipse_and_maven)
guide.

When configuring your application's pom file, use a jetty version that
supports servlet 5.0. For example, the 11.0.X version of the [\| jetty-maven-plugin](https://mvnrepository.com/artifact/org.eclipse.jetty/jetty-maven-plugin)
supports this specification.

You can then start your project as a maven build, using
`Debug as... > Maven build...` and declaring the `jetty:run` goal

## Run on server through eclipse

You can run in debug mode on a Tomcat server from eclipse by following
the configuration shown in the [ quick start with Eclipse and Tomcat ](/zk_installation_guide/create_and_run_your_first_zk_application_with_eclipse_and_zk_studio)
guide, while using a [\| compatible tomcat version](http://tomcat.apache.org/whichversion.html).

## Run on server and remotely debug with JPDA

You can run any servlet 5.0 compatible web server in JPDA mode and use
remote debugging to connect to the server.

# Version History

| Version | Date     | Content                                    |
|---------|----------|--------------------------------------------|
| 1.0.0   | May 2021 | Documentation relative to ZK 9.6.0-Jakarta |
