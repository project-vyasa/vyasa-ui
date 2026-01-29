<script lang="ts">
	import Icon from '../../atoms/Icon/Icon.svelte';
	import Button from '../../atoms/Button/Button.svelte';
	import { X } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export interface TabItem {
		id: string;
		label: string;
		icon?: ComponentType;
		content?: import('svelte').Snippet;
		closeable?: boolean;
	}

	interface Props {
		tabs: TabItem[];
		activeTabId: string;
		onSelect: (id: string) => void;
		onClose?: (id: string) => void;
		children?: import('svelte').Snippet;
	}

	let { tabs, activeTabId, onSelect, onClose, children }: Props = $props();

	const activeTab = $derived(tabs.find((t) => t.id === activeTabId));
</script>

<div class="tabs-container">
	<div class="tabs-header" role="tablist">
		{#each tabs as tab (tab.id)}
			<div
				class="tab-item {activeTabId === tab.id ? 'active' : ''}"
				onclick={() => onSelect(tab.id)}
				role="tab"
				aria-selected={activeTabId === tab.id}
				tabindex="0"
				onkeydown={(e) => e.key === 'Enter' && onSelect(tab.id)}
			>
				{#if tab.icon}
					<Icon icon={tab.icon} size={14} class="tab-icon" />
				{/if}
				<span class="tab-label">{tab.label}</span>

				{#if tab.closeable && onClose}
					<span
						class="close-btn"
						onclick={(e) => {
							e.stopPropagation();
							onClose(tab.id);
						}}
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === 'Enter' && (e.stopPropagation(), onClose(tab.id))}
					>
						<Icon icon={X} size={12} />
					</span>
				{/if}
			</div>
		{/each}
	</div>

	<div class="tab-content">
		{#if activeTab && activeTab.content}
			{@render activeTab.content()}
		{:else if children}
			{@render children()}
		{:else}
			<div class="empty-state">No content</div>
		{/if}
	</div>
</div>

<style>
	.tabs-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: var(--bg-surface);
	}

	.tabs-header {
		display: flex;
		background-color: var(--bg-surface-alt);
		border-bottom: 1px solid var(--border-base);
		overflow-x: auto;
	}

	.tab-item {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-size: var(--text-sm);
		border-right: 1px solid var(--border-base);
		background-color: var(--bg-surface-alt);
		color: var(--text-secondary);
		user-select: none;
		min-width: 120px;
		max-width: 200px;
	}

	.tab-item:hover {
		background-color: var(--bg-surface);
	}

	.tab-item.active {
		background-color: var(--bg-surface);
		color: var(--action-primary);
		border-top: 2px solid var(--action-primary);
		font-weight: 500;
	}

	:global(.tab-icon) {
		margin-right: 0.5rem;
		opacity: 0.7;
	}

	.tab-label {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.close-btn {
		margin-left: 0.5rem;
		padding: 2px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
	}

	.tab-item:hover .close-btn {
		opacity: 1;
	}

	.close-btn:hover {
		background-color: var(--status-error-bg, rgba(255, 0, 0, 0.1));
		color: var(--status-error);
	}

	.tab-content {
		flex: 1;
		overflow: auto;
		position: relative;
		background-color: var(--bg-surface);
	}

	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--text-tertiary);
	}
</style>
