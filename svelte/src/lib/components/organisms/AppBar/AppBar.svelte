<script lang="ts">
	import type { Snippet, Component } from 'svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';

	export interface AppBarItem {
		id: string;
		icon: Component<any>;
		title?: string;
	}

	interface Props {
		items?: AppBarItem[];
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

<div class="app-bar">
	<div class="app-bar-group">
		{#if top}
			{@render top?.()}
		{/if}
		{#each items as item}
			<div class="app-item-wrapper {activeId === item.id && expanded ? 'active' : ''}">
				<Button
					variant="ghost"
					size="icon"
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
		<div class="app-bar-group">
			{@render bottom?.()}
		</div>
	{/if}
</div>

<style>
	.app-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) 0;
		width: 100%;
		height: 100%;
		background-color: var(--bg-surface);
	}
	.app-bar-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
	}
	.app-item-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		border-left: 2px solid transparent;
		padding: var(--space-1) 0;
	}
	.app-item-wrapper.active {
		background-color: var(--bg-surface-elevated);
		border-left-color: var(--action-primary);
		color: var(--action-primary);
	}
	.app-item-wrapper.active :global(.icon) {
		color: var(--action-primary);
	}
</style>
