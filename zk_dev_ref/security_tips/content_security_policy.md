# What is the Content security policy (CSP)?

Content-security-policy (CSP) is a security standard introduced to
prevent XSS attacks (cross-site scripting) and other content injection
attacks.

To reduce those injection risks, CSP provides a way for web applications
and website owners to declare permissions for loading scripts from only
approved and trusted sources. To enable CSP, you can either configure
your web server to return the CSP HTTP header, or use the `<meta>`.

See more: [Content Security Policy Level 2](https://www.w3.org/TR/CSP2/)

# How to use Content security policy?

To use CSP in your web application, the first thing you need to know is
that not all the browsers support CSP.

(Support browsers: [Content Security Policy 1.0](https://caniuse.com/#feat=contentsecuritypolicy), [Content Security Policy Level 2](https://caniuse.com/#feat=contentsecuritypolicy2))

To enable CSP, you can either configure your web server to return the
CSP HTTP header, or use the `<meta>`. The following "directives" are recommended to be defined, which
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

- Using [<?header ?>](/zuml_ref/header) to specify a response header.

# Known inline script: href="javascript:;" and CSP Compliance

Some ZK components use `href="javascript:;"` as a workaround to maintain proper accessibility and user interaction behaviors. This pattern is necessary because:

1. Using `href="#"` adds a hash fragment to the URL and alters browser history
2. Removing the `href` attribute prevents the Enter key from triggering the `onclick` event

However, this pattern violates strict CSP policies that disallow inline JavaScript execution.

## Solution: Using unsafe-hashes

You can allow `href="javascript:;"` while maintaining CSP protection by using the `unsafe-hashes` directive with a SHA-256 hash. This approach:

- Allows only the specific `javascript:;` value
- Maintains CSP security for other inline code
- Works with modern browsers that support `unsafe-hashes`

### Steps to implement:

1. Generate the hash for `javascript:;`:
   ```bash
   echo -n "javascript:;" | openssl dgst -sha256 -binary | openssl base64
   ```
   This generates: `sha256-lfXlPY3+MCPOPb4mrw1Y961+745U3WlDQVcOXdchSQc=`

2. Add the hash to your CSP header configuration:
   ```xml
   <?header name="Content-Security-Policy"
           value="'unsafe-hashes' 'sha256-lfXlPY3+MCPOPb4mrw1Y961+745U3WlDQVcOXdchSQc='" ?>
   ```

{% include supported-since.html version="10.3.0" %} 
Some ZK components now use `href="javascript:void(0);"` instead.
Generate a hash for that exact string using the same command with the updated value ("javascript:void(0);"), which produces:
`sha256-kbHtQyYDQKz4SWMQ8OHVol3EC0t3tHEJFPCSwNG9NxQ=`.

## Reference

- [Content Security Policy unsafe-hashes](https://content-security-policy.com/unsafe-hashes/)
- [CSP Specification](https://www.w3.org/TR/CSP/)
- [<?header ?> tag reference](/zuml_ref/header)
