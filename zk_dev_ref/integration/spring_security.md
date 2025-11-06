# Overview

Spring Security is an application framework that provides security
services for J2EE-based enterprise software application. It is a popular
and widely adopted framework, in this article we will demonstrate how to
integrate it to secure a ZK application including securing pages,
handling authentication process, securing components, and securing
events. Our example is a simple forum-like application. Users can read,
create, edit, and delete an article according to his authorities.

# Configuration

## Maven

We need to add dependencies for Spring Security and Maven's transitive
dependency management can include all necessary dependencies of Spring
for us.

```xml
        <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-config</artifactId>
            <version>${springsecurity.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-web</artifactId>
            <version>${springsecurity.version}</version>
        </dependency>

        <!-- extra -->
        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.1.1</version>
        </dependency>
        <dependency>
            <groupId>cglib</groupId>
            <artifactId>cglib</artifactId>
            <version>2.2</version>
        </dependency>
```

- Line 4: Becuase we use the security namespace in the application
  context, we need `spring-security-config`.
- Line 16: Spring-core depends on commons-logging.
- Line 21: The cglib is optional. We add it because we use CGLIB-based
  class proxy.

<div style="-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;color:#c06330;padding:15px 40px;background:#fed no-repeat 13px 13px;margin-bottom:10px">

![]({{site.baseurl}}/zk_dev_ref/images/icon_info.png) **Note:** If you don't use Maven,
please refer to Spring Security Reference Documentation to check which
JAR files are needed.

</div>

## Spring

Our example application also integrates Spring framework, the required
configuration in `web.xml` is as follows:

**web.xml**

```xml
    <!-- Loads the Spring application context configuration -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
     <!-- For using web scoped bean -->
    <listener>
        <listener-class>org.springframework.web.context.request.RequestContextListener</listener-class>
    </listener>
```

The `ContextLoaderListener` will load `/WEB-INF/applicationContext.xml`
(Spring configuration file) by default, and we follow this convention so
we don't need to add extra configuration in `web.xml`.

**applicationContext.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation=
    "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
     http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-2.0.xsd">
    
    <context:component-scan base-package="org.zkoss.reference.developer.spring.security.model"/>

    <import resource="applicationContext-security.xml"/>
</beans>
    
```

- Line 9: We can register beans by class-path scanning to reduce XML
  configuration effort.
- Line 11: We can import another configuration file for Spring Security.

## Security Namespace Configuration

The first configuration you should add to use Spring Security is a
filter declaration in `web.xml`:

```xml

    <filter>
        <filter-name>springSecurityFilterChain</filter-name>
        <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>springSecurityFilterChain</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

This filter is a hook into Spring Security's web infrastructure. It
intercepts all requests and hands over them to be processed by Spring
Security internal filters.

Namespace configuration has been supported by Spring framework since
version 2.0 and it is an alternative configuration syntax which is
closer to problem domain. It also can reduce configuration's complexity
because one element may contain multiple beans and processing steps. To
use the security namespace, you should have `spring-security-config` in
your classpath and add the schema declaration to your application
context file:

**applicationContext-security.xml**

```xml

<beans:beans xmlns="http://www.springframework.org/schema/security" 
    xmlns:beans="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation=
    "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
     http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd
     http://www.springframework.org/schema/security http://www.springframework.org/schema/security/spring-security-3.1.xsd">


    <!--  HTTP configuration sample -->
    <http auto-config="true">
        <!-- ZK AU reqeust -->
        <intercept-url pattern="/zkau/**" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <!-- the login page -->
        <intercept-url pattern="/login.zul" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <!-- pages for anonymous access in an application -->
        <intercept-url pattern="/index.zul" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <intercept-url pattern="/articleContent.zul" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <!-- secure pages -->
        <intercept-url pattern="/**" access="ROLE_USER" />
        
        <form-login login-page="/login.zul" 
            authentication-failure-url="/login.zul?login_error=1" 
            login-processing-url="/j_spring_security_check"/>
            
        <logout logout-success-url="/index.zul" invalidate-session="true" />
    </http>     

    <!-- omit inactive configurations -->

    <authentication-manager>
        <authentication-provider user-service-ref="myUserDetailsService">
            <password-encoder hash="md5" />
        </authentication-provider>
    </authentication-manager>
    
</beans:beans>
```

Here we introduce some main elements and will leave the details in the
subsequent sections.

- Line 12: The `<http>` element is the parent for all web-related
  namespace functions and we use `auto-config` to save configuration
  efforts. We also create a HTTPS configuration sample in
  `applicationContext-security.xml`. Please see source code for details.

<!-- -->

- Line 32: Each Spring Security application which uses the namespace
  configuration must include `<authentication-manager>` . It is
  responsible for registering the `AuthenticationManager` which provides
  authentication services to the application.
- Line 33:We implement our `MyUserDetailsService` bean to provide
  authentication service and configure it in `<authentication-provider>`
  element.

# Secure Pages

In Spring Security, pages are protected by `<intercept-url>` element under
`<http>`. We can specify in `pattern` to match against the URLs of
incoming requests using an ant path style syntax in `<intercept-url>`
element. The `access` attribute defines the access permission for
requests which match the given `pattern`. Here we use simple role-based
access control.

In most cases, we usually secure all pages with :

`<intercept-url pattern="/**" access="ROLE_USER" />`

The "ROLE_USER" is an authority string we define and give for each
authenticated user in our custom user service, `MyUserDetailsService`.

Then we can selectively allow some pages for anonymous access like:

`<intercept-url pattern="/login.zul" access="IS_AUTHENTICATED_ANONYMOUSLY" />`

`IS_AUTHENTICATED_ANONYMOUSLY` is a built-in permission value used to
grant access to anonymous users

**applicationContext-security.xml**

```xml
    <!--  HTTP configuration sample -->
    <http auto-config="true">
        <!-- ZK AU requests -->
        <intercept-url pattern="/zkau/**" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <!-- the login page -->
        <intercept-url pattern="/login.zul" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <!-- pages for anonymous access in an application -->
        <intercept-url pattern="/index.zul" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <intercept-url pattern="/articleContent.zul" access="IS_AUTHENTICATED_ANONYMOUSLY" />
        <!-- secure pages -->
        <intercept-url pattern="/**" access="ROLE_USER" />
        
        ...
    </http>     
```

- Line 4: ZK AU requests must be available for anonymous access or ZK
  can't work normally.
- Line 6: Remember to set login page URL available to anonymous users,
  otherwise users wont be able to access the log-in page (this is a
  common configuration error).
- Line 14: Restrict all page requests with permission `ROLE_USER`.

# Authentication

Setting `auto-config` enables form-based login process automatically but
it uses Spring Security's built-in login page. We usually build our own
login page so we can specify our custom login page URL to override the
default configuration.

**applicationContext-security.xml**

```xml

    <!--  HTTP configuration sample -->
    <http auto-config="true">
        ...
        
        <form-login login-page="/login.zul" 
            authentication-failure-url="/login.zul?login_error=1" />
            
        <logout logout-success-url="/index.zul" invalidate-session="true" />
    </http> 
```

- Line 5: Specify the URL used to render the login page at `login-page`.
- Line 5: Specify the URL to redirect the browser on login failure,
- Line 8: Specify the destination URL in which the user will be
  redirected to after logging out.

In order to let Spring Security handle authentication, we should use
HTML's form in a zul.

**login.zul**

```xml

    ...
    <html:form action="j_spring_security_check" method="POST" 
        xmlns:html="native">
        <grid>
            <rows>
                <row>User: <textbox id="u" name="j_username"/></row>
                <row>Password: <textbox id="p" type="password" name="j_password"/></row>
                <row spans="2">
                    <hbox>
                        <button type="reset" label="Reset" />
                        <button type="submit" label="Submit" />
                    </hbox>
                </row>
            </rows>
        </grid>
        </html:form>
```

- Line 2: The default action URL monitored by Spring Security filter is
  `j_spring_security_check`.
- Line 6,7: The login form should contain `j_username` and `j_password`
  input fields.

In most cases, each application will have its own way to authenticate a
user and Spring Security provides various authentication provider to
achieve it. We can create a simple `MyUserDetailsService` which
implements Spring Security's `UserDetailsService` interface to perform
our own authentication.

**MyUserDetailsService**

```java

@Service
public class MyUserDetailsService implements UserDetailsService {

    private static final Map<String, MyUser> USERS = new HashMap<String,MyUser>();
    private static void add(MyUser mu){
        USERS.put(mu.getUsername(), mu);
    }
    static{
        
        add(new MyUser("rod","81dc9bdb52d04dc20036dbd8313ed055", //password:1234 
            new String[]{"ROLE_USER", "ROLE_EDITOR"} ));
        
        add(new MyUser("dianne","81dc9bdb52d04dc20036dbd8313ed055", 
            new String[]{"ROLE_USER", "ROLE_EDITOR"} ));
        
        add(new MyUser("scott","81dc9bdb52d04dc20036dbd8313ed055", 
            new String[]{"ROLE_USER"} ));
        
        add(new MyUser("peter","81dc9bdb52d04dc20036dbd8313ed055", 
            new String[]{"ROLE_USER"} ));
    }
    
    // must return a value or throw UsernameNotFoundException
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        //perform authentication
    }
}
```

- Line 10: `MyUser` extends
  `org.springframework.security.core.userdetails.User` which implements
  `org.springframework.security.core.userdetails.UserDetails`.
- Line 11: Here we define two authorities, `ROLE_USER` and
  `ROLE_EDITOR`.

Then specify `user-service-ref` with our `MyUserDetailsService`.

**applicationContext-security.xml**

```xml

    <authentication-manager>
        <authentication-provider user-service-ref="myUserDetailsService">
            <password-encoder hash="md5" />
        </authentication-provider>
    </authentication-manager>
```

- LIne 2: Configure Spring Security to use our custom user service.

# Secure Components

Every authenticated user has his/her own authorities. A common scenario
is where we want to control UI's status according to current user's
authorities. In our example, an anonymous user can only view an article,
and a user with "ROLE_USER" can see a disabled "Delete" button. But a
user with "ROLE_EDITOR" can see the "Delete" button and be able to click
it.

![]({{site.baseurl}}/zk_dev_ref/images/spring-security-anonymous.png)

<div style="text-align:center">

**What a anonymous user see**

</div>

![]({{site.baseurl}}/zk_dev_ref/images/spring-security-user.png)

<div style="text-align:center">

**What a user with "ROLE_USER" see**

</div>

![]({{site.baseurl}}/zk_dev_ref/images/spring-security-editor.png)

<div style="text-align:center">

**What a user with "ROLE_EDITOR" see**

</div>

How do we achieve this security control in a zul? We can implement a
custom tag library to check current user's authorities and apply the tag
library on `if` or `disable` attribute. Please refer to
[zuml_ref/custom_taglib)
for details.

The tag library's function is implemented in
`org.zkoss.reference.developer.spring.security.SecurityUtil`. Here we
just briefly explain how `isAllGranted()` is implemented and you can
read other methods in the source code .

The `SecurityContextHolder` is the most fundamental object and is where
Spring Security stores the present security context of the application,
which includes details of the principal currently using the application.
We can obtain user information from `SecurityContextHolder` including
his authorities.

**SecurityUtil.java**

