Follow the simple steps below to start using ZK Spring library.

# Prerequisites

- [Download the latest ZK release](http://www.zkoss.org/download/zk.dsp)
- [Download supported Spring framework release](https://github.com/spring-projects/spring-framework/releases).
    
  Current ZK Spring only supports Spring framework 3.1 or above.
- [Download the latest ZK Spring release](http://www.zkoss.org/download/zkspring.dsp)

# Installing ZK Spring to Your Project

- Copy downloaded ZK, Spring, and ZK Spring jar files into your web
  application's WEB-INF/lib or put them on your web application
  classpath.
- Because ZK Spring depends on ZK, please follow [ZK Installation Guide/Quick Start/Create and Run Your First ZK Application Manually]({{site.baseurl}}/zk_installation_guide/create_and_run_your_first_zk_application_manually)
  to setup ZK first.
- In addition, you also need to declare Spring ContextLoaderListener in
  the **web.xml** to be able to declare and register your Spring beans
  with Spring framework.

```xml

<listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```
