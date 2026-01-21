# Custom Item Rendering

Since this component has no child component like `Listbox`, if you want
to render its items differently, there are 2 ways:

## Change text

If you just want to change the text e.g. enclosing it with brackets,
just put <template> as its child and add characters with `${each}`:

```xml
      <cascader>  
              <template name="model">[${each}]</template>  
      </cascader>
```
- The template only allows text that can be converted into a ZK `Label`.
- could be `<cascader>`, `<chosenbox>`, `<selectbox>`, `<searchbox>` 

## Change HTML Structure

If you want to make more changes e.g. adding tooltips by setting title
attributes, you need to create your own `ItemRenderer`. See [Item_Renderer]({{site.baseurl}}/zk_dev_ref/mvc/item_renderer).
