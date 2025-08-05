---
title: "PollingAgent"
---

 

`Since 1.2.1`

ZATS Mimic introduces the `PollingAgent` to simulate client polling
operation to support testing applications that uses `Server Push`
mechanism.

The following are the usage steps:

1.  Obtain a `PollingAgent` object from desktop.
      
    Note that you should use the same `PollingAgent` object on calling
    all methods.
2.  Start a polling by invoking `start(int timeout)` method.
      
    The `timeout` indicates for how many milliseconds we should timeout
    the polling; a 0(zero) `timeout` means never timeout.
3.  Invoke `polling(int delay)` method which will send a dummy client
    polling request to server and wait the specified delay time(in
    milliseconds) before returning. The `polling` method returns a
    boolean to indicate if the polling is stopped(false) or not(true) so
    you can control when to leave a polling loop.
      
    A polling is stopped if the `stop()` method is called explicitly or
    if the polling has timed out since `start` the polling.
4.  You can invoke `stop()` method to stop a polling explicitly.

# Send dummy client polling request to server and wait

Assume that we have a ZK application that use `Server Push` mechanism to
update the component attributes after an user triggering a long server
operation. We will need `PollingAgent` to simulate sending the dummy
client polling request and wait server to complete its long operation.

```java
@Test
public void test() throws Exception {
        DesktopAgent desktop = Zats.newClient().connect("/long.zul");
        ComponentAgent button = desktop.query("button");
        button.click(); //trigger long operation (will cost 3000 milliseconds)
        
        boolean timeout = true;
        PollingAgent agent = desktop.as(PollingAgent.class); 
        agent.start(5000); // start the client polling and timeout in 5000 milliseconds(5 seconds) 
        while (agent.polling(500)) { //check every 500 milliseconds before polling is stopped
            ComponentAgent label =  desktop.query("label");
            //assert expected status then break
            if ( label != null){
                Assert.assertEquals("success", label.as(Label.class).getValue());
                agent.stop(); // stop the polling as we have done the test
                timeout = false;
            }
        }
        Assert.assertFalse("Timeout!", timeout); // client polling timeout
}
```

- **Line 31**: Cast desktop to `PollingAgent` and keep its reference.
- **Line 32**: Invoke `start(5000)` method to start a polling which will
  timeout in 5 seconds(5000 milliseconds).
- **Line 33**: Invoke `polling(500)` method to send the dummy client
  polling request to server and wait 500 milliseconds before returning;
  check the return value to decide if stop the polling loop.
- **Line 38**: Invoke `stop()` method to stop the polling since we have
  get the value pushed from server.
- **Line 42**: Use a timeout boolean variable to distinguish whether the
  polling loop is timeout or explicitly stopped.

# Supported Components

<table>
<thead>
<tr class="header">
<th><center>
<p>Components</p>
</center></th>
<th><center>
<p>Version</p>
</center></th>
<th><center>
<p>Note</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>DesktopAgent</p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
</tbody>
</table>

 
