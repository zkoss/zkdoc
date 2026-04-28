---
title: "Reassessing Your Use of ZK"
permalink: /eval-guide/reassessing/
---

# Part 5-2: Reassessing Your Use of ZK

Whether to continue with ZK or consider other approaches is a question that can arise over time in enterprise Java teams. The application is stable, the team is familiar with the framework, and development continues to deliver features effectively.

At the same time, periodic discussions — often prompted by new team members or routine technology reviews — may revisit whether ZK remains the right fit, especially given the growing popularity of frameworks like React and Angular.

The honest answer is: probably not. But the decision deserves more than a gut response in either direction.

## Do not move because of trend pressure

The pressure to adopt React or Angular often has less to do with the specific requirements of your application and more to do with the general perception that these frameworks are "what everyone uses." That perception is not wrong — React in particular has had a dominant position in the frontend development ecosystem for the past decade.

But trend adoption is not the same as fit assessment.

React and Angular's popularity is largely driven by consumer-facing web development, SaaS startups, and frontend specialist teams. The conditions that make those frameworks attractive — rich visual ecosystems, large frontend talent pools, mobile application potential — are real in those contexts. They are less relevant for enterprise Java teams building internal applications where data density, backend integration, and long-term stability matter more.

It is also worth noting that the broader industry conversation has shifted meaningfully since 2025. The trend in web development has been moving back toward full-stack, server-centric approaches — frameworks like Next.js, Remix, and SvelteKit have popularized server components and server-side rendering in the JavaScript world itself. The "client-side everything" orthodoxy of the early 2020s is no longer as dominant as it was. If ZK's server-centric architecture felt unfashionable a few years ago, it is worth recognizing that the mainstream has moved closer to it, not further away.

## Go back to Part 1

The right question is not "should we use what's popular?" It is the same question you should have asked at the start: does this framework fit our team, our application, and our constraints?

Work through [Part 1](/eval-guide/how-to-choose/) again with your current situation in mind.

Part 1-2: Has your team actually changed? If the team that built the ZK application is largely still in place, you have skill investment in ZK that has real value. If the team has turned over significantly and the new team members have strong React backgrounds, that changes the calculation — but only if ZK is genuinely causing them friction, not just because they prefer what they already know.

Part 1-3: Has the application type changed? If the application has evolved from an internal data tool into a public-facing product with strong visual branding requirements, that is a legitimate reason to reconsider. If it is still the internal data-heavy enterprise application it always was, the application type still favors ZK.

Part 1-6: Have enterprise requirements grown? ZK's commercial backing, WCAG support, and security posture are meaningful advantages in environments with compliance requirements. If those requirements have become more stringent since the original decision, ZK's position has strengthened, not weakened.

If you work through Part 1 and ZK still fits — which, for teams that were happy with it, it usually will — the migration conversation has its answer.

## The hidden cost of "because we hired a JavaScript developer"

A common trigger for this conversation is hiring a frontend developer with React experience who then advocates for switching. This deserves a direct response.

Bringing JavaScript expertise into a Java-centric team is genuinely valuable for some things — visual polish, custom interactions, build tooling — and a ZK application can leverage that expertise without a full migration. ZK supports custom JavaScript components that integrate with the framework, and a skilled frontend developer can improve theming, CSS, and any bespoke visual elements without rewriting the application.

What a migration in this scenario actually involves is asking the Java developers on the team to maintain a JavaScript codebase they did not build and may not be fully comfortable in. The new developer gains familiarity but everyone else gains a coordination overhead and a learning curve. Hiring one JavaScript developer does not change the skill profile of the team as a whole.

If the JS developer is genuinely frustrated by the limitations of ZK for specific things they need to build, address those specific limitations. If they are arguing for a wholesale migration because React is what they know, that is a preference worth acknowledging but not a technical reason to incur significant migration risk.

## When moving away from ZK is the right decision

There are real reasons to consider a migration away from ZK, and they deserve honest acknowledgment.

If the application has fundamentally changed in nature — from an internal tool to a public-facing consumer product where strong brand personality and mobile-native experience are central — the requirements may now genuinely favor a different architecture.

If the team has completely turned over and the new team has deep React or Angular expertise with no Java background, the cost of maintaining a ZK codebase has increased significantly, and the case for migration is stronger.

If specific capabilities are genuinely unavailable in ZK and are central to the application's core functionality — not hypothetical, but actual requirements that cannot be addressed — that is a reason to evaluate alternatives.

If the organization is consolidating its technology stack across multiple applications and ZK is an outlier, the organizational coordination benefit of consolidation may outweigh the migration cost.

These are all real situations. None of them are "because React is popular" or "because our new hire uses it elsewhere."

If you reach the conclusion that migration is genuinely the right path, the approach is the same as any migration: start small, prove the value, and migrate incrementally rather than attempting a full cutover.
