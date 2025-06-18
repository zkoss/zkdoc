

JavaScript is not an object-oriented language, but ZK provides some
utilities to enable object-oriented programming.

# The JavaScript Package

Like Java, ZK's JavaScript classes are grouped into different packages.
Similar to Java, the JavaScript code is loaded on demand, but it is
loaded on per-package basis rather than per-class (i.e., the whole
package is loaded if needed).

The dependence of the packages is defined in the so-called [Widget
Package
Descriptor]({{site.baseurl}}/zk_client_side_ref/widget_package_descriptor)
(aka., WPD). If it is about to load a package, all packages it depends
will be loaded too.

## Define a Package

A package is usually defined implicitly by the use of [a WPD
file]({{site.baseurl}}/zk_client_side_ref/widget_package_descriptor),
such as

```xml
<package name="zul.grid" language="xul/html" depends="zul.mesh,zul.menu">
    <widget name="Grid"/>
    <widget name="Row"/>
    <widget name="Rows"/>
</package>
```

You rarely need to define it explicitly, but, if you want, you could use
<javadoc directory="jsdoc" method="$package(_global_.String)">\_global\_.zk</javadoc>.
For example,

```javascript
zk.$package('com.foo');
```

Similarly, you could, though rarely needed, import a package by the use
of
<javadoc directory="jsdoc" method="$import(_global_.String)">\_global\_.zk</javadoc>.

Notice that, if the package is not loaded yet,
<javadoc directory="jsdoc" method="$import(_global_.String)">\_global\_.zk</javadoc>
won't load the package but returns null.

## Load Packages

To force one or multiple packages to load, you could use
<javadoc directory="jsdoc" method="load(_global_.String, _global_.Function)">\_global\_.zk</javadoc>.
Since ZK loads the packages asynchronously, you cannot access any of the
code right after the invocation of
<javadoc directory="jsdoc" method="load(_global_.String, _global_.Function)">\_global\_.zk</javadoc>.
Rather, you should specify the code in the second argument as a function
(<javadoc directory="jsdoc">\_global\_.Function</javadoc>). For example,

```javascript
zk.load("zul.inp, zul.layout", function () { //load zul.inp and zul.layout
    new zul.layout.Hlayout({
        children: [new zul.inp.Textbox({value: 'foo'}]
   }); //Correct! zul.inp and zul.layout are both loaded
});
new zul.inp.Textbox({value: 'foo'}); //WRONG! zul.inp not loaded yet
```

## Do After Load

If you have some code that should execute when a particular package is
loaded, you could use
<javadoc directory="jsdoc" method="afterLoad(_global_.String, _global_.Function)">\_global\_.zk</javadoc>.
Unlike
<javadoc directory="jsdoc" method="load(_global_.String, _global_.Function)">\_global\_.zk</javadoc>,
it won't force the package(s) to load. Rather, it only registers a
function that is called when the specified package(s) is loaded by
others.

It is useful to customize the default behavior of widgets, since they
might be loaded when your code is running. For example, we could
customize <javadoc directory="jsdoc">zul.inp.SimpleConstraint</javadoc>
as follows.

```javascript
zk.afterLoad('zul.inp', function () {
  zu.inp.SimpleConstraint.prototype.validate = function (inp, val) {
    //...customized validation
  };
});
```

Then, the above code can be evaluated even if the `zul.inp` package is
not loaded yet.

## Depends

If the customization requires a lot of codes and you prefer to put it in
a separate package, you could use
<javadoc directory="jsdoc" method="depends(_global_.String, _global_.String)">\_global\_.zk</javadoc>
as follows.

```javascript
zPkg.depends('zul.inp', 'com.foo');
```

which declares the `zul.inp` package depends on the `com.foo` package.
In other words, `com.foo` will be loaded when `zul.inp` is loaded.

# The JavaScript Class

The root of the class hierarchy is
<javadoc directory="jsdoc">zk.Object</javadoc>. To define a new class,
you have to extend from it or one of the deriving classes.

## Define a Class

To define a new class, you could use
<javadoc directory="jsdoc" method="$extends(zk.Class, _global_.Map, _global_.Map)">\_global\_.zk</javadoc>.

```javascript
zk.$package('com.foo');

com.foo.Location = zk.$extends(zk.Object, {
 x: 0,
 y: 0,
 distance: function (loc) {
  return Math.sqrt(Math.pow(this.x - loc.x, 2) + Math.pow(this.y - loc.y, 2));
 }
},{
 find: function (name) {
  if (name == 'ZK')
   return new com.foo.Location(10, 10);
  throw 'unknown: "+name;
 }
})
```

