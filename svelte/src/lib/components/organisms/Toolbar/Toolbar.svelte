<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
	}

	let { children, orientation = 'horizontal', class: className = '' }: Props = $props();
</script>

<div
	role="toolbar"
	aria-orientation={orientation}
	class="toolbar orientation-{orientation} {className}"
>
	{@render children()}
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		gap: 0.5rem; /* gap-2 */
		padding: 0.25rem; /* p-1 */
		background-color: var(--bg-surface-alt);
		border: 1px solid var(--border-base);
		border-radius: 0.375rem; /* rounded-md */
	}

	.toolbar.orientation-horizontal {
		flex-direction: row;
		width: 100%;
	}

	.toolbar.orientation-vertical {
		flex-direction: column;
		height: 100%;
	}
</style>
