# Implementation Plan

## Goal Description
Build a flexible, high-density capable design system in Svelte 5 for the Vyasa UI project.

## User Review Required
> [!IMPORTANT]
> - Review the taxonomy in `design-system.md` to ensure it covers expected use cases.
> - Confirm preference for CSS methodology (Pure CSS Variables vs Tailwind Utility Classes).

## Proposed Phases

### Phase 1: Foundations
*Goal: Set up the design tokens, theme engine, and basic primitive configs.*

#### [COMPLETED] [design-system.css](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/style/design-system.css)
- Define CSS Variables for colors, spacing, typography.
- Define Density multipliers.

#### [COMPLETED] [ThemeProvider.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/utils/ThemeProvider.svelte)
- Context provider for theme switching and density control.

### Phase 2: Core Atoms
*Goal: Implement the smallest reusable building blocks.*

#### [COMPLETED] [Button.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/atoms/Button/Button.svelte)
- Support variants (primary, secondary, text).
- Support density.

#### [COMPLETED] [Icon.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/atoms/Icon/Icon.svelte)
- Wrapper for Lucide Icons.

#### [COMPLETED] [Input.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/atoms/Input/Input.svelte)
- Text inputs with invalid states.

### Phase 3: Molecules & Layout
*Goal: Combine atoms into useful forms and navigations.*

#### [COMPLETED] [AppShell.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/organisms/AppShell/AppShell.svelte)
- Layout primitives with collapsible sidebars (Left/Right/Bottom).

#### [COMPLETED] [Tree.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/organisms/Tree/Tree.svelte)
- Hierarchical data visualization.

#### [COMPLETED] [FormField.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/molecules/FormField/FormField.svelte)
- Layout for Label + Input + Error.

#### [COMPLETED] [Toolbar.svelte](file:///Users/anand/Projects/project-vyasa/vyasa-ui/svelte/src/lib/components/organisms/Toolbar/Toolbar.svelte)
- Container for actions.

## Verification Plan

### Automated Tests
- Unit tests for each component using Vitest + Testing Library.
- Check accessibility (a11y) compliance.

### Manual Verification
- [COMPLETED] Create a `KitchenSink` page in the `routes/` (if using SvelteKit) or a Storybook-like preview environment to visually verify:
    - Theme switching (Light/Dark) - **Verify via Keyboard Shortcuts**.
    - Density switching (Low/Base/High).
    - Interaction states (Hover, Active, Disabled).
- [COMPLETED] **IDE Demo Page**: Recreate a VSCode-like layout with `AppShell`, `Tree`, `Tabs`, and `Panel`.
    - Test showing/hiding sidebars.
    - Test resizing panels.
