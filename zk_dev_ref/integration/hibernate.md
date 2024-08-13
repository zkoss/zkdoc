# Overview

Due to *object/relational paradigm mismatch* [^1], developers tend to
use ORM (*object/relational mapping*) framework to convert
object-oriented model to relational model and vice versa. *Hibernate* is
the most popular ORM framework in Java world. We will talk about some
integration topics in this chapter such as lazy initialization with
Spring. If you haven't read about basic concepts and installation of
Hibernate, please refer to [Hibernate
Dcumentation](http://www.hibernate.org/docs). The example we give in
this chapter is based on Hibernate **4.0.0.final** and Spring
**3.1.2.RELEASE**.

# Integrate with Different DAO implementation

The *Data Access Object (DAO)* pattern is a good practice to implement a
persistence layer. This pattern encapsulates data access codes written
by Hibernate API from business tier. A DAO object exposes an interface
to business object and performs persistence operation relating to a
particular persistent entity.

According to Hibernate Reference Manual's suggestion [^2], we should
apply *session-per-request* pattern to manage sessions and transactions.
This pattern needs an interceptor to open a contextual session with a
transaction when a request is going to be handled and close the session
before respond is sent to client (aka. *open session in view* pattern).
A common implementation for page-based application is a servlet filter.

Applying this pattern also solves a common "LazyInitializationException"
problem that most developers encounter when using lazy fetching
strategy. In brief, Hibernate session is usually closed after a DAO
object has performed an operation (a.k.a *session-per-operation*
pattern). Those persistent objects become *detached* after the
associated sessions are closed. If we access a detached object's
lazy-loaded collection when rendering the view. We will get an error
message like
`LazyInitializationException: no session or session was closed`. For
detailed explanation, please refer to the article "Open Session in View"
on Hibernate community[^3]. As we apply *session-per-request* pattern, a
Hibernate session is kept open when a View is accessing lazy-loaded
collection. Those objects queried by the Hibernate session becomes
detached later (after the interceptor closes the Hibernate session), so
the previously mentioned problem is resolved.

## Homemade DAO

Here we introduce how to implement an DAO without other frameworks (e.g.
Spring).

### Configuration

The minimal Maven dependency you need is:

``` xml

    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>4.0.0.Final</version>
      <scope>compile</scope>
    </dependency>
```

<div style="-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;color:#c06330;padding:15px 40px;background:#fed no-repeat 13px 13px;margin-bottom:10px">

![](/zk_dev_ref/images/Icon_info.png "Icon_info.png") **Note:** If you don't use Maven,
please refer to Hibernate Reference Documentation to know which JAR file
you need.

</div>

### Utility Class

A simple way to implement a DAO is to control Hibernate sessions and
transactions manually, hence we need a utility class to get
`SessionFactory`. ZK's
<javadoc>org.zkoss.zkplus.hibernate.HibernateUtil</javadoc> has been
deprecated since 6.0.2, you can write your own one according to the code
example in Hibernate Reference Manual.[^4] Here we provide a simple
example.

**Utility class to get SessionFactory**

``` java
package org.zkoss.reference.developer.hibernate.dao;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static SessionFactory sessionFactory;
    static {
        try {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

}
```

### An Open Session Listener

For *open session in view* pattern, we need an interceptor to open
sessions. In ZK, we need to intercept all requests including AU
requests, so we implement ZK's [ Life Cycle
Listener](ZK_Developer's_Reference/Customization/Life_Cycle_Listener)
to achieve this. (Our listener's implementation is based on the filter
mentioned by a Hibernate article "Open Session in View". [^5].) This
listener opens a session and begins a transaction at the beginning of an
execution (ZK's HTTP request wrapper, then commits (or rollback) at the
end of the execution.

**Extracted from OpenSessionInViewListener**

``` java

public class OpenSessionInViewListener implements ExecutionInit, ExecutionCleanup {
    private static final Log log = Log.lookup(OpenSessionInViewListener.class);

    public void init(Execution exec, Execution parent) {
        if (parent == null) { //the root execution of a servlet request
            log.debug("Starting a database transaction: "+exec);
            HibernateUtil.getSessionFactory().getCurrentSession().beginTransaction();
        }
    }

    public void cleanup(Execution exec, Execution parent, List errs) {
        if (parent == null) { //the root execution of a servlet request
            if (errs == null || errs.isEmpty()) {
                log.debug("Committing the database transaction: "+exec);
                HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().commit();
            } else {
                final Throwable ex = (Throwable) errs.get(0);
                rollback(exec, ex);
            }
        }
    }

    private void rollback(Execution exec, Throwable ex) {
        try {
            if (HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().isActive()) {
                log.debug("Trying to rollback database transaction after exception:"+ex);
                HibernateUtil.getSessionFactory().getCurrentSession().getTransaction().rollback();
            }
        } catch (Throwable rbEx) {
            log.error("Could not rollback transaction after exception! Original Exception:\n"+ex, rbEx);
        }
    }
}
```

- Line 7: Call `getCurrentSession()` to get a contextual session. [^6]

Add configuration in zk.xml to make the listener work.

**Configure listener in zk.xml**

``` xml
<zk>
    <listener>
        <listener-class>org.zkoss.reference.developer.hibernate.web.OpenSessionInViewListener</listener-class>
    </listener>
</zk>
```

### DAO Implementation

The listener begins and commits transactions keeping DAO's
implementation simple. Just use the utility class to get current
Hibernate session to perform the operation.

**Simple DAO implementation**

``` java
public class OrderDao {

    public List<Order> findAll() {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        Query query = session.createQuery("select o from Order as o");
        List<Order> result = query.list();
        return result;
    }

    /**
     * rollback is handled in filter.
     * @param newOrder
     * @return
     * @throws HibernateException
     */
    public Order save(Order newOrder) throws HibernateException{
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.save(newOrder);
        session.flush();
        return newOrder;
    }
}
```

Finally, we can use the DAO class in a ViewModel to manipulate domain
objects.

**Use DAO in a ViewModel**

``` java

public class OrderViewModel {

    private OrderDao orderDao = new OrderDao();

    private List<Order> orders ;
    private Order selectedItem;
    
    @Init
    public void init(){
        orders = orderDao.findAll();
        if (!orders.isEmpty()){
            setSelectedItem(orders.get(0));
        }
    }

    //omit setter and getter for brevity
}
```

## Spring-based DAO

With Spring provided dependency injection and ORM support, here our
efforts are simplified quite substantially. We'll demonstrate one
typical usage in non-managed environment. To apply *session-per-request*
pattern, we can use Spring provided `OpenSessionInViewFilter` instead of
writing our own one. According to the suggestion in Spring Reference
Documentation 3.1, using plain Hibernate API to implement a DAO is the
current recommended usage pattern. In the DAO, we can also easily
retrieve `SessionFactory` by dependency inject without any utility
classes (`HibernateUtil`). Besides, declarative transaction management
and rollback rule also reduces our work. The following are the the
related code snippets.

### Configuration

The minimal dependencies you need are Hibernate-Core, Spring-Web,
Spring-ORM, and Cglib:

``` xml

    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>4.0.0.Final</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>3.1.2.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-orm</artifactId>
        <version>3.1.2.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>2.2</version>
    </dependency>
```

We use basic configuration for Spring.

**Spring configuration for Hibernate**

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context-3.0.xsd
           http://www.springframework.org/schema/tx
           http://www.springframework.org/schema/tx/spring-tx-3.0.xsd">

    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource" >
        <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
        <property name="url" value="jdbc:hsqldb:file:data/store" />
        <property name="username" value="sa" />
        <property name="password" value="" />
    </bean>
    <!-- 
        hibernate.current_session_context_class=thread
    -->
    <bean id="sessionFactory" class="org.springframework.orm.hibernate4.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource" />
        <property name="hibernateProperties">
            <value>
                hibernate.dialect=org.hibernate.dialect.HSQLDialect
                hibernate.hbm2ddl.auto=crate
                hibernate.show_sql=true
                hibernate.connection.pool_size=5
                hibernate.connection.autocommit=false
            </value>
        </property>
        <property name="annotatedClasses">
            <list>
                <value>org.zkoss.reference.developer.hibernate.domain.Order</value>
                <value>org.zkoss.reference.developer.hibernate.domain.OrderItem</value>
            </list>
        </property>
    </bean>
    <bean id="transactionManager" class="org.springframework.orm.hibernate4.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory" />
    </bean>

    <tx:annotation-driven />
    
    <!-- Scans for application @Components to deploy -->
    <context:component-scan base-package="org.zkoss.reference.developer.hibernate" />
</beans>
```

- Line 40: For Hibernate 3.x, some package names should be changed to
  `org.springframework.orm.hibernate3.*`, e.g.
  `org.springframework.orm.hibernate3.HibernateTransactionManager`.

### OpenSessionInViewFilter

Spring already provides a <b>OpenSessionInViewFilter</b> to solve lazy
loading in web views problems. This filter makes Hibernate Sessions
available via the current thread, which will be auto-detected by
Spring's transaction managers. For detailed description and usage,
please refer to Spring's Javadoc.

**Configure OpenSessionInViewFilter in web.xml**

``` xml

    <filter>
        <filter-name>OpenSessionInViewFilter</filter-name>
        <filter-class>org.springframework.orm.hibernate4.support.OpenSessionInViewFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>OpenSessionInViewFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

### DAO Implementation

For a Spring-powered DAO, we can use injected `SessionFactory` and
`@Transactional` to perform persistence operation.

**DAO empowered by Spring**

``` java

@Repository
public class SpringOrderDao {

    @Autowired
    private SessionFactory sessionFactory;
    
    @Transactional(readOnly=true)
    public List<Order> queryAll() {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("select o from Order as o");
        List<Order> result = query.list();
        return result;
    }

    @Transactional
    public Order save(Order newOrder){
        Session session = sessionFactory.getCurrentSession();
        session.save(newOrder);
        session.flush();
        return newOrder;
    }

    //omit other codes
}
```

To use this Spring-based DAO in a composer (or a ViewModel), ZK provides
several ways like variable resolvers. Please refer to [ZK Developer's
Reference/Integration/Middleware
Layer/Spring](ZK_Developer's_Reference/Integration/Middleware_Layer/Spring).

# Lazy Initialization Issue among AU Requests

Although we apply *open session in view* pattern to keep a session open
when a page is rendered, this makes ZUL access a lazy-loaded collection
without errors **when you visit the ZUL at first request**. However, if
your event handling methods (or command methods) accesses a lazy-loaded
property of a detached object, you will still get a
`LazyInitializationException` when a user interacts with the ZUL. This
is because even though the filter opens a session for each request, the
detached objects don't attach to the session automatically. [^7] The two
DAO implementations demonstrated previously both have this problem and
there are two solutions for it.

1.  set fetching strategy to **eagerly fetch**.
2.  Re-query the detached object manually.

If you are not dealing with large amount of data, you can choose the
first solution by simply changing your fetching strategy to eager for
properties.

We will use an example to demonstrate the second solution. The following
is a "Order Viewer" system. The upper *Listbox* contains a list of
orders and the lower *Grid* contains the details of items that are
selected in the order. One order may contain many order items
(one-to-many mapping), and we set order items collection to lazy
fetching . When we select an order, the *Grid* displays detailed items
of the selected order which means accessing a lazy-loaded collection.

``` java
@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status = PROCESSING;
    private String description;

    @OneToMany(mappedBy="orderId", fetch=FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<OrderItem>();

    //other codes...
}
```

By default, we set the *Listbox* selection on the first row. When ZUL
accesses the selected order's lazy-loaded items collection, Hibernate
can load it successfully with the help of open-session-in-view filter
because session is still open. However, if we click the second row which
also accesses a detached `Order` object's items collection, we should
re-load the object with Hibernate session or we'll get
`LazyInitializationException`.

![](/zk_dev_ref/images/Hibernate-beginning.png)

<div style="text-align:center">

[source of above
screen](https://code.google.com/p/zkbooks/source/browse/trunk/developersreference/integration.hibernate/src/main/webapp/homemade/order.zul)

</div>

In order to reload a detached object, we pass the selected order to DAO
object and reload it.

**Reload selected object**

``` java

public class OrderViewModel {

    private OrderDao orderDao = new OrderDao();

    private List<Order> orders ;
    private Order selectedItem;
    
    @Init
    public void init(){
        orders = orderDao.findAll();
        setSelectedItem(orders.get(0));
    }

    public Order getSelectedItem() {
        if (selectedItem!=null){
            selectedItem = orderDao.reload(selectedItem);
        }
        return selectedItem;
    }

    //omit other methods for brevity
}
```

- Line 11: Initialize the *Listbox* selection with the `Order` object at
  index 0 of `orders`.
- Line 16: Re-query the `selectedItem`.

We use `Session.load()` to re-query the `Order` object with its id, this
newly-retrieved object still has an open Hibernate session. Then when we
access the lazy-loaded collection (`items`) in the ZUL, Hibernate can
retrieve the collection for us. After doing so, we can eliminate
`LazyInitializationException`.

**Re-attach to a session**

``` java

public class OrderDao {

    //...

    /**
     * Initialize lazy-loaded collection.
     * @param order
     * @return
     */
    public Order reload(Order order){
        return (Order)HibernateUtil.getSessionFactory().getCurrentSession().load(Order.class,order.getId());
    }
}
```

# Lazy Initialization Issue Under Render on Demand

Some AU requests cannot be interfered by developers,such as a "[Render
On
Demand](ZK_Developer's_Reference/Performance_Tips/Listbox,_Grid_and_Tree_for_Huge_Data/Turn_on_Render_on_Demand)"
request where the rendering request is handled implicitly by a component
itself. Under this situation, if a component needs to **render some data
from a detached object's lazy-loaded collection**, developers won't have
a chance to reload detached objects during the rendering to avoid
`LazyInitailizationException`.

Assume we have a *Listbox*, it only displays 10 rows by default and it'a
not in "page" mold. One of its columns display a lazy-loaded
collection's size (`each.items.size()` )of an `Order` object.

**Listbox that accesses lazy-loaded property**

``` xml

    <window title="" border="normal" width="600px" apply="org.zkoss.bind.BindComposer"
        viewModel="@id('vm') @init('org.zkoss.reference.developer.hibernate.vm.RodViewModel')">
        Contain a customized model that reload lazy-loaded collection from database
        <listbox model="@load(vm.orderListModel)" rows="10">
            <listhead>
                <listheader label="ID" width="50px" />
                <listheader label="Description" />
                <listheader label="Item Count" width="150px" />
            </listhead>
            <template name="model">
                <listitem>
                    <listcell label="@load(each.id) " />
                    <listcell label="@load(each.description)" />
                    <listcell label="@load(each.items.size())" />
                </listitem>
            </template>
        </listbox>
...
```

If we just pass a Java `List` object to be the model of the *Listbox*,
when a user scrolls down to view other rows, ZK will send AU request to
retrieve data for those un-rendered rows. *Listbox* will try to access
lazy-loaded collection but objects in the list are already detached, and
we will get `LazyInitailizationException`. During this rendering
process, developers will not be notified and cannot interfere this
process to reload detached objects. One solution is to **implement a
custom <javadoc>org.zkoss.zul.ListModel</javadoc>** for the component.

We demonstrate 2 implementations here for your reference. The first one
is simpler but less efficient; it re-queries each detached object when a
component requests it.

**Reloaded ListModel**

``` java
public class OrderListModel extends AbstractListModel<Order>{

    private OrderDao orderDao;
    List<Order> orderList = new LinkedList<Order>();
    
    public OrderListModel(List<Order> orders,OrderDao orderDao){
        this.orderList = orders;
        this.orderDao = orderDao;
    }
    
    @Override
    public Order getElementAt(int index) {
        //throw a runtime exception if orderDao does not find target object
        Order renewOrder = orderDao.reload(orderList.get(index));
        return renewOrder;
    }

    @Override
    public int getSize() {
        return orderList.size();
    }
}
```

- Line 1: We extends <javadoc>org.zkoss.zul.AbstractListModel</javadoc>
  to build our list model for it handles selection for us, but we have
  to implement Order's `equals()` and `hashCode()`.
- Line 14: Re-query the detached object by its id and return a
  persistent one.

The second one is more complicated but more efficient; it re-queries a
one page size data each time and stores as a cache in an execution. If
the cache has the object that the component requests, it returns the one
in cache without re-querying again.

**Lived ListModel**

``` java
public class LiveOrderListModel extends AbstractListModel<Order>{

    private OrderDao orderDao;
    private Integer totalSize;  
    private int pageSize = 30;
    private final String CACHE_KEY= LiveOrderListModel.class+"_cache";
    
    public LiveOrderListModel(OrderDao orderDao){
        this.orderDao = orderDao;
    }

    /**
     * query one page size of entity for one execution a time. 
     */
    @Override
    public Order getElementAt(int index) {
        Map<Integer, Order> cache = getCache();

        Order targetOrder = cache.get(index);
        if (targetOrder == null){
            //if cache doesn't contain target object, query a page starting from the index
            List<Order> pageResult = orderDao.findAll(index, pageSize);
            int indexKey = index;
            for (Order o : pageResult ){
                cache.put(indexKey, o);
                indexKey++;
            }
        }else{
            return targetOrder;
        }

        //get the target after query from database
        targetOrder = cache.get(index);
        if (targetOrder == null){
            //if we still cannot find the target object from database, there is inconsistency in the database
            throw new HibernateException("Element at index "+index+" cannot be found in the database.");
        }else{
            return targetOrder;
        }
    }

    private Map<Integer, Order> getCache(){
        Execution execution = Executions.getCurrent();
        //we only reuse this cache in one execution to avoid accessing detached objects.
        //our filter opens a session during a HTTP request
        Map<Integer, Order> cache = (Map)execution.getAttribute(CACHE_KEY);
        if (cache == null){
            cache = new HashMap<Integer, Order>();
            execution.setAttribute(CACHE_KEY, cache);
        }
        return cache;
    }
    
    @Override
    public int getSize() {
        if (totalSize == null){
            totalSize = orderDao.findAllSize().intValue();
        }
        return totalSize; 
    }
}
```

- Line 16: If the cache doesn't contain target `Order`, we query a one
  page size of `Order` starting from the index as passed `index` doesn't
  always increase sequentially.
- Line 42: The `getElementAt(int)` will be invoked multiple times during
  an execution. In order to avoid using a cache of detached objects, we
  make the cache as an attribute of an execution which is dropped after
  being handled.

# Get Example Source Code

All source code used in this chapter can be found
[here](https://github.com/zkoss/zkbooks/tree/master/developersreference/integration.hibernate).

# Reference

<references/>

[^1]: Hibernate in Action, Christian Bauer, Gavin King, Manning

[^2]: [Unit of Work in Hibernate Core Reference
    Manual](http://docs.jboss.org/hibernate/core/3.6/reference/en-US/html_single/#transactions-basics-uow)

[^3]: [Open Session in
    View\Problem](https://community.jboss.org/wiki/OpenSessionInView#The_problem)

[^4]: [Hibernate Reference Documentation\\
    Tutorial](http://docs.jboss.org/hibernate/core/3.6/reference/en-US/html_single/#tutorial-firstapp-helpers)

[^5]: [Open Session in View\Using an
    intercepto](https://community.jboss.org/wiki/OpenSessionInView#Using_an_interceptor)

[^6]: [Hibernate Reference Documentation/contextual
    session](http://docs.jboss.org/hibernate/orm/4.1/manual/en-US/html_single/#architecture-current-session)

[^7]: The reason is explained in a [Hibernate article "Open Session in
    View"](https://community.jboss.org/wiki/OpenSessionInView#Why_cant_Hibernate_just_load_objects_on_demand)
