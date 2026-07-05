# Design System Specification

## 1. Core Principles
Based on the objective to support high-density IDEs to data viz apps, this system prioritizes **flexibility** and **information density**.

### 1.1 Density
We define a primitive `density` prop that scales component dimensions and spacing.
- **Compact (0.7x)**: High-density data interfaces (IDEs, complex datagrids).
- **Standard (0.85x)**: Default balanced view.
- **Comfortable (1.1x)**: Spacious view, suitable for reading or touch.

This should be implemented via CSS custom properties scoped to a container, allowing mix-and-match densities on the same page.

### 1.2 Theming
Theme adaptability is a hard requirement.
- **Modes**: Light, Dark, Auto.
- **Implementation**: CSS Variables for semantic colors (e.g., `--color-surface`, `--color-text-primary`, `--color-action`).
- **Scoped**: Themes can be applied at the root or component level.

## 2. Token System
Semantic tokens ensure consistency.

### 2.1 Colors
- **Primitive**: `blue-500`, `gray-900`.
- **Semantic**:
    - `primary`: Main action color.
    - `surface`: Backgrounds.
    - `surface-elevated`: Cards/Modals.
    - `border`: Borders.
    - `text-primary`, `text-secondary`: content.
    - `status-info`, `status-success`, `status-warning`, `status-error`.

### 2.2 Typography
Using a functional scale:
- `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`.
- Weights: `regular`, `medium`, `semibold`.

### 2.3 Spacing
- Scale: `0`, `0.5` (base * 0.5), `1` (base * 1), `2` (base * 2), ... `8` (base * 8).
- Base unit is `0.25rem` (4px).
- Density modifiers apply multipliers to these computed values via CSS calc().

## 3. Component Taxonomy
We adopt Atomic Design with a focus on functional naming.

### 3.1 Atoms (Base Components)
Single-purpose elements.
- `Button`, `IconButton`
- `Input`, `Select`, `Checkbox`, `Switch`
- `Icon` (Lucide wrapper)
- `Link`
- `Badge`, `Tag`
- `Spinner`

### 3.2 Molecules (Composite Components)
Combinations of atoms functioning as a unit.
- `FormField`: Label + Input + Error + Helper text.
- `SearchInput`: Input + Search Icon.
- `ButtonGroup`: Set of buttons.
- `Toast`, `Alert`
- `Breadcrumb`
- `KeyboardShortcut`: Visual representation of keybindings.
- `ContextMenu`: Contextual actions on right-click.

### 3.3 Organisms (Complex Components)
Complex UI sections.
- `Toolbar`: Collection of actions.
- `Statusbar`: Status information display.
- `Panel`: Generic container with header/content.
- `Card`: Content container with elevation.
- `Accordion`: Collapsible content sections.
- `Tabs`: Tabbed navigation.
- `Tree`: Hierarchical navigation (folders).
- `TreeGrid`: Combination of Tree and DataGrid.
- `DataGrid`: Complex table with sorting/filtering.
- `Modal`, `Drawer`
- `DatePicker`
- `SettingsPanel`: Preference management interface (like VSCode).
- `AppShell`: Main application layout (ActivityBar, Sidebars, Content).

## 4. Iconography
- **Source**: Lucide Icons.
- **Integration**: A generic `<Icon name="..." />` or explicit imports `<Icon.User />` to enable tree-shaking. Standardized sizing via standard t-shirt sizes.

