# Vyasa-UI Svelte Code Review — 2026-07-17

## Summary

The Svelte component library is in **excellent Svelte 5 compliance**. 38 component files (5,142 LOC total) use modern runes throughout: `$props()`, `$state()`, `$derived()`, `$effect()`, `Snippet`-based composition. **Zero** deprecated Svelte 3/4 patterns found for: `export let`, reactive `$:`, `<slot>`, `on:directive`, `createEventDispatcher`, `beforeUpdate/afterUpdate`, `svelte/store` imports.

**Single issue found:** `ComponentType` deprecation.

## Findings

### Deprecated Patterns Scan

| Pattern | Count | Status |
|:---|:---|:---|
| `export let` | 0 | ✅ Clean |
| `$:` reactive | 0 | ✅ Clean |
| `<slot>` | 0 | ✅ Clean |
| `on:directive=` | 0 | ✅ Clean (1 false positive: CSS `input[type='file']::file-selector-button`) |
| `createEventDispatcher` | 0 | ✅ Clean |
| `beforeUpdate/afterUpdate` | 0 | ✅ Clean |
| `svelte/store` import | 0 | ✅ Clean |
| **`ComponentType`** | **10** | ⚠️ **Deprecated type still referenced** |

### `ComponentType` Occurrences

| File | Line |
|:---|:---|
| `Button.svelte` | `import type { Component, ComponentType }` / `icon?: Component \| ComponentType` |
| `Tabs.svelte` | Same pattern |
| `Tree.svelte` | Same pattern |
| `Panel.svelte` | Same pattern |
| `types.ts` (SettingsPanel) | Same pattern |

**Fix:** Remove `ComponentType` from union types. Use `Component` alone:
```diff
- icon?: Component | ComponentType;
+ icon?: Component;
```

### Svelte 5 Pattern Adoption

| Pattern | Count | Notes |
|:---|:---|:---|
| `$props()` | Used in all 38 components | ✅ |
| `$state()` | 30+ usages | ✅ |
| `$derived()` | 15+ usages | ✅ |
| `$effect()` | 12 usages (Dropdown, CodeEditor, Select, Textarea, ThemeProvider) | ✅ |
| `$bindable()` | Used where needed | ✅ |
| `Snippet` | 50 references across components | ✅ |

### Test Coverage

| Component | Has Spec | Has Demo |
|:---|:---|:---|
| ActivityBar | ✅ `ActivityBar.svelte.spec.ts` | via `ide-demo` |
| ListView | ✅ `ListView.svelte.spec.ts` | via `ide-demo` |
| SettingsPanel | ✅ `SettingsPanel.svelte.spec.ts` | `settings-demo` |
| Button | ❌ No spec | ✅ `Button.stories.svelte` |
| Input | ❌ No spec | ✅ `Input.stories.svelte` |
| CodeEditor | ❌ No spec | ✅ `CodeEditor.stories.svelte` |
| AppShell, Tree, Select, Modal, ... | ❌ No spec | via demos |

> **Note:** Per AGENTS.md, *"ensure that each component has a corresponding test file in the `tests` directory and is included in at least one demo."* Most components lack dedicated spec files. The `tests/` directory convention referenced in rules doesn't fully exist — specs live alongside components currently.

### Code Quality

| Area | Status | Notes |
|:---|:---|:---|
| CSS approach | ✅ Component-scoped `<style>` + design tokens | No utility framework dependency |
| Store pattern | ✅ `toast.svelte.ts` uses Svelte 5 class + `$state` | Modern pattern |
| Component sizing | ✅ Largest is ListView at 477 LOC | Reasonable |
| Import patterns | ✅ Consistent barrel exports via `index.ts` | — |

## Recommendations

| Priority | Task |
|:---|:---|
| **High** | Remove `ComponentType` from all 5 files (replace with `Component` only) |
| **Medium** | Add spec files for Button, Input, CodeEditor, AppShell, Tree, Select, Modal |
| **Low** | Consider creating a `tests/` directory convention or document that co-located specs are the pattern |
