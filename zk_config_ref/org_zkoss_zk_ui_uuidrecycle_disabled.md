**Property:**

`org.zkoss.zk.ui.uuidRecycle.disabled `

Default:  `false`` (i.e., UUID recycle is enabled)`

Show the warning below to recommend disabling this feature. (i.e.
specifying with  true)

`UID recycle is enabled and it's better to disable it by specifying a library property 'org.zkoss.zk.ui.uuidRecycle.disabled' with true to prevent some unwanted widget uuid reusing at client side accidentally.`

`Deprecated`

It specifies whether to disable the recycling of UUID. By recycling UUID
it will reduce the memory use of the browser. It is enabled by default.
