# Get Your Heroku Ready

Refer to [Getting Started with Heroku](http://devcenter.heroku.com/articles/quickstart) for getting
Heroku ready. You should have Ruby, Git, and Heroku Gem installed and
have applied for a Heroku account.

# Deploy ZK Project to Heroku

Heroku **only** allow **Maven Projects**. Follow this
[guide]({{site.baseurl}}/zk_installation_guide/create_and_run_your_first_zk_application_with_maven_archetype)
to create a ZK-Maven Project. After you have created a ZK-Maven project,
you can decide to run with either Jetty or Tomcat.

## ZK Maven Project With Jetty Server Embedded

1.  Modify **pom.xml** to add embedded **Jetty** web container for
    running on Heroku.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-dependency-plugin</artifactId>
    <version>2.3</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>copy</goal>
            </goals>
            <configuration>
                <artifactItems>
                    <artifactItem>
                        <groupId>org.mortbay.jetty</groupId>
                        <artifactId>jetty-runner</artifactId>
                        <version>7.5.4.v20111024</version>
                        <destFileName>jetty-runner.jar</destFileName>
                    </artifactItem>
                </artifactItems>
            </configuration>
        </execution>
    </executions>
</plugin>
```

<li>

Create a file named **Procfile** in Project root to tell Heroku how to
execute the application

</li>

```bash
web: java $JAVA_OPTS -jar target/dependency/jetty-runner.jar --port $PORT target/*.war
```

</ol>

## ZK Maven Project With Tomcat Server Embedded

1.  Create **Main.java** in **src/main/java** with package **launch** to
    start embedded Tomcat server.

```java
package launch;

import java.io.File;
import org.apache.catalina.startup.Tomcat;

public class Main {
    public static void main(String[] args) throws Exception {

        String webappDirLocation = "src/main/webapp/";
        Tomcat tomcat = new Tomcat();

        // The port that we should run on can be set into an environment variable
        // Look for that variable and default to 8080 if it isn't there.
        String webPort = System.getenv("PORT");
        if (webPort == null || webPort.isEmpty()) {
            webPort = "8080";
        }

        tomcat.setPort(Integer.valueOf(webPort).intValue());

        tomcat.addWebapp("/", new File(webappDirLocation).getAbsolutePath());
        System.out.println("configuring app with basedir: " + new File("./" + webappDirLocation).getAbsolutePath());

        tomcat.start();
        tomcat.getServer().await();
    }
}
```

<li>

Modify **pom.xml**.

</li>

  
a\) **Remove** ***<package>war</package>*** line to make *Main.class*
work

b\) Add embedded **Tomcat** web container for running on Heroku.

```xml
<!-- <packaging>war</packaging> -->
...
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-core</artifactId>
    <version>7.0.22</version>
</dependency>
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-logging-juli</artifactId>
    <version>7.0.22</version>
</dependency>
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
    <version>7.0.22</version>
</dependency>
<!-- The following three dependencies are used for JSP. If you application doesn't contain JSP, simply remove them -->
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-jasper</artifactId>
    <version>7.0.22</version>
</dependency>
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-jasper-el</artifactId>
    <version>7.0.22</version>
</dependency>
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-jsp-api</artifactId>
    <version>7.0.22</version>
</dependency>
...
<!-- Add the plugin to start ''Main.class'' -->
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>appassembler-maven-plugin</artifactId>
    <version>1.1.1</version>
    <configuration>
        <assembleDirectory>target</assembleDirectory>
        <programs>
            <program>
                <mainClass>launch.Main</mainClass>
                <name>webapp</name>
            </program>
        </programs>
    </configuration>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>assemble</goal>
            </goals>
        </execution>
    </executions>
</plugin>
...
```

<li>

Create a file named **Procfile** in Project root to tell Heroku how to
execute the application

</li>

```bash
web: sh target/bin/webapp
```

</ol>

## Deploy to Heroku

Once the server is ready, we can deploy to Heroku.

1.  Initialize git repository.

```bash
cd projectName
git init
```

<li>

Create a <b>.gitignore</b> file to ignore all the files under **target**
folder as these files are unnecessary to be managed and included by git
repository.

</li>

```bash
target
```

<li>

Commit project source code to git repository.

</li>

```bash
git add .
git commit -m "CommitMessageNote"
```

<li>

Create Heroku app on Cedar stack and Heroku will create an app with a
random *AppName* that can be changed later:

</li>

```bash
heroku create --stack cedar
```

<li>

Deploy the code

</li>

```bash
git push heroku master
```

<li>

Rename the *AppName* (Optional)

</li>

```bash
heroku rename newname
```

<li>

Visit the application

</li>

```bash
heroku open
```

</ol>

## Update Source Code changes to Heroku

If you wish to make changes to the app deployed on Heroku, follow the
steps below:

1.  Commit project source code to git repository.

```bash
git add .
git commit -m "CommitMessageNote"
```

<li>

Deploy the code

</li>

```bash
git push heroku master
```

<li>

Visit the changes

</li>

```bash
heroku open
```

</ol>

# Sample

- [Download](http://sourceforge.net/projects/zkforge/files/Small_Talks/ZK_Sandbox_for_Heroku/)
  the sample maven project named heroku_zksandbox.zip.
- Sandbox sample is deployed on Heroku at
  [<http://zksandbox.herokuapp.com/>](http://zksandbox.herokuapp.com/).

# Version History