The first argument of
<javadoc directory="jsdoc" method="$extends(zk.Class, _global_.Map, _global_.Map)">\_global\_.zk</javadoc>
is the base class to extend from. In this case, we extend from
`zk.Object`. The second argument is the (non-static) members of the
class. In this case, we define two data members (x and y) and one method
(distance).

The third argument defines the static members. In this case we define a
static method (find). The third argument is optional. If omitted, it
means no static members at all.

Unlike Java, the returned object is the class you defined. You can
access it directly, such as `o.$instanceof(zk.Widget)`. In addition, the
class object, unlike Java, is not an instance of another class. See more
<javadoc directory="jsdoc">zk.Class</javadoc>.

## Access Methods of Superclass

To access the superclass's method, you have to use
<javadoc method="$super(_global_.String, zk.Object...)" directory="jsdoc">zk.Object</javadoc>
or
<javadoc method="$supers(_global_.String, _global_.Array)" directory="jsdoc">zk.Object</javadoc>.

```javascript
com.foo.ShiftLocation = zk.$extends(com.foo.Location, {
 distance: function (loc) {
   if (loc == null) return 0;
   return this.$super('distance', loc);
 }
});
```

As shown above, `$super` is a method (inherited from
<javadoc directory="jsdoc">zk.Object</javadoc>) to invoke a method
defined in the superclass. The first argument is the method name to
invoke, and the rest of the arguments are what to pass to the
superclass's method.

Remember that JavaScript doesn't provide method overloading, so there is
only one method called distance per class, no matter what signature it
might have. So, it is safer (and easier) to pass whatever arguments that
it might have to the superclass. It can be done by the use of `$supers`.

```javascript
distance: function (loc) {
 if (loc == null) return 0;
 return this.$supers('distance', arguments); //pass whatever arguments the caller applied
}
```

## Constructor

Unlike Java, the constructor is always called
<javadoc method="$init()" directory="jsdoc">zk.Object</javadoc>, and it
won't invoke the superclass's constructor automatically.

```javascript
com.foo.Location = zk.$extends(zk.Object, {
 $init: function (x, y) {
  this.x = x;
  this.y = y;
 }
});
```

Because the superclass's constructor won't be invoked automatically, you
have to invoke it manually as follows.

```javascript
com.foo.ShiftLocation = zk.$extends(com.foo.Location, {
 $init: function (x, y, delta) {
  this.$super('$init', x + delta, y + delta);
 }
});
```

# Class Metainfo

The class metainfo is available in the class object, which is returned
from
<javadoc directory="jsdoc" method="$extends(zk.Class, _global_.Map, _global_.Map)">\_global\_.zk</javadoc>.
With the class object, you can access the static members, examine the
class hierarchy and so on.

A class is an instance of <javadoc directory="jsdoc">zk.Class</javadoc>.

## \$instanceof

To test if an object is an instance of a class, use
<javadoc method="$instanceof(zk.Class)" directory="jsdoc">zk.Object</javadoc>,
or
<javadoc method="isInstance(zk.Object)" directory="jsdoc">zk.Object</javadoc>.

```javascript
if (f.$instanceof(com.foo.Location)) {
}
if (com.foo.Location.isInstance(f)) { //the same as above
}
```

## \$class

Each object has a data member called
<javadoc method="$class" directory="jsdoc">zk.Object</javadoc>, that
refers to the class it was instantiated from.

```javascript
var foo = new com.foo.Location();
zk.log(foo.$class == com.foo.Location); //true
```

Unlike Java, you can access all static members by the use of the class,
including the derived class.

```javascript
MyClass = zk.$extends(zk.Object, {}, {
 static0: function () {}
});
MyDerive = zk.$extends(zk.MyClass, {}, {
 static1: function () {}
});
MyDerive.static0(); //OK (MyClass.static0)
MyDerive.static1(); //OK
```

However, you cannot access static members via the object.

```javascript
var md = new MyDerive();
md.static0(); //Fail
md.static1(); //Fail
md.$class.static0(); //OK
MyDerive.static0(); //OK
```

### isInstance and isAssignableFrom

