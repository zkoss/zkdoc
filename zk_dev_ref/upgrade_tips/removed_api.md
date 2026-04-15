---
title: "Removed API"
---

# Removed API

Here are APIs removed since ZK 10.

| Full Qualified Class Name | Attribute or Method | Info |
|----|----|----|
| org.zkoss.lang.Objects | PATH_SEPARATOR_CHAR | @deprecated As of release 6.0.0, never used and confusing. |
| org.zkoss.lang.Objects | PATH_SEPARATOR_STRING | @deprecated As of release 6.0.0, never used and confusing. |
| org.zkoss.lang.Objects | BAR0_STRING | @deprecated As of release 6.0.0, not worth to have this API. |
| org.zkoss.lang.Objects | BAR1_STRING | @deprecated As of release 6.0.0, not worth to have this API. |
| org.zkoss.lang.Objects | BAR2_STRING | @deprecated As of release 6.0.0, not worth to have this API. |
| org.zkoss.math.BigDecimals | toPlainString(BigDecimal bd) | @deprecated As of release 6.0.0, use BigDecimal.toPlainString() directly (since we don't support JDK 1.4 anymore). |
| org.zkoss.util.ArraysX | clone(Object ary) | @deprecated As of release 6.0.0, replaced with {@link \#duplicate(Object)}. |
| org.zkoss.util.Maps | parse(Map map, String src, char separator, char quotechar) | "@deprecated As of release 6.0.0, replaced with {@link \#parse(Map, String, char, char, boolean, boolean)} and {@link \#parseMultiple}" |
| org.zkoss.util.logging.Log | \* | @deprecated As of release 7.0.0, use SLF4J API for logging instead. |
| org.zkoss.xml.HTMLs | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.html.HTMLs}. |
| org.zkoss.zel.MethodExpression | isParametersProvided() | @deprecated Use {@link \#isParametersProvided()}. |
| org.zkoss.zel.impl.parser.SimpleCharStream | getColumn() | "@deprecated @see \#getEndColumn" |
| org.zkoss.zel.impl.parser.SimpleCharStream | getLine() | "@deprecated @see \#getEndLine" |
| org.zkoss.zhtml.Area | getHreflang() | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Area | setHreflang(String hreflang) | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Area | getType() | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Area | setType(String type) | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Area | setTabindex(Integer tabindex) | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Html | getManifest() | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Html | setManifest(String manifest) | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Img | getLongdesc() | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Img | setLongdesc(String longdesc) | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Style | getType() | @deprecated Not supported in HTML5. |
| org.zkoss.zhtml.Style | setType(String type) | @deprecated Not supported in HTML5. |
| org.zkoss.zk.au.out.AuRemove | AuRemove(Component comp) | @deprecated As of release 6.0.0, replaced with {@link \#AuRemove(String)}. |
| org.zkoss.zk.fn.ZkFns | isEditionValid() | @deprecated since 9.6.0 |
| org.zkoss.zk.fn.ZkFns | encodeWithZK(String name) | @deprecated since 9.6.0 |
| org.zkoss.zk.scripting.HierarchicalAware | \* | @deprecated Since 9.5.0. Use {@link HierarchicalAware} instead. |
| org.zkoss.zk.ui.AbstractComponent | setWidgetAttribute(String name, String value) | use setClientAttribute(String name, String value) |
| org.zkoss.zk.ui.AbstractComponent | getWidgetAttribute(String name) | use getClientAttribute(String name) |
| org.zkoss.zk.ui.AbstractComponent | invalidatePartial() | use invalidate() |
| org.zkoss.zk.ui.AbstractComponent | addEventListener(String evtnm, EventListener listener) |  |
| org.zkoss.zk.ui.AbstractComponent | getListenerIterator(String evtnm) | @deprecated As of release 6.0, replaced with {@link \#getEventListeners}. |
| org.zkoss.zk.ui.AbstractComponent | getAnnotation(String annotName) | @deprecated As of release 6.0.0, replaced with {@link \#getAnnotation(String, String)}. |
| org.zkoss.zk.ui.AbstractComponent | getAnnotations() | @deprecated As of release 6.0.0, replaced with {@link \#getAnnotations(String)}. |
| org.zkoss.zk.ui.AbstractComponent | addAnnotation(String annotName, Map\<String, String\> annotAttrs) | @deprecated As of release 6.0.0, replaced with {@link \#addAnnotation(String, String, Map)} |
| org.zkoss.zk.ui.Component | getListenerIterator(String evtnm) | @deprecated As of release 6.0.0, replaced with {@link \#getEventListeners}. |
| org.zkoss.zk.ui.Component | setWidgetAttribute(String name, String value) | @deprecated As of release of ZK 8.0.0, please use {@link \#setClientAttribute(String, String)} instead. |
| org.zkoss.zk.ui.Component | getWidgetAttribute(String name) | @deprecated As of release of ZK 8.0.0, please use {@link \#getClientAttribute(String)} instead. |
| org.zkoss.zk.ui.Components | wireFellows(IdSpace idspace, Object controller) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | wireVariables(Component comp, Object controller) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | wireVariables(Component comp, Object controller) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | wireVariables(Component comp, Object controller) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | wireVariables(Page page, Object controller) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | wireVariables(Page page, Object controller, char separator) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | wireVariables(Page page, Object controller, char separator, boolean ignoreZScript, boolean ignoreXel) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | wireImplicit(Component comp, Object controller) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | addForwards(Component comp, Object controller) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | addForwards(Component comp, Object controller, char separator) | @deprecated As of release 6.0.0, replaced with {@link ConventionWires}. |
| org.zkoss.zk.ui.Components | isBrowser() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isBrowser(String type) | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isExplorer() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isExplorer7() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isGecko() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isGecko3() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isHilDevice() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isSafari() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isRobot() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Components | isForwarded() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isBrowser() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isBrowser(String type) | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isRobot() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isExplorer() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isExplorer7() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isGecko() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isGecko3() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isSafari() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isOpera() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Execution | isHilDevice() | @deprecated As of release 6.0.0, replaced with {@link getBrowser(String)}. |
| org.zkoss.zk.ui.Page | getListenerIterator(String evtname) | @deprecated As of release 6.0.0, replaced with {@link getEventListeners}. |
| org.zkoss.zk.ui.Session | getRemoteAddr() | @deprecated As of release 7.0.0, use {@link Execution#getRemoteHost()} instead. |
| org.zkoss.zk.ui.Session | getRemoteHost() | @deprecated As of release 7.0.0, use {@link Execution#getRemoteHost()} instead. |
| org.zkoss.zk.ui.Session | getServerName() | @deprecated As of release 7.0.0, use {@link Execution#getRemoteHost()} instead. |
| org.zkoss.zk.ui.Session | getLocalName() | @deprecated As of release 7.0.0, use {@link Execution#getRemoteHost()} instead. |
| org.zkoss.zk.ui.Page | getLocalAddr() | @deprecated As of release 7.0.0, use {@link Execution#getRemoteHost()} instead. |
| org.zkoss.zk.ui.WebApp | getNativeContext() | @deprecated As of release 6.0.0, replaced with {@link getServletContext}. |
| org.zkoss.zk.ui.event.ClientInfoEvent | getTimeZone() | "@deprecated getZoneId() is preferred since 9.0.0. getTimeZone returns a TimeZone object, which is no longer the preferred option to identify time zones. Instead, use \#getZoneId(), which returns a ZoneId object, which better supports the current Instant and a LocalDateTime java APIs" |
| org.zkoss.zk.ui.event.Express | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.zk.ui.Component#addEventListener(int, String, EventListener)}. |
| org.zkoss.zk.ui.event.InputEvent | getInpuEvent(AuRequest request) | @deprecated As of release 5.0.4, replaced with {@link \#getInpuEvent(AuRequest, Object)}. |
| org.zkoss.zk.ui.ext.render.Merger | \* | @deprecated As of release 6.5.1, please use stubonly instead. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isBrowser() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isBrowser(String type) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isRobot() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isExplorer() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isExplorer7() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isGecko() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isGecko3() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isSafari() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isOpera() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.sys.ExecutionImpl | isHilDevice() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.http.LogConfigurer | \* | @deprecated As of release 7.0.0, use SLF4J API for logging instead. |
| org.zkoss.zk.ui.http.SimpleSession | getRemoteAddr() | @deprecated As of release 6.0.0, replaced with {@link \#getServletContext}. |
| org.zkoss.zk.ui.http.SimpleSession | getRemoteHost() | @deprecated As of release 6.0.0, replaced with {@link \#getServletContext}. |
| org.zkoss.zk.ui.http.SimpleSession | getServerName() | @deprecated As of release 6.0.0, replaced with {@link \#getServletContext}. |
| org.zkoss.zk.ui.http.SimpleSession | getLocalName() | @deprecated As of release 6.0.0, replaced with {@link \#getServletContext}. |
| org.zkoss.zk.ui.http.SimpleSession | getLocalAddr() | @deprecated As of release 6.0.0, replaced with {@link \#getServletContext}. |
| org.zkoss.zk.ui.http.SimpleWebApp | getNativeContext() | @deprecated As of release 6.0.0, replaced with {@link \#getServletContext}. |
| org.zkoss.zk.ui.impl.PageImpl | getListenerIterator(String evtname) | @deprecated As of release 6.0, replaced with {@link \#getEventListeners}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isBrowser() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isBrowser(String type) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isRobot() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isExplorer() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isExplorer7() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isGecko() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isGecko3() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isSafari() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isOpera() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.PhantomExecution | isHilDevice() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.zk.ui.impl.SimpleDesktopCache | getNextKey() |  |
| org.zkoss.zk.ui.metainfo.impl.AnnotationHelper | add(String annoName, Map\<String, String\[\]\> annoAttrs) | @deprecated As of release 6.0.1, replaced with {@link \#add(String, Map, Location)}. |
| org.zkoss.zk.ui.metainfo.impl.AnnotationHelper | applyAnnotations(ComponentInfo compInfo, String compName, boolean recurse) | @deprecated As of release 6.0.1, replaced with {@link \#applyAnnotations(ComponentInfo, String, boolean)}. |
| org.zkoss.zk.ui.sys.ComponentCtrl | getAnnotation(String annotName) | @deprecated As of release 6.0.0, replaced with {@link \#getAnnotation(String, String)}. |
| org.zkoss.zk.ui.sys.ComponentCtrl | getAnnotations() | @deprecated As of release 6.0.0, replaced with {@link \#getAnnotations(String)}. |
| org.zkoss.zk.ui.sys.ComponentCtrl | addAnnotation(String annotName, Map\<String, String\> annotAttrs) | @deprecated As of release 6.0.0, replaced with {@link \#addAnnotation(String, String, Map)}. |
| org.zkoss.zk.ui.sys.ComponentCtrl | addRedrawCallback(Callback<ContentRenderer> callback) | @deprecated As of release 8.0.2, use {@link \#addCallback} with specific name "redraw" |
| org.zkoss.zk.ui.sys.ComponentCtrl | removeRedrawCallback(Callback<ContentRenderer> callback) | @deprecated As of release 8.0.2, use {@link \#removeCallback} with specific name "redraw" |
| org.zkoss.zk.ui.sys.ComponentCtrl | getRedrawCallback() | @deprecated As of release 8.0.2, use {@link \#getCallback} with specific name "redraw" |
| org.zkoss.zk.ui.sys.ComponentCtrl | invalidatePartial(String subId) | @deprecated since 9.0.1. Use {@link \#invalidatePartial()} instead. |
| org.zkoss.zk.ui.sys.ComponentCtrl | invalidatePartial() | @deprecated since 9.5.1 it acts just the same as {@link Component#invalidate} |
| org.zkoss.zk.ui.sys.ContentRenderer | renderWidgetAttributes(Map\<String, String\> attrs) | @deprecated As released of ZK 8.0.0, please use {@link \#renderClientAttributes(Map)} instead. |
| org.zkoss.zk.ui.sys.DesktopCache | getNextKey() | @deprecated since 9.6.0 due to the predictable result. |
| org.zkoss.zk.ui.sys.JavaScriptValue | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.json.JavaScriptValue} |
| org.zkoss.zk.ui.sys.Configuration | setClickFilterDelay(int minisecs) | @deprecated As of release 6.0.0, please use {@link org.zkoss.zul.Button#setAutodisable} instead. |
| org.zkoss.zk.ui.sys.Configuration | getClickFilterDelay() | @deprecated As of release 5.0.0, please use {@link org.zkoss.zul.Button#setAutodisable} instead. |
| org.zkoss.zk.ui.sys.Configuration | setResendDelay(int minisecs) | @deprecated As of release 6.0.0, it is removed without replacement, since it is rarely applicable and over complicated. |
| org.zkoss.zk.ui.sys.Configuration | getResendDelay() | @deprecated As of release 6.0.0, it is removed without replacement, since it is rarely applicable and over complicated. |
| org.zkoss.zk.ui.sys.Configuration | isRepeatUuid() | @deprecated since 9.6.0 |
| org.zkoss.zk.ui.sys.Configuration | setRepeatUuid(boolean repeat) | @deprecated since 9.6.0 |
| org.zkoss.zk.ui.sys.DeferredValue | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.zk.au.DeferredValue}. |
| org.zkoss.zk.ui.sys.ForEachImpl | getEach() | @deprecated As of release 6.0.0, replaced with {@link \#getCurrent()}. |
| org.zkoss.zk.ui.sys.ForEachStatus | getEach() | @deprecated As of release 8.0.0, use {@link \#getCurrent()} instead. |
| org.zkoss.bind.Binder | init(Component root, Object viewModel) | @deprecated use {@link \#init(Component, Object, Map)} instead |
| org.zkoss.bind.Binder | addChildrenInitBinding(Component comp, String initExpr, Map\<String, Object\> initArgs) | @deprecated use {@link Binder#addChildrenInitBinding(Component, String, String, Map, String, Map)} instead. |
| org.zkoss.bind.Binder | addChildrenLoadBindings(Component comp, String loadExpr, String beforeCmds, String\[\] afterCmds, Map\<String, String\> bindingArgs) | @deprecated use {@link \#addChildrenLoadBindings(Component, String, String\[\], Map, String, Map)} instead. |
| org.zkoss.bind.AnnotationUtil | getOverrideAnnotation(ComponentCtrl compCtrl, String propName) | @deprecated since 6.5.4 |
| org.zkoss.bind.BinderImpl | init(Component comp, Object viewModel) | @deprecated use {@link \#init(Component, Object, Map)} instead |
| org.zkoss.bind.BinderImpl | addChildrenInitBinding(Component comp, String initExpr, Map\<String, Object\> initArgs) |  |
| org.zkoss.bind.BinderImpl | addChildrenInitBinding(Component comp, String initExpr, Map\<String, Object\> initArgs, String converterExpr, Map\<String, Object\> converterArgs) |  |
| org.zkoss.bind.impl.ParamCall | resolveParameter(T anno, Class\<?\> returnType) | "@deprecated since 9.5.0 @see \#resolveParameter(Object, Class, Supplier)" |
| org.zkoss.bind.impl.TemplateResolverImpl | addTemplateTracking(final Component eachComp) |  |
| org.zkoss.bind.sys.BinderCtrl | getPhaseListener() | @deprecated As of release ZK 8.0.0, please use {@link \#getPhaseListeners()} instead. |
| org.zkoss.bind.sys.BinderCtrl | setPhaseListener(PhaseListener listener) | @deprecated As of release ZK 8.0.0, please use {@link BinderCtrl#addPhaseListener(PhaseListener)} instead. |
| org.zkoss.bind.sys.TemplateResolver | resolveTemplate(Component eachComp, Object data, int index, int size, String templ) | "@deprecated since 7.0.0 use {@link \#resolveTemplate(Component, Object, int, int, String)}" |
| org.zkoss.bind.sys.TemplateResolver | addTemplateTracking(Component eachComp) | @deprecated since 6.5.3. |
| org.zkoss.web.fn.ServletFns | isBrowser() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isBrowser(String type) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isRobot() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isExplorer() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isExplorer7() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isGecko() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isGecko3() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isSafari() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isOpera() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.fn.ServletFns | isHilDevice() | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser(String)}. |
| org.zkoss.web.init.LabelLocatorHook | \* | @deprecated As of release 6.0.0, we don't support the loading of zk-label.properties without installing ZK. |
| org.zkoss.web.servlet.JavaScript | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.html.JavaScript}. |
| org.zkoss.web.servlet.Servlets | isRobot(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isRobot(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isExplorer(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isExplorer(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isExplorer7(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isExplorer7(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isGecko(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isGecko(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isGecko3(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isGecko3(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isSafari(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isSafari(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isOpera(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isOpera(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isHiDevice(ServletRequest req) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | isHiDevice(String userAgent) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.Servlets | getIECompatibilityInfo(ServletRequest request) | @deprecated As of release 6.0.0, replaced with {@link \#getBrowser}. |
| org.zkoss.web.servlet.StyleSheet | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.html.StyleSheet}. |
| org.zkoss.web.servlet.http.HttpBufferedResponse | encodeRedirectUrl(String url) | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.html.StyleSheet}. |
| org.zkoss.web.servlet.http.HttpBufferedResponse | encodeUrl(String url) | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.html.StyleSheet}. |
| org.zkoss.zul.AbstractChartModel | fireEvent(int type, Comparable\<?\> series, Object data) | @deprecated As released of 7.0.1, use {@link AbstractChartModel#fireEvent(int, Comparable, Comparable, int, int, Object)} instead. |
| org.zkoss.zul.AbstractSimpleDateTimeConstraint | AbstractSimpleDateTimeConstraint(String regex, String errmsg) | @deprecated As of release 8.0.1, replaced with {@link AbstractSimpleDateTimeConstraint(int, Pattern, String)}. |
| org.zkoss.zul.AbstractSimpleDateTimeConstraint | AbstractSimpleDateTimeConstraint(int flags, String regex, String errmsg) | @deprecated As of release 8.0.1, replaced with {@link AbstractSimpleDateTimeConstraint(int, Pattern, String)}. |
| org.zkoss.zul.AbstractTreeModel | fireEvent(E node, int indexFrom, int indexTo, int type) | @deprecated As of release 6.0.0, replaced with {@link fireEvent(int, int, int, int)}. |
| org.zkoss.zul.ArrayGroupsModel | \* | @deprecated As of release 5.0.5, replaced with {@link GroupsModelArray}, which is the same but make the naming more consistent with Java naming convention. |
| org.zkoss.zul.Audio | isAutostart() | @deprecated As of release 7.0.0, use {@link isAutoplay} instead. |
| org.zkoss.zul.Audio | setAutostart(boolean autostart) | @deprecated As of release 7.0.0, use {@link setAutoplay(boolean)} instead. |
| org.zkoss.zul.Box | getWidths() | @deprecated As of release 7.0.0, use {@link setWidth(String)} instead. |
| org.zkoss.zul.Box | getHeights() | @deprecated As of release 5.0.0, use {@link Cell} instead. |
| org.zkoss.zul.Box | setWidths(String widths) | @deprecated As of release 5.0.0, use CSS instead. |
| org.zkoss.zul.Box | setHeights(String heights) | @deprecated As of release 5.0.0, use CSS instead. |
| org.zkoss.zul.Calendar | getTimeZone() | @deprecated As of release 5.0.5, it is meaningless to set time zone for a calendar. |
| org.zkoss.zul.Calendar | setTimezone(TimeZone zone) | @deprecated As of release 5.0.5, it is meaningless to set time zone for a calendar. |
| org.zkoss.zul.Captcha | setBorder(boolean b) | @deprecated As of release 5.0.4, use {@link \#setFrame(boolean)} instead. |
| org.zkoss.zul.Captcha | isBorder() | @deprecated As of release 5.0.4, use {@link \#isFrame()} instead. |
| org.zkoss.zul.Column | onSort() | @deprecated As of release 5.0.8, use or override {@link \#onSort(SortEvent)} instead. |
| org.zkoss.zul.Datebox | isCompact() | @deprecated As of release 5.0.0, it is no longer supported. |
| org.zkoss.zul.Datebox | setCompact(boolean compact) | @deprecated As of release 5.0.0, it is no longer supported. |
| org.zkoss.zul.DefaultTreeModel | addSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link addToSelection}. |
| org.zkoss.zul.DefaultTreeModel | removeSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link removeFromSelection}. |
| org.zkoss.zul.DefaultTreeModel | setOpen(TreeNode<E> child, boolean open) | @deprecated As of release 6.0.0, replaced with {@link setOpenObject} and {@link removeOpenObject}. |
| org.zkoss.zul.DefaultTreeModel | isOpen(Object child) | @deprecated As of release 6.0.0, replaced with {@link \#isObjectOpened}. |
| org.zkoss.zul.Div | getAlign() | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Div | setAlign(String align) | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Fileupload | getMaxsize() | @deprecated As of release 5.0.0, replaced with {@link \#setUpload(String)} |
| org.zkoss.zul.Fileupload | setMaxsize(int maxsize) | @deprecated As of release 5.0.0, replaced with {@link \#setUpload(String)} |
| org.zkoss.zul.Fileupload | getNumber() | @deprecated As of release 5.0.0, replaced with {@link \#setUpload(String)}. |
| org.zkoss.zul.Fileupload | setNumber(int maxnum) | @deprecated As of release 5.0.0, replaced with {@link \#setUpload(String)}. |
| org.zkoss.zul.Fileupload | isNative() | @deprecated As of release 5.0.0, replaced with {@link \#setUpload(String)}. |
| org.zkoss.zul.Fileupload | setNative(boolean alwaysNative) | @deprecated As of release 5.0.0, replaced with {@link \#setUpload(String)}. |
| org.zkoss.zul.Grid | setFixedLayout() | @deprecated since 5.0.0, use {@link \#setSizedByContent}(!fixedLayout) instead |
| org.zkoss.zul.Grid | isFixedLayout() | @deprecated since 5.0.0, use !{@link \#isSizedByContent} instead |
| org.zkoss.zul.Grid | getAlign() | @deprecated As of release 5.0.0, use CSS instead. |
| org.zkoss.zul.Grid | setAlign(String align) | @deprecated As of release 5.0.0, use CSS instead. |
| org.zkoss.zul.Grid | getPreloadSize() | @deprecated As of release 5.0.8, use custom attributes (org.zkoss.zul.listbox.preloadSize) instead. |
| org.zkoss.zul.Grid | setPreloadSize(int sz) | @deprecated As of release 5.0.8, use custom attributes instead. |
| org.zkoss.zul.Groupbox | isLegend() | @deprecated As of release 6.0.0, legend no longer used in groupbox. |
| org.zkoss.zul.Groupbox | setLegend() | @deprecated As of release 6.0.0, legend no longer used in groupbox. |
| org.zkoss.zul.GroupsModelArray | GroupsModelArray(List<D> data, Comparator cmpr, int col) | @deprecated As of release 6.0.1, there is no way to instantiate the array with the correct type. |
| org.zkoss.zul.GroupsModelArray | GroupsModelArray(List<D> data, Comparator cmpr) | @deprecated As of release 6.0.1, there is no way to instantiate the array with the correct type. |
| org.zkoss.zul.GroupsModelArray | isClose(int groupIndex) | @deprecated As of release 6.0.0, replace with {@link \#isGroupOpened(int)} |
| org.zkoss.zul.GroupsModelArray | setClose(int groupIndex, boolean close) | @deprecated As of release 6.0.0, replace with {@link \#addGroupOpenGroup(int)} and {@link \#removeOpenGroup(int)}. |
| org.zkoss.zul.GroupsModelExt | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.zul.ext.GroupsSortableModel}. |
| org.zkoss.zul.Iframe | getAlign() | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Iframe | setAlign(String align) | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Iframe | getScrolling() | @deprecated As of release 5.0.5, use CSS instead. |
| org.zkoss.zul.Iframe | setScrolling(String scrolling) | @deprecated As of release 5.0.5, use CSS instead. |
| org.zkoss.zul.Image | getAlign() | @deprecated As of release 5.0.5, use CSS instead. |
| org.zkoss.zul.Image | setAlign(String align) | @deprecated As of release 5.0.5, use CSS instead. |
| org.zkoss.zul.Image | getBorder() | @deprecated As of release 5.0.5, use CSS instead. |
| org.zkoss.zul.Image | setBorder(String border) | @deprecated As of release 5.0.5, use CSS instead. |
| org.zkoss.zul.Image | getHSpace() | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Image | setHspace(String hspace) | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Image | getVspace() | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Image | setVspace(String vspace) | @deprecated As of release 6.0.0, use CSS instead. |
| org.zkoss.zul.Label | isHyphen() | @deprecated As of release 5.0.0, use CSS instead. |
| org.zkoss.zul.Label | setHyphen(boolean hyphen) | @deprecated As of release 5.0.0, use CSS instead. |
| org.zkoss.zul.LayoutRegion | isFlex() | @deprecated As of release 6.0.2, use {@link \#getFlex} and {@link \#setFlex} on child component instead. |
| org.zkoss.zul.LayoutRegion | setFlex(boolean flex) | @deprecated As of release 6.0.2, use {@link \#setFlex(String)} on child component instead |
| org.zkoss.zul.ListModelArray | addSelection(E obj) | @deprecated As of release 6.0.0, replaced with {@link \#addToSelection}. |
| org.zkoss.zul.ListModelArray | removeSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link \#removeFromSelection}. |
| org.zkoss.zul.ListModelExt | \* | @deprecated As of release 6.0.0, replaced with {@link org.zkoss.zul.ext.Sortable}. |
| org.zkoss.zul.ListModelList | addSelection(E obj) | @deprecated As of release 6.0.0, replaced with {@link \#addToSelection}. |
| org.zkoss.zul.ListModelList | removeSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link \#removeFromSelection}. |
| org.zkoss.zul.ListModelMap | addSelection(E obj) | @deprecated As of release 6.0.0, replaced with {@link \#addToSelection}. |
| org.zkoss.zul.ListModelMap | removeSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link \#removeFromSelection}. |
| org.zkoss.zul.ListModelSet | addSelection(E obj) | @deprecated As of release 6.0.0, replaced with {@link \#addToSelection}. |
| org.zkoss.zul.ListModelSet | removeSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link \#removeFromSelection}. |
| org.zkoss.zul.Listbox | setFixedLayout(boolean fixedLayout) | @deprecated since 5.0.0, use {@link \#setSizedByContent}(fixedLayout) instead. |
| org.zkoss.zul.Listbox | isFixedLayout() | @deprecated As of release 5.0.0, use CSS instead. |
| org.zkoss.zul.Listbox | getPreloadSize() | @deprecated As of release 5.0.8, use custom attributes (org.zkoss.zul.listbox.preloadSize) instead. |
| org.zkoss.zul.Listbox | setPreloadSize(int sz) | @deprecated As of release 5.0.8, use custom attributes instead. |
| org.zkoss.zul.Listheader | onSort() | @deprecated As of release 6.5.0, use or override {@link \#onSort(SortEvent)} instead. |
| org.zkoss.zul. Listitem | isCheckable() | @deprecated As of release 8.0.0, please use {@link \#isSelectable()}. |
| org.zkoss.zul. Listitem | setCheckable(boolean checkable) | @deprecated As of release 8.0.0, please use {@link \#setSelectable(boolean)}. |
| org.zkoss.zul.Listitem | setStubonly(String stubonly) | @deprecated as of release 7.0.3. |
| org.zkoss.zul.Listitem | setStubonly(boolean stubonly) | @deprecated as of release 7.0.3. |
| org.zkoss.zul.Listitem | getSrc() | @deprecated As of release 3.5.0, it is redundant since it is the same {@link \#getImage}. |
| org.zkoss.zul.Listitem | setSrc() | @deprecated As of release 3.5.0. |
| org.zkoss.zul.PagingEventPublisher | \* | @deprecated As of release 8.5.2, please use {@link PageableModel} instead. |
| org.zkoss.zul.Panel | isFrameable() | @deprecated As of release 5.0.6, replaced with {@link \#getBorder}. |
| org.zkoss.zul.Panel | setFrameable(boolean frameable) | @deprecated As of release 5.0.6, replaced with {@link \#setBorder}. |
| org.zkoss.zul.Panel | getBorder() | @deprecated As of release 5.0.6, use CSS instead. |
| org.zkoss.zul.Row | getSpans() | @deprecated As of release 5.0.0, use {@link Cell} instead. |
| org.zkoss.zul.Row | setSpans(String spans) | @deprecated As of release 5.0.0, use {@link Cell} instead. |
| org.zkoss.zul.Script | getType() | @deprecated As of release 5.0.0, it is meaningless since text/javascript is always assumed. |
| org.zkoss.zul.Script | setType(String type) | @deprecated As of release 5.0.0, it is meaningless since text/javascript is always assumed. |
| org.zkoss.zul.SimpleConstraint | SimpleConstraint(String regex, String errmsg) | @deprecated As of release 8.0.1, replaced with {@link SimpleConstraint(int, Pattern, String)}. |
| org.zkoss.zul.SimpleConstraint | SimpleConstraint(int flags, String regex, String errmsg) | @deprecated As of release 8.0.1, replaced with {@link SimpleConstraint(int, Pattern, String)}. |
| org.zkoss.zul.SimpleDateConstraint | SimpleDateConstraint(String regex, String errmsg) | @deprecated As of release 8.0.1, replaced with {@link SimpleDateConstraint(Pattern, String)}. |
| org.zkoss.zul.SimpleDateConstraint | SimpleDateConstraint(int flags, String regex, String errmsg) | @deprecated As of release 8.0.1, replaced with {@link SimpleDateConstraint(int, Pattern, String)}. |
| org.zkoss.zul.SimpleGroupsModel | isClose(int groupIndex) | @deprecated As of release 6.0.0, replace with {@link isGroupOpened(int)} and {@link removeOpenGroup(int)}. |
| org.zkoss.zul.SimpleGroupsModel | setClose(int groupIndex, boolean close) | @deprecated As of release 6.0.0, replace with {@link addOpenGroup(int)} and {@link removeOpenGroup(int)}. |
| org.zkoss.zul.SimpleListModel | objectToString(Object value) | @deprecated As of release 6.0.0, replaced with {@link toString(Object)}. |
| org.zkoss.zul.SimpleListModel | addSelection(E obj) | @deprecated As of release 6.0.0, replaced with {@link addToSelection}. |
| org.zkoss.zul.SimpleListModel | removeSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link removeFromSelection}. |
| org.zkoss.zul.Style | setDynamic(boolean dynamic) | @deprecated As of release 5.0.0, it is decided automatically. |
| org.zkoss.zul.Style | isDynamic() | @deprecated As of release 5.0.0, it is decided automatically. |
| org.zkoss.zul.Tree | setFixedLayout(boolean fixedLayout) | @deprecated since 5.0.0, use {@link setSizedByContent}(fixedLayout) instead. |
| org.zkoss.zul.Tree | isFixedLayout() | @deprecated since 5.0.0, use {@link isSizedByContent} instead. |
| org.zkoss.zul.Tree | setTreeitemRenderer(TreeitemRenderer\<?\> renderer) | @deprecated As of release 5.0.6, replaced with {@link setItemRenderer}. |
| org.zkoss.zul.Tree | getTreeitemRenderer() | @deprecated As of release 5.0.6, replaced with {@link getItemRenderer}. |
| org.zkoss.zul.TreeModelExt | \* | @deprecated As of release 6.0.0, please use {@link org.zkoss.zul.ext.Sortable} |
| org.zkoss.zul.Treeitem | isCheckable() | @deprecated As of release 8.0.0, please use {@link isSelectable()}. |
| org.zkoss.zul.Treeitem | setCheckable() | @deprecated As of release 8.0.0, please use {@link setSelectable(boolean)}. |
| org.zkoss.zul.Window | setDefaultActionOnShow(String onshow) | @deprecated As of release 8.0.0, replaced with {@link org.zkoss.zk.ui.HtmlBasedComponent#setAction}. |
| org.zkoss.zul.Window | getDefaultActionOnShow() | @deprecated As of release 5.0.0, replaced with {@link org.zkoss.zk.ui.HtmlBasedComponent#setAction}. |
| org.zkoss.zul.impl.GroupsListModel | addSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link \#addToSelection}. |
| org.zkoss.zul.impl.GroupsListModel | removeSelection(Object obj) | @deprecated As of release 6.0.0, replaced with {@link \#removeFromSelection}. |
| org.zkoss.zul.impl.LabelImageElement | getSrc() | @deprecated As of release 3.5.0, it is redundant since it is the same {@link \#getImage}. |
| org.zkoss.zul.impl.LabelImageElement | setSrc(String src) | @deprecated As of release 3.5.0, it is redundant since it is the same {@link \#getImage}. |
| org.zkoss.zul.impl.MessageboxDlg | setIdentity(int button) | @deprecated As of release 6.0.0, buttons are created in Java. |
| org.zkoss.zul.theme.Themes | BREEZE_NAME | Should use StandardTheme.DEFAULT_NAME @deprecated since 6.5.2. |
| org.zkoss.zul.theme.Themes | BREEZE_DISPLAY | Should use StandardTheme.DEFAULT_DISPLAY @deprecated since 6.5.2. |
| org.zkoss.zul.theme.Themes | BREEZE_PRIORITY | Should use StandardTheme.DEFAULT_PRIORITY @deprecated since 6.5.2. |
