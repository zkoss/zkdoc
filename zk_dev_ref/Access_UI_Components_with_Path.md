## Use Java

Every ZUL component has its mapping Java class. Every ZUL element declared in ZUML has its mapping Java object. You can easily access the object in Java code if you assign it an `id`. The <javadoc>org.zkoss.zk.ui.Path</javadoc> class provides utilities to simplify the location of a component among ID spaces. Its usage is similar to `java.io.File`. Like a path in a file system, a component path is a catenation of IDs of components along ID spaces.

By default, the root of a component path is the current page. If you want to identify another page, you have to use `//`. Note that elements that can be space owners (those component classes that implement <javadoc>org.zkoss.zk.ui.IdSpace</javadoc>) such as `page`. Tip: `Path.getComponent("//xyz")` always returns null, since the identifier following `//` is the page's ID. And, the page is not a component. `window`, `include`, and `regular macro`. (Note: Components on an include-page are not accessible with the same path expression as if they were on the containing page.)

```java
Path.getComponent("//P/A/B/D"); // since C is not a spaceOwner, we don't have to go through C.
Path.getComponent("/A/B/D"); // assume the current page is P, then you can omit //P
```

For example, if you have a `label` in ZUML as below:

```xml
<?page id="P"?>
<window id="A">
  <window id="B">
    <div id="C">
      <label id="D"/>
    </div>
  </window>
</window>
```
Then, you can access it as a Java object by retrieving it through `Path.getComponent()`:
```java
Label label = (Label) Path.getComponent("//P/A/B/D");
```

# Use zscript
It's intuitive to access ZUL elements in zscript.

```xml
<window>
  <label id="lab_1" value="initial by label"/>
  <zscript>
    lab_1.value = "changed by zscript";
  </zscript>
</window>
```
The result will show:
```txt
changed by zscript
```
But you have to pay attention to the declaration sequence because zscript is evaluated when a ZUML page is rendered. Typical use of `zscript` includes initialization and declaring global variables and methods.

If we adjust the sequence of the previous example:
```xml
<window>
  <zscript>
    lab_1.value = "changed by zscript";
  </zscript>
  <label id="lab_1" value="initial by label"/>
</window>

```
The result will show:
```txt
initial by label
```
Notice the namespace is hierarchical. That means components from upper id space are accessible unless overridden. But components in lower id space are not accessible. Therefore, in the following example, `zscript` inside `window win_1_1` can access `lab_1`:

```xml
<window id="win_1">
  <label id="lab_1" value="initial by label"/>
  <window id="win_1_1">
    <zscript>
      lab_1.value = "changed by zscript";
    </zscript>
  </window>
</window>
```
And the result shows:
```txt
changed by zscript
```
If we modify the namespace structure to:
```xml
<window id="win_1">
  <window id="win_1_1">
    <label id="lab_1" value="initial by label"/>
  </window>
  <zscript>
    lab_1.value = "changed by zscript";
  </zscript>
</window>
```
The result will be:
```txt
initial by label
```
Just like Java, you can use `Path.getComponent` in `zscript` for sure:
```xml
<window id="win_1">
  <window id="win_1_1">
    <label id="lab_1" value="initial by label"/>
  </window>
  <zscript>
    public void sayHello() {
      Label l = (Label)Path.getComponent("/win_1/win_1_1/lab_1");
      l.setValue("changed");
    }
  </zscript>
  <button label="ok" onClick="sayHello()"/>
</window>
```
In the above example, `sayHello()` is evaluated when the `button` is clicked. Therefore, it isn't affected by the declaration sequence.

# Use Expression Language
Like `zscript`, EL has to pay attention to the declaration sequence. In the following example:
```xml
<window>
  1:${btn_1.label}
  <button id="btn_1" label="button_1"/>
  2:${btn_1.label}
</window>
```
The result will show:
```txt
1:2:button_1
```
Like `zscript`, the namespace is hierarchical. In the following example:
```xml
<window id="win_1">
  <label id="lab_1" value="myValue"/>
  1:${lab_1.value}
  <window id="win_1_1">
    1.1:${lab_1.value}
  </window>
</window>
```
The result will show:
```txt
myValue
1:myValue
1.1:myValue
```
And if we modify the structure to:
```xml
<window id="win_1">
  <window id="win_1_1">
    <label id="lab_1" value="myValue"/>
    1.1:${lab_1.value}
  </window>
  1:${lab_1.value}
</window>
```
The result will be:

```txt
myValue
1.1:myValue
1:
```

Unlike `zscript`, EL doesn't accept operator `=`.

Notes