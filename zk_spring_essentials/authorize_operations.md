# Authorize Operations

> The example code is available on GitHub: [zkspringessentials/zkspringcoresec](https://github.com/zkoss/zkspring/tree/master/zkspringessentials/zkspringcoresec)

## The Core Problem

ZK's `/zkau` endpoint is a single HTTP entry point — URL-based Spring Security rules (e.g. `requestMatchers("/zkau").hasRole(...)`) can only gate the entire endpoint, not individual event handlers or commands. Every `onClick`, `@Listen`, or `@Command` handler is independently reachable from the browser and must be individually authorized.

## Recommended Architecture: Two-Layer Defense

```
Browser → /zkau → [1] Controller/ViewModel layer (fast fail, visible to developers)
                    ↓
               [2] Service layer (@PreAuthorize — the real security gate)
```

**Layer 1** (controller/ViewModel) is a developer-facing guard that provides clear error semantics at the boundary closest to the UI. **Layer 2** is mandatory defense-in-depth — it works even if layer 1 is forgotten, miscoded, or bypassed by future refactors.

## The CGLIB Proxy Problem

When any Spring-managed bean has a method annotated with `@PreAuthorize` (or any Spring AOP advice), Spring Security wraps it in a **CGLIB proxy**. This breaks ZK's annotation scanning for parameter-level annotations.

### What CGLIB Does to Overridden Methods

```
BigbankViewModel$$SpringCGLIB$$0  extends  BigbankViewModel
  └── adjustBalance(Long, Double)   ← overridden for AOP interception
        method-level annotations:   [@Command]           ← Spring CGLIB *copies* these ✓
        parameter annotations:      [nothing, nothing]   ← CGLIB does NOT copy these ✗
```

Spring 5+ CGLIB copies method-level annotations to the proxy's generated overrides. But it **does not copy parameter annotations** — parameter annotations live in a separate JVM attribute (`RuntimeVisibleParameterAnnotations`) that CGLIB's ASM-generated code does not reproduce.

### Net Result for ZK

| ZK annotation | Through CGLIB proxy? |
|---|---|
| `@Command` (method-level) | **Yes** — command IS invoked |
| `@BindingParam` (parameter-level) | **No** — parameters arrive as `null` |
| `@Listen` (method-level) | **Yes** — works fine for MVC Composers |

**Conclusion:** Putting Spring AOP advice on a ViewModel method makes `@BindingParam` parameters `null`. The command fires but receives no data. MVC Composers are not affected since `@Listen` handlers use event objects (no parameter annotations).

## Solution 1: AspectJ Compile-Time Weaving (CTW)

AspectJ CTW injects advice directly into bytecode at build time. No proxy class is generated; ZK sees the original class with all annotations intact.

The `spring-security-aspects` library provides `PreAuthorizeAspect` — a standard AspectJ aspect that intercepts `@PreAuthorize` at compile time. This replaces any need for custom aspect classes.

### Dependencies

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.22</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
    <version>1.9.22</version>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-aspects</artifactId>
    <version>${springsecurity.version}</version>
</dependency>
```

### AspectJ Maven Plugin

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>aspectj-maven-plugin</artifactId>
    <version>1.15.0</version>
    <dependencies>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjtools</artifactId>
            <version>1.9.22</version>
        </dependency>
    </dependencies>
    <configuration>
        <complianceLevel>17</complianceLevel>
        <source>17</source>
        <target>17</target>
        <showWeaveInfo>true</showWeaveInfo>
        <encoding>UTF-8</encoding>
        <Xlint>ignore</Xlint>
        <aspectLibraries>
            <aspectLibrary>
                <groupId>org.springframework.security</groupId>
                <artifactId>spring-security-aspects</artifactId>
            </aspectLibrary>
        </aspectLibraries>
    </configuration>
    <executions>
        <execution>
            <goals><goal>compile</goal></goals>
        </execution>
    </executions>
</plugin>
```

### Security Configuration

```java
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true, mode = AdviceMode.ASPECTJ)
```

**Critical:** `mode = AdviceMode.ASPECTJ` tells Spring Security NOT to create CGLIB proxies for method security. Without this, both CTW and Spring AOP would intercept `@PreAuthorize` — the CGLIB proxy would still strip `@BindingParam` annotations.

### MVVM Example

```java
@Component
@Scope("prototype")
public class BigbankViewModel2 {

    @Autowired private BankService bankService;
    private ListModelList<Account> accounts;

    @PostConstruct
    public void init() {
        accounts = new ListModelList<>(bankService.findAccounts());
    }

    @Command
    @PreAuthorize("hasAnyRole('SUPERVISOR', 'TELLER')")
    public void adjustBalance(@BindingParam("accountId") Long id,
                              @BindingParam("amount") Double amount) {
        final Account account = bankService.readAccount(id);
        account.setBalance(bankService.post(account, amount).getBalance());
        BindUtils.postNotifyChange(null, null, account, "balance");
    }

    public ListModelList<Account> getAccounts() { return accounts; }
}
```

With AspectJ CTW, `@PreAuthorize` is woven directly into the method — no proxy, so `@BindingParam` works normally.

### MVC Example

```java
@Component
@Scope("prototype")
public class BigbankComposer extends SelectorComposer<Window> {

    @Autowired private BankService bankService;
    @Wire private Grid accountGrid;
    private ListModelList<Account> accounts;

    @Override
    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        accounts = new ListModelList<>(bankService.findAccounts());
        accountGrid.setModel(accounts);
    }

    @Listen("onClick = #accountGrid row button")
    @PreAuthorize("hasAnyRole('SUPERVISOR', 'TELLER')")
    public void onAdjustBalance(MouseEvent event) {
        Button btn = (Button) event.getTarget();
        long accountId = ((Number) btn.getAttribute("accountId")).longValue();
        double amount = Double.parseDouble(btn.getAttribute("amount").toString());

        Account account = bankService.readAccount(accountId);
        account.setBalance(bankService.post(account, amount).getBalance());

        // Update the balance label directly instead of replacing the model item,
        // because accounts.set() re-renders the row, creating new buttons without @Listen bindings.
        Row row = (Row) btn.getParent();
        ((Label) row.getChildren().get(2)).setValue(String.valueOf(account.getBalance()));
    }
}
```

> **MVC note:** `@Listen` in `SelectorComposer` binds to components at `doAfterCompose` time. If you replace a model item via `ListModelList.set()`, the row re-renders and creates new buttons without the listener binding. Update the UI directly instead.

## Solution 2: Delegate to a Security Service

If you don't want the AspectJ Maven plugin, delegate to a separate `@Service` that carries `@PreAuthorize`. Spring proxies the service safely — no ZK annotations are involved on the proxied class.

```java
@Service
public class BigbankSecurityService {
    @PreAuthorize("hasRole('ROLE_SUPERVISOR') or hasRole('ROLE_TELLER')")
    public void assertCanAdjustBalance() { }
}
```

```java
@Component
@Scope("prototype")
public class BigbankViewModel {
    @Autowired private BankService bankService;
    @Autowired private BigbankSecurityService securityService;

    @Command
    public void adjustBalance(@BindingParam("accountId") Long id,
                              @BindingParam("amount") Double amount) {
        securityService.assertCanAdjustBalance();   // throws AccessDeniedException if denied
        // ... business logic
    }
}
```

The ViewModel itself is never proxied, so `@BindingParam` remains intact. The security service acts as a thin assertion layer — call it as the first line of each handler.

## Comparison

| Approach | `@BindingParam` safe | Build plugin required | Boilerplate |
|---|---|---|---|
| `@PreAuthorize` + AspectJ CTW | Yes | Yes (`aspectj-maven-plugin`) | None — annotation only |
| Delegate to security service | Yes | No | One line per handler |

**Recommendation:** Use AspectJ CTW with `spring-security-aspects` for projects that already use the AspectJ Maven plugin. Use the delegate approach for simpler projects that want to avoid the build plugin dependency.
