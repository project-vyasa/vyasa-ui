# Objective

Create a design system and a set of svelte components for use by a variety of browser apps - from high density IDE to data visualization and simple data manipulation interfaces.

## Goals

Use a taxonomy from OS vendors like Apple to define a component hierarchy optimized for maximum reuse while balancing developer interface (number of options, concept count overload) complexity.

1. Keep low concept count. Reuse nouns and verbs across components e.g. toolbar button and status bar element just have minor differences.
1. A theme system that is rich enough for component developers to not require custom display styles.
1. A layout system that is flexible enough to support a variety of app types - Rich media content browser, IDE, data viz apps, data entry and reports, etc.
1. A component system that is composable and flexible enough to support a variety of use cases without requiring custom components.
1. An iconography system that provides a rich set of icons optimized for app UIs.
1. A documentation system that makes it easy for developers to find and understand how to use components.
1. A testing system that ensures components work as expected across a variety of use cases and edge cases.
1. A set of examples that demonstrate how to use components in a variety of app types and use cases.

## Key requirements

1. Density: Each component must support a density primitive that determines the space it consumes. Baseline (1.0), High (1.25x)and Low(0.9x) will allow users to tune the information density of the application.
1. Theme: Each component adapts to externally defined themes - light and dark at a minimum.
1. Semantic tokens used uniformly by all components for size, intent, variant, and so on.
1. A component hierarchy modelled after atoms, molecules, organism taxonomy. Design context based inheritance.
1. Balance between web standards and Svelte 5 specific features when specifying design system. We will need to create native app components that honors the same design system. However, the implementation of web components _must_ fully leverage Svelte 5 features like stores, runes, snippets, component scoped when absolutely required.

### Reference

1. [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
1. [Material Design](https://material.io/design)
1. [Lucide Icons](https://lucide.dev/icons/)
1. [Fluent Design System](https://learn.microsoft.com/en-us/windows/apps/design/)
1. [Carbon Design System](https://carbondesignsystem.com/)

## Non-Goals

1. A full fledged app framework - this is a component library to be used within apps, not a full app framework.
1. A design system for marketing sites - this is focused on app UIs, not marketing sites.
1. A design system for mobile apps - this is focused on desktop browser apps.
1. Favor simplicity over exhaustive feature sets other design systems may have
