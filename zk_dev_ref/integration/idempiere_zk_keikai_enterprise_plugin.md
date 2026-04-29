---
title: "iDempiere Keikai Enterprise Plugin"
---

iDempiere ships with ZK CE by default. To use Keikai Enterprise Spreadsheet (Keikai EE) in iDempiere, you must attach the Keikai EE runtime libraries and their ZK dependencies to the `org.adempiere.ui.zk` bundle via an OSGi fragment, then build a normal iDempiere plugin that registers a form and renders the spreadsheet. This guide builds the `org.idempiere.keikai.example` plugin from the `zkoss-idempiere-keikai-plugin` repository. For broader context, see [iDempiere integration overview](/zk_dev_ref/integration/idempiere), [iDempiere ZK EE Plugin](/zk_dev_ref/integration/idempiere_zk_enterprise_plugin), and the [iDempiere plugin development guide](https://wiki.idempiere.org/en/Developing_Plug-Ins_-_Get_your_Plug-In_running).

## Prerequisites

- Git
- Maven
- JDK 17 or later
- iDempiere Runtime, version 13 in this example
- Keikai Enterprise (Keikai EE) Eval repository access, or a production Keikai EE repository and license for non-evaluation use

## Build the iDempiere core target platform

1) Clone the iDempiere core repository:

```bash
git clone --branch release-13 https://github.com/idempiere/idempiere.git idempiere-13
```

2) Build it to generate the local p2 repository at `idempiere-13/org.idempiere.p2/target/repository`:

```bash
cd idempiere-13
mvn clean install
```

3) Update target platform references to absolute paths in:
- `idempiere-13/org.idempiere.p2.targetplatform/org.idempiere.p2.targetplatform.target`
- `idempiere-13/org.idempiere.p2.targetplatform/org.idempiere.p2.targetplatform.mirror.target`

Replace:

```
${project_loc:org.idempiere.p2.targetplatform}
```

With your local absolute path, for example:

```
/Users/yourname/parent-folder/idempiere-13/org.idempiere.p2.targetplatform
```

## Build the Keikai EE fragment

1) Clone the plugin repository next to the `idempiere-13/` folder:

```bash
git clone https://github.com/zkoss-demo/zkoss-idempiere-keikai-plugin.git
```

Expected layout:

```
parent-folder/
├── idempiere-13/
└── zkoss-idempiere-keikai-plugin/
```

2) Build the fragment and example plugin from the repository root:

```bash
cd zkoss-idempiere-keikai-plugin
mvn clean verify -f parent-repository-pom.xml
```

This creates:

- `org.idempiere.keikai.fragment/target/org.idempiere.keikai.fragment-13.0.0-SNAPSHOT.jar`
- `org.idempiere.keikai.example/target/org.idempiere.keikai.example-13.0.0-SNAPSHOT.jar`

3) Install the fragment into your OSGi runtime (Felix Web Console or drop into the plugins directory) and restart the server. The host bundle `org.adempiere.ui.zk` must resolve with the fragment on its classpath.

4) Confirm the fragment is **Active**. If the spreadsheet tag cannot be resolved, Keikai resources are missing, or PDF export cannot find an exporter, the fragment is not attached, the runtime was not restarted, or the fragment `zk.xml` properties were not loaded during webapp initialization.

### Fragment contents (reference)

- `META-INF/MANIFEST.MF`: `Fragment-Host: org.adempiere.ui.zk;bundle-version="13.0.0"` and a `Bundle-ClassPath` containing Keikai EE, ZK EE, ZK Charts, Apache POI, PDF, and support jars
- `build.properties`: packages `META-INF/`, compiled classes, and all jars under `lib/`
- `pom.xml`: eclipse-plugin packaging and dependency-copy that fetches Keikai EE Eval `6.3.0-Eval`, `zkex` `10.0.1-Eval`, `zkcharts` `12.2.0.0-Eval`, Apache POI, OpenPDF, JFreeChart, and related runtime dependencies into `lib/`
- `src/metainfo/zk/zk.xml`: disables ZK Max IWBS for iDempiere 13 login compatibility and registers the Keikai PDF exporter with `pdf=io.keikai.model.impl.pdf.PdfExporterFactory`
- `lib/`: runtime jars such as `keikai.jar`, `keikai-ex.jar`, `keikai-pdf.jar`, `keikai-model.jar`, `zkex.jar`, `zkcharts.jar`, `poi.jar`, `poi-ooxml.jar`, `openpdf.jar`, and supporting libraries
- `target/`: built fragment jar and p2 metadata

