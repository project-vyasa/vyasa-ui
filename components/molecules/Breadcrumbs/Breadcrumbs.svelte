<script lang="ts">
	import Icon from '../../atoms/Icon/Icon.svelte';
	import { ChevronRight } from 'lucide-svelte';

	interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	interface Props {
		items: BreadcrumbItem[];
		separator?: import('svelte').Snippet;
		item?: import('svelte').Snippet<[BreadcrumbItem]>;
	}

	let { items, separator, item }: Props = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol class="breadcrumbs-list">
		{#each items as breadcrumb, index}
			<li class="breadcrumb-item">
				{#if item}
					{@render item(breadcrumb)}
				{:else if breadcrumb.href && index < items.length - 1}
					<a href={breadcrumb.href} class="breadcrumb-link">{breadcrumb.label}</a>
				{:else}
					<span
						class="breadcrumb-text"
						aria-current={index === items.length - 1 ? 'page' : undefined}
					>
						{breadcrumb.label}
					</span>
				{/if}

				{#if index < items.length - 1}
					<span class="separator" aria-hidden="true">
						{#if separator}
							{@render separator()}
						{:else}
							<Icon icon={ChevronRight} size={14} />
						{/if}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumbs-list {
		display: flex;
		align-items: center;
		padding: 0;
		margin: 0;
		list-style: none;
		flex-wrap: wrap;
	}

	.breadcrumb-item {
		display: inline-flex;
		align-items: center;
		font-size: var(--text-sm);
		color: var(--text-secondary);
	}

	.breadcrumb-link {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s;
	}

	.breadcrumb-link:hover {
		color: var(--text-primary);
		text-decoration: underline;
	}

	.breadcrumb-text {
		color: var(--text-primary);
		font-weight: 500;
	}

	.separator {
		margin: 0 0.5rem;
		display: flex;
		align-items: center;
		color: var(--text-tertiary);
	}
</style>
