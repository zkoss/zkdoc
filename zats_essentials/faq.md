

1. **InputAgent.type() works correctly on all components except
    *Datebox* and *Timebox* in ZK 6 based project?**

    Check if **zats-mimic-ext6.jar** exists in your project's classpath.
    If your project depends on ZK 6, you should include that jar.

2. **Why a unit test failed when starting up and occurred
    "NoSuchMethodError" or "ClassNotFoundException" on
    javax.servlet.xxx?**

    ZATS mimic uses Jetty server (lite version) to emulate whole servlet
    container environment for testing. If your class path contains any
    servlet.jar, it will cause Jetty server to load wrong servlet.jar.
    You should exclude any servlet.jar from your class path when you
    running ZATS mimic test.

3. **Why my composer or zul cannot get Spring beans?**
      
    You need to provide your custom web.xml which contains Spring
    context listener configuration to run the test case. Please refer to
    [Custom WEB-INF Path]({{site.baseurl}}/zats_essentials/mimic_library/advanced_usage/customize_test_environment#Custom_WEB-INF_Path).

4.  **Why do I get an error: java.lang.IllegalStateException: No WebApplicationContext found: no ContextLoaderListener registered?**
      
    See question 3.