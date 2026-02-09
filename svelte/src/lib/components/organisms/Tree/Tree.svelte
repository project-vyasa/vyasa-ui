<script module lang="ts">
	import type { Component, ComponentType } from 'svelte';

	export interface TreeNode {
		id: string;
		label: string;
		icon?: Component | ComponentType;
		children?: TreeNode[];
		[key: string]: any;
	}
</script>

<script lang="ts">
	import Icon from '../../atoms/Icon/Icon.svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';

	interface Props {
		data: TreeNode[];
		selectedId?: string;
		expandedIds?: Set<string>; // or array
		onSelect?: (node: TreeNode) => void;
		onToggle?: (node: TreeNode, expanded: boolean) => void;
	}

	let {
		data,
		selectedId = $bindable(undefined),
		expandedIds = $bindable(new Set()),
		onSelect,
		onToggle
	}: Props = $props();

	// Handle toggle
	function handleToggle(node: TreeNode, e: MouseEvent) {
		e.stopPropagation();
		const isExpanded = expandedIds.has(node.id);
		const newExpanded = new Set(expandedIds);
		if (isExpanded) {
			newExpanded.delete(node.id);
		} else {
			newExpanded.add(node.id);
		}
		expandedIds = newExpanded;
		onToggle?.(node, !isExpanded);
	}

	// Handle select
	function handleSelect(node: TreeNode, e: MouseEvent) {
		e.stopPropagation();
		onSelect?.(node);
	}
</script>

{#snippet treeNode(node: TreeNode, depth: number)}
	{@const hasChildren = node.children && node.children.length > 0}
	{@const isExpanded = expandedIds.has(node.id)}
	{@const isSelected = selectedId === node.id}

	<div class="tree-node-wrapper">
		<div
			class="tree-node-row {isSelected ? 'selected' : ''}"
			style:padding-left="{depth * 1.5 + 0.5}rem"
			onclick={(e) => handleSelect(node, e)}
			role="treeitem"
			tabindex="0"
			onkeydown={(e) => e.key === 'Enter' && handleSelect(node, e as unknown as MouseEvent)}
			aria-selected={isSelected}
			aria-expanded={hasChildren ? isExpanded : undefined}
		>
			<!-- Expander Icon -->
			<span
				class="expander {hasChildren ? 'visible' : 'invisible'}"
				onclick={(e) => hasChildren && handleToggle(node, e)}
				role="button"
				tabindex="0"
				onkeydown={(e) =>
					e.key === 'Enter' && hasChildren && handleToggle(node, e as unknown as MouseEvent)}
			>
				<Icon
					icon={isExpanded ? ChevronDown : ChevronRight}
					size={16}
					class={isSelected ? 'icon-selected' : 'icon-default'}
				/>
			</span>

			<!-- Node Icon -->
			{#if node.icon}
				<Icon icon={node.icon} size={16} class="node-icon" />
			{/if}

			<!-- Label -->
			<span class="label">{node.label}</span>
		</div>

		<!-- Children -->
		{#if hasChildren && isExpanded}
			<div role="group">
				{#each node.children! as child (child.id)}
					{@render treeNode(child, depth + 1)}
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

<div class="tree-root" role="tree">
	{#each data as node (node.id)}
		{@render treeNode(node, 0)}
	{/each}
</div>

<style>
	.tree-root {
		width: 100%;
		user-select: none;
	}

	.tree-node-row {
		display: flex;
		align-items: center;
		padding-top: calc(0.3rem * var(--density));
		padding-bottom: calc(0.3rem * var(--density));
		cursor: pointer;
		font-size: var(--text-sm);
	}

	.tree-node-row:hover {
		background-color: var(--bg-surface-alt);
	}

	.tree-node-row.selected {
		background-color: var(--action-primary);
		color: var(--action-text);
	}
	.tree-node-row.selected:hover {
		background-color: var(--action-primary);
	}

	.expander {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		margin-right: 0.25rem;
	}
	.expander.invisible {
		visibility: hidden;
	}

	/* Icon coloring logic handled via classes passed to Icon, but referencing CSS variables */
	:global(.icon-default) {
		color: var(--text-tertiary);
	}
	:global(.icon-selected) {
		color: white;
	}

	:global(.node-icon) {
		margin-right: 0.5rem;
		opacity: 0.8;
	}

	.label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
