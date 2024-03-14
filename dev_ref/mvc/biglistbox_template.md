Similar to
[Listbox](ZK_Developer's_Reference/MVC/View/Template/Listbox_Template),
you can render a biglistbox with a template. However, notice that,
unlike other components, biglistbox doesn't allow any child component,
so you have to render each item as a string. For example,

``` xml
<biglistbox hflex="1" vflex="1" model="${data}" >
    <!-- Template example -->
    <template name="heads">
        <html><![CDATA[
                <div class="images_${matrixInfo[0]}" title="x=${matrixInfo[0]},y=${matrixInfo[1]}">${each[matrixInfo[0]]}</div>
        ]]></html>
    </template>
    <template name="rows">
        <html><![CDATA[
                <div class="images_${matrixInfo[0]}" title="x=${matrixInfo[0]},y=${matrixInfo[1]}">${each[matrixInfo[0]]}</div>
        ]]></html>
    </template>
</biglistbox>
```

As you can see, we utilize two attributes - *rowIndex* & *colIndex* from
the *matrixInfo* object to receive the current index during template
rendering phase.

where we assume there is a matrix model
([FakerMatrixModel](https://github.com/zkoss/zk/blob/master/zktest/src/org/zkoss/zktest/test2/big/FakerMatrixModel.java))
called `data` such as:

``` java
FakerMatrixModel model = new FakerMatrixModel(100, 100);
```

# Version History

| Version | Date       | Content                                  |
|---------|------------|------------------------------------------|
| 6.0.1   | March 2012 | The biglistbox component was introduced. |
