# History Management with Bookmark

In traditional multi-page Web applications, users usually use the BACK
and FORWARD button to surf around multiple pages, and bookmark them for
later use. With ZK, you still can use multiple pages to represent
different sets of features and information, as you did in traditional
Web applications.

However, it is more common for ZK applications to represent a lot of
features in one desktop, which usually requires multiple Web pages in a
traditional Web application. To make user's surfing easier, ZK supports
the browser's history management that enables ZK applications to manage
browser's history simply on the server.

The concept is simple. For each state of a desktop, you could add a
so-called bookmark[^1] to the browser's history. Then, the user can use
the BACK and FORWARD button of the browser to switch around different
bookmarks. The change of books will be sent back to the server called
`onBookmarkChange`, and your application can switch to the corresponding
accordingly.

From application's viewpoint, it takes two steps to manage the browser's
history:

1.  Add a bookmark to the browser's history for each of the visited
    states of your desktop.
2.  Listen to the `onBookmarkChange` event for bookmark change, and
    switch the state accordingly.

> ------------------------------------------------------------------------
>
> <references/>

## Add Bookmarks to Browser's History

Your application has to decide what the appropriate states are to add to
the browser's history. For example, in a multi-step operation, each step
is a good candidate of states for adding to a browser's history, such
that the user can switch around these steps by pressing the BACK or
FORWARD buttons.

Once you decide when to add a state to the browser's history, you can
simply invoke
<javadoc method="setBookmark(java.lang.String)" type="interface">org.zkoss.zk.ui.Desktop</javadoc>.
Notice that it is *not* the bookmarks that users add to the browser
(aka., My Favorites in Internet Explorer).

For example, assume you want to bookmark the state when the Next button
is clicked, then you do as follows.

```xml
<button label="Next" onClick='desktop.setBookmark("Step-2")'/>
```

If you look carefully at the URL, you will find ZK appends `#Step-2` to
the URL.

If you press the BACK button, you will see as follows.

![](/zk_dev_ref/images/1000000000000284000000226A7DEE65.png)

## Listen to onBookmarkChange and Change the State Accordingly

After adding a bookmark to the browser's history, users can then surf
among these bookmarks such as pressing the BACK button to return to the
previous bookmark. When the bookmark is changed, ZK will notify the
application by broadcasting the `onBookmarkChange` event (an instance of
the <javadoc>org.zkoss.zk.ui.event.BookmarkEvent</javadoc> class) to all
root components in the desktop.

Unlike traditional multi-page Web applications, you have to change the
desktop's state on the server manually, when `onBookmarkChange` is
received. ZK does nothing to allow an application to set a bookmark and
notify for the bookmark change. It is the application developer's job to
manipulate the desktop to reflect the state that a bookmark has
represented.

To listen to the `onBookmarkChange` event, you can add an event listener
to any pages of the desktop, or to any of its root components.

```xml
<window onBookmarkChange="goto(event.bookmark)">
    <zscript>
     void goto(String bookmark) {
         if ("Step-2".equals(bookmark)) {
             ...//create components for Step 2
         } else { //empty bookmark
             ...//create components for Step 1
         }
    </zscript>
</window>
```

Like handling any other events, you can manipulate the UI any way you
want, when the `onBookmarkChange` event is received. It is totally up to
you.

A typical approach is to use one of the `createComponents` methods of
the <javadoc>org.zkoss.zk.ui.Executions</javadoc> class. In other words,
you could represent each state with one ZUML page, and then use
`createComponents` to create all components in it when
`onBookmarkChange` is received.

```java
 if ("Step-2".equals(bookmark)) {
     //1. Remove components, if any, representing the previous state
     try {
         self.getFellow("replacable").detach();
     } catch (ComponentNotFoundException ex) {
         //not created yet
     }

     //2. Create components belonging to Step 2
     Executions.createComponents("/bk/step2.zul", self, null);
 }
```

# Example

In this example, we bookmark each tab selection.

```xml
<window id="wnd" title="Bookmark Demo" width="400px" border="normal">
    <zscript>
     page.addEventListener(Events.ON_BOOKMARK_CHANGE,
         new EventListener() {
             public void onEvent(Event event) throws UiException {
                 try {
                     wnd.getFellow(wnd.desktop.bookmark).setSelected(true);
                 } catch (ComponentNotFoundException ex) {
                     tab1.setSelected(true);
                 }
             }
         });
    </zscript>

    <tabbox id="tbox"  onSelect="desktop.bookmark = self.selectedTab.id">
        <tabs>
            <tab id="tab1" label="Tab 1"/>
            <tab id="tab2" label="Tab 2"/>
            <tab id="tab3" label="Tab 3"/>
        </tabs>
        <tabpanels>
            <tabpanel>This is panel 1</tabpanel>
            <tabpanel>This is panel 2</tabpanel>
            <tabpanel>This is panel 3</tabpanel>
        </tabpanels>
    </tabbox>
</window>
```

# Bookmarking with iframe

If a page contains one or more `iframe` components, it is sometimes
better to bookmark the status of the `iframe` components too. For
example, when the contained `iframe` is navigated to another URL, you
might want to change the bookmark of the page (the container), such that
you can restore to the `iframe` to the right content. To do this, you
have to listen to the `onURIChange` event as follows.

```xml
<window onURIChange="desktop.bookmark = storeURI(event.getTarget(), event.getURI())">
    <iframe src="${uri_depends_on_bookmark}" forward="onURIChange"/>
</window>
```

The `onURIChange` event is sent as an instance of
<javadoc>org.zkoss.zk.ui.event.URIEvent</javadoc>.

Notice that the `onURIChange` event is sent only if the iframe contains
another ZK page. If it contains a non-ZK page, you have to handle it
manually. Please refer to [ZK Component Reference: iframe]({{site.baseurl}}/zk_component_ref/essential_components/iframe#Integrate_with_Other_Technologies)
for more information.

[^1]: Each bookmark is an arbitrary string added to the browser's
    history.