```java
package org.zkoss.reference.developer.spring.security;

//omit import

public class SecurityUtil {

    public static boolean isAllGranted(String authorities) {
        if (null == authorities || "".equals(authorities)) {
            return false;
        }
        final Collection<? extends GrantedAuthority> granted = getPrincipalAuthorities();
        boolean isAllGranted = granted.containsAll(parseAuthorities(authorities)); 
        return isAllGranted;
    }

    private static Collection<? extends GrantedAuthority> getPrincipalAuthorities() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        if (null == currentUser) {
            return Collections.emptyList();
        }
        if ((null == currentUser.getAuthorities()) || (currentUser.getAuthorities().isEmpty())) {
            return Collections.emptyList();
        }
        Collection<? extends GrantedAuthority> granted = currentUser.getAuthorities();
        return granted;
    }

    //omit other methods
}
```

- Line 7: Return true if the authenticated principal is granted ALL of
  the roles specified in authorities. The input parameter is a comma
  separated list of roles which the user have been granted.

Then we still have to write a description file to describe the functions
that we can use in a zul. In our example, it is `/WEB-INF/security.tld`.
You can read the file in the source code.

**security.tld**

```xml
<taglib>
    <uri>http://www.zkoss.org/demo/integration/security</uri>
    <description>
        Methods and actions for ZK + Spring Security
    </description>

    <function>
        <name>isAllGranted</name>
        <function-class>org.zkoss.reference.developer.spring.security.SecurityUtil</function-class>
        <function-signature> boolean isAllGranted(java.lang.String authorities) 
        </function-signature>
        <description> 
            Return true if the authenticated principal is granted authorities of ALL the specified roles.
        </description>
    </function>
    ...
</taglib>
```

Before using a tag library in a zul, we should load its tld file with a
directive.

**articleContent.zul**

```xml
<?taglib uri="http://www.zkoss.org/zkspring/security" prefix="sec"?>
...

            <button id="deleteBtn" label="Delete"
            if="${sec:isAllGranted('ROLE_USER')}"
            disabled="${not sec:isAllGranted('ROLE_EDITOR')}"/>
```

- Line 1: Use a directive to load a custom tag library's tld file.
- Line 5: Hide this button for anonymous users.
- Line 6: Disable the button for those users without `ROLE_EDITOR`
  authority.

The function `isAllGranted()` will return true if the authenticated
principal is granted all of the roles specified in authorities. An
anonymous user doesn't have authority "ROLE_USER", so the "Delete"
button will not be created. If a user have authority "ROLE_EDITOR", he
can see an enabled "Delete" button (the `disable` will be `false`).

You can use our `SecurityUtil` and `security.tld` as reference and write
your own one to apply in your application.

# Secure Events

If you want to restrict available actions according to a business rule
or a dynamic status, this cannot be achieved by tag library. To do this,
Spring Security provides a "method security" which can add security to
your service layer methods. To use this feature, you should declare as
follows:

**applicationContext-security.xml**

```xml
<global-method-security secured-annotations="enabled" />
```

Then add `@Secure` to those methods you want to secure with permissions.

**ArticleService.java**

```java
public interface ArticleService {

    @Secured({"ROLE_USER", "IS_AUTHENTICATED_ANONYMOUSLY"})
    public List<Article> findAll();
    
    @Secured({"ROLE_USER", "IS_AUTHENTICATED_ANONYMOUSLY"})
    public Article find(long id);
    
    @Secured({"ROLE_USER"})
    public void create(Article a);
    
    @Secured({"ROLE_EDITOR","ROLE_USER"})
    public void update(Article a);
    
    @Secured({"ROLE_EDITOR"})
    public void delete(long id);
}
```

If a user uses the service and has no permission, Spring Security will
throw its `AccessDeniedException`.

If the security checking is more dynamic and cannot be determined in
compile time, we can check a user's permission in an event listener of a
controller. In our example, a user with "ROLE_EDITOR" can edit any
article but a user with "ROLE_USER" can only edit those articles written
by himself/herself. We can check this when a user clicks the "Edit"
button:

