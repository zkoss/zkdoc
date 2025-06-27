# Overview

ZK allows applications to handle events at both the server and client
side. Handling events at the server side, as described in the previous
sections, is more common, since the listeners can access the backend
services directly. However, handling events at the client side improves
the responsiveness. For example, it is better to be done with a
client-side listener if you want to open the drop-down list when a
combobox gains focus.

A good rule of thumb is to use server-side listeners first since it is
easier, and then improve the responsiveness of the critical part, if
any, with the client-side listener.

For more information about handling events at the client, please refer
to [ZK Client-side Reference: Event Listening]({{site.baseurl}}/zk_client_side_ref/general_control/event_listening).
