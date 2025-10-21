



# Group

`GroupAgent` is only supported on a *column* of *grid*. It mimics the
action to "group by a column's data".

![](images/Zats-mimic-group.png)

The following code presents how to make a column to group its data.

```java

        ComponentAgent groupingColumn = desktop.query("column[label='Author']");
        groupingColumn.as(GroupAgent.class).group();
```

# Supported Components

| Components | Version | Note |
|------------|---------|------|
| Column     | 5, 6    |      |


 
