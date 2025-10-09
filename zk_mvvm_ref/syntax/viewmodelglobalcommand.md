# @GlobalCommand

# Syntax

```java
@GlobalCommand

@GlobalCommand("commandName")

@GlobalCommand({"commandName1", "commandName2"})
```

# Description

**Target:** method

**Purpose:** To identify a global command method.

The optional annotation's element is a String for command's name and that name is referenced in a ZUL with global command binding. If it's not provided, method name is set as the command name by default.

We can use parameter related annotations on command method's parameters; please refer to subsections of [ Parameters](./parameters) for more information.

# Example

#### Method name as command name
```java
@GlobalCommand
public void show() {
    // method body
}
```
#### Specify command name
```java
@GlobalCommand("delete")
@Command("delete")
public void deleteOrder() {
    // method body
}
```
