# Overview

The *controller* is a Java program that is used to glue UI (view) and
Data (model) together.

A simple UI does not require any controllers. For example, the data of a
<javadoc>org.zkoss.zul.Listbox</javadoc> could be abstracted by
implementing <javadoc type="interface">org.zkoss.zul.ListModel</javadoc>
as described in [the Model
section](ZK_Developer's_Reference/MVC/Model).

For typical database access, the glue logic (i.e., controller) can be
handled by a generic feature called [Data
Binding](ZK_Developer's_Reference/MVVM/Data_Binding). In
other words, the create, read, update and delete operations (CRUD) can
be handled automatically by a generic Data Binding mechanism, and you
don't need to write the glue logic at all as described in [the Data
Binding section](ZK_Developer's_Reference/MVVM/Data_Binding).

If none of the above fulfills your requirement, you could implement a
custom controller (which is called a composer in ZK terminology). In the
following sections we will discuss how to implement a custom controller
in details.
