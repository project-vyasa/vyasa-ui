# Component Inventory

This document lists the components currently implemented in the Vyasa UI library.

## Atoms

Base building blocks.

| Component    | Status         | Description                                                                          |
| :----------- | :------------- | :----------------------------------------------------------------------------------- |
| **Badge**    | ✅ Implemented | Small status indicators (pill-shaped) with semantic colors.                          |
| **Button**   | ✅ Implemented | Interactive element with variants (primary, ghost, danger, success, etc.) and sizes. |
| **Checkbox** | ✅ Implemented | Boolean input selection.                                                             |
| **Icon**     | ✅ Implemented | Wrapper for Lucide Icons with dynamic loading.                                       |
| **Input**    | ✅ Implemented | Text input field with states (disabled, error, full-width).                          |
| **Radio**    | ✅ Implemented | Single selection from a group.                                                       |
| **Switch**   | ✅ Implemented | Toggle switch for boolean states.                                                    |
| **Textarea** | ✅ Implemented | Multi-line text input.                                                               |

## Molecules

Combinations of atoms functioning as a unit.

| Component       | Status         | Description                                                    |
| :-------------- | :------------- | :------------------------------------------------------------- |
| **Alert**       | ✅ Implemented | Contextual feedback messages (Info, Success, Warning, Danger). |
| **Breadcrumbs** | ✅ Implemented | Navigation path display.                                       |
| **Dropdown**    | ✅ Implemented | Menu for selecting an option from a list.                      |
| **FormField**   | ✅ Implemented | Wrapper for inputs with Label, Helper Text, and Error Message. |
| **Modal**       | ✅ Implemented | Dialog overlay for critical actions or information.            |
| **Pagination**  | ✅ Implemented | Navigation for paged data.                                     |
| **Select**      | ✅ Implemented | Native select wrapper with consistent styling.                 |
| **Toast**       | ✅ Implemented | Global notification system (Store + Provider).                 |
| **Tooltip**     | ✅ Implemented | Popup information on hover.                                    |

## Organisms

Complex UI sections and layouts.

| Component    | Status         | Description                                                       |
| :----------- | :------------- | :---------------------------------------------------------------- |
| **AppShell** | ✅ Implemented | Main layout with Sidebar, Header, and Content areas.              |
| **DataGrid** | ✅ Implemented | Advanced table with sorting, selection, and density support.      |
| **Panel**    | ✅ Implemented | Container with header and content, often used in layout resizing. |
| **Tabs**     | ✅ Implemented | Tabbed content usage.                                             |
| **Toolbar**  | ✅ Implemented | Container for action buttons and controls.                        |
| **Tree**     | ✅ Implemented | Hierarchical tree view with expansion and selection.              |

## Utils

| Component         | Status         | Description                                                |
| :---------------- | :------------- | :--------------------------------------------------------- |
| **ThemeProvider** | ✅ Implemented | Manages global Theme (Light/Dark) and Density preferences. |
