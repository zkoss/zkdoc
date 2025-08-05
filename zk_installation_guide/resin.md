---
title: "Resin"
---

1.  Download Resin from <http://caucho.com/download/index.xtp> and
    install it, if you haven't installed it yet.
2.  Stop Resin
3.  Unzip zk-1.0.0.zip or zk-1.0.0.tar.gz
4.  Copy dist/lib/\*.jar to \$RESIN_HOME/lib (\$RESIN_HOME is where you
    installed Resin.)
5.  Copy dist/lib/ext/\*.jar to \$RESIN_HOME/lib
6.  \[Optional\] Copy dist/lib/zkforge/\*.jar to \$RESIN_HOME/lib (It
    depends whether you need component from ZK Forge)
7.  Deploy demo/bin/zkdemo.war to Resin by copying it to
    \$RESIN_HOME/webapps directly.
8.  Start Resin.
9.  Browse to <http://localhost/zkdemo/userguide> or
    <http://localhost:8080/zkdemo/userguide>, depending on your
    configuration.

by Peter Manchev


