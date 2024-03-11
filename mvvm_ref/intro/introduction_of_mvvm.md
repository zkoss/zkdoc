---
title: 'Introduction'
---

# Introduction of MVVM

[MVVM](http://msdn.microsoft.com/en-us/magazine/dd419663.aspx) is an abbreviation of a design pattern named **Model-View-ViewModel** which originated from Microsoft ([Introduction to Model/View/ViewModel pattern for building WPF apps](http://blogs.msdn.com/b/johngossman/archive/2005/10/08/478683.aspx)) It is a specialization of [Presentation Model](http://martinfowler.com/eaaDev/PresentationModel.html) introduced by Martin Fowler, a variant of the famous MVC pattern. This pattern has 3 roles: View, Model, and ViewModel. The View and Model plays the same roles as they do in MVC.

The ViewModel in MVVM acts like a special Controller for the View which is responsible for exposing data from the Model to the View and for providing required action and logic for user requests from the View. The ViewModel is type of View abstraction, which contains a View's state and behavior. But ViewModel should contain no reference to UI components and knows nothing about View's visual elements. Hence there is a clear separation between View and ViewModel, this is also the key characteristics of MVVM pattern. From another angle, it can also be said that the View layer is like an UI projection of the ViewModel.