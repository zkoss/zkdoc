By default, ZK processes an event in the same Servlet thread that
receives the HTTP request. It is the suggested approach because the
performance is better, and it is easy to integrate with other
frameworks. (Many frameworks store per-request information in the
thread-local storage, so we have to copy them from a servlet thread to
the Event Processing Thread).

However, it also implies the developer cannot suspend the execution.
Otherwise, the end-users won't see any updates from the server. To solve
it, ZK provides an alternative approach: processes the event in an
independent thread called the event processing thread. Therefore, the
developer can suspend and resume the execution at any time, without
blocking the Servlet thread from sending back the responses to the
browser. To turn it on, you have to specify the following in
`WEB-INF/zk.xml` ([ZK Configuration Guide: disable-event-thread]({{site.baseurl}}/zk_config_ref/the_system-config_element/the_disable-event-thread_element)
, after ZK 5, the event processing thread is disabled by default.)

```xml
<system-config>
    <disable-event-thread>false</disable-event-thread>
</system-config>
```

In short, it is recommended to disable the event thread. Enable the
event thread only if the project does not need to integrate other
frameworks (such as Spring), depending on
[org.zkoss.zul.Messagebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html) and modal windows a lot, and
do not have a lot of concurrent users.

Here are the advantages and limitations of using the Servlet thread to
process events. In the following sections, we will talk more about the
limitations and workarounds when using the Servlet thread.

<table>
<thead>
<tr class="header">
<th></th>
<th><center>
<p>Using Servlet Thread</p>
</center></th>
<th><center>
<p>Using Event Processing Thread</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Integration</p></td>
<td><p>Less integration issues.</p>
<p>Many containers assume the HTTP request is handled in the Servlet
thread, and many frameworks store per-request information in the
thread-local storage.</p></td>
<td><p>You may have to implement <code>EventThreadInit</code> and/or
<code>EventThreadCleanup</code> to solve the integration issue, such as
copying the per-request information from the Servlet thread to the event
processing thread.</p>
<p>Threre are several implementations to solve the integration issue,
such as
[org.zkoss/zkplus.hibernate.HibernateSessionContextListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/hibernate/HibernateSessionContextListener.html)
(they can be found under <a
href="http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/package-summary.html">the
org.zkoss.zkplus package</a>).</p></td>
</tr>
<tr class="even">
<td><p>SuspendResume</p></td>
<td><p>No way to suspend the execution of the event listener.</p>
<p>For example, you cannot create a modal window.</p></td>
<td><p>No limitation at all.</p></td>
</tr>
<tr class="odd">
<td><p>Performance</p></td>
<td><p>No extra cost</p></td>
<td><p>It executes a bit slower to switch from one thread to another,
and it might consume a lot more memory if there are a lot of suspended
event processing threads.</p></td>
</tr>
</tbody>
</table>
