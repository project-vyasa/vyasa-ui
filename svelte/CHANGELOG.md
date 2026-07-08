# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **SettingsPanel** component - Schema-driven settings UI with single-scroll experience, scroll-spy navigation, and real-time search filtering
- **CodeEditor** `lineWrapping` prop for dynamic text wrapping configuration
- Settings Demo page (`/settings-demo`)

### Changed

- **BREAKING**: Replaced deprecated `ComponentType` with `Component` from Svelte in all component interfaces
  - Affected files: `Icon.svelte`, `Button.svelte`, `Tree.svelte`, `Tabs.svelte`, `Panel.svelte`, `SettingsPanel/types.ts`
  - **Migration**: Update imports from `import type { ComponentType } from 'svelte'` to `import type { Component } from 'svelte'`

### Fixed

- **Toast.svelte**: Migrated from deprecated `transition:fly` directive to CSS `@keyframes` animation for better Svelte 5 compatibility

### Deprecated

- None

### Removed

- Removed `svelte/transition` dependency from Toast component

### Security

- None

---

## [0.0.1] - Initial Release

### Added

- Core atomic components: Button, Input, Textarea, Checkbox, Radio, Switch, Icon
- Molecular components: FormField, Tooltip, Alert, Toast, Select, Breadcrumbs, CodeEditor
- Organism components: AppShell, DataGrid, Tabs, Tree, Panel
- Design system with CSS variables for theming
- ThemeProvider and ToastProvider utilities
- Kitchen Sink demo page
- IDE Demo page
