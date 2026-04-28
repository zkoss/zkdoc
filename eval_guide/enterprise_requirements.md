---
title: "Key Factor: Enterprise Requirements"
permalink: /eval-guide/enterprise-requirements/
---

# Part 1-6: Key Factor: Enterprise Requirements

For many teams, enterprise requirements are an afterthought — something to address after the framework is chosen and the application is mostly built. This is a costly mistake. Some requirements effectively rule out certain frameworks entirely, and discovering that late in the project means either significant rework or a compliance gap that puts the business at risk.

If your application operates in a regulated industry, serves a public audience, or will be deployed inside a large organization with security and procurement processes, read this chapter before evaluating any framework on features or developer experience.

## Accessibility compliance (WCAG)

The Web Content Accessibility Guidelines (WCAG) define standards for making web applications usable by people with disabilities — including those using screen readers, keyboard-only navigation, or other assistive technologies. In many industries and regions, compliance is not optional. Government, public-sector, healthcare, and increasingly financial applications are required by law or policy to meet WCAG 2.1 AA or higher. Even where it is not legally mandated, accessibility is increasingly treated as a baseline requirement by enterprise procurement teams.

The key question for any framework is not whether it claims WCAG support, but how deep that support goes. There is a meaningful difference between a framework where accessibility is built into the component library from the ground up, and one where it is left entirely to the developer.

ZK and Vaadin both offer built-in accessibility support in their component libraries. Vaadin in particular has invested significantly in WCAG compliance as a core product requirement, driven by its enterprise customer base. React and Angular do not provide accessible components out of the box — compliance depends on the component library chosen and developer discipline throughout the project. Some React libraries such as Radix UI have strong accessibility support; others do not. Thymeleaf + Spring MVC renders standard HTML which can be made accessible, but requires manual effort throughout. There is no component library enforcing accessibility patterns automatically.

If WCAG compliance is a hard requirement, treat it as a filter before evaluating other factors. The detailed findings from our testing are in Part 4.

## Security

All web applications need to be secure, but enterprise applications face a higher bar — and often a more formal evaluation process.

Security considerations at the framework level include:

- **Architectural security differences** — In server-centric architectures (ZK, Vaadin, Thymeleaf), business logic stays on the server. Less code is exposed in the browser, which reduces certain attack vectors. In client-centric architectures (React, Angular), the API layer must be carefully designed to ensure the server validates everything, since client-side logic can be inspected and manipulated.
- **Session management** — Enterprise applications often have strict requirements around session timeout, concurrent session handling, and audit logging. Server-centric frameworks, which maintain session state on the server, tend to integrate more naturally with these requirements.
- **Dependency exposure** — A React application typically depends on dozens of npm packages, each a potential vulnerability. Managing, auditing, and updating this dependency tree is a real operational burden. Java-based frameworks generally have a smaller and more stable dependency footprint.
- **Security process and CI/CD integration** — Beyond the framework's architecture, it is worth asking what security process the framework vendor follows in their own development pipeline. This matters because vulnerabilities in the framework itself — not just your application code — become your vulnerabilities.

ZK maintains a multi-layer security process throughout its CI/CD pipeline: Snyk scanning monitors source code and third-party dependencies, CodeQL performs comprehensive pull request scanning, and SonarQube analysis detects vulnerabilities, bugs, and code quality issues. This level of documented, systematic security process is relatively uncommon among open-source frameworks and is worth factoring into an enterprise evaluation.

It is worth noting that Snyk, SonarQube, and CodeQL are not exclusive to ZK — any team can integrate these tools into their own CI/CD pipeline regardless of which framework they use. The distinction is that ZK applies them to the framework's own codebase as part of their release process. For the application your team builds on top of any framework, implementing a similar scanning pipeline is good practice and is highly recommended regardless of your framework choice.

Vaadin, as a commercially maintained framework with an enterprise focus, maintains its own security practices, though the specifics of their internal pipeline tooling are less publicly documented than ZK's.

For React, Angular, Thymeleaf, and Apache Wicket — which are community or corporate open-source projects — security practices in the framework's own development process vary. React and Angular benefit from the security programs of Meta and Google respectively, which are significant. Community-maintained frameworks like Apache Wicket rely on community-reported CVEs and volunteer patch work, which is generally reliable for a mature project but lacks the formal structure of a commercial security process.

## Professional support

Open-source frameworks are often free to use, but free comes with a specific kind of risk: when something goes wrong, there is no one obligated to help you fix it.

For many internal tools and non-critical applications, community support — forums, GitHub issues, Stack Overflow — is entirely sufficient. For enterprise applications where downtime has a business cost, or where the framework is a critical dependency for the entire product, commercial support is worth evaluating seriously.

ZK and Vaadin both offer commercial licensing with professional support tiers — dedicated support channels, guaranteed response times, and long-term maintenance commitments. This matters to enterprise procurement teams and can be a deciding factor when a purchase needs to go through a vendor evaluation process.

React and Angular are backed by Meta and Google respectively, which provides a degree of confidence in their long-term maintenance — but neither offers commercial support in the traditional sense. Support comes from the community and from third-party consultancies.

Apache Wicket and Thymeleaf are Apache and open-source community projects. Both are mature and well-maintained, but there is no commercial support tier.

If your organization requires a support contract, a named vendor, or an SLA, your options narrow quickly. Factor this into the evaluation early, especially if procurement or legal teams will need to sign off on the technology choice.

## Library auditing and dependency management

In regulated industries — financial services, healthcare, defense — organizations are often required to maintain a full inventory of every third-party library used in a system. This is sometimes called a software bill of materials (SBOM). Every dependency must be traceable, auditable, and ideally approved against an internal allowlist.

This requirement interacts with framework choice in a significant way.

JavaScript-based frameworks encourage a rich ecosystem of dependencies. A moderately sized React application can easily have hundreds of transitive npm dependencies. Auditing all of them, tracking their licenses, and monitoring them for vulnerabilities is a meaningful ongoing operational task. Some organizations have tooling for this. Many do not, and discover the burden only when an audit is scheduled.

Java-based frameworks have a comparatively smaller and more stable dependency tree. Maven and Gradle dependency management is a well-established practice in enterprise Java organizations, and the tools for auditing Java dependencies (OWASP Dependency-Check, for example) are mature.

If your organization requires library auditing or operates under software supply chain compliance requirements, a Java-based framework will typically be easier to manage and easier to explain to an auditor.

## Liability, insurance, and vendor risk

This is rarely discussed in framework comparison articles but comes up regularly in enterprise procurement processes.

Some organizations require that critical technology dependencies be covered by a commercial vendor relationship — partly for practical support reasons, and partly for liability and insurance purposes. If the software fails and causes a business loss, the organization needs to be able to point to a vendor relationship, a contract, and an indemnification clause.

Open-source software used without a commercial agreement typically carries no such protection. If this matters to your organization's legal or risk team, you need a framework with a commercial offering.

Additionally, enterprise IT departments sometimes maintain approved vendor lists. A framework from a vendor that is not on that list may require a formal exceptions process to use. Knowing this early can save significant time in the approval process.
