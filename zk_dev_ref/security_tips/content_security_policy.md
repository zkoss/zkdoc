# What is Content security policy?

Content-security-policy (CSP) is a security standard introduced to
prevent XSS attacks (cross-site scripting) and other content injection
attacks.

To reduce those injection risks, CSP provides a way for web applications
and website owners to declare permissions for loading scripts from only
approved and trusted sources. To enable CSP, you can either configure
your web server to return the CSP HTTP header, or use the

<meta>

element.

See more: [Content Security Policy Level 2](https://www.w3.org/TR/CSP2/)

# How to use Content security policy?

To use CSP in your web application, the first thing you need to know is
that not all the browsers support CSP.

(Support browsers: [Content Security Policy 1.0](https://caniuse.com/#feat=contentsecuritypolicy), [Content Security Policy Level 2](https://caniuse.com/#feat=contentsecuritypolicy2))

To enable CSP, you can either configure your web server to return the
CSP HTTP header, or use the

<meta>

element. The following "directives" are recommended to be defined, which
is for protecting against XSS attacks. For complete information please
reference [CSP official documents](https://www.w3.org/TR/CSP/).

## 1. default-src

The default-src is the default policy for loading content such as
Javascript, CSS, fonts, etc.

## 2. script-src / style-src / img-src / font-src

Defines valid sources of JavaScript/stylesheets/images/fonts.

## 3. connect-src

Applies to AJAX, WebSocket or EventSource.

## 4. child-src

Governs the creation of nested browsing contexts as well as Worker
execution contexts.

**Examples**

1\. Only allows loading resources from the same origin.

```xml
default-src 'self';
```

2\. Allows loading scripts from the same origin and Google Analytics.

```xml
script-src 'self' www.google-analytics.com;
```

# Using Content Security Policy in ZK

We don't suggest applying too strict CSP to ZK, because internally ZK
still needs to use some 'unsafe-eval' and 'unsafe-inline' declarations
when loading scripts and CSS files. However, you can still use CSP in ZK
to enhance supported parts and make your application safer than before.
Here's an example of a relaxed policy used in a ZK application:

```xml
<?header name="Content-Security-Policy-Report-Only"
        value="default-src 'none';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        frame-src 'self';
        connect-src 'self' ws://your.server.name:8080/;
        img-src 'self';
        style-src 'self' 'unsafe-inline';
        font-src 'self'" ?>
```

- Using
  \[<ZUML_Reference/ZUML/Processing_Instructions/header>
  <?header ?>

  \] to specify a response header.