In addition to static members, each class has two important methods,
<javadoc method="isInstance(zk.Object)" directory="jsdoc">zk.Object</javadoc>
and
<javadoc method="isAssignableFrom(zk.Class)" directory="jsdoc">zk.Object</javadoc>.

```javascript
zk.log(com.foo.Location.isAssignableFrom(com.foo.ShiftLocation)); //true
zk.log(com.foo.Location.isInstance(foo)); //true
```

# Naming Conventions

## Private and Protected Members

There is no protected or private concept in JavaScript. We suggest to
prefix a member with '\_' to indicate that it is private or *package*,
and postfix a member with '\_' to indicate protected. Notice it doesn't
prevent the user to call but it helps users not to call something he
should not.

```javascript
MyClass = zk.$extends(zk.Object, {
 _data: 23, //private data
 check_: function () { //a protected method
 },
 show: function () { //a public method
 }
});
```

## Getter and Setter

Some JavaScript utilities the number of arguments to decide whether it
is a getter or a setter.

```javascript
location: function (value) { //not recommended
 if (arguments.length) this.location = value;
 else return value;
}
```

However, it is too easy to get confused (at least, with Java's
signature) as the program becomes sophisticated. So it is suggested to
follow Java's convention (though JavaScript file is slightly bigger):

```javascript
getLocation: function () {
 return this._location;
},
setLocation: function (value) {
 this._location = value;
}
```

In addition, ZK provides a simple way to declare getter and setters by
enclosing them with a special name \$define. For example,

```javascript
$define: {
    location: null,
    label: function (val) {
        this.updateDomContent_();
    }
}
```

which defines four methods: getLocation, setLocation, getLabel and
setLabel. In addition, setLabel() will invoke the specified function
when it is called. For more information, please refer to
<javadoc directory="jsdoc" method="$extends(zk.Class, _global_.Map, _global_.Map)">\_global\_.zk</javadoc>.

However, if a property is read-only, you can still declare it without
`get`:

```javascript
distance: function (loc) {
  return Math.sqrt(Math.pow(this.x - loc.x, 2) + Math.pow(this.y - loc.y, 2));
}
```

Furthermore, if a property is read-only and not dynamic, you can allow
users to access it directly:

```javascript
if (widget.type == 'zul.wgt.Div') {
}
```

# Beyond Object Oriented Programming

JavaScript itself is a dynamic language. You can add a member
dynamically.

## Add a Method Dynamically

To add a method to all instances of a given class, add the method to
`prototype`:

```javascript
foo.MyClass = zk.$extends(zk.Object, {
});

foo.MyClass.prototype.myfunc = function (arg) {
 this.something = arg;
};
```

To add a method to a particular instance:

```javascript
var o = new foo.MyClass();
o.myfunc = function (arg) {
 this.doSomething(arg);
};
```

To add a static method:

```javascript
foo.Myclass.myfunc = function () {
 //...
};
```

## Interfaces

Not interface supported, but it can be 'simulated' by the use of the
function name. For example, if an interface is assumed to have two
methods: f and g, the implementation can just requires by invoking them,
and any object that with these two methods can be passed to it.

# Limitations

- You have to specify `this` explicitly. Remember it is JavaScript, so
  the default object is `window` if you don't.

```javascript
$init: function () {
 $super('$init'); //Wrong! It is equivalent to window.$super('$init')
}
```

- `$init` won't invoke the superclass's `$init` automatically. You have
  to invoke it manually. On the other hand, you can, unlike Java, do
  whatever you want before calling the superclass's `$init`.

```javascript
$init: function (widget) {
 //codes are allowed here
 this.$super('$init', widget);
 //more codes if you want
}
```

- Data member defined in the second argument of
  <javadoc directory="jsdoc" method="$extends(zk.Class, _global_.Map, _global_.Map)">\_global\_.zk</javadoc>
  are initialized only once. For example, an empty array is assigned to
  the definition of `MyClass` when the class is defined in the following
  example.

```javascript
MyClass = zk.$extends(zk.Object, {
 data: []
});
```

It means that all instances of MyClass will share the same copy of this
array. For example,

```javascript
var a = new MyClass(), b = new MyClass();
a.data.push('abc');
zk.log(b.data.length); //it becomes 1 since a.data and b.data is actually the same
```

Thus, to assign mutable objects, such as arrays and maps ({}), it is
better to assign in the constructor.

```javascript
MyClass = zk.$extends(zk.Object, {
 $init: function () {
  this.data = []; //it is called every time an instance is instantiated
 }
});
```


