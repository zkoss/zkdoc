The data of a widget event
(<javadoc method="data" directory="jsdoc">zk.Event</javadoc>) is
serialized to a string (so-called marshal) by
[JSON](http://www.json.org/js.html), when the event is sent back to the
server. ZK Update Engine will unmarshal it back to a map. If an entry of
the data is an array, it will be converted to a list[^1].

The map of data can be retrieve by the use of
<javadoc method="getData()">org.zkoss.zk.au.AuRequest</javadoc>.

For example, assume we fire an event at the client as follows.

```javascript
wgt.fire('onFly', {x: 10, y: 20});
```

Then, we can retrieve and process it at the server as follows:

```java
public class Fly extends AbstractComponet {
  static {
    addClientEvent(Fly.class, "onFly", CE_IMPORTANT); //assume it is an important event
  }

  public void service(org.zkoss.zk.au.AuRequest request, boolean everError) {
    String cmd = request.getCommand();
    if (cmd.equals("onFly")) {
      Map data = request.getData();
      int x = ((Integer)data.get("x")).intValue();
      int y = ((Integer)data.get("y")).intValue();
      //do whatever you want
    } else {
      super.service(request, everError);
    }
  }
}
```

Notice that

- [org.zkoss.zk.au.AuRequests](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/AuRequests.html) provides a collection of
  utilities to convert it to int, long and boolean.
- An integer number is converted to an instance of Integer if it is not
  overflow (i.e., less than Integer.MAX_VALUE). Otherwise, Long is
  assumed.
- A decimal number (with . or e) is converted to an instance of Double.

If the data is not a map, it can be retrieved with the empty key:

| Types in JavaScript                                         | Codes in Java                                                                                                                                                                      |
|-------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| wgt.fire("onFly", "sky");                                   | String sky = (String)request.getData().get("");                                                                                                                                    |
| wgt.fire("onFly", 123);                                     | Integer val = (Integer)request.getData().get("");                                                                                                                                  |
| wgt.fire("onFly", \["sky", 123\]);                          | List data = (List)request.getData().get(""); String sky = (String)data.get(0); Integer val = (Integer)data.get(1);                                                                 |
| wgt.fire("onFly", {left:'10px', top:20px', more:\[1, 2\]}); | Map data = request.getData(); String left = (String)data.get("left"); String top = (String)data.get("top"); List more = (List)data.get("more"); Integer v1 = (Integer)more.get(0); |

```java
Map data = request.getData();
String left = (String)data.get("left");
String top = (String)data.get("left");
```

For custom data types, you can implement `toJSON` (at the client) to
convert a JavaScript object to a string in custom way.

```javascript
MyClass.prototype.toJSON = function (key) { //key usually meaningless
   return this.uuid;
};
```

In addition to the default handling, You can add a custom AU request
service to a component by calling
<javadoc method="setAuService(org.zkoss.zk.au.AuService)" type="interface">org.zkoss.zk.ui.Component</javadoc>.

> ------------------------------------------------------------------------
>
> <references/>



[^1]: More precisely, they are converted to
    [org.zkoss.json.JSONObject](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/json/JSONObject.html) (a map) and
    [org.zkoss.json.JSONObject](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/json/JSONObject.html) (a list)
