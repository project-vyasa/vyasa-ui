<script lang="ts">
	import type { Snippet, Component, ComponentType } from 'svelte';
	import Icon from '../../atoms/Icon/Icon.svelte';

	interface Props {
		title: string;
		icon?: Component | ComponentType;
		actions?: Snippet;
		children: Snippet;
		class?: string;
	}

	let { title, icon, actions, children, class: className = '' }: Props = $props();
</script>

<section class="panel {className}">
	<header class="panel-header">
		<div class="panel-title">
			{#if icon}
				<Icon {icon} size={14} />
			{/if}
			<span>{title}</span>
		</div>
		{#if actions}
			<div class="panel-actions">
				{@render actions()}
			</div>
		{/if}
	</header>

	<div class="panel-content">
		{@render children()}
	</div>
</section>

<style>
	.panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		background-color: var(--bg-surface);
		border: 1px solid var(--border-base); /* Default border, can be overridden by className */
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.25rem 0.75rem; /* py-1 px-3 */
		border-bottom: 1px solid var(--border-base);
		background-color: var(--bg-surface-alt);
	}

	.panel-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
	}

	.panel-actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.panel-content {
		flex: 1;
		min-height: 0;
		overflow: auto;
		padding: 0;
	}
</style>
