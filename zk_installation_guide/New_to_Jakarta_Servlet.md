Jakarta EE is the continuation of the Java EE (J2EE) specification. It
focuses on distributed computing and web services.

# ZK framework in Java EE and Jakarta EE specification sets

ZK Framework is based on the servlet specification, which is part of
both Java EE and Jakarta EE specifications.

More information about Jakarta EE is [available on the project's
homepage](https://jakarta.ee/about/) More information about Java EE is
[available on the project's
homepage](https://www.oracle.com/java/technologies/java-ee-glance.html)

From a ZK developer point of view, the differences between the two are
minor. Different version of the servlet specification will provide
different features.

# Which ZK version should I choose?

Starting from ZK 9.6.0, you will be able to choose from two Framework
versions:

## ZK 9.6.0

This version supports Java EE servlet 2.4 and higher. It is compatible
with Java EE based Web Servers implementing this specification.

## ZK 9.6.0-jakarta

This version support the Jakarta EE 9 servlet specifications: Jakarta
servlet 5.0. It is compatible with Jakarta EE based Web Servers
implementing this specification.

# Which servlet version does my webserver support?

This depends on your webserver. We recommend that you check the servlet
support directly in your webserver's documentation.

You can find a general overview
[here](https://en.wikipedia.org/wiki/Jakarta_EE#Certified_referencing_runtimes)
