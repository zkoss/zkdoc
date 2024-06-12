# TabularPivotModel

In TabularPivotModel, Calculator is implemented by two segments:
summarization and context. Given a Calculator as an aggregation
operation, the context refers to the intermediate result we keep track
of while iterating over the operands (accumulation), while summarization
refers to the computation from the context to the end result. For
example, if we want to compute the **AVERAGE** over a list of numbers,
we would likely keep track of their **SUM** and **COUNT**, and then
retrieve the final result by dividing the two. In the above example, the
context would be a data structure holding the sum and the count, while
the summarization would be the division.

## Define a Custom Calculator

To define a custom calculator, you must specify a ContextType so the
model knows what to keep track of in accumulation phase.

``` java
public interface ContextualCalculator<C extends Context<C>> extends Calculator {
    
    public Number getResult(C context); // summarize the end result from the context
    
    public ContextType<C> getContextType(); // specify the context type
    
}
```

You can either use an existing ContextType, or create your own. The
built-in context type are: `TODO`

It is encouraged to make ContextType as singletons, as Calculators can
share Context if they are of the same ContextType.

``` java
public interface ContextType<C extends Context<C>> {
    
    public C create(); // ContextType has the responsibility as a Context factory
    
}
public interface Context<C extends Context<C>> {
    
    public void add(Object item); // what to do when iterating over raw data.
    
    public void merge(C ctx); // what to do when merging from contexts of a partition of its raw data set.
    
}
```

### Example: Data Range

Say, we want to create a custom calculator to compute the number range
(**MAX** minus **MIN**) of data, and luckily the
StandardContextType.MIN_MAX already carries sufficient information to do
so. We just need to define a ContextualCalculator based on the context
type:

``` java
public class Range implements ContextualCalculator<MinMaxContext> {
    
    public static final Range INSTANCE = new Range();
    private Range() {}
    
    @Override
    @SuppressWarnings("unchecked")
    public ContextType<MinMaxContext> getContextType() {
        return StandardContextType.MIN_MAX;
    }
    @Override
    public Number getResult(MinMaxContext context) {
        return context.getMax().doubleValue() - context.getMin().doubleValue();
    }
    @Override
    public String getLabel() {
        return "Range";
    }
    @Override
    public String getLabelKey() {
        return "range";
    }
}
```

### Example: Distinct Count

It may not be too obvious how to implement **DISTINCT COUNT** (which
calculates the number of distinct items in the collection), but the best
approach on context is a Set. As there is no similar built-in context,
we have to implement our own:

``` java
public class SetContext implements Context<SetContext> {
    
    private final Set<Object> _set = new HashSet<Object>();
    @Override
    public void add(Object item) {
        _set.add(item);
    }
    @Override
    public void merge(SetContext ctx) {
        _set.addAll(ctx._set);
    }
    
    public Set<Object> getSet() {
        return _set;
    }
    
    public static final ContextType<SetContext> CONTEXT_TYPE = 
            new ContextType<SetContext>() {
        @Override
        public SetContext create() {
            return new SetContext();
        }
    };
}
```

Then the summarization part becomes quite obvious:

``` java
public class DistinctCount implements ContextualCalculator<SetContext> {
    
    public static final DistinctCount INSTANCE = new DistinctCount();
    private DistinctCount() {}
    
    @Override
    public ContextType<SetContext> getContextType() {
        return SetContext.CONTEXT_TYPE;
    }
    @Override
    public Number getResult(SetContext context) {
        return context.getSet().size();
    }
    @Override
    public String getLabel() {
        return "Distinct Count";
    }
    @Override
    public String getLabelKey() {
        return "distinctCount";
    }
}
```

## Performance

The memory footprint size required for a Calculator is proportional to
the footprint of its Context. And, for each context type, the add method
will be called as many times as the raw data count. Thus, you should be
aware of that contexts storing Set, Collection may cause a performance
hit (caused by memory bound).

## Show a Custom Calculator in PivotFieldControl Menu

## Version History

| Version | Date      | Content              |
|---------|-----------|----------------------|
| 2.0.0   | June 2012 | ContextualCalculator |
