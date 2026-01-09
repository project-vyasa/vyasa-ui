<script lang="ts">
  import { onMount, setContext } from 'svelte';
  
  type Theme = 'light' | 'dark' | 'system';
  type Density = 'compact' | 'standard' | 'comfortable';

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  // State
  let theme = $state<Theme>('system');
  let density = $state<Density>('standard');

  // Derived
  let effectiveTheme = $derived.by(() => {
    if (theme === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }
    return theme;
  });

  // Effect to apply to document
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', effectiveTheme);
      document.documentElement.setAttribute('data-density', density);
    }
  });

  // Context API
  const context = {
    get theme() { return theme },
    set theme(v: Theme) { theme = v },
    get density() { return density },
    set density(v: Density) { density = v },
    toggleTheme: () => {
      theme = theme === 'light' ? 'dark' : 'light';
    },
    cycleDensity: () => {
      const map: Record<Density, Density> = {
        'compact': 'standard',
        'standard': 'comfortable',
        'comfortable': 'compact'
      };
      density = map[density];
    }
  };

  setContext('theme', context);

  // Keyboard shortcuts for testing
  function handleKeydown(e: KeyboardEvent) {
    // Ctrl + T = Toggle Theme
    if (e.ctrlKey && e.key === 't') {
      e.preventDefault();
      context.toggleTheme();
    }
    // Ctrl + D = Cycle Density
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      context.cycleDensity();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{@render children?.()}
