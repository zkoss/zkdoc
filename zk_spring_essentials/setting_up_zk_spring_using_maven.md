# Create a New Project with ZK Archetype

The simplest way to create a ZK maven project is using the archetype:
**zk-ee-eval-archetype-webapp-spring**. A project generated by this
archetype will include required ZK and spring dependencies and ZK maven
evaluation repository.

If you use maven in a command line console, you need to specify ZK
archetype catalog URL to generate your project. Please refer to [ Create a Maven Project with a Command Line Interface]({{site.baseurl}}/zk_installation_guide/create_and_run_your_first_zk_application_with_eclipse_and_maven#Create_a_Maven_Project_with_a_Command_Line_Interface).

If you use eclipse, you can add the catalog URL via Window / Preferences
/ Maven / Archetypes, please refer to [ZK Installation Guide/Quick Start/Create and Run Your First ZK Application with Eclipse and Maven#Add ZK Maven
Archetype]({{site.baseurl}}/zk_installation_guide/create_and_run_your_first_zk_application_with_eclipse_and_maven#Add_ZK_Maven_Archetype)

# Adding ZK Spring Dependencies

After creating a project, you still need to add ZK Spring dependencies.
ZK Spring has 2 artifacts, you can add them to your requirement.

For ZK **5**, you can use **3.0** or above.

For ZK **6+** **3.2**

For ZK **8+** or above, you should use **4.0.0** or above.

**Required for both modules**

```xml
<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zkplus</artifactId>
    <version>${zk.version}</version>
</dependency>
```

**ZK Spring Core**

```xml

<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zkspring-core</artifactId>
    <version>${zkspring.version}</version>
</dependency>
```

Check the available versions at [CE repository](https://mavensync.zkoss.org/maven2/org/zkoss/zk/zkspring-core/).

**ZK Spring Security**

```xml
<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zkspring-security</artifactId>
    <version>${zkspring.version}</version>
</dependency>
```

Check the available versions at [CE repository](https://mavensync.zkoss.org/maven2/org/zkoss/zk/zkspring-security/)

**ZK Spring Webflow**

discontinued since 4.0.0

## ZKSpring 6

Notice that this version depends on [Spring Framework 6.0](https://spring.io/blog/2022/11/16/spring-framework-6-0-goes-ga) and
requires Jakarta EE.

# Configuration in web.xml

You need to declare Spring `ContextLoaderListener` in the `web.xml` file
to be able to declare and register your Spring beans with Spring
framework.

```xml
<listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

# Example Project

- [zkspring example project for spring 5 or before](https://github.com/zkoss/zkspring/tree/master/zkspringessentials/zkspringcoresec).
- [zkspring example project for spring 6](https://github.com/zkoss/zkspring/tree/6.0.0/zkspringessentials/zkspringcoresec)

# Version History

| Version | Date       | Content                              |
|---------|------------|--------------------------------------|
| 3.1.1   | 2014/10/07 | rewrite for supported Spring version |
| 4.0.0   | 2019/01    | update for 4.0.0                     |
