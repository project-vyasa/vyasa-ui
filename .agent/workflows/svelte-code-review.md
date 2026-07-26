---
description: Code review workflow for Svelte package - checks for deprecated features, repetitive code, and Svelte 5 pattern adherence
---

# Svelte Code Review Workflow

This workflow performs a code review of the Svelte package, focusing on:
1. **Deprecated Features** - Svelte 3/4 patterns that should be migrated to Svelte 5
2. **Repetitive Code** - Opportunities for refactoring and DRY improvements
3. **Svelte 5 Patterns** - Ensuring modern runes and patterns are used

## Steps

### 1. Scan for Deprecated Svelte 3/4 Patterns

Search for the following deprecated patterns in `.svelte` files:

```bash
# Check for deprecated reactive statements ($:)
grep -r '\$:' --include="*.svelte" src/lib/

# Check for deprecated stores (writable, readable, derived)
grep -r 'from "svelte/store"' --include="*.svelte" src/lib/
grep -r "from 'svelte/store'" --include="*.svelte" src/lib/

# Check for deprecated createEventDispatcher
grep -r 'createEventDispatcher' --include="*.svelte" src/lib/

# Check for deprecated on: directive (should use onclick, oninput, etc.)
grep -rE 'on:[a-z]+=' --include="*.svelte" src/lib/

# Check for deprecated slot syntax
grep -r '<slot' --include="*.svelte" src/lib/

# Check for deprecated export let (should use $props())
grep -r 'export let' --include="*.svelte" src/lib/

# Check for deprecated beforeUpdate/afterUpdate
grep -rE '(beforeUpdate|afterUpdate)' --include="*.svelte" src/lib/

# Check for deprecated ComponentType (should use Component)
grep -r 'ComponentType' --include="*.svelte" --include="*.ts" src/lib/
```

### 2. Check for Missing Svelte 5 Patterns

Verify these modern patterns are being used:

- **$state()** for reactive state
- **$derived()** for computed values
- **$effect()** for side effects
- **$props()** for component props
- **$bindable()** for two-way binding props
- **Snippets** instead of slots
- **Direct event handlers** (onclick) instead of on:click

### 3. Identify Repetitive Code

Look for:

1. **Duplicate CSS** - Similar styles across components that could be extracted to design system
2. **Repeated Logic** - Helper functions that could be shared
3. **Similar Components** - Components that could be consolidated or use composition

```bash
# Find files with similar names that might be candidates for consolidation
find src/lib -name "*.svelte" | sort

# Look for repeated import patterns
grep -rh "^import" --include="*.svelte" src/lib/ | sort | uniq -c | sort -rn | head -20
```

### 4. Generate Review Report

For each file reviewed, note:

| File | Issue Type | Description | Severity | Suggested Fix |
|------|------------|-------------|----------|---------------|
| path | deprecated/repetitive/pattern | Details | High/Medium/Low | How to fix |

### 5. Prioritize Fixes

1. **High Priority**: Deprecated features that will break in future Svelte versions
2. **Medium Priority**: Missing Svelte 5 optimizations (performance/DX improvements)
3. **Low Priority**: Style/consistency improvements

## Common Svelte 5 Migration Patterns

### Props Migration
```svelte
// Before (Svelte 4)
<script>
  export let name = 'default';
  export let count;
</script>

// After (Svelte 5)
<script>
  let { name = 'default', count }: Props = $props();
</script>
```

### Reactive State Migration
```svelte
// Before (Svelte 4)
<script>
  let count = 0;
  $: doubled = count * 2;
</script>

// After (Svelte 5)
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

### Event Handlers Migration
```svelte
// Before (Svelte 4)
<button on:click={handleClick}>

// After (Svelte 5)
<button onclick={handleClick}>
```

### Slots to Snippets Migration
```svelte
// Before (Svelte 4)
<slot name="header" />

// After (Svelte 5)
<script>
  let { header }: { header?: Snippet } = $props();
</script>
{@render header?.()}
```

## Output

After running this workflow, produce a summary:

1. **Total files reviewed**: X
2. **Deprecated patterns found**: X
3. **Repetitive code instances**: X
4. **Missing Svelte 5 patterns**: X
5. **Recommended actions** (prioritized list)
