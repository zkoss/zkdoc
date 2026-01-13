---
title: "iDempiere ZK EE Plugin"
---

iDempiere ships with ZK CE by default. To use ZK EE components (including PE/EE widgets from `zkex` and `zkmax`), you must attach those libraries to the `org.adempiere.ui.zk` bundle via an OSGi fragment and then build a plugin that references them. This guide builds the `org.idempiere.zkee.comps.example` plugin from the `zkoss-idempiere-ee-plugin` repository. For broader context, see [iDempiere integration overview](/zk_dev_ref/integration/idempiere) and the [iDempiere plugin development guide](https://wiki.idempiere.org/en/Developing_Plug-Ins_-_Get_your_Plug-In_running).

## Prerequisites

- Git
- Maven
- JDK 17 or later
- iDempiere Runtime (for example, [official Docker image](https://hub.docker.com/r/idempiereofficial/idempiere))

## Build the iDempiere core target platform

1) Clone the iDempiere core repository:
```bash
git clone --branch release-12 https://github.com/idempiere/idempiere.git idempiere
```
2) Build it to generate the local p2 repository at `idempiere/org.idempiere.p2/target/repository`:
```bash
cd idempiere
mvn clean install
```
3) Update target platform references to absolute paths in:
- `idempiere/org.idempiere.p2.targetplatform/org.idempiere.p2.targetplatform.target`
- `idempiere/org.idempiere.p2.targetplatform/org.idempiere.p2.targetplatform.mirror.target`

Replace:
```
${project_loc:org.idempiere.p2.targetplatform}
```
With your local absolute path, for example:
```
/Users/yourname/parent-folder/idempiere/org.idempiere.p2.targetplatform
```

## Build the ZK PE/EE fragment

1) Clone the plugin repository next to the `idempiere/` folder:
```bash
git clone https://github.com/zkoss-demo/zkoss-idempiere-ee-plugin.git
```
Expected layout:
```
parent-folder/
├── idempiere/
└── zkoss-idempiere-ee-plugin/
```
2) Build the fragment:
```bash
cd zkoss-idempiere-ee-plugin/org.idempiere.zkee.comps.fragment
mvn clean -U -DskipTests -am verify
```
This creates `org.idempiere.zkee.comps.fragment/target/org.idempiere.zkee.comps.fragment-<version>.jar`.
3) Install the fragment into your OSGi runtime (Felix Web Console or drop into the plugins directory) and restart the server. The host bundle `org.adempiere.ui.zk` must resolve with the fragment on its classpath.
4) Confirm the fragment is **Active**. If you see “widget class required” errors, the fragment is not attached or the runtime was not restarted.

### Fragment contents (reference)

- `META-INF/MANIFEST.MF`: `Fragment-Host: org.adempiere.ui.zk`, `Bundle-ClassPath: ., lib/zkex.jar, lib/zkmax.jar, lib/gson.jar`
- `build.properties`: packages `META-INF/`, `lib/zkex.jar`, `lib/zkmax.jar`, `lib/gson.jar`
- `pom.xml`: eclipse-plugin packaging and dependency-copy that fetches `zkex`, `zkmax`, and `gson` into `lib/`
- `src/metainfo/zk.xml`: sets `org.zkoss.zkmax.au.IWBS.disable=true`
- `lib/zkex.jar`, `lib/zkmax.jar`, `lib/gson.jar`: ZK PE/EE binaries with `metainfo/zk/lang-addon.xml`
- `target/`: built fragment jar and p2 metadata

License note: ZK EE is commercially licensed. This project uses the Evaluation Repository for trials. For production use, obtain a ZK EE license and switch to the official ZK EE repository.

## Build the example plugin

1) Ensure the ZK EE fragment is installed and active.
2) If Tycho cannot resolve the EE jars, add a dependency-copy step (like the fragment) or include the EE bundles in your target platform.
3) Build the example plugin:
```bash
cd zkoss-idempiere-ee-plugin/org.idempiere.zkee.comps.example
mvn clean verify
```
Artifacts are written to `target/`.
4) See `org.idempiere.zkee.comps.example/src/web/form.zul` for EE widget usage (for example, `<timepicker .../>`).

## Deploy and verify

1) Start the iDempiere runtime.
2) In the Apache Felix Web Console (`https://localhost:8443/osgi/system/console/`), install and start the fragment and the example plugin.
3) Restart the runtime to reload the fragment.
4) In **Bundles**, confirm both bundles are **Active**.
5) Log in as SuperUser, search for "ZK EE", and open **ZK EE Components Example**.

## Appendix: Why the fragment is required

| Constraint | Explanation |
| --- | --- |
| OSGi classloaders | Each bundle has its own classloader, so bundles are isolated |
| ZK `lang-addon.xml` discovery | ZK loads widgets through the host bundle's classloader |
| Fragment behavior | A fragment shares the host bundle's classloader |

To make `org.adempiere.ui.zk` see ZK EE widgets (`zkex.jar`, `zkmax.jar`), those jars must be on its classloader. A fragment is the OSGi-compliant way to inject resources into the host bundle without modifying it.

References:
- [OSGi fragments overview](https://vogella.com/blog/osgi-bundles-fragments-dependencies/)
- [bnd Fragment-Host docs](https://bnd.bndtools.org/heads/fragment_host.html)
- [iDempiere Wiki - Make ZK WebApp OSGi](https://wiki.idempiere.org/en/Make_Zk_WebApp_OSGi)
