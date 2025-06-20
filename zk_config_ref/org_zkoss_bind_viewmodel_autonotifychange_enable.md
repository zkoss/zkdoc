**Property:**

`org.zkoss.bind.viewModel.autoNotifyChange.enable`

`Default: `<i>`false`</i>

Enable posting NotifyChange when setter method called.

If the feature is turned on, every setter method in `@Command` and
`@GlobalCommand` will post NotifyChange after being called.
