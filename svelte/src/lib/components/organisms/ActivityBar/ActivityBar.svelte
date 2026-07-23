<script lang="ts">
	import type { Snippet, Component, ComponentType } from 'svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';

	export interface ActivityBarItem {
		id: string;
		icon: Component<any> | ComponentType;
		title?: string;
	}

	interface Props {
		items?: ActivityBarItem[];
		activeId?: string;
		expanded?: boolean;

		children?: Snippet;
		top?: Snippet;
		bottom?: Snippet;
	}

	let {
		items = [],
		activeId = $bindable(''),
		expanded = $bindable(false),
		children,
		top,
		bottom
	}: Props = $props();

	function handleItemClick(id: string) {
		if (activeId === id) {
			expanded = !expanded;
		} else {
			activeId = id;
			expanded = true;
		}
	}
</script>

<div class="activity-bar">
	<div class="activity-bar-group">
		{#if top}
			{@render top?.()}
		{/if}
		{#each items as item}
			<div class="activity-item-wrapper {activeId === item.id && expanded ? 'active' : ''}">
				<Button
					variant="ghost"
					size="icon"
					class={['activity-item', activeId === item.id ? 'active' : '']}
					icon={item.icon}
					onclick={() => handleItemClick(item.id)}
					title={item.title}
				/>
			</div>
		{/each}
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if bottom}
		<div class="activity-bar-group">
			{@render bottom?.()}
		</div>
	{/if}
</div>

<style>
	.activity-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) 0;
		width: 100%;
		height: 100%;
		background-color: var(--bg-surface);
	}
	.activity-bar-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
	}
	.activity-item-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		border-left: 2px solid transparent;
		padding: var(--space-1) 0;
	}
	.activity-item-wrapper.active {
		background-color: transparent;
		border-left-color: var(--action-primary);
		color: var(--text-primary);
	}
	.activity-item-wrapper.active :global(.icon),
	.activity-item-wrapper.active :global(svg) {
		color: var(--text-primary);
	}

	:global(.activity-bar .btn) {
		border-radius: 0;
		color: var(--text-secondary);
	}

	:global(.activity-bar .btn:hover) {
		color: var(--text-primary);
	}
</style>
