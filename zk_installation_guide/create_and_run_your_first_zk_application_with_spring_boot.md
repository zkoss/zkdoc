

## Starting from Scratch

To get started follow these simple steps or clone/run one of the
available demos.

**Prerequisite**

We assume you already include zk dependencies, if not, please include
zk. See
[maven setup]({{site.baseurl}}/zk_installation_guide/maven_setup).

**1. Download/unzip a standard [Spring Initializr](https://start.spring.io/) project**

(no addons needed, tested with version 2.0.4.RELEASE)

**2. Add ZK's maven-repository and the zkspringboot-starter dependency**

In pom.xml add: replace \${zkspringboot.version} with the [latest version](http://mavensync.zkoss.org/maven2/org/zkoss/zkspringboot/zkspringboot-starter/)

```xml
    <repositories>
        <repository>
            <id>ZK CE</id>
            <name>ZK CE Repository</name>
            <url>https://mavensync.zkoss.org/maven2</url>
        </repository>
    </repositories>
    ...
    <dependencies>
        ...
        <dependency>
            <groupId>org.zkoss.zkspringboot</groupId>
            <artifactId>zkspringboot-starter</artifactId>
            <type>pom</type>
            <version>${zkspringboot.version}</version>
        </dependency>
    <dependencies>
```

**3. Create a simple zul file**

e.g: src/main/resources/web/hello.zul

```xml
<zk>
    <window title="Hello ZK - Spring Boot!" border="normal">
        You are using ZK version <label value="${session.webApp.version}"/>
    </window>
</zk>
```

**4. Define a homepage**

in src/main/resources/application.properties

    zk.homepage=hello

**5. Run the application**

execute the command (on Windows omit the './' prefix)

    ./mvnw spring-boot:run

**6. Open the URL**

<http://localhost:8080>

Now you have a ZK application running on Spring boot. For further
details and differences to a *normal* ZK web application read the
details below.

## The ZK - Spring Boot Demos

The demo projects are located on
[github/zkoss/zkspringboot](https://github.com/zkoss/zkspringboot/tree/master/zkspringboot-demos).
To run them all you need is a command line interface (and optional:
git).

These examples are derived from the [Spring Boot - Getting Started Guide](https://spring.io/guides/gs/spring-boot/) replacing the
**springboot-starter-web** dependency by **zkspringboot-starter** to
enable convenient auto-configuration for the most common usage scenarios
while allowing customization where needed.

## Differences to a "normal" ZK Web Application

If you choose to use `jar` packaging, there are some differences from a
normal `war` packaging web application.

### Configuration

As Spring Boot prefers Java- over XML configuration and doesn't require
a classical src/main/webapp-folder (and no WEB-INF/). Hence the ZK
configuration files are moved to different files/folders:

**zk.xml** and **zk-label.properties** were moved to a classpath
location:

```text
src/main/webapp/WEB-INF/zk.xml -> src/main/resources/metainfo/zk/zk.xml  
src/main/webapp/WEB-INF/zk-label.properties -> src/main/resources/metainfo/zk-label.properties
```

**web.xml** configuration such as servlets/filters are configured the
"Spring Boot Way" using java configuration

src/main/webapp/WEB-INF/web.xml -> auto configuration is provided by the zkspringboot-starter dependency (configurable via [`application.properties`](https://github.com/zkoss/zkspringboot#configuration-options-for-spring-boot-style-applicationproperties)`)`

After adding the zkspringboot-starter dependency the
@SpringBootApplicatio-annotation is sufficient to make initialize ZK.

```java
@SpringBootApplication
public class Application  {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

For a single-page application all you need is to specify a view name as
the zk.homepage parameter in the application.properties (or specify a
richlet).

Multiple zul-files as entry points for your application are defined
using Spring-MVC's @GetMapping annotations.

see:

- [application.properties](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/resources/application.properties)
  -\> homepage / view-resolver / richlet config
- [DemoApplication.java](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/java/org/zkoss/zkspringboot/demo/DemoApplication.java)
  -\> application-specific page mappings

### Application structure

In the zkspringboot-demo-jar example the zul files are located below the
class web resource folder
[src/main/resources/web/zul/](https://github.com/zkoss/zkspringboot/tree/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/resources/web/zul/)

You can configure any folder below **src/main/resources/web** using the
`zk.zul-view-resolver-prefix`-property [in application.properties](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/resources/application.properties).
The extension .zul is added automatically by the default value of
`zk.zul-view-resolver-suffix`.

By default this view resolver is enabled, and can be disabled via
`zk.zul-view-resolver-enabled` (e.g. if no zul files are used (just
richlets, or jsp's embedding zul files) or a custom implementation is
preferred).

Inside the Zk application zul files (to be included) can be referenced
like this:

```xml
    <include src="~./zul/mvvm-page1.zul"/>
    <apply templateURI="~./zul/mvvm-page1.zul"/>
```

General resource folders are:

- [src/main/resources/static](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/resources/static) -
  Spring Boot's resource folder
- [src/main/resources/web](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/resources/web) -
  ZK's [classpath web resource path]({{site.baseurl}}/zk_dev_ref/ui_composing/include_a_page#Classpath_Web_Resource_Path)

Spring Boot resources are referenced by urls starting with `'/'` ZK
resources (including zul files) are prefixed with `'~./'`

e.g.

```xml
    <image src="/img/zklogo1.png"/>      <!-- src/main/resources/static/img/zklogo1.png -->
    <image src="~./img/zklogo1.png"/>    <!-- src/main/resources/web/img/zklogo3.png -->
```

Examples how to access resources from either resource folder are:

- from a zul file:
  [src/main/resources/web/zul/resources.zul](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/resources/web/zul/resources.zul)
- global resources:
  [src/main/resources/metainfo/zk/lang-addon.xml](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/resources/metainfo/zk/lang-addon.xml)

### Zats Testing

Since Zats is running its own embedded jetty, it can't use the same
application startup mechanism as plain spring boot. In order to allow
Zats tests, the Application configuration must be loaded from a separate
web.xml (note it is in src/**test**/webapp so it doesn't affect the
production deployment).

As of now you can specify your test context configuration class (e.g.
`zk.springboot.Application`) as a [context parameter inside web.xml](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar-zats/src/test/webapp/WEB-INF/web.xml).
The customized ContextLoaderListener
([ZatsSpringBootContextLoaderListener.java](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-autoconfig/src/main/java/org/zkoss/zkspringboot/zats/ZatsSpringBootContextLoaderListener.java))
reads this parameter and initializes the application context
accordingly.

E.g. the
[DemoPageTest](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/test/java/org/zkoss/zkspringboot/demo/DemoPageTest.java)-case
refers to this web.xml to initialize the spring boot application inside
Zats' embedded Jetty.

As usual, alternative test-configuration is possible if needed.

(Feedback regarding a cleaner startup of a Spring Boot project in an
alternative embedded container is welcome, to avoid extending/overriding
Framework classes.)

## Download/Clone the example project

With the git command line installed all you need is to clone the example
repository (Alternatively download a
[zip-package](https://github.com/zkoss/zkspringboot/archive/master.zip)):

`   git clone `[`https://github.com/zkoss/zkspringboot`](https://github.com/zkoss/zkspringboot)  
`   cd zkspringboot/zkspringboot-demos`

In order to get started immediately the project includes the
[gradle-wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html)
and [maven-wrapper](https://github.com/takari/maven-wrapper).

During the first execution gradle/maven will download itself and all the
required project dependencies automatically. This will initially take
quite a few minutes while showing the overall progress. Subsequent
executions will be faster as gradle/maven will cache downloaded
resources. For additional information on gradle/maven please refer to
their official documentation.

## Build / Run the Project

Please follow the instructions in the
[README.md](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/README.md).

## Import the project into your IDE

The project itself designed to work from command line and independent of
any IDE. Since it's both a gradle or maven project you can import it
into your favorite IDE using the standard plugins provided by the IDE.

**TIP**: The main class
[org.zkoss.zkspringboot.demo.DemoApplication](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/java/org/zkoss/zkspringboot/demo/DemoApplication.java)
can be executed directly in your IDE for development and debugging.

Useful
[DevelopmentConfig](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/java/org/zkoss/zkspringboot/demo/DevelopmentConfig.java)
can be enabled by activating the **dev**-profile as a VM argument in
your run configuration.

`   -Dspring.profiles.active=dev`

This will disable resource caches allowing to replace zul/css/js/image
files without restarting the application.

# Use a Different Springboot Version

Since `zkspringboot-starter` may not include a spring-boot starter
version you want by default, you can easily include your desired version
in Maven like:

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>${another-version}</version>
        </dependency>
```
