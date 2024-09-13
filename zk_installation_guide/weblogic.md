1.  Download Weblogic 9.1 from
    [1](http://commerce.bea.com/showproduct.jsp?family=WLS&major=9.1&minor=0)
2.  Start the Weblogic installer and accept all defaults.
3.  Once the default installation is complete, create a weblogic domain
    by clicking Start-\>Programs-\>BEA products-\>Tools-\>Configuration
    Wizard.
4.  Select "Create New Weblogic Domain" and click Next.
5.  Accept the defaults on "Select Domain Source" and click Next.
6.  Enter a password in "Configure Administrator Username and Password"
    and click Next.
7.  Accept all defaults on "Configure Server Start Mode and JDK" and
    click Next.
8.  Selct No on Configure Environment Setting and Services" and click
    Next.
9.  Accept all defaults on "Create Weblogic Domain and click Create.
10. Once the domain is created, check the check box labeled "Start Admin
    Server" and click Done.
11. The server will start up.
12. The HTTP port is default to 7001 unless you change it.

**The easiest way to deploy your application is to copy your war/ear (it
could be in an exploded format) to the autodeploy directory under the
weblogic installaton directory. If you followed the instruction above
that directory is located at
C:\bea\user_projects\domains\base_domain\autodeploy. When you place your
war/ear file in that directory, weblogic will detect it and do a hot
deployment.**

If you want to copy ZK libraries to the domain, put them under
c:/bea/user_projects/domains/base_domain/lib

Libraries that have to be copied include bsh.jar,
commons-fileupload.jar, commons-el.jar, pxcommon.jar, pxweb.jar, zk.jar,
zul.jar, and zhtml.jar.


