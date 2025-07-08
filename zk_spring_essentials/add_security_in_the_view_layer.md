# Overview

ZK Spring Security provides features to check a user's role and
permissions so that you can determine whether to render certain parts of
the UI based on the user's roles.

ZK Spring Security provides 2 ways to access user roles and permissions
in a ZK application.

- **SecurityUtil** a java class providing static methods to be used in
  component, controller, and view model code
- **Taglib functions** and an implicit **authentication** object to
  perform permission checks conveniently in ZUL files (with
  EL-Expressions)

# Using the Taglib in ZUL

In zul files the special attributes
[if](zuml_ref/ZUML/Attributes/if) and
[unless](zuml_ref/ZUML/Attributes/unless) are ideal
candidates to render or omit certain parts of a zul file.

After declaring the taglib the functions are available with the
specified prefix.

```xml
<?taglib uri="http://www.zkoss.org/zkspring/security" prefix="sec"?>
<zk>

  <div if="${sec:isAllGranted('ROLE_SUPERVISOR')}">
    This div and all child components are only displayed for user with the SUPERVISOR ROLE
    <listbox .../>
  </div>

  <button if="${sec:isAnyGranted('ROLE_TELLER,ROLE_ACCOUNTANT')}" 
     label="For TELLERs and ACCOUNTANTs only" >

  <zk if="${sec:isNoneGranted('ROLE_TRAINEE,ROLE_ROOKIE')}">
     TRAINEES and ROOKIES won't see this.
  </zk>
</zk>
```

As in all zul pages, the taglib function can also be used in a
component's attributes. For example, to disable a button according to a
role:

```xml
<button label="Transfer Money" disabled="${sec:isNoneGranted('ROLE_SUPERVISOR')}" .../>
```

Available functions as implemented in
([org.zkoss.spring.security.SecurityUtil](https://www.zkoss.org/javadoc/latest/zkspring-security/org/zkoss/spring/security/SecurityUtil.html)):

- `boolean isNoneGranted(String authorities)`: Return true if the
  authenticated principal is granted NONE of the roles in the specified
  authorities.
- `boolean isAllGranted(String authorities)`: Return true if the
  authenticated principal is granted ALL of the roles in the specified
  authorities.
- `boolean isAnyGranted(String authorities)`: Return true if the
  authenticated principal is granted ANY of the roles in the specified
  authorities.
- `boolean isAccessible(String hasPermission, Object domainObject)`:
  Return true if the current Authentication has one of the specified
  permissions to the presented domain object instance.
- `Authentication getAuthentication()`: Return current login
  Authentication (similar to implicit "authentication" object).

# Using `SecurityUtil`

You can call the methods of
([org.zkoss.spring.security.SecurityUtil](https://www.zkoss.org/javadoc/latest/zkspring-security/org/zkoss/spring/security/SecurityUtil.html))
in java code directly, to build the UI conditionally:

```java
if (SecurityUtil.isAllGranted("ROLE_SUPERVISOR")) {
    Button btn = new Button();
    ...
    btn.setParent(win);
}
```

# The Implicit "authentication" Object

The `DelegatingVariableResolver` adds an implicit object
"authentication" which exposes Spring's current authentication object
[Authentication](https://docs.spring.io/spring-security/site/docs/4.0.x/apidocs/org/springframework/security/core/Authentication.html)
to EL expressions. Depending on the type of the principal object you can
access also nested properties.

```xml
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<div>
  <label value="authentication.name"/> = ${authentication.name}
</div>
<div>
  <label value="authentication.principal.username"/> = ${authentication.principal.username}
</div>
<div>
  <label value="authentication.principal.enabled"/>  = ${authentication.principal.enabled}
</div>
<div>
  <label value="authentication.principal.accountNonLocked"/> = ${authentication.principal.accountNonLocked}
</div>
```

# Websocket / Server Push support

As WebSocket and asynchronous UI updates (via server push) don't always
go through Spring Security's Filter chain (as no HTTP Request is
sent/filtered), the SecurityContextHolder is not initialized in such
cases. The result is, that Spring won't be able to perform
authentication or authorization (role) checks.

To achieve better integration the
[SecurityContextAwareExecutionListener](https://github.com/zkoss/zkspring/blob/master/zkspring-security/src/main/java/org/zkoss/spring/init/SecurityContextAwareExecutionListener.java)
(an ExecutionInit/Cleanup-Listener) is added by default to fill the
SecurityContextHolder from the current Session during UI updates.

This listener is enabled by default and can be disabled by setting the
library property
**org.zkoss.spring.init.SecurityContextAwareExecutionListener.enabled**
to **false**.
