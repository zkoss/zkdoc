

By default, a desktop is purged when the user browses to another URI or
refreshes the page. Thus, the user can have the most updated
information. However, if a page takes too long to generate, you can
provide a plugin so-called *desktop recycle*.

First, you implement the
<javadoc type="interface" /javadoc>org.zkoss.zk.ui.util.DesktopRecycle</javadoc>
interface to cache and reuse the desktops which are supposedly being
removed. Second, specify the class in `WEB-INF/zk.xml`. For example, let
us assume the class you implement is called `foo.MyRecycle`, then add
the following to `zk.xml`

``` xml
<listener>
    <listener-class>foo.MyRecycle</listener-class>
</listener>
```

### org.zkoss.zkmax.ui.util.DesktopRecycle

ZK provides a default implementation, the
<javadoc>org.zkoss.zkmax.ui.util.DesktopRecycle</javadoc> class, to
simplify the use. You can use it directly or extend from it. By default,
it caches all desktops for all URIs. You can extend it to limit to
certain paths by overriding the `shallRecycle` method, or not to use
desktops older than a particular time by overriding the `shallReuse`
method.

For example, we can limit the URL to cache to `"/long-op/*"`, and
re-generate the page if it has been served for more than 5 minutes.

``` java
public class MyRecycle extends org.zkoss.zkmax.ui.util.DesktopRecycle {
  protected boolean shallCache(Desktop desktop, String path, int cause) {
    return path.startsWith("/long-op");
  }
  protected boolean shallReuse(Desktop desktop, String path, int secElapsed) {
    return secElapsed >= 300;
  }
}
```

### Implement Your Own Desktop Recycle

It is straightforward to implement the
<javadoc type="interface" >org.zkoss.zk.ui.util.DesktopRecycle</javadoc>
interface from scratch, if you prefer. The basic idea is to cache the
desktop when the `beforeRemove` method is invoked, and to reuse the
cached desktop when the `beforeService` method is called.
