**Property:**

`org.zkoss.bind.DebuggerFactory.enable`

`Default: `*`false`*

Turn on to enable log ZK Bind debugging information. It will print lots
of messages during run-time which may be helpful for dubugging. Please
do not enable it in the production environment.

The printed message looks like:

``` text
[0]ADD-BINDING[add-binding:prop-init]   vm.element.name > value <label uuid="j5VUb" id="" />     at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:27, nearby column: 45]
[0]ADD-BINDING[add-binding:prop-load]   vm.element.name > value <textbox uuid="j5VUd" id="" />   at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:29, nearby column: 47]
[0]ADD-BINDING[add-binding:prop-save]   value > vm.element.name <textbox uuid="j5VUd" id="" />   at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:29, nearby column: 47]
[0]ADD-BINDING[add-binding:prop-load]   vm.element.name > value <label uuid="j5VUf" id="" />     at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:31, nearby column: 45]
[0]ADD-BINDING[add-binding:prop-save]   [before = 'cmd1']   value > vm.element.name <textbox uuid="j5VUh" id="" />   at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:35, nearby column: 89]
[0]ADD-BINDING[add-binding:prop-save]   [before = 'cmd2']   value > vm.element.name <textbox uuid="j5VUh" id="" />   at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:35, nearby column: 89]
[0]ADD-BINDING[add-binding:prop-load]   [after = 'cmd1']    vm.element.name > value <label uuid="j5VUj" id="" />     at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:37, nearby column: 59]
[0]ADD-BINDING[add-command-binding:viewmodel]   [onClick]   'cmd1'  <button uuid="j5VUl" id="" />    at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:40, nearby column: 60]
[0]ADD-BINDING[add-command-binding:global]  [onClick]   'gcmd1' <button uuid="j5VUl" id="" />    at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:40, nearby column: 60]
[0]ADD-BINDING[add-command-binding:viewmodel]   [onClick]   'cmd2'  <button uuid="j5VUm" id="" />    at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:41, nearby column: 56]
[0]ADD-BINDING[add-binding:prop-load]   vm.escValue1 > value    <label uuid="j5VUn" id="" />     at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:43, nearby column: 40]
[0]ADD-BINDING[add-binding:prop-load]   vm.escValue2 > value    <label uuid="j5VUo" id="" />     at [file:/data/zk/git/zk/zktest/src/archive/bind/basic/allfunction.zul, line:44, nearby column: 40]
[0]LOAD_BINDING  
[0]  *[load:prop-init]  vm.element.name > value item 1  <label uuid="j5VUb" id="" />
[0]LOAD_BINDING  
[0]  *[load:prop-load]  vm.element.name > value item 1  <textbox uuid="j5VUd" id="" />
[0]LOAD_BINDING  
[0]  *[load:prop-load]  vm.element.name > value item 1  <label uuid="j5VUf" id="" />
[0]LOAD_BINDING  
[0]  *[load:prop-load]  vm.escValue1 > value    '   <label uuid="j5VUn" id="" />
[0]LOAD_BINDING  
[0]  *[load:prop-load]  vm.escValue2 > value    "   <label uuid="j5VUo" id="" />
=======================================
[6431]ON_EVENT   
[6431]  *[event]    [onClick]   <button uuid="j5VUl" id="" />
[6431]  + COMMAND    
[6431]    *[command:on-command] [onClick]   ['cmd1']    cmd1    <button uuid="j5VUl" id="" />
[6431]    + VALIDATE     
[6431]      *[validation:prop]  vm.validator1   org.zkoss.zktest.bind.basic.AllFunctionVM$1@6ec135d6     result = true  <textbox uuid="j5VUh" id="" />
[6431]    + SAVE_BEFORE  
[6431]      + SAVE_BINDING   
[6431]        *[save:prop-save] [before = 'cmd1']   value > vm.element.name A   <textbox uuid="j5VUh" id="" />
[6431]    + LOAD_BEFORE  
[6431]    + EXECUTE  
[6431]      *[command:execute]  cmd1    <button uuid="j5VUl" id="" />   public void org.zkoss.zktest.bind.basic.AllFunctionVM.cmd1()
[6431]    + SAVE_AFTER   
[6431]    + LOAD_AFTER   
[6431]      + LOAD_BINDING   
[6431]        *[load:prop-load] [after = 'cmd1']    vm.element.name > value A   <label uuid="j5VUj" id="" />
[6431]  + POST_GLOBAL_COMMAND    
[6431]    *[command:post-global]    [onClick]   ['gcmd1']   gcmd1   <button uuid="j5VUl" id="" />
[6431]NOTIFY_CHANGE  
[6431]  *[notify-change]    [org.zkoss.zktest.bind.basic.AllFunctionVM$Element@41a8dfb3][name]  <window uuid="j5VU0" id="" />   Size=2
[6431]  + LOAD_BINDING   
[6431]    *[load:prop-load] vm.element.name > value A   <textbox uuid="j5VUd" id="" />
[6431]  + LOAD_BINDING   
[6431]    *[load:prop-load] vm.element.name > value A   <label uuid="j5VUf" id="" />
[6431]GLOBAL_COMMAND     
[6431]  *[command:on-command-global]    gcmd1   <window uuid="j5VU0" id="" />
[6431]  + EXECUTE    
[6431]    *[command:execute-global] gcmd1   <window uuid="j5VU0" id="" />   public void org.zkoss.zktest.bind.basic.AllFunctionVM.gcmd1()
[6431]NOTIFY_CHANGE  
[6431]  *[notify-change]    [org.zkoss.zktest.bind.basic.AllFunctionVM$Element@41a8dfb3][*] <window uuid="j5VU0" id="" />   Size=2
[6431]  + LOAD_BINDING   
[6431]    *[load:prop-load] vm.element.name > value A-GCMD1 <textbox uuid="j5VUd" id="" />
[6431]  + LOAD_BINDING   
[6431]    *[load:prop-load] vm.element.name > value A-GCMD1 <label uuid="j5VUf" id="" />
```

ZK Bind information is logged via SLF4J, allowing developers to
enable/disable logging for specific view model packages. For details on
the logger configuration, please refer to the relevant documentation for
your chosen implementation.

# Version History

| Version | Date      | Content       |
|---------|-----------|---------------|
| 6.5.2   | Mar, 2013 | Introduced    |
| 10.0.0  | Dec, 2023 | Log via SLF4J |
