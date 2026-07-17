# Vyasa-UI Svelte Code Review Tasks (2026-07-17)

This is the tracking document for the Svelte code review findings from 2026-07-17. Check items off as they are completed.

## High Priority
- [ ] **Remove `ComponentType`**: Remove deprecated `ComponentType` from union types in `Button.svelte`, `Tabs.svelte`, `Tree.svelte`, `Panel.svelte`, and SettingsPanel `types.ts`. Use `Component` alone.

## Medium Priority
- [ ] **Add missing specs**: Add `*.spec.ts` files for key components that currently lack them (e.g. `Button`, `Input`, `CodeEditor`, `AppShell`, `Tree`, `Select`, `Modal`).

## Low Priority
- [ ] **Clarify testing conventions**: Either update the `AGENTS.md` rule to reflect that spec files live alongside components in `src/lib/components/` rather than in a dedicated `tests/` directory, or move existing spec files into a `tests/` directory.
