# Client-Side Attributes

In addition to standard component attributes, ZK allows specifying client-side behaviors and configurations directly in ZUML using `data-` attributes within the `client` namespace. These attributes influence how the component's client-side widget behaves.

Here are some of the client data attributes:

- `data-swipeable`: Configures whether a component supports swipe gestures, enabling features like closing/opening `borderlayout` regions, switching `tabbox` tabs, navigating `listbox`, `grid`, `tree` paging, and changing `calendar` views (primarily for EE tablet-only).
- `data-scrollable`: Controls the scrolling behavior of popups (like error boxes, combobox, and datebox popups) within scrollable containers (`window`, `groupbox`, `panelchildren`, `tabpanel`, `grid`, `listbox`, `tree`), making them scroll with the container. Can also disable the friendly scrollbar on tablet devices for `Listbox`, `Grid`, and `Tree`.
- `data-embed-scrollbar`: Determines if the ZK customized scrollbar is embedded within mesh widget components (`Grid`, `Listbox`, `Tree`) and layout regions (`Center`, `South`, `North`, etc.).
- `data-fix-scroll-position`: Applied to input elements like `textbox` to fix the scroll position, preventing conflicts with virtual keyboard navigation on devices like iPad.
- `data-animation-speed`: Sets the animation speed for components like `panel` and `cardlayout`. Accepts 'slow', 'fast', or integer values (0 for no animation).

For a detailed reference of available client attributes and their usage, please refer to the [ZUML Client Attribute Reference](/zuml_ref/client_attribute).