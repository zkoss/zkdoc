ZATS Mimic can simulate various user actions to a component such as
input or click. It is a major part when writing a test case with ZATS
Mimic.

Steps to use a `OperationAgent` on a `ComponentAgent`:

1.  Retrieve a target `ComponentAgent` with the selector syntax
2.  Depends on what operation you want to mimic, convert to the
    corresponding `OperationAgent`, e.g.
    `ComponentAgent.as(SelectAgent.class)` to select an Listitem.
      
    Notice that not all ComponentAgents support all OperationAgent. e.g.
    you can't select a Button.

    If conversion fails, you will get a run-time exception.
