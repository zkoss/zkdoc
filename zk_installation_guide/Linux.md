Here is the notes to set up the environment of Linux that some ZK
components depends on.

# Chart and Captcha

[Chart](ZK_Component_Reference/Diagrams_and_Reports/Chart)
and
[Captcha](ZK_Component_Reference/Essential_Components/Captcha)
depends on Java Swing. To make Swing works correctly under Linux, you
have to install `openjdk-6-jre`[^1]

``` bash
sudo apt-get install openjdk-6-jre
sudo /etc/init.d/tomcat6 restart
```

> ------------------------------------------------------------------------
>
> <references/>

# Jaspserreport

[Jasperreprot](ZK_Component_Reference/Diagrams_and_Reports/Jasperreport)
is based on [the JasperReports
project](http://jasperforge.org/projects/jasperreports). To make it run
correctly under Linux, you have to make sure all fonts that you use are
installed.

``` bash
sudo aptitude install msttcorefonts
sudo /etc/init.d/tomcat6 restart
```

The procedure to install fonts might depend on the version you use.
Please refer to [this
discussion](http://stackoverflow.com/questions/3218732/jasper-reports-pdf-generation-issue)
for more information.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

[^1]: The default installation includes only `openjdk-6-jre-headless`
    and `openjdk-6-jre-lib`.
