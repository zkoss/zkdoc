# Overview

*Java Persistence API*(JPA) is a POJO-based persistence specification.
It offers *object-relational mapping* solution to enterprise Java
applications. We will demonstrate examples on how to integrate a popular
and commonly used combination: JPA & Spring. In our example project, we
use a popular JPA **2.0** implementation, Hibernate **4.0.0.Final**. We
will also talk about solutions against well-known
`LazyInitializationException`.

# Integrate with Spring and JPA

*Data Access Object (DAO)* pattern is a good practice to implement a
persistence layer. This pattern encapsulates persistence API in a DAO
object and exposes the DAO object's interface to a business object to
perform persistence operations relating to a particular persistent
entity.

According to Hibernate EntityManager User Guide's suggestion [^1], we
should apply <b>entitymanager-per-request</b> pattern (aka. *Open
Session in View* pattern) to manage entity manager. This pattern needs
an interceptor to create a new `EntityManager` when a request is sent to
the server and a DAO object would use the same `EntityManger` to perform
persistence operation. We then close the `EntityManager` before a
response is sent to the client. The challenge here is how to implement
this pattern. The good news is that we can achieve this through Spring's
<b>OpenEntityManagerInViewFilter</b> and dependency injection.

Applying this pattern also solves a common
<b>LazyInitializationException</b> problem most developers may encounter
when using a lazy fetching strategy. In brief, `EntityManager` is
usually closed after a DAO object has performed an operation under
<b>entitymanager-per-operation</b> pattern. Those persistent objects
queried by `EntityManager` become *detached* after associated
`EntityManager`s are closed. If we access a detached object's
lazy-loaded collection when rendering the view, we will get an error
message like
`LazyInitializationException: no session or session was closed`. This
problem is essentially identical to a lazy-loading problem in Hibernate.
As we apply <b>entitymanager-per-request</b> pattern, an `EntityManager`
is kept open when a View accessing a lazy-loaded collection. Those
objects queried by `EntityManager` become detached later (after the
interceptor closes the `EntityManager`) and as a result, the problem
mentioned previously is now resolved.

## Configuration

The minimal Maven dependencies you need are:

```xml
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>3.0.7.RELEASE</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-entitymanager</artifactId>
      <version>4.0.0.Final</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-orm</artifactId>
      <version>3.0.7.RELEASE</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>cglib</groupId>
      <artifactId>cglib</artifactId>
      <version>2.2</version>
      <scope>compile</scope>
    </dependency>
```

<div style="-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;color:#c06330;padding:15px 40px;background:#fed no-repeat 13px 13px;margin-bottom:10px">

![]({{site.baseurl}}/zk_dev_ref/images/icon_info.png) **Note:** If you don't use Maven,
please refer to JPA vendor's documentation to know which JAR file you
need.

</div>

Our example project's Spring configuration is for non-managed
environment.

**Spring configuration**

```xml
    <!-- omit headers -->

    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource" >
        <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
        <property name="url" value="jdbc:hsqldb:file:data/store" />
        <property name="username" value="sa" />
        <property name="password" value="" />
    </bean>
    
    <bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalEntityManagerFactoryBean">
        <property name="persistenceUnitName" value="order"/>
    </bean>

    <bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
        <property name="entityManagerFactory" ref="entityManagerFactory" />
    </bean>

    <tx:annotation-driven />
    
    <context:component-scan base-package="org.zkoss.reference.developer.jpa" />
```

## OpenEntityManagerInViewFilter

To apply *entitymanager-per-request* pattern, we can use Spring provided
`OpenEntityManagerInViewFilter` instead of writing our own one. Make
sure filter mapping's url-pattern covers all pages that access
lazy-loaded entities. If you don't want this filter intercepting all
pages, be sure to include ZK AU request path (`/zkau/*`) in url-pattern
as your event handling methods (or command methods) might also access
lazy-loaded objects.

**Configure OpenEntityManagerInViewFilter in web.xml**

```xml

    <filter>
        <filter-name>OpenEntityManagerInViewFilter</filter-name>
        <filter-class>org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>OpenEntityManagerInViewFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

## DAO Implemnetation

In the DAO, we can easily retrieve `EntityManager` by Spring's
dependency inject without writing any utility class. Spring's
declarative transaction management and rollback rule also reduces our
work.

**DAO empowered by Spring**

```java
@Repository
public class SpringOrderDao {

    @PersistenceContext
    private EntityManager em;
    
    @Transactional(readOnly=true)
    public List<Order> queryAll() {
        Query query = em.createQuery("from Order as o");
        List<Order> result = query.getResultList();
        return result;
    }

    @Transactional
    public Order save(Order newOrder){
        em.persist(newOrder);
        em.flush();
        return newOrder;
    }
    
    //...
}
```

- Line 4: Spring will inject `EntityManager` created by
  <b>OpenEntityManagerInViewFilter</b>.

# Lazy Initialization Issue among AU Requests

We apply *open session in view* pattern to keep an `EntityManager` open
after a page is rendered, this makes a ZUL that accesses a lazy-loaded
collection to be rendered normally **when you visit the ZUL at first
request**. However, if your event handling methods (or command methods)
access lazy-loaded collection of another detached object, you still get
`LazyInitializationException` when a user interacts with the ZUL. This
is because even though the filter opens an `EntityManager` for each
request, the detached objects don't attach to the `EntityManager`
automatically. [^2] There are two solutions for this problem.

1.  set fetching strategy to **eagerly fetch**.
2.  **Re-query detached object** manually.

If you don't have large amount of data, you can choose the first
solution; just change your fetching strategy to **eager** for
one-to-many mapping.

We will demonstrate the **second solution** here using an example
assuming that we have a "Order Viewer" system where we can view an order
and its details. The upper *Listbox* contains a list of orders and the
lower *Grid* contains the details the selected order. One order may
contain many order items (one-to-many mapping), and we set order items
collection to lazy fetching . When we select an order, the *Grid*
displays details of the selected order which means accessing a
lazy-loaded collection.

**Order and OrderItem**

```java
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

