# Initialize Input Components
When a user visits this page, we want profile data to be loaded in
the form and ready to be modified. Hence, we should initialize those
input components in a controller by loading previously-saved data to input components.

To manipulate components, we need to get their object reference by [`@Wire`](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/MVC/Controller/Wire_Components).

```java
public class ProfileViewController extends SelectorComposer<Component>{

    //wire components
    @Wire
    Label account;
    @Wire
    Textbox fullName;
    @Wire
    Textbox email;
    @Wire
    Datebox birthday;
    @Wire
    Listbox country;
    @Wire
    Textbox bio;

    //services
    AuthenticationService authService = new AuthenticationServiceChapter3Impl();
    UserInfoService userInfoService = new UserInfoServiceChapter3Impl();
    ...
}
```
-  Line 19: A controller usually calls service classes to perform business operations or get necessary data.



To make sure all components objects are wired, we initialize them in `doAfterCompose()` since ZK will call this method after it creates all its child components, so that you can manipulate those children safely.
``` java
public class ProfileViewController extends SelectorComposer<Component>{

    ...

    @Override
    public void doAfterCompose(Component comp) throws Exception{
        super.doAfterCompose(comp);

        ListModelList<String> countryModel = new ListModelList<String>(CommonInfoService.getCountryList());
        country.setModel(countryModel);

        refreshProfileView();
    }

    ...

    private void refreshProfileView() {
        UserCredential userCredential = authService.getUserCredential();
        User user = userInfoService.findUser(userCredential.getAccount());
        if(user==null){
            //TODO handle un-authenticated access
            return;
        }

        //apply bean value to UI components
        account.setValue(user.getAccount());
        fullName.setValue(user.getFullName());
        email.setValue(user.getEmail());
        birthday.setValue(user.getBirthday());
        bio.setValue(user.getBio());

        ((ListModelList)country.getModel()).addToSelection(user.getCountry());
        ...
    }
}
```
-   Line 12: Load previously-saved data to input components to initialize UI, so we should call it after initializing country list.
-   Line 26-30: Populate saved user data to components by `setValue()`.
-   Line 32: set the `Listbox`'s selected item with `ListModelList.addToSelection()`.


# Populate Country Drop-down List
This form needs a drop-down list that contains a list of countries. When a user visits the page, the data in drop-down list should
be ready. To achieve this, we have to initialize a drop-down list in the
controller.

![ ]({{site.baseurl}}/zk_essentials/images/ze-ch5-collection.png)


By setting `<listbox>` in "select" mold, We will have a drop-down list instead of a table-like component on the page.

```xml
<listbox id="country" mold="select" width="200px">
```
A component could have multiple different visual appearances. Each appearance is called a "mold". Therefore, you can choose a proper mold according to your visual requirement/page design.


{% include component_model_template.md %}


## Create a Data Model
Just a `<listbox>` in a zul doesn't provide any country to select. We need create a data model object.


``` java
public class ProfileViewController extends SelectorComposer<Component>{
    ...
    @Wire
    Listbox country;

    @Override
    public void doAfterCompose(Component comp) throws Exception{
        super.doAfterCompose(comp);

        ListModelList<String> countryModel = new ListModelList<String>(CommonInfoService.getCountryList());
        country.setModel(countryModel);

        ...
    }

    ...

}
```

-   Line 10: Create a `ListModelList` object with a list of `String`
-   Line 11: Provide prepared data model object to the component by
    `setModel()`.

## Define Listbox Template
The last part is to define a template, so that `<listbox>` can know how to render its data model. If you don't define it, `<listbox>` renders the model with a default built-in template.


```xml
<listbox id="country" mold="select" width="200px">
    <template name="model">
        <listitem label="${each}" />
    </template>
</listbox>
```
- Line 2: The `name` attribute has to be **model** which means it's  [a template for `<listbox>` model](https://www.zkoss.org/wiki/ZK%20Developer's%20Reference/MVC/View/Template/Listbox%20Template).
-   Line 3: The `${each}` is an implicit variable that you can use
    without declaration inside `<template>`, and it represents one object of the data model for each iteration when rendering. We use
    this variable with dot notation at component attributes to reference a data object's property . In our example, we just set it at `<listitem>`'s label.

# Populate Input Components
When a user visits this page, we want profile data to be loaded in
the form and ready to be modified. Hence, we should initialize those
input components in a controller by loading previously-saved data to input components.

To manipulate components, we need to get their object reference by [`@Wire`](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/MVC/Controller/Wire_Components).

```java
public class ProfileViewController extends SelectorComposer<Component>{

    //wire components
    @Wire
    Label account;
    @Wire
    Textbox fullName;
    @Wire
    Textbox email;
    @Wire
    Datebox birthday;
    @Wire
    Listbox country;
    @Wire
    Textbox bio;

    //services
    AuthenticationService authService = new AuthenticationServiceChapter3Impl();
    UserInfoService userInfoService = new UserInfoServiceChapter3Impl();
    ...
```
-  Line 19: A controller usually calls service classes to perform business operations or get necessary data.



To make sure all components objects are wired, we initialize them in `doAfterCompose()`.
``` java

public class ProfileViewController extends SelectorComposer<Component>{

    ...

    @Override
    public void doAfterCompose(Component comp) throws Exception{
        super.doAfterCompose(comp);

        ListModelList<String> countryModel = new ListModelList<String>(CommonInfoService.getCountryList());
        country.setModel(countryModel);

        refreshProfileView();
    }

    ...

    private void refreshProfileView() {
        UserCredential userCredential = authService.getUserCredential();
        User user = userInfoService.findUser(userCredential.getAccount());
        if(user==null){
            //TODO handle un-authenticated access
            return;
        }

        //apply bean value to UI components
        account.setValue(user.getAccount());
        fullName.setValue(user.getFullName());
        email.setValue(user.getEmail());
        birthday.setValue(user.getBirthday());
        bio.setValue(user.getBio());

        ((ListModelList)country.getModel()).addToSelection(user.getCountry());
        ...
    }
}
```
-   Line 13: Load previously-saved data to input components to initialize UI, so we should call it after initializing country list.
-   Line 27-31: Push saved user data to components by `setValue()`.
-   Line 33: Use `ListModelList.addToSelection()` to set the
    `Listbox`'s selected item.
