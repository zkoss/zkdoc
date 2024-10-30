**Syntax:**

<extendlet-check-period>*`a_number`*</extendlet-check-period>

`[Default: -1 (never expired)]`

It specifies the time, in seconds, to wait before checking whether a
resource loaded by an extendlet is modified. An extendlet is a processor
to load the resources which are usually located in classpath, such as
`~./zul/desktop.dsp`.

Resources located in classpath are usually packed as a JAR file, so they
are immutable and not need to check if modified. However, in a
development environment, you might still want to check out if they are
deployed without reloading the JAR files.


