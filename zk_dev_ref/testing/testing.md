ZK is a Java framework. Technically you can use any Java test tools you prefer. Here we describe some tools and tips.

# Server-side Testing
Check [ZATS Essentials](/zats_essentials/)

# Client-side Testing

## [ZK Webdriver](/zk_webdriver)
{% include supported-since.html version="10.0.0" %}
It is a powerful testing utility library designed specifically for ZK applications. Built on top of the industry-standard Selenium WebDriver, it provides a high-level API that simplifies testing ZK applications by abstracting away the complexities of AJAX and ZK component internals.

## [ZK Jmeter plugin](https://blog.zkoss.org/2013/08/06/zk-jmeter-plugin/)
Simplifies ZK Load Testing with automatic parameter handling: It automatically replaces the dtid parameter value with ${dtid} in recorded scripts. This eliminates the need to manually set user variables or parameters for every individual zkau request.


The 3rd-party test tools, please refer to:

## QF-Test
* [Testing ZK Applications with QF-Test in 2026](/small-talk/2026/02/05/qftest-testing-zk-applications.html)

## Sahi
* [Small Talks/2010/January/Making ZK Functional Tests With Sahi](http://books.zkoss.org/wiki/Small Talks/2010/January/Making ZK Functional Tests With Sahi)

## Selenium
* [Small Talks/2009/February/How to Test ZK Application with Selenium](https://docs.zkoss.org/small-talk/2009/02/13/how-to-test-zk-application-with-selenium.html)
* [Small Talks/2008/November/ZK Unit Testing](https://docs.zkoss.org/small-talk/2008/11/25/zk-unit-testing.html)
