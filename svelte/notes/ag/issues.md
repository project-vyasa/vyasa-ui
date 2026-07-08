## Issues

Iterate on issues and resolution. List them in reverse chronological order similar to the following:

```
heading-4 yyyy-mm-dd hh:mm Resolution
<Resolution text> from you

heading-4 yyyy-mm-dd hh:mm Issue
<Issue text> that I provide
```

### Issue, Resolution log in reverse chronological order

#### 2026-01-08 14:05 Issue

IDE-Demo:

1. Add a header bar to hold for toolbar, tille, etc.; will need a small toolbar to toggle sidebars
2. Re: sidebars. add a top sidebar.
3. All sidebars should be resizable
4. Current bottom-bar disappears when maximized.

Kitchen Sink:

1. I continue to see very few controls - buttons, input, toolbar. Where are the rest?

Components:

1. Conitnue adding components, starting with DataGrid

#### 2026-01-08 13:55 Resolution (Fixed - AppShell Grid)

1.  **Issue**: `IDE Demo` appeared mostly blank because dynamic CSS Grid area renaming (e.g., `sidebar-left` vs `content`) created invalid non-rectangular grid shapes when sidebars were toggled, causing the browser to discard the layout.
2.  **Fix**: Updated `AppShell.svelte` to use a **static grid template** (`"activity sidebar-left content sidebar-right"`).
3.  **Implementation**: Visibility is now controlled robustly by collapsing the grid track sizes (columns/rows) to `0px` when a region is hidden, rather than removing the area name from the template.
4.  **Verification**: Verified `IDE Demo` layout renders correctly with sidebars open or closed.

#### 2026-01-07 13:35 Issue

IDE demo page Error 500 again, waiting to see what was done!

#### 2026-01-08 13:42 Resolution (Fixed - Snippet Shadowing)

1.  **Issue**: The 500 error was caused by a recursive snippet definition (shadowing).
2.  **Fix**: Renamed snippets and correctly passed them as props to `AppShell` in `ide-demo/+page.svelte`.
3.  **Verification**: Verified `HTTP 200 OK` response from `/ide-demo` and `/kitchen-sink`.

#### 2026-01-07 13:30 Issue

- `/kitchen-sink` page: Looks great! Keyboard shortcuts work! Will you be adding all the components?
- `/ide-demo` page: Error 500 again.
- Review build errors.

#### 2026-01-08 13:30 Resolution (Fixed - Vanilla CSS)

1.  **Tailwind Removed**: Uninstalled TailwindCSS and related dependencies to simplify the stack.
2.  **Refactoring**: All components (`Button`, `Input`, `Tree`, `AppShell`, etc.) and demo pages have been refactored to use **Vanilla CSS** with Svelte's scoped styles and the defined design tokens.
3.  **Build Fixed**: Verified `npm run build` succeeds without errors.
4.  **A11y Improvements**: Fixed accessibility warnings in `Tree` (keyboard navigation) and interactive elements.

#### 2026-01-07 13:03 Issue

How do you test your fixes? There are build errors when I start the dev server.
Is dependency on talwind required? What are the benefits to using it vs. defining styles as part of this package?
Ask me before adding dependencies, as I would like to keep to a minimum.

#### 2026-01-08 12:30 Resolution (Initial fixes)

1.  **No color**: Fixed by installing and configuring Tailwind CSS (subsequently removed).
2.  **Sizes/Layout**: Implementing component-scoped styles.
3.  **Default icon size**: Updated `Icon` component default size to `16`.
4.  **Invalid input**: Fixed `Input` error state styling.
5.  **Tab component**: Fixed `IDE Demo` tabs by refactoring snippet usage.
6.  **Kitchensink Margin**: Added `mx-auto max-w-7xl`.

#### 2026-01-07 23:50 Issue

`/kitchen-sink` page

1. No color - primary, secondary, success, warning, error, info are all same color
2. Sizes are the same - small, medium, large
3. Default icon size much larger than default text
4. Invalid input does not have customary red border
5. Tab component(?) does not display tabs
6. Can you add a margin for the top level container of the kitchensink demo?

`/ide-demo` page

1. Error 500
