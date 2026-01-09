<script lang="ts">
	import { onDestroy } from 'svelte';

	interface Props {
		open?: boolean;
		position?: 'bottom-left' | 'bottom-right';
		trigger: import('svelte').Snippet;
		items: import('svelte').Snippet;
	}

	let { open = $bindable(false), position = 'bottom-left', trigger, items }: Props = $props();

	let containerRef: HTMLDivElement;

	function handleClickOutside(event: MouseEvent) {
		if (open && containerRef && !containerRef.contains(event.target as Node)) {
			open = false;
		}
	}

	// Add event listener for click outside
	// Using $effect to manage lifecycle of listener based on open state could be cleaner,
	// but a persistent listener is also fine if lightweight.
	// Let's use a window listener when open.
	$effect(() => {
		if (open) {
			setTimeout(() => {
				// Defer adding listener to avoid immediate closing if trigger click propagates
				if (typeof window !== 'undefined') {
					window.addEventListener('click', handleClickOutside);
				}
			}, 0);
		} else {
			if (typeof window !== 'undefined') {
				window.removeEventListener('click', handleClickOutside);
			}
		}
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('click', handleClickOutside);
			}
		};
	});
</script>

<div class="dropdown-container" bind:this={containerRef}>
	<div
		class="trigger"
		onclick={() => (open = !open)}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && (open = !open)}
	>
		{@render trigger()}
	</div>

	{#if open}
		<div class="dropdown-menu {position}">
			{@render items()}
		</div>
	{/if}
</div>

<style>
	.dropdown-container {
		position: relative;
		display: inline-block;
	}

	.trigger {
		cursor: pointer;
		display: inline-flex;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		min-width: 12rem;
		padding: 0.25rem;
		margin-top: 0.25rem;
		background-color: var(--bg-surface-elevated);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.dropdown-menu.bottom-left {
		left: 0;
	}

	.dropdown-menu.bottom-right {
		right: 0;
	}
</style>
