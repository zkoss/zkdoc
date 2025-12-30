---
title: "Progressive Web Apps (PWA) Guide"
---

# Introduction

A Progressive Web App (PWA) is a web application that uses modern web capabilities to deliver an app-like experience to users. For more detailed information on PWAs, please refer to the [Mozilla Developer Network documentation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). ZK applications can incorporate some PWA features, albeit with certain limitations stemming from their server-centric architecture. This guide aims to clarify what PWA functionalities are achievable within a ZK framework and how to effectively implement them.

# Making Your ZK Application Installable

Making your ZK application installable allows users to add it to their home screen, providing a more integrated, native app-like experience. For comprehensive guidance on making PWAs installable, consult the [Mozilla Developer Network guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

# Using Other PWA-Related Web APIs

## Client-Side Integration

Any standard Web API that operates entirely on the client-side can be seamlessly integrated into a ZK application using ZK's client-side programming capabilities.

## Important Considerations:

*   **Browser Compatibility:** Always verify the browser compatibility of any Web API you intend to use, referring to resources like the [Mozilla Developer Network (MDN)](https://developer.mozilla.org/) for up-to-date information.
*   **Server Communication:** It is crucial to understand that even when using client-side Web APIs, any actions that necessitate updates to ZK components or involve server-side business logic will still require an active connection to the ZK server. For details on how to trigger server-side events from client-side code, please see [Firing Events at Client-side](/zk_client_side_ref/client_side_firing).

# 4. Limitations: Offline and Background Operation

## The "Online-First" Nature of ZK

True offline support is not practically feasible within the ZK framework due to its fundamental architectural design. ZK applications are inherently "online-first" because:

1.  **Server-Side Component Tree:** The entire user interface state and component hierarchy are primarily managed and maintained on the server.
2.  **Event-Driven Model:** User interactions on the client-side generate ZK events, which are then sent to and processed by the server.
3.  **Business Logic:** The core business logic and data processing of a ZK application reside predominantly on the server.

## What This Means in Practice:

*   An installed ZK PWA will function primarily as a convenient shortcut or bookmark to the web application.
*   If the device loses its internet connection, the ZK application will not be able to load or operate, as it relies on continuous communication with the server.

# Conclusion

## Summary of Key Takeaways:

*   You **can** successfully make your ZK application installable, offering users a native app-like feel from their home screen.
*   You **can** effectively utilize various client-side Web APIs (e.g., for notifications) to enhance the application's capabilities.
*   You **cannot** achieve a fully functional offline experience for a ZK application due to its server-side architecture.
