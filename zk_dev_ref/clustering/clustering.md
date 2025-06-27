# Overview

ZK is designed with clustering in mind: its components, pages, and desktops are all serializable, enabling session failover and high availability in distributed environments. This makes it possible to deploy ZK applications on clustered servers for scalability and reliability.

However, building a robust, clustering-ready ZK application requires careful attention to both configuration and application design. While the ZK framework provides the necessary infrastructure for serialization and session replication, developers must ensure that their own code and configuration are compatible with clustering requirements.

This section provides a comprehensive guide to:

- **Configuring ZK for clustering:** How to enable serialization and set up the necessary ZK and server settings.
- **Server-specific configuration:** Tips and links for configuring popular application servers and load balancers.
- **Best practices for clustering-ready development:** Key considerations and common pitfalls when writing ZK applications for clustered environments, including serialization, session management, and event handling.

By following these guidelines, you can ensure your ZK application is ready for production deployment in clustered and highly available environments.