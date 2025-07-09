# Secure Your Application in Spring's Way

[Spring Security](https://spring.io/projects/spring-security) is a
widely-adopted framework. It can also work with ZK without problems.
This doesn't even need zkspring-security. This page will show you how to
do it. We assume you know the basics of [Spring Boot](https://spring.io/projects/spring-boot) and Spring Security. (You
can read a Spring Security guide: [Securing a Web Application](https://spring.io/guides/gs/securing-web/) ) So here we
just mention those configurations specific to ZK framework.

The example code mentioned here only works for Spring Security 4/5.

# ZK Spring Boot Starter

Spring encourages users to start with Spring Boot. So Please include [ zk spring boot starter]({{site.baseurl}}/zk_installation_guide/quick_start/create_and_run_your_first_zk_application_with_spring_boot),
and it will automatically configure for you with most commonly-used
settings.

# Spring Boot Starter Security

Follow [Securing a Web Application](https://spring.io/guides/gs/securing-web/), we add the
following elements:

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
            <version>${springboot.version}</version>
        </dependency>
```

# Spring Controller

For simplicity, we just register 2 URL mappings:

- `/login`: login page
- `/secure/{page}`: all secure pages

```java
@SpringBootApplication
@Controller
public class Application {

    public static void main(String[] args) throws Throwable {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/secure/{page}")
    public String secure(@PathVariable String page) {
        return "secure/" + page;
    }
}
```

Then put the corresponding zul under `web/zul` folder.

![](images/zkspring-zul-path.png)

# Web Security Configuration

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    public static final String ZUL_FILES = "/zkau/web/**/*.zul";
    public static final String[] ZK_RESOURCES = {"/zkau/web/**/js/**", "/zkau/web/**/zul/css/**", "/zkau/web/**/img/**"};
    // allow desktop cleanup after logout or when reloading login page
    public static final String REMOVE_DESKTOP_REGEX = "/zkau\\?dtid=.*&cmd_0=rmDesktop&.*";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
            .antMatchers(ZUL_FILES).denyAll() // block direct access to zul files
            .antMatchers(HttpMethod.GET, ZK_RESOURCES).permitAll() // allow zk resources
            .regexMatchers(HttpMethod.GET, REMOVE_DESKTOP_REGEX).permitAll() // allow desktop cleanup
            .requestMatchers(req -> "rmDesktop".equals(req.getParameter("cmd_0"))).permitAll() // allow desktop cleanup from ZATS
            .mvcMatchers("/","/login","/logout").permitAll()
            .mvcMatchers("/secure/**").hasRole("USER")
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginPage("/login").defaultSuccessUrl("/secure/main")
            .and()
            .logout().logoutUrl("/logout").logoutSuccessUrl("/");
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        UserDetails user =
                User.withDefaultPasswordEncoder()
                        .username("user")
                        .password("password")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(user);
    }
}
```

- Line 7: We need to disable spring CSRF to make ZK AU pass security
  filter. But don't worry. [ ZK already has its own CSRF mechanism](zk_dev_ref/security_tips/cross-site_request_forgery).
- Line 13: This line blocks the public access to [ ZK class path web resource folder]({{site.baseurl}}/zk_dev_ref/ui_composing/include_a_page#Classpath_Web_Resource_Path).
- Line 18-19: Assume we want all pages under `/secure` are protected and
  require an authentication.

# Login Page

No matter how you design a login page, remember to enclose it with a
<code>

<form>

</code> and the login URL you specify in the web security config.

```xml
    <n:form action="/login" method="POST">
        <grid width="450px">
            ...
                <row spans="2" align="right">
                    <hlayout>
                    <button type="reset" label="Reset" /> 
                    <button type="submit" label="Submit" />
                    </hlayout>
                </row>
          ...
        </grid>
    </n:form>
```

# Download Demo Project

[github - zkoss/zkspringboot - zkspringboot-security-demo](https://github.com/zkoss/zkspringboot/tree/master/zkspringboot-demos/zkspringboot-security-demo)

For an example without springboot (warfile with spring and
zk-spring-security), please refer to: [github - zkoss/zkspring - zkspringessentials/zkspringcoresec](https://github.com/zkoss/zkspring/tree/master/zkspringessentials/zkspringcoresec)

# Debug

Enable debug log in `application.properties` like
`logging.level.org.springframework.security.web=DEBUG` if you use
spring-boot.

For log4j, you can set
`log4j.category.org.springframework.security.web=TRACE`

Check what spring security does internally for a request in the log
like:

```text
2022-11-29 09:29:25 [TRACE] FilterChainProxy:245 - Trying to match request against DefaultSecurityFilterChain [RequestMatcher=Mvc [pattern='/login.zul*'], Filters=[]] (1/2)
2022-11-29 09:29:25 [TRACE] FilterChainProxy:245 - Trying to match request against DefaultSecurityFilterChain [RequestMatcher=any request, Filters=[org.springframework.security.web.session.DisableEncodeUrlFilter@5534e6f1, org.springframework.security.web.context.SecurityContextHolderFilter@4c6fc3e7, org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@aa8dce8, org.springframework.security.web.authentication.logout.LogoutFilter@6ad112de, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter@18a0721b, org.springframework.security.web.authentication.www.BasicAuthenticationFilter@2ae2fa13, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@66e12c3b, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@44485db, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@1f6f0fe2, org.springframework.security.web.access.ExceptionTranslationFilter@22604c7e, org.springframework.security.web.access.intercept.AuthorizationFilter@4d8f2cfd]] (2/2)
2022-11-29 09:29:25 [TRACE] FilterChainProxy:245 - Trying to match request against DefaultSecurityFilterChain [RequestMatcher=any request, Filters=[org.springframework.security.web.session.DisableEncodeUrlFilter@5534e6f1, org.springframework.security.web.context.SecurityContextHolderFilter@4c6fc3e7, org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@aa8dce8, org.springframework.security.web.authentication.logout.LogoutFilter@6ad112de, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter@18a0721b, org.springframework.security.web.authentication.www.BasicAuthenticationFilter@2ae2fa13, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@66e12c3b, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@44485db, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@1f6f0fe2, org.springframework.security.web.access.ExceptionTranslationFilter@22604c7e, org.springframework.security.web.access.intercept.AuthorizationFilter@4d8f2cfd]] (2/2)
2022-11-29 09:29:25 [DEBUG] FilterChainProxy:223 - Securing POST /zkau
2022-11-29 09:29:25 [DEBUG] FilterChainProxy:223 - Securing GET /index.zul
```

# Reference

- [Spring Security Reference 5.5.8.RELEASE](https://docs.spring.io/spring-security/site/docs/5.5.8/reference/html5/)