License note: Keikai Enterprise is commercially licensed. This project uses Keikai EE Eval artifacts for trials. For production use, obtain a Keikai EE license and switch the dependency repository and versions to the licensed artifacts.

## Build the example plugin

1) Ensure the Keikai EE fragment is installed and active.

2) Build the example plugin as part of the parent build:

```bash
cd zkoss-idempiere-keikai-plugin
mvn clean verify -f parent-repository-pom.xml
```

If you only need to rebuild the example after the fragment is already available, run:

```bash
cd zkoss-idempiere-keikai-plugin/org.idempiere.keikai.example
mvn clean verify
```

3) See `org.idempiere.keikai.example/src/web/keikai-form.zul` for the spreadsheet component:

```xml
<spreadsheet id="spreadsheet" hflex="1" vflex="1" src="web/blank.xlsx"
    showToolbar="true" showFormulabar="true" showContextMenu="true"
    maxVisibleRows="100" maxVisibleColumns="40" />
```

4) The example form registers extra toolbar actions in `KeikaiForm.java`:

- **Save Book**: exports the current workbook as `.xlsx` or `.xls`
- **Export PDF**: exports the current workbook through Keikai PDF exporter

The example uses reflection for Keikai EE APIs because the Keikai EE jars are supplied by the host-attached fragment classloader at runtime.

### Loading ZUL and workbook resources from the plugin bundle

When a ZUL file is packaged in the normal plugin bundle, use a classpath-style path such as `~./sample.zul` and switch the thread context classloader to the plugin classloader before calling `Executions.createComponents`. See [Loading ZUL files from the plugin bundle](/zk_dev_ref/integration/idempiere_zk_enterprise_plugin#loading-zul-files-from-the-plugin-bundle) in the ZK EE plugin guide for the detailed explanation and code pattern.

The spreadsheet workbook path is different from the ZUL path. The sample uses `src="web/blank.xlsx"` instead of `~./blank.xlsx` because `Spreadsheet.setSrc()` is resolved by Keikai's workbook loader, not by the same ZK component-creation path.

## Deploy and verify

1) Start the iDempiere runtime.

2) In the Apache Felix Web Console (`https://localhost:8443/osgi/system/console/`), install and start:

- `org.idempiere.keikai.fragment/target/org.idempiere.keikai.fragment-13.0.0-SNAPSHOT.jar`
- `org.idempiere.keikai.example/target/org.idempiere.keikai.example-13.0.0-SNAPSHOT.jar`

3) Restart the runtime to reload the fragment and its ZK library properties.

4) In **Bundles**, confirm both bundles are **Active**.

5) Confirm the example plugin imports its `META-INF/2Pack_1.0.0.zip` registration.

6) Log in as SuperUser, search for "Keikai", and open the Keikai Enterprise example form.

7) Verify the spreadsheet renders, `web/blank.xlsx` loads, the toolbar is visible, and the **Save Book** and **Export PDF** actions download files.

## Appendix: Why the fragment is required

| Constraint | Explanation |
| --- | --- |
| OSGi classloaders | Each bundle has its own classloader, so bundles are isolated |
| ZK `lang-addon.xml` discovery | ZK loads component definitions through the host bundle's classloader |
| ZK library properties | Keikai PDF exporter registration is read during ZK webapp initialization |
| Fragment behavior | A fragment shares the host bundle's classloader |

To make `org.adempiere.ui.zk` see Keikai Enterprise widgets and runtime resources (`keikai.jar`, `keikai-ex.jar`, `keikai-model.jar`, `keikai-pdf.jar`, `zkex.jar`, `zkcharts.jar`, and dependencies), those jars must be on its classloader. A fragment is the OSGi-compliant way to inject resources into the host bundle without modifying it.

References:
- [OSGi fragments overview](https://vogella.com/blog/osgi-bundles-fragments-dependencies/)
- [bnd Fragment-Host docs](https://bnd.bndtools.org/heads/fragment_host.html)
- [iDempiere Wiki - Make ZK WebApp OSGi](https://wiki.idempiere.org/en/Make_Zk_WebApp_OSGi)
- [iDempiere forum - How to reference an included ZUL file in customization bundle](https://groups.google.com/g/idempiere/c/rb8T9W9SEP8)
- [Github - zkoss-demo/zkoss-idempiere-keikai-plugin](https://github.com/zkoss-demo/zkoss-idempiere-keikai-plugin)
