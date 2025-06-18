# What is the OWASP Top 10?

The Open Web Application Security Project (OWASP[^1]) is a worldwide
not-for-profit charitable organization focused on improving the security
of software. The OWASP Top 10[^2] is a powerful awareness document for
web application security that presents a list of the 10 most critical
web application security risks. The most recent edition of this document
was published in 2017.

# OWASP Top 10 in 2017

In the subsections that follow, we provide our statements against each
of the top 10 security risks. Interested parties are encouraged to visit
OWASP to see this document in full, or other abundant web resources for
more information about each security risk. Depending on the nature of
vulnerability, a front-end framework such as ZK is not the source of
weaknesses that need to be strengthened. Application developers need to
understand the vulnerabilities leading to the possible exploits
attackers may choose to target your system. With that knowledge,
software authors can take preventative measures to mitigate these
threats.

## [(A1) Injection](https://www.owasp.org/index.php/Top_10-2017_A1-Injection)

ZK has no assumption about any 3rd party technologies, and cannot cover
their required escaping syntax. This security risk needs to be addressed
during application development where untrusted data were utilized in
conjunction with an interpreter. For example, to prevent SQL injection,
user data should not be used to construct SQL command directly; instead,
parameterized queries should be used.

## [(A2) Broken Authentication](https://www.owasp.org/index.php/Top_10-2017_A2-Broken_Authentication)

Since ZK does not provide any login mechanism, it is up to developers to
choose and secure user authentication management mechanism on their own.

## [(A3) Sensitive Data Exposure](https://www.owasp.org/index.php/Top_10-2017_A3-Sensitive_Data_Exposure)

Developers have full control over which data is displayed in a zul page,
and must avoid exposing sensitive data. Internal resources should be
stored in a non-webapp accessible location, such as below the WEB-INF
folder.

## [(A4) XML External Entities (XXE)](https://www.owasp.org/index.php/Top_10-2017_A4-XML_External_Entities_(XXE))

Since the framework main purpose is client-server communication inside a
web page, ZK itself doesn't access XML based services or downstream
integrations. It is up to the application developer to exercise
judgement when implementing these sources if appropriate in their
design. Since this treatment will be done in the business layer of the
application, it is not impacted by ZK.

## [(A5) Broken Access Control](https://www.owasp.org/index.php/Top_10-2017_A5-Broken_Access_Control)

As a layout and communication framework, ZK isn't concerned by access
control. Access control should be handled by the developer. One way of
handling it can be done at a lower level by leveraging an existing web
application access and security framework such as Spring security. Since
ZK server code uses Java, authentication and access tokens provided by
the security framework can be used in the business layer to make access
control decision.

## [(A6) Security Misconfiguration](https://www.owasp.org/index.php/Top_10-2017_A6-Security_Misconfiguration)

Security misconfiguration can happen at any level of an application
stack, including the platform, web server, application server, database,
framework, and custom code. Developers and system administrators need to
work together to ensure that the entire stack is configured properly.

## [(A7) Cross-Site Scripting (XSS)](https://www.owasp.org/index.php/Top_10-2017_A7-Cross-Site_Scripting_(XSS))

Please see our
[tips]({{site.baseurl}}/zk_dev_ref/security_tips/cross-site_scripting)
on how to deal with this security issue in ZK.

## [(A8) Insecure Deserialization](https://www.owasp.org/index.php/Top_10-2017_A8-Insecure_Deserialization)

ZK doesn't store states on the client. The client UI is a representation
of the abstract page located on server side, which cannot be tampered
with by the user. User actions trigger events listeners and values
updates on the component used in this page. ZK components check for data
consistency and will throw exceptions if an illegal request is made by
the client such as trying to select a non-existent item in a list.
However, the developer should consider all client content suspect by
default and leverage ZK validators as well as implementing their own
consistency checks to make sure that incoming data match expectations.
The developer should also avoid storing state themselves on client side.

## [(A9) Using Components with Known Vulnerabilities](https://www.owasp.org/index.php/Top_10-2017_A9-Using_Components_with_Known_Vulnerabilities)

ZK addresses known vulnerabilities at high priority. Once identified, we
provide updates and patches as soon as possible. Hence, it is
recommended to upgrade to the latest version when it becomes available.

## [(A10) Insufficient Logging & Monitoring](https://www.owasp.org/index.php/Top_10-2017_A10-Insufficient_Logging%26Monitoring)

ZK provides logging for Framework related actions, warnings, exceptions
and errors covering topics ranging from resources loaded by the
framework to illegal operations on ZK components. Logging relative to
the business layer of an individual application should be implemented by
the application developer. Since ZK server is Java based, developers can
leverage any log infrastructure fulfilling their requirement, such as
slf4j.

# References

<references/>

[^1]: The Open Web Application Security Project [official
    website](https://www.owasp.org/index.php/Main_Page)

[^2]: The OSWAP Top 10
    [1](https://www.owasp.org/index.php/Top_10-2017_Top_10)