**permission checking in an event listener**

```java
@VariableResolver(DelegatingVariableResolver.class)
public class ArticleContentViewCtrl extends SelectorComposer<Component> {

    //omit other methods

    @Listen("onClick=#openEditorBtn")
    public void edit(){
        //ownership & permission check.
        if(!(isOwner() || SecurityUtil.isAllGranted("ROLE_EDITOR"))){
            throw new AccessDeniedException(
                "The user is neither the author, nor a privileged user.");
        }
        ArticleEditor editor = new ArticleEditor();
        editor.setParent(container);
        editor.doHighlighted();
    }
}
```

- Line 9~11: If the current login user is neither the owner of the
  article nor has the authority "ROLE_EDITOR", we will not allow the
  editing of the article and throw a Spring Security's
  `AccessDeniedException`.

If we throw a runtime exception for an access with insufficient
permission, ZK will show the error message on the page by default. But
for an unauthenticated user (not log in yet), we can even do more:
redirect the anonymous user to the login page. We will show how to
achieve this in ZK:

First, we have to catch the exception thrown in an event listener by [ ZK error handling mechanism](/zk_dev_ref/ui_patterns/error_handling),
configure `<error-page>` in `zk.xml`.

**zk.xml**

```xml

    <error-page>
        <exception-type>org.springframework.security.access.AccessDeniedException</exception-type>
        <location>/WEB-INF/errors/handleAccessDenied.zul</location>
    </error-page>
```

Then, create the error handling page. To avoid users visiting the page
directly, we put it under `/WEB-INF`. This error handling page displays
nothing but a [ page initiator]({{site.baseurl}}/zk_dev_ref/ui_patterns/page_initialization)
to redirect an unauthenticated user to the login page.

**handleAccessDenied.zul**

```xml

<?init class="org.zkoss.reference.developer.spring.security.ui.error.AjaxAccessDeniedHandler"?>
<zk>
<!-- Forward a unauthenticated user to login page. -->
</zk>
```

The page initiator redirects the browser to login page if current user
principle doesn't exist, otherwise, it displays exception's detail in a
custom page.

**AjaxAccessDeniedHandler.java**

```java
public class AjaxAccessDeniedHandler extends GenericInitiator {

    public void doInit(Page page, Map<String, Object> args) throws Exception {
        // when this initiator has been executed that means users encounter access denied problem.
        
        Execution exec = Executions.getCurrent();
        
        if (null == SecurityUtil.getUser()){ //unauthenticated user
            exec.sendRedirect("/login.zul");
        }else{
            //display error's detail
            Executions.createComponents("/WEB-INF/errors/displayAccessDeniedException.zul", null, args);
        }
    }
}
```

# Login Page

If you implement a login page with zul, you need to configure Spring
Security filter to ignore all AU requests (starting with `/zkau`).
Because ZK framework communicates with a server via that channel for
various things including firing events and getting resources. If the
security filter blocks AU requests, your login page cannot work.

But not intercepting ZK AU requests is equivalent to opening an
unchecked channel, which may result in security vulnerabilities.

## Non-ZK login entrypoint

Hence, to ensure all zk components are under the security filter's
protection, a good practice is to implement authentication without
relying on ZK.

This can be done with form-based authentication by implementing the
login form in HTML or JSP. And this can also be achieved with other
authentication methods which don't require a ZK page to be served, such
as redirecting to an external provider, using a SSO provider, etc.

With these options, the security filter doesn't have to be configured to
allow anonymous access to ZK AU requests. After a user logs in, all
requests including ZK AU can be intercepted by the security filter and
rejected if the user is unauthorized or unauthenticated.

# Example Source Code

All source code of examples used in this chapter can be found in
[here](https://github.com/zkoss/zkbooks/tree/master/developersreference/integration.spring.security).
