---
title: "Base Components"
---

This section documents ZK's **base components** — the abstract foundation classes that every
concrete component is built on.

Unlike regular components, base components are **not ZUL tags you can use directly**. You will
never write `<htmlbasedcomponent/>` or `<xulelement/>` in a `.zul` page, and you cannot
instantiate one yourself. Each base component instead bundles a set of underlying features —
properties, events, and client-side behavior — that it hands down to every component that
extends it. For example, the `sclass`, `width`, and drag-and-drop support you set on a `<div>`
or `<button>` are defined once on `HtmlBasedComponent` and inherited by all of them.

These pages exist so that this shared functionality is documented in one place instead of being
repeated on every component. When a concrete component's reference page doesn't mention a common
property, look for it on the base class that component extends.
