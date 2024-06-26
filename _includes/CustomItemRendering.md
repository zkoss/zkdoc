# Custom Item Rendering

Since this component has no child component like `Listbox`, if you want
to render its items differently, there 2 ways:

## Change text

If you just want to change the text e.g. enclosing it with brackets,
just put <template> as its child and add characters with `${each}`:

```xml
      <{{ include.component }}>  
              <template name="model">[${each}]</template>  
      </{{ include.component }}>
```
- The template only allows text that can be converted into a ZK `Label`.

## Change HTML Structure

If you want to make more changes e.g. adding tooltips by setting title
attributes, you need to create your own `ItemRenderer`. See
[ZK%20Developer's%20Reference/MVC/View/Renderer/Item%20Renderer](ZK%20Developer's%20Reference/MVC/View/Renderer/Item%20Renderer).
