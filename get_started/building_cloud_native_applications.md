---
title: Building Cloud-Native Applications
description: Learn how to build scalable, cloud-native web applications using ZK Stateless components.
---
# Building Cloud-Native Applications with Stateless Components

## Introduction: Building for the Cloud

Modern web applications are increasingly deployed in cloud environments, requiring high scalability, fault tolerance, and minimal resource footprints per user. As user bases grow, the traditional approach of storing rich component states on the server can become a bottleneck due to high memory consumption and the complexities of session replication in a clustered environment. 

To address these challenges, ZK provides **Stateless Components**—a solution specifically designed for building highly scalable, memory-efficient, cloud-ready applications while maintaining the benefits of component-based UI development.

## Classical vs. Stateless Components

To understand the benefits of stateless components, it helps to compare them with the classical ZK component model.

### Classical ZK Components
In the classical ZK architecture, the server maintains a tree of stateful UI components for each active user session. This makes development extremely intuitive and straightforward, as you can easily manipulate the UI state directly from Java. However, this convenience comes at the cost of server memory, as the component states (like selected items, expanded nodes, and typed text) are kept alive on the server side as long as the session is active.

### Stateless Components
Stateless components, on the other hand, flip this model. They are immutable and do not retain UI state on the server across requests. Instead, the UI state is primarily managed by the client (the browser), and the server only processes state changes when an action occurs. This drastically reduces the memory footprint per user session and eliminates the need for complex session replication in distributed cloud environments.

Here is a simple visualization of the difference:

```text
Classical Stateful Architecture
+-----------------+                      +-----------------+
|     Browser     |                      |      Server     |
|   (UI State)    | <--- Sync State ---> |   (UI State)    |
|                 |                      |                 |
+-----------------+                      +-----------------+
                                           (Memory Heavy)

Stateless Architecture
+-----------------+      (Action)        +-----------------+
|     Browser     | -------------------> |      Server     |
|   (UI State)    | <--- (Response) ---- |  (Action Logic) |
|                 |                      |                 |
+-----------------+                      +-----------------+
  (State Resides                           (Memory Light)
    on Client)
```

## Why Choose Stateless?

When deploying applications to the cloud, stateless components offer several compelling advantages:

- **Lower Memory Footprint**: Without the need to maintain component states in server memory, your application can serve significantly more users per server instance.
- **Horizontal Scalability**: Because the server holds minimal session state, any server in a cluster can process requests. This makes load balancing and scaling out much simpler.
- **Resilience**: If a server node restarts or crashes, users are less likely to lose their progress since the UI state is preserved on the client side.
- **Cloud-Native Alignment**: The stateless model aligns perfectly with microservices and serverless-like deployment strategies, where ephemeral server instances handle requests and shut down.

## Next Steps: Building a Stateless UI

Ready to start building a highly scalable, memory-efficient UI for the cloud? Dive into the detailed developer reference to see how to implement ZK Stateless components in your project.

Read the guide here: [Building Stateless UI](/zk_dev_ref/stateless_components/building_stateless_ui)
