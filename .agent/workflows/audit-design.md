---
description: Audit design system implementation for CSS quality, token usage, and accessibility.
---

This workflow guides you through auditing the design system implementation in components.

1.  **CSS Cleanup & Token Usage Audit**
    -   Scan component styles (`<style>`) for raw hex codes, `px` values for spacing/sizing, or ad-hoc colors.
    -   **Goal**: Replace raw values with Design Tokens (e.g., `var(--color-primary)`, `var(--spacing-md)`).
    -   **Action**:
        -   If a raw value matches a token, replace it.
        -   If no token exists, document it as a "Missing Token" or "Custom Exception".
    -   **Anti-pattern Check**: Ensure no `!important` or deep nesting unless absolutely necessary.

2.  **Design Token Consistency**
    -   Verify that components use semantic tokens (e.g., `text-primary` vs `gray-900`).
    -   Ensure dark mode is handled via variables, not separate media queries in components.

3.  **Accessibility (a11y) Audit**
    -   Verify that interactive components (Inputs, Buttons, Toggles) have:
        -   Visible focus states (using `:focus-visible`).
        -   Correct ARIA attributes (`aria-label`, `aria-expanded`, etc.).
        -   Keyboard navigation support (Tab, Enter, Space).
    -   **Contrast Check**: Ensure text contrast meets WCAG AA standards in both Light and Dark modes.

4.  **Documentation**
    -   For any debt or exceptions found, create a task in `task.md` to resolve them.
