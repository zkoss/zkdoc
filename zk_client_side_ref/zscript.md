**Syntax:**

<zscript language="Java|Groovy|Python|Ruby|JavaScript">  
` `*`the code snippet`*  
</zscript>

It specifies the zscript code to be evaluated when the corresponding
interpreter being loaded by a page. In other words, it specified the
initial zscript that should be evaluated by any other script defined in
a ZUML document.

Example,

``` xml
<zscript language="Java">
import java.util.*;
import java.lang.*;
import org.zkoss.zk.ui.util.Clients;
import org.zkoss.zk.ui.event.*;
import org.zkoss.zk.ui.*;
import org.zkoss.zul.*;

void alert(Object m) {
    Messagebox.show("" + m);
}
</zscript>
```


