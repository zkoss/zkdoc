
To make it easier for JavaScript objects to represent widgets, ZK has introduced a class concept to JavaScript. Here is a brief introduction on defining a class in JavaScript.

To define a new class in JavaScript, we use `_global_.zk`.

```javascript
zk.$package('com.foo');

com.foo.Location = zk.$extends(zk.Object, {
  x: 0,
  y: 0,
  distance: function (loc) {
    return Math.sqrt(Math.pow(this.x - loc.x, 2) + Math.pow(this.y - loc.y, 2));
  }
}, {
  find: function (name) {
    if (name == 'ZK')
      return new com.foo.Location(10, 10);
    throw 'unknown: ' + name;
  }
});
```

The first argument of `_global_.zk` is the base class to extend from. In this case, we extend from zk.Object, which is the root of the class hierarchy. The second argument consists of the (non-static) members of the class. In this case, we define two data members (x and y) and one method (distance).

The third argument is optional, and if omitted, means that the extended class will contain no static members. In the example, we define a static method (find).

For now, this is all that is required for us to create our first component, so let’s move on to talk about the component implementation.