---
title: "ZK JSP Function List"
---

This section outlines the functionality in ZK JSP.

# Functionalities List

This table shows the status of ZK JSP Tags implementation of ZK
specification. The meaning of the status symbol is as bellow:

- **O** means fully support.
- **X** means not support.
- **\*** means partial support or supported in different way.

| Topics                 | Items                                               |                 | ZK JSP |
|------------------------|-----------------------------------------------------|-----------------|--------|
| Implicit Objects       | applicationScope - java.util.Map                    |                 | O      |
|                        | arg - java.util.Map                                 |                 | O      |
|                        | componentScope - java.util.Map                      |                 | O      |
|                        | desktop - org.zkoss.zk.ui.Desktop                   |                 | O      |
|                        | desktopScope - java.util.Map                        |                 | O      |
|                        | each - java.lang.Object                             |                 | \*     |
|                        | event - org.zkoss.zk.ui.event.Event or derived      |                 | O      |
|                        | forEachStatus – org.zkoss.zk.ui.util.ForEachStatus  |                 | \*     |
|                        | page - org.zkoss.zk.ui.Page                         |                 | O      |
|                        | pageContext – org.zkoss.web.servlet.xel.PageContext |                 | O      |
|                        | pageScope - java.util.Map                           |                 | O      |
|                        | requestScope – java.util.Map                        |                 | O      |
|                        | self - org.zkoss.zk.ui.Component                    |                 | O      |
|                        | session - org.zkoss.zk.ui.Session                   |                 | O      |
|                        | sessionScope - java.util.Map                        |                 | O      |
|                        | spaceOwner - org.zkoss.zk.ui.IdSpace                |                 | O      |
|                        | spaceScope - java.util.Map                          |                 | O      |
| Processing Instruction | The component Directive                             |                 | O      |
|                        | attributes                                          | class           | O      |
|                        |                                                     | extend          | O      |
|                        |                                                     | macroURI        | O      |
|                        |                                                     | name            | O      |
|                        |                                                     | moldURI         | O      |
|                        |                                                     | moldname        | O      |
|                        | The evaluator Directive                             |                 | X      |
|                        | attributes                                          | class           | X      |
|                        |                                                     | import          | X      |
|                        | The forward Directive                               |                 | \*     |
|                        | attributes                                          | uri             | \*     |
|                        | The import Directive                                |                 | \*     |
|                        | attributes                                          | uri             | \*     |
|                        |                                                     | directives      | \*     |
|                        | The init Directive                                  |                 | O      |
|                        | attributes                                          | class           | \*     |
|                        |                                                     | zscript         | O      |
|                        |                                                     | arg0,arg1...    | O      |
|                        | The link and meta Directive                         |                 | \*     |
|                        | attributes                                          | href            | \*     |
|                        |                                                     | name0,name1...  | O      |
|                        | The page Directive                                  |                 | \*     |
|                        | attributes                                          | cacheable       | \*     |
|                        |                                                     | complete        | \*     |
|                        |                                                     | contentType     | \*     |
|                        |                                                     | docType         | \*     |
|                        |                                                     | id              | O      |
|                        |                                                     | language        | O      |
|                        |                                                     | style           | O      |
|                        |                                                     | title           | O      |
|                        |                                                     | xml             | \*     |
|                        |                                                     | zscriptLanguage | O      |
|                        | The root-attributes Directive                       |                 | \*     |
|                        | attributes                                          | any-name        | \*     |
|                        | The taglib Directive                                |                 | \*     |
|                        | attributes                                          | uri             | \*     |
|                        |                                                     | prefix          | \*     |
|                        | The variable-resolver Directive                     |                 | O      |
|                        | attributes                                          | class           | \*     |
|                        |                                                     | arg0,arg1...    | O      |
|                        | The xel-method Directive                            |                 | X      |
| ZK Elements            | The XML Namespace                                   |                 | \*     |
|                        | The attribute Element                               |                 | O      |
|                        | attributes                                          | name            | O      |
|                        |                                                     | trim            | O      |
|                        | The custom-attribute Element                        |                 | O      |
|                        | attributes                                          | scope           | O      |
|                        | The variables Element                               |                 | O      |
|                        | attributes                                          | local           | X      |
|                        | The zk Element                                      |                 | X      |
|                        | The zscript Element                                 |                 | O      |
|                        | attributes                                          | language        | O      |
|                        |                                                     | deferred        | O      |
|                        |                                                     | src             | O      |
| ZK Attributes          | The apply Attribute                                 |                 | O      |
|                        | The forEach Attribute                               |                 | \*     |
|                        | The forEachBegin Attribute                          |                 | \*     |
|                        | The forEachEnd Attribute                            |                 | \*     |
|                        | The forward Attribute                               |                 | O      |
|                        | The fulfill Attribute                               |                 | X      |
|                        | The if Attribute                                    |                 | O      |
|                        | The unless Attribute                                |                 | O      |
|                        | The use Attribute                                   |                 | O      |
| ZK Components          | The XUL Components                                  |                 | O      |
|                        | The XHTML Components                                |                 | \*     |
|                        |                                                     |                 |        |

