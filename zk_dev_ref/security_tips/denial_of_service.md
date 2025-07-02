# Overview

From [OWASP](https://www.owasp.org/index.php/Denial_of_Service)

> The Denial of Service (DoS) attack is focused on making a resource
> (site, application, server) unavailable for the purpose it was
> designed. There are many ways to make a service unavailable for
> legitimate users by manipulating network packets, programming,
> logical, or resources handling vulnerabilities, among others. If a
> service receives a very large number of requests, it may stop
> providing service to legitimate users. Denial-of-service attacks
> significantly degrade service quality experienced by legitimate users.
> It introduces large response delays, excessive losses, and service
> interruptions, resulting in direct impact on availability.

While OWSAP recommends[^1] a few techniques developers can employ
against DoS at application level, ZK as a framework provides two
features to protect against DoS as described below

**Notes**

<references />

# Limit how many resources can be consumed

As explained above DoS attacks cause server to overload and stop
responding by requesting large number of resources, it is logical to set
a limit on how many resources are allowed per session to prevent server
overload. Below are two configurations in ZK that you can use to set
such limits.

## Limit number of desktops per session

You can configure **max-desktops-per-session** in zk.xml as shown below.
It indicates maximum number of desktops per session that are allowed. A
desktop represents an HTML page for a browser. In other words, this
number controls the number of concurrent browser windows allowed per
session.

```xml
<session-config>          
     <max-desktops-per-session>a_number</max-desktops-per-session>
</session-config>
```

**Note** : A negative number means no limitation at all.

## Limit number of requests per session

You can configure number of requests per session in zk.xml as shown
below. It indicates the maximum number of concurrent requests per
session that are allowed. Each time a user types an URL at the browser,
it creates a request and the request ends after the response is sent to
the browser. In other words, this number controls how many concurrent
requests the same user can send.

```xml
<session-config>
       <max-requests-per-session>a_number</max-requests-per-session>
</session-config>
```

**Note** : A negative number means no limitation at all, but it is not
recommended due to the possibility of the denial-of-service (DoS)
attacks.

# Prevent sending same request multiple times

If your application has a button starting a long running operation you
could use `button.setAutodisable()` in Java or `autodisable="self"` in
ZUL to prevent DoS resulting from repeated button onClicks which might
hold up precious server resources. For more details on Button
autodisable refer
[here]({{site.baseurl}}/zk_component_ref/button#Autodisable)

In addition to this, each and every ZK ajax request carries an
additional http header called **ZK-SID**. The purpose of this ZK-SID
header is to differentiate between multiple Ajax requests. If the same
ajax request is resent with the same ZK-SID then it is ignored. This
ZK-SID header helps to reduce server load and hence DoS attack by
sending too many similar/repeated requests.

[^1]: <https://www.owasp.org/index.php/Denial_of_Service>
