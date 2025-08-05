---
title: "What is a ZK component"
---

Each UI object in ZK consists of a component and a widget.

## Component

A component is a Java object running at the server which represents a UI
object which can be manipulated by a Java application. A component has
all the behavior of a UI object except it has no visual part.

## Widget

A widget is a JavaScript object running at the client. This object
represents the UI object which interacts with the user. Therefore, a
widget usually has a visual appearance, and handles events happening at
the client.

Having established that there are two parts to a ZK Component one needs
to explore how these parts interact with one another to form a fully
interactive user experience.
