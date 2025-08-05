---
title: "Registering Appropriate Listeners"
---

Registering listeners is a fundamental of many programming languages and
event driven applications. Being an event driven framework ZK is no
different. To accomplish our goal of a clear button we need to do two
things:

1.  Capture clicks on our "target"
2.  Fire a custom <mp>onClear</mp> event when the target is clicked

### Capturing Clicks on our Target

Firstly, let’s concentrate on capturing clicks on our target div. To do
so we need to register appropriate listeners in the bind\_ method and
remove the listeners in the unbind\_ method to avoid any memory leak.
Here is the code to do so.

```javascript
bind_ : function(evt) {
        this.$supers('bind_', arguments);
        this.domListen_(this.$n().lastChild, "onClick", '_doClear');
    },

unbind_ : function(evt) {
        this.domUnlisten_(this.$n().lastChild, "onClick", '_doClear');
        this.$supers('unbind_', arguments);
    },
```

The key to this is the domListen method which takes the target as the
first parameter, in this case we pass it the <mp>lastChild</mp> which is
our target, the name of the event you want to listen for as the second
parameter and finally the name of the callback.

Please note that you also are required to call <mp>\$supers</mp> so that
parent classes can register and remove their events successfully. Now we
need to move on to firing our custom <mp>"onClear"</mp> event. Let’s
take a look at how to do this.

### Firing a Custom Event (onClear)

The key lies in the registering the callback of the event. In our case
we registered a callback named <mp>"\_doClear"</mp>. In this
<mp>\_doClear</mp> method we need to clear/restore the text depending on
the widget state and fire the onClear method. The code is as follows:

```javascript
_doClear: function(evt) {

        this._cleared = !(this._cleared);
        
        if(this._cleared) {
            this.$n().firstChild.innerHTML = this._value;
        } else {
            this.$n().firstChild.innerHTML = "";
        }
        
        this.fire("onClear", {cleared: this._cleared});
    }
```

We have a data member named \_cleared which contains the state of the
application. Depending on the state the method either shows or clears
the displayed value. The method <mp>onClear</mp> is then fired and the
cleared state is sent along with the instruction to fire the event.

The client side widget will now communicate with the component at the
server side. This is handled by ZK. The following section explores how
this communication works.
