# Detail Operation Flow

Here we use a simple scenario to explain how MVVM works in ZK. Assume that a user click a button then "Hello World" text appears. The flow is as follows:

![MVVM Flow]({{site.baseurl}}/zk_mvvm_ref/images/smalltalk_mvvm_hello_flow.png)

As stated in the paragraph earlier, the binder synchronizes data between UI and ViewModel.

1. A user presses a button on the screen (perform an action).
2. A corresponding event is fired to the binder.
3. The binder finds the corresponding action logic (It is **Command**) in the ViewModel and executes it.
4. The action logic accesses data from Model layer and updates ViewModel's corresponding properties.
5. ViewModel notify the binder that some properties have been changed.
6. Per what properties have been changed, the binder loads data from the ViewModel.
7. Binder then updates the corresponding UI components to provide visual feedback to the user.
