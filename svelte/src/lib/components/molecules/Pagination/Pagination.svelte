<script lang="ts">
	import Button from '../../atoms/Button/Button.svelte';
	import Icon from '../../atoms/Icon/Icon.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props {
		page?: number;
		total: number;
		pageSize?: number;
		onPageChange?: (page: number) => void;
	}

	let { page = $bindable(1), total, pageSize = 10, onPageChange }: Props = $props();

	let totalPages = $derived(Math.ceil(total / pageSize));

	// Generate page numbers to display
	let visiblePages = $derived.by(() => {
		const pages = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			// Complex logic for ellipsis could go here, for now simpler window + first/last
			// Or just a sliding window centered on current page
			let start = Math.max(1, page - 2);
			let end = Math.min(totalPages, start + maxVisible - 1);

			if (end - start < maxVisible - 1) {
				start = Math.max(1, end - maxVisible + 1);
			}

			for (let i = start; i <= end; i++) pages.push(i);
		}
		return pages;
	});

	function goTo(p: number) {
		if (p < 1 || p > totalPages || p === page) return;
		page = p;
		onPageChange?.(p);
	}
</script>

<nav class="pagination" aria-label="Pagination">
	<Button variant="outline" size="sm" disabled={page === 1} onclick={() => goTo(page - 1)}>
		<Icon icon={ChevronLeft} size={16} />
		<span class="sr-only">Previous</span>
	</Button>

	<div class="page-numbers">
		{#if visiblePages[0] > 1}
			<Button variant="ghost" size="sm" onclick={() => goTo(1)}>1</Button>
			{#if visiblePages[0] > 2}
				<span class="ellipsis">...</span>
			{/if}
		{/if}

		{#each visiblePages as p}
			<Button
				variant={p === page ? 'primary' : 'ghost'}
				size="sm"
				onclick={() => goTo(p)}
				color={p === page ? 'primary' : 'neutral'}
			>
				{p}
			</Button>
		{/each}

		{#if visiblePages[visiblePages.length - 1] < totalPages}
			{#if visiblePages[visiblePages.length - 1] < totalPages - 1}
				<span class="ellipsis">...</span>
			{/if}
			<Button variant="ghost" size="sm" onclick={() => goTo(totalPages)}>{totalPages}</Button>
		{/if}
	</div>

	<Button variant="outline" size="sm" disabled={page === totalPages} onclick={() => goTo(page + 1)}>
		<Icon icon={ChevronRight} size={16} />
		<span class="sr-only">Next</span>
	</Button>
</nav>

<style>
	.pagination {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.page-numbers {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.ellipsis {
		color: var(--text-tertiary);
		padding: 0 0.25rem;
	}
</style>
