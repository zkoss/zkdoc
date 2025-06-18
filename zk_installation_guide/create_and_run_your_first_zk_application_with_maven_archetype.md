

# What is Archetype

[Maven archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html)
serves as a pom.xml template. So you can start from a predefined
template without writing everything from the scratch. It can help you
quickly set up a Maven project with some predefined dependencies and
settings.

# Create a Project based on Archetype

Before starting, you need to [install maven](https://maven.apache.org/download.cgi) and [set up](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
first.

- Go to your new project folder, then run the following command:

```text
 mvn archetype:generate -DarchetypeCatalog=https://mavensync.zkoss.org/maven2/
```

Then just answer the questions the plugin asks you to create a project.

- The plugin will first ask you to choose the archetype from the zk
  catalog, please just enter the number of the archetype
- It will then ask users to enter the values for *groupId*, the
  *artifactId* and the *version* of the project to create the base
  package for the sources.
- It will then ask for confirmation of the configuration and perform the
  creation of the project.
- In the following example, webapp archetype (number 3) is selected, and
  *groupId* is set to **com.foo**, *artifactId* to **mywebapp**,
  *version* to **0.8.0** and *package* to **com.foo**.

**NOTE**: in case your maven installation uses the latest
maven-archetype-plugin version 3.0.1 you'll have to use the following
command (using 2.4 as a fallback -
[ARCHETYPE-519](https://issues.apache.org/jira/browse/ARCHETYPE-519)):

` $ mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate -DarchetypeCatalog=`[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)

` $ mvn archetype:generate -DarchetypeCatalog=`[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)  
` [INFO] Scanning for projects...`  
` [INFO] Searching repository for plugin with prefix: 'archetype'.`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] Building Maven Default Project`  
` [INFO]    task-segment: [archetype:generate] (aggregator-style)`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] Preparing archetype:generate`  
` [INFO] No goals needed for project - skipping`  
` [INFO] [archetype:generate {execution: default-cli}]`  
` [INFO] Generating project in Interactive mode`  
` [INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.`  
` archetypes:maven-archetype-quickstart:1.0)`  
` Choose archetype:`  
` 1: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-archetype-component (An archetype `  
` that generates a starter ZK component project)`  
` 2: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-archetype-extension (An archetype `  
` that generates a starter ZK extension project)`  
` 3: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-archetype-webapp (An archetype that`  
` generates a starter ZK CE webapp project)`  
` 4: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-ee-eval-archetype-webapp (An `  
` archetype that generates a starter ZK EE-eval webapp project)`  
` Choose a number: : 3`  
` Define value for property 'groupId': : com.foo`  
` Define value for property 'artifactId': : mywebapp`  
` Define value for property 'version': 1.0-SNAPSHOT: 0.8.0`  
` Define value for property 'package': com.foo:`  
` [INFO] Using property: zk-version-since = 6.0.1`  
` Confirm properties configuration:`  
` groupId: com.foo`  
` artifactId: mywebapp`  
` version: 0.8.0`  
` package: com.foo`  
` zk-version-since: 6.0.1`  
` Y:`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] BUILD SUCCESSFUL`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] Total time: 29 seconds`  
` [INFO] Finished at: Fri Jun 22 16:55:27 CST 2012`  
` [INFO] Final Memory: 13M/150M`  
` [INFO] ------------------------------------------------------------------------`

# Run the Project

The project created by archetypes above should have a maven jetty plugin
configured, you can just run the project with the command below:

`mvn jetty:run`
