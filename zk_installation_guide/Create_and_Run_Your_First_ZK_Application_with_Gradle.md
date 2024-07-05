

# Start from Maven Archetype

Although Gradle doesn't provide a counterpart like Maven archetype, you
still can initialize your build script based on it. The steps are:

1\. [Create your pom.xml with Maven
archetype](https://www.zkoss.org/wiki/ZK_Installation_Guide/Quick_Start/Create_and_Run_Your_First_ZK_Application_with_Maven_Archetype)

2\. Run `gradle init` in the same folder as pom.xml You will see the
message:

`Found a Maven build. Generate a Gradle build from this? (default: yes) [yes, no]`

Then

`Select build script DSL:`  
`  1: Groovy`  
`  2: Kotlin`  
`Enter selection (default: Groovy) [1..2]`

Just follow the interactive process, it will produce a Gradle build
script with ZK dependencies migrated from the pom.xml.

# The zk-gradle example

The example project is located on
[github/zkoss-demo/zk-gradle](https://github.com/zkoss-demo/zk-gradle).
To use it all you need is a command line interface (and optional: git).

Since gradle is a complex tool a basic understanding about gradle itself
will help understanding the example -\> please refer to the [gradle
documentation](https://docs.gradle.org/) pages.

## Download/Clone the example project

With the git command line installed all you need is to clone the example
repository:

`   git clone git@github.com:zkoss-demo/zk-gradle.git`

Alternatively, you can download the example as a
[zip-package](https://github.com/zkoss-demo/zk-gradle/archive/master.zip).

Once cloned/unzipped open a command line in the project folder.

In order to get started immediately the project includes the
[gradle-wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html).
The wrapper comes with 2 scripts `gradlew.bat` (windows) and `gradlew`
(linux/mac) and a folder `/gradle` containing a launcher jar that will
download Gradle itself with all its required dependencies without having
to install Gradle manually.

The first time you'll execute any of the commands in the following
section, Gradle will download itself and all the required project
dependencies. This will initially take quite a few minutes while showing
the overall progress. Subsequent executions will be faster as Gradle
will cache the once downloaded resources in the *.gradle/* subfolder
(it's safe to delete this folder, Gradle will just download the
dependencies again the next time it is executed)

[build.gradle](https://github.com/zkoss-demo/zk-gradle/blob/master/build.gradle)
the build script
[1](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html)

[settings.gradle](https://github.com/zkoss-demo/zk-gradle/blob/master/settings.gradle)
the build settings e.g. contains the project name
[2](https://docs.gradle.org/current/dsl/org.gradle.api.initialization.Settings.html)

[gradle.properties](https://github.com/zkoss-demo/zk-gradle/blob/master/gradle.properties)
here contains the dependency versions
[3](https://docs.gradle.org/current/userguide/build_environment.html)

## Useful build tasks

**NOTE**: Using the windows command line (*cmd*) you have to omit the
"./" in front of the commands e.g.

`gradlew clean`

build the war file (in the subfolder *build/libs/zk-gradle.war*)

`./gradlew war`

run the [Zats Tests](https://www.zkoss.org/product/zats) (also creates a
test report in *build/reports/tests/test/index.html*)

`./gradlew test`

combine both

`./gradlew test war`

clean the build

`./gradlew clean`

list available tasks (shows many more options ...)

`./gradlew tasks`

## Run the Project

### Run with Gretty

The example can be run using the [gradle plugin:
org.gretty](https://plugins.gradle.org/plugin/org.gretty)

`   ./gradlew appRun`

Explicitly specifying Jetty

`   ./gradlew jettyRun`

or Tomcat

`   ./gradlew tomcatRun`

### Run with Jetty-Runner

For shortest startup time an embedded
[jetty-runner](https://www.eclipse.org/jetty/documentation/current/runner.html)
can be run directly from a main class `org.eclipse.jetty.runner.Runner`
using a minimum configuration.

`   ./gradlew startJettyRunner`

After a short startup time (the first startup will download the
dependencies so it will take a bit longer) you'll see this output and
the server will run under the same local URL.

`   Nov 01, 2019 10:41:17 AM org.eclipse.jetty.util.log.Log initialized`  
`   INFO: Logging initialized @181ms to org.eclipse.jetty.util.log.Slf4jLog`  
`   ...`  
`   INFO: Runner`  
`   Nov 01, 2019 10:41:17 AM org.eclipse.jetty.server.Server doStart`  
`   INFO: jetty-9.4.21.v20190926; built: 2019-09-26T16:41:09.154Z; git: 72970db61a2904371e1218a95a3bef5d79788c33; jvm 11.0.4+11-post-Ubuntu-1ubuntu218.04.3`  
`   ...`  
`   Nov 01, 2019 10:41:18 AM org.eclipse.jetty.server.AbstractConnector doStart`  
`   INFO: Started ServerConnector@90f6bfd{HTTP/1.1,[http/1.1]}{0.0.0.0:8080}`  
`   Nov 01, 2019 10:41:18 AM org.eclipse.jetty.server.Server doStart`  
`   INFO: Started @1578ms`

### Inside the IDE

**TIP**: The jetty-runner main class (`org.eclipse.jetty.runner.Runner`)
can be executed directly in your IDE (without additional plugins) for
easier debugging and even faster restarts, if hot code replacement or
automatic resource loading fails. The minimum **program arguments** are
as simple as passing in a webapp-folder (and an optional port/context
path)

`   --path /zk-gradle --port 8085 src/main/webapp`

or simply

`   src/main/webapp`

## Debug in IntelliJ IDEA

Run the task and attach the debugger:

` jettyRunDebug`

The server will stop at breakpoints.

## Import a Gradle project into your IDE

<figure>
<img src="zk-gradle-idea-run-config.png"
title="An exemplary development run config for IntelliJ IDEA" />
<figcaption>An exemplary development run config for IntelliJ
IDEA</figcaption>
</figure>

The [example project](https://github.com/zkoss-demo/zk-gradle) doesn't
include or require any IDE specific settings and can be imported into
your preferred IDE supporting gradle.

In **Eclipse** you can use the [buildship
plugin](https://projects.eclipse.org/projects/tools.buildship)

For **IntelliJ IDEA** just follow the Help page: [Working with Gradle
Projects](https://www.jetbrains.com/help/idea/gradle.html)
