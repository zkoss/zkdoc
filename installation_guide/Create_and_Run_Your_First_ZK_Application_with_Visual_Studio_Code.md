## Introduction

We assume you chose VS Code because it is your favourite IDE and you
already know your way around. Hence this article doesn't go into much
detail about the IDE itself. The bottom line is, there shouldn't be any
surprise, ZK application can be run like any servlet web application
(war) or spring boot (jar) application - the project structure remains
the same (following the conventions of a maven or gradle project).
Ideally your project should not depend on a specific IDE and run from
command line. That allows your team members to pick an IDE of their
choice. That being said a few pointers to get started below.

## Install Visual Studio Code

Install VS Code from the [official
website](https://code.visualstudio.com/).

### Java Support in VS Code

As ZK is based on JAVA the first thing to add is java support to VS Code
[following the official
guide](https://code.visualstudio.com/docs/languages/java).

The [Extension Pack for
Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
works sufficiently well.

### ZUL Support in VS Code

The ZK plugin for VS Code is available in the [VS Code
Marketplace](https://marketplace.visualstudio.com/items?itemName=zkoss.vscode-zk-autocomplete).

Highlighted features include syntax highlighting, autocompletion,
element/attribute suggestion, auto tag closing and linking to Java file.

## Run the Project

Each project has a different ways to build/run. ZK projects produce
standard war files or runnable spring boot jars, which can be run with
the respective tools - e.g. Command Line, Maven/Gradle plugins or
Tomcat, Jetty extension in VS Code. As mentioned above ZK doesn't add
anything specific here -\> just run your project using the method of
your choice.
