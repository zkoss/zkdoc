---
title: "SSO Redirect Handling"
---

In this section, we assume you already know the basics of SSO
(Single-Sign-On) flow like
\[<https://apereo.github.io/cas/4.2.x/protocol/CAS-Protocol.html>) CAS
web flow\] or [Active Directory Federation Services](https://docs.microsoft.com/en-us/archive/blogs/askds/understanding-the-ad-fs-2-0-proxy).

# AJAX Request Gets 302 Redirect

Redirect including SSO (Single-Sign-On) handling has always been a
common challenge in Ajax, and that's no exception when it comes to ZK.
You may have run into this error:

```text
The response could not be parsed: Expected JSON format (please check console for details).
Unexpected token '<':
```

Or in an older ZK version:

```text
The server is temporarily out of service.
Would you like to try again?

(Unexpected token < (SyntaxError))
```

It usually happens when:

- session timeout
- your access token is invalid for some reason

If you check developer tool \> Network, you should see a 302 Redirect
response on a ZK AU request:

![]({{site.baseurl}}/zk_dev_ref/images/redirect302.jpg)

If this happens, it's most likely you have a service that intercepts
HTTP requests (e.g. a security filter) and redirects the AU request to a
login page.

According to the HTTP specification, browsers will follow the 302
redirect to visit the target URL transparently. Browsers will receive
the HTML content of the login page as the response to the AU request.
However, ZK client engine expects a JSON format response for an AU
request, not the HTML content, and therefore reporting the error.

## Solution: Turn 302 to 403

Because of [atomic HTTP redirect handling](https://fetch.spec.whatwg.org/#atomic-http-redirect-handling),
browsers handle redirecting transparently, it's not something we can
change on the ZK side. What we can do is to turn the 302 into 403 so
that we can handle it properly.

First, configure your SSO server or the security filter to return the
response code **403 Forbidden** instead of 302 for the situation
mentioned above (session expired or invalid access token).

Then, configure [ the error-reload Element]({{site.baseurl}}/zk_config_ref/the_error_reload_element),
so that ZK can handle 403 by reloading the specified login page.

In some special setups, you might need to override javascript function
`zAu._fetch()`. If you are not sure how to, please contact ZK support.

# Library Customization Reference

Most SSO related frameworks/libraries provide customizable filters, here
are some examples, please refer to the official and latest documents on
their website:

## Spring Security

- [web securify config for response 403](https://github.com/zkoss/zkspringboot/blob/redirect302/zkspringboot-demos/zkspringboot-security-demo/src/main/java/org/zkoss/zkspringboot/security/WebSecurityConfig.java#L48-L51)
- [error reload](https://github.com/zkoss/zkspringboot/blob/redirect302/zkspringboot-demos/zkspringboot-security-demo/src/main/resources/metainfo/zk/zk.xml#L11-L15)

### Spring Reference Doc

- [10.9. AbstractAuthenticationProcessingFilter](https://docs.spring.io/spring-security/site/docs/5.4.1/reference/html5/#servlet-authentication-abstractprocessingfilter)
- [AuthenticationFailureHandler (javadocs)](https://docs.spring.io/spring-security/site/docs/5.4.1/api/org/springframework/security/web/authentication/AuthenticationFailureHandler.html)

## Apache Shiro

- \[<https://shiro.apache.org/static/1.6.0/apidocs/org/apache/shiro/web/filter/AccessControlFilter.html#onAccessDenied(javax.servlet.ServletRequest,javax.servlet.ServletResponse>)
  AccessControlFilter.onAccessDenied\]
- [related stack overflow](https://stackoverflow.com/questions/41709987/how-to-make-shiro-return-403-forbidden-with-spring-boot-rather-than-redirect-to)

## CAS

- [Java client docs](https://github.com/apereo/java-cas-client/)
- [implement a filter similar to ErrorRedirectFilter](https://github.com/apereo/java-cas-client/blob/master/cas-client-core/src/main/java/org/jasig/cas/client/util/ErrorRedirectFilter.java)

## OKTA

- [customize Filter to use 403 instead of redirect](https://developer.okta.com/blog/2019/07/22/servlet-authentication)
