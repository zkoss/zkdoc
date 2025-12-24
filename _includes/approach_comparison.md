# Approach Comparison

Here is the architectural picture to demonstrate the interaction between Model, View, and Controller/ViewModel.

![MVC diagram](images/Tutorial-mvc.png) ![MVVM diagram](images/Tutorial-mvvm.png)

The main differences are that **Controller** changes to **ViewModel** and there is a binder in MVVM to synchronize data instead of a Controller.

## **MVC** Advantages
* very intuitive, easy to understand
* control components in fine-grained

For those who use ZK for the first time or beginners, we suggest you using the MVC pattern. Because it's easy to use and debug.

## **MVVM** Advantages
* suitable for design-by-contract programming
* loose coupling with View
* better reusability
* better testability
* better for responsive design

Both approaches can achieve many things in common and have their own strength. But there are still some differences between them. Building an application with the MVC pattern is more intuitive because you directly control what you see. Its strength is that you have total control of components to create child components dynamically, control custom components, or do anything a component can do.

In the MVVM pattern, because ViewModel is loosely-coupled with View (it has no reference to components), one ViewModel may associate with multiple Views without modification. UI designers and programmers may work in parallel. If data and behavior do not change, a View's change doesn't cause ViewModel to be modified. In addition, as ViewModel is a POJO, it is easy to perform unit test on it without any special environment. That means ViewModel has better reusability, testability, and better resistance to View change.

To summarize, see the comparison table below:

| | MVC | MVVM |
|---|---|---|
| Coupling with View | Loose with layout | Loose |
| Coupling with Component | Tight | Loose |
| Coding in View | Component ID | Data binding expression |
| Controller Implementation | Extends ZK's composer | a POJO |
| UI Data Access | Direct access | Automatic |
| Backend Data Access | Direct access | Direct access |
| UI Updating | Manipulate components | Automatic (@NotifyChange) |
| Component Controlling Granularity | Fine-grained | Normal |
| Performance | High | Normal |
