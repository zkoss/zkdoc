[Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
is a very popular front-end framework for building responsive,
mobile-first sites. It can be a good companion for ZK with the following
usages:

- Layout a page with [the responsive grid system](https://getbootstrap.com/docs/4.6/layout/grid/)
- Style a page with [utility CSS classes](https://getbootstrap.com/docs/4.6/utilities/borders/)

See the integration example: [admin template](https://github.com/zkoss-demo/admin-template)

# Include JAR

To avoid downloading bootstrap manually, it's convenient to include it
by [WebJars](https://www.webjars.org/) with Maven.

```xml
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>bootstrap</artifactId>
            <version>4.6.0</version>
        </dependency>
```

# Include CSS

## Page Scope

```xml
<?link rel="stylesheet" href="/webjars/bootstrap/4.6.0/css/bootstrap.min.css"?>
```

## Application Scope

```xml
<?xml version="1.0" encoding="UTF-8"?>
<language-addon>
    <addon-name>bootstrap</addon-name>
    <language-name>xul/html</language-name>
    <stylesheet href="/webjars/bootstrap/4.6.0/css/bootstrap.min.css" type="text/css"/>
</language-addon>
```

See
[ZK_Client-side_Reference/Language_Definition/stylesheet](zk_client_side_ref/language_definition/stylesheet)
