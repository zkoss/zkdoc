

1.  <div style="font-family:Verdana">

    **InputAgent.type() works correctly on all components except
    *Datebox* and *Timebox* in ZK 6 based project?**

    </div>

      
    Check if **zats-mimic-ext6.jar** exists in your project's classpath.
    If your project depends on ZK 6, you should include that jar.

2.  <div style="font-family:Verdana">

    **Why a unit test failed when starting up and occurred
    "NoSuchMethodError" or "ClassNotFoundException" on
    javax.servlet.xxx?**

    </div>

      
    ZATS mimic uses Jetty server (lite version) to emulate whole servlet
    container environment for testing. If your class path contains any
    servlet.jar, it will cause Jetty server to load wrong servlet.jar.
    You should exclude any servlet.jar from your class path when you
    running ZATS mimic test.

3.  <div style="font-family:Verdana">

    **Why my composer or zul cannot get Spring beans?**

    </div>

      
    You need to provide your custom web.xml which contains Spring
    context listener configuration to run the test case. Please refer to
    [ Custom WEB-INF
    Path](ZATS_Essentials/Mimic_Library/Advanced_Usage/Customize_Test_Environment#Custom_WEB-INF_Path).

4.  <div style="font-family:Verdana">

    **Why do I get an error: java.lang.IllegalStateException: No
    WebApplicationContext found: no ContextLoaderListener registered?**

    </div>

      
    See question 3.

 
