You are free to mix ZK JSP tags and any other tags.

# Use ZK JSP Tags + JSTL Tags

Here we illustrate it with an example: ZK JSP Tags + JSTL Tags.

First, we have to specify JSTL TLD too:

``` xml
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
```

Then, we can mix the use as shown below:

``` xml
<zk:window title="table and grid in window" border="normal" width="300px">
    <table border="1">
        <c:forEach var="i" begin="1" end="3" step="1" varStatus="status">
            <tr>
                <td>Item ${i}</td>
            </tr>
        </c:forEach>
    </table>
    <zk:grid>
        <zk:columns>
            <zk:column label="column" sort="auto" />
        </zk:columns>
        <zk:rows>
            <c:forEach var="i" begin="1" end="3" step="1" varStatus="status">
                <zk:row>
                    <zk:label value="Item ${i}" />
                </zk:row>
            </c:forEach>
        </zk:rows>
    </zk:grid>
</zk:window>
```

