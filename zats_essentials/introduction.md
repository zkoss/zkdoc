**ZK Application Test Suite** is a collection of tools which can help
users test their ZK-based application.

# Why Need ZATS

Testing ZK applications traditionally requires running a full application server and browser, making unit testing slow, complex, and resource-intensive. ZATS addresses these challenges by providing:

* **Server-less Testing**: Test your ZUL pages and components without deploying to an application server, dramatically reducing test execution time and setup complexity.

* **Browser-less Testing**: Simulate user interactions programmatically without requiring a real browser, enabling headless testing in CI/CD pipelines and automated build processes.

* **Integration with Testing Frameworks**: Works seamlessly with popular testing frameworks like JUnit and TestNG, allowing developers to use familiar testing patterns and tools.

* **Event Simulation**: Accurately simulate user events (clicks, selections, form submissions) and verify component state changes, ensuring your application logic works correctly.

# Testing Different Design Patterns

* **MVC Pattern**: ZK Composer in MVC pattern requires to run within an application server, but ZATS allows you to test the controller logic without needing a full server setup.
* **MVVM Pattern**: If you strictly follow MVVM pattern, a ViewModel is a POJO, so it can be tested without ZATS. But if you mix MVC pattern with MVVM, e.g. using a component in a ViewModel, you still need ZATS to test the ViewModel.

# Mimic
Currently, this suite has one module:

[ZATS Mimic]({{site.baseurl}}/zats_essentials/mimic_library), a unit-test library that can be used with any well-known unit test framework (e.g.
JUnit and TestNG) to test your ZUL without an application server or a browser.

# Source Code

All source code mentioned in this book can be found at [zats-example](https://github.com/zkoss/zats/tree/master/zats-example).