We set *Listbox* to select the first row of the orders as default. When
the ZUL accesses the selected order's lazy-loaded items collection, JPA
can load it successfully with the help of
`OpenEntityManagerInViewFilter` because `EntityManager` is still open.
However, if we click the second row which accesses a detached `Order`
object's items collection, we should re-load the `Order` object with JPA
`EntityManager` or we'll get `LazyInitializationException`.

![]({{site.baseurl}}/zk_dev_ref/images/hibernate-beginning.png)

<div style="text-align:center">

[source of above screen](https://code.google.com/p/zkbooks/source/browse/trunk/developersreference/integration.jpa/src/main/webapp/order.zul)

</div>

In order to reload a detached object, we pass the selected order to DAO
object and reload it.

**Reload selected object**

```java
public class SpringOrderViewModel {

    @WireVariable
    private SpringOrderDao springOrderDao;

    private List<Order> orders ;
    private Order selectedItem;
    
    @Init
    public void init(){
        orders = springOrderDao.queryAll();
        if (!orders.isEmpty()){
            setSelectedItem(orders.get(0));
        }
    }
    
    public Order getSelectedItem() {
        if (selectedItem!=null){
            selectedItem = springOrderDao.reload(selectedItem);
            //you could replace the item in model list with persistent one
        }
        return selectedItem;
    }
    
    //omit other codes
}
```

- Line 12: Initialize the *Listbox* selection with the `Order` object at
  index 0 of `orders`.
- Line 17: Re-query the `selectedItem`.

We reload the detached `Order` objects from the database, this will make
the detached object attach to an `EntityManager`. Then, when we access
the lazy-loaded collection (`items`), JPA can retrieve the collection
for us. After doing so, we can eliminate `LazyInitializationException`.

**Reload detached object**

```java

@Repository
public class SpringOrderDao {

    @PersistenceContext
    private EntityManager em;

    //omit other codes

    @Transactional(readOnly=true)
    public Order reload(Order order){
        return em.find(Order.class, order.getId());
    }


}
```

# Lazy Initialization Issue Under Render on Demand

Some AU requests cannot be interfered by developers like "[Render On Demand]({{site.baseurl}}/zk_dev_ref/performance_tips/turn_on_render_on_demand)"
request. The rendering request is handled implicitly by a component
itself. Under this situation, if a component needs to **render some data
from a detached object's lazy-loaded collection**, developers won't have
a chance to reload detached objects during rendering to avoid
`LazyInitailizationException`. Let's use an example to explain this
situation.

Assume we have a *Listbox*, it only displays 10 rows by default and it'a
not in "page" mold. One of its columns display a lazy-loaded
collection's size (`each.items.size()` )of an `Order` object.

**Listbox that accesses lazy-loaded property**

```xml

    <window title="" border="normal" width="600px" apply="org.zkoss.bind.BindComposer"
        viewModel="@id('vm') @init('org.zkoss.reference.developer.jpa.vm.RodViewModel')">
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
custom [org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)** for the component.

We demonstrate 2 implementations here for your reference. The first one
is simpler but less efficient; it re-queries each detached object when a
component requests it.

**Reloaded ListModel**

```java
public class OrderListModel extends AbstractListModel<Order>{

    private SpringOrderDao orderDao;
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

- Line 1: We extend [org.zkoss.zul.AbstractListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html)
  to build our list model for it to handle selection for us, but we have
  to override Order's `equals()` and `hashCode()`.
- Line 14: Re-query the detached object by its id and return a
  persistent one.

The second one is more complicated but more efficient; it re-queries a
one page size data each time and stores as a cache in an execution. If
the cache has the object that the component requests, it returns the one
in cache without re-querying it again.

**Lived ListModel**

```java
public class LiveOrderListModel extends AbstractListModel<Order>{

    private SpringOrderDao orderDao;
    private Integer totalSize;  
    private int pageSize = 30;
    private static final String CACHE_KEY= LiveOrderListModel.class+"_cache";
    
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
            throw new RuntimeException("Element at index "+index+" cannot be found in the database.");
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
            totalSize = orderDao.queryAllSize().intValue();
        }
        return totalSize; 
    }
}
```

- Line 16: If the cache doesn't contain target `Order`, we query one
  page size of `Order` starting from the index because passed `index`
  doesn't always increase sequentially.
- Line 42: The `getElementAt(int)` will be invoked multiple times during
  an execution. In order to avoid using a cache of detached objects, we
  make the cache as an attribute of an execution which is dropped after
  being handled.

# Get Example Source Code

All source code used in this chapter can be found
[here](https://github.com/zkoss/zkbooks/tree/master/developersreference/integration.jpa).

# Reference

<references/>

[^1]: [Unit of Work in Hibernate EntityManager User Guide](http://docs.jboss.org/hibernate/entitymanager/3.6/reference/en/html_single/#transactions-basics-uow)

[^2]: The reason is explained in a [Hibernate article "Open Session in View"](https://community.jboss.org/wiki/OpenSessionInView#Why_cant_Hibernate_just_load_objects_on_demand)
