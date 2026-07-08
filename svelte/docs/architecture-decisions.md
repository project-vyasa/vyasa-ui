# Architecture Decisions

## 1. Directives & Technology

- **Framework**: Svelte 5.
- **Language**: TypeScript.
- **Styling**: Vanilla CSS with CSS Variables (Custom Properties) for theming and density. TailwindCSS/UnoCSS can be used for utility generation but component styles should be encapsulated or use a predictable class-name API for consumers.

## 2. State Management (Runes)

- **Local State**: Use `$state()` exclusively. Avoid legacy `let` exports or standard writable stores for local component state.
- **Shared State**: Use `$state()` in shared modules (svelte.js/ts files) for global stores.
- **Props**: Use `$props()` interface for defining component API.

## 3. Component API & Composition

- **Snippets**: Use `Snippet` type for generic content slots instead of `<slot>`.
  - E.g., `header: Snippet`, `footer: Snippet`.
- **Events**:
  - Use standard HTML attributes: `onclick`, `onchange`.
  - For custom events, accept callback props: `onSave?: (data: T) => void`.
- **Props Spreading**: Support `...restProps` to allow standard HTML attributes (class, style, aria-*) to pass through to the root element.

## 4. Directory Structure

```
src/
  lib/
    components/
      atoms/
        Button/
          Button.svelte
          index.ts
      molecules/
      organisms/
    style/
      theme/
      tokens/
    utils/
```
