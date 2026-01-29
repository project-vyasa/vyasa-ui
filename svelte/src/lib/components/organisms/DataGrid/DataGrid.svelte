<script lang="ts" generics="T">
	import { type Snippet } from 'svelte';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';

	export interface Column<T> {
		key: keyof T;
		label: string;
		sortable?: boolean;
		width?: string;
		render?: (row: T) => any;
	}

	interface Props<T> {
		data: T[];
		columns: Column<T>[];
		keyField?: keyof T;
		selectable?: boolean;
		selectedIds?: Set<string | number>;
		onSelectionChange?: (ids: Set<string | number>) => void;
		onRowClick?: (row: T) => void;
	}

	let {
		data,
		columns,
		keyField = 'id' as keyof T,
		selectable = false,
		selectedIds = $bindable(new Set()),
		onSelectionChange,
		onRowClick
	}: Props<T> = $props();

	// Sorting
	let sortKey = $state<keyof T | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');

	const sortedData = $derived.by(() => {
		if (!sortKey) return data;
		return [...data].sort((a, b) => {
			const aVal = a[sortKey!];
			const bVal = b[sortKey!];
			if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	});

	function handleSort(key: keyof T) {
		if (sortKey === key) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDirection = 'asc';
		}
	}

	// Selection
	function toggleAll(e: Event) {
		const checked = (e.target as HTMLInputElement).checked;
		if (checked) {
			selectedIds = new Set(data.map((row: any) => row[keyField]));
		} else {
			selectedIds = new Set();
		}
		onSelectionChange?.(selectedIds);
	}

	function toggleRow(id: string | number) {
		const newSet = new Set(selectedIds);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		selectedIds = newSet;
		onSelectionChange?.(selectedIds);
	}

	const allSelected = $derived(data.length > 0 && selectedIds.size === data.length);
	const indeterminate = $derived(selectedIds.size > 0 && selectedIds.size < data.length);
</script>

<div class="datagrid-container">
	<table class="datagrid">
		<thead>
			<tr>
				{#if selectable}
					<th class="w-10 text-center">
						<input type="checkbox" checked={allSelected} {indeterminate} onchange={toggleAll} />
					</th>
				{/if}
				{#each columns as col}
					<th
						class:sortable={col.sortable}
						onclick={() => col.sortable && handleSort(col.key)}
						style:width={col.width}
					>
						<div class="th-content">
							<span>{col.label}</span>
							<span class="sort-icon-wrapper" class:visible={sortKey === col.key}>
								<Icon icon={sortDirection === 'asc' ? ChevronUp : ChevronDown} size={14} />
							</span>
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each sortedData as row (row[keyField])}
				{@const id = row[keyField] as string | number}
				<tr class:selected={selectedIds.has(id)} onclick={() => onRowClick?.(row)}>
					{#if selectable}
						<td class="text-center" onclick={(e) => e.stopPropagation()}>
							<input type="checkbox" checked={selectedIds.has(id)} onchange={() => toggleRow(id)} />
						</td>
					{/if}
					{#each columns as col}
						<td>
							{row[col.key]}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.datagrid-container {
		width: 100%;
		overflow-x: auto;
		border: 1px solid var(--border-base);
		border-radius: 0.375rem;
		background-color: var(--bg-surface);
	}

	.datagrid {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
		text-align: left;
	}

	thead {
		background-color: var(--bg-surface-alt);
		border-bottom: 1px solid var(--border-base);
	}

	th {
		padding: calc(0.5rem * var(--density)) calc(0.75rem * var(--density));
		font-weight: 600;
		color: var(--text-secondary);
		white-space: nowrap;
	}
	/* ... */
	td {
		padding: calc(0.5rem * var(--density)) calc(0.75rem * var(--density));
		border-bottom: 1px solid var(--border-base);
		color: var(--text-primary);
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	tbody tr:hover {
		background-color: var(--bg-surface-alt);
	}

	tbody tr.selected {
		background-color: var(--bg-surface-alt);
	}

	.text-center {
		text-align: center;
	}
	.w-10 {
		width: 2.5rem;
	}
	:global(.ml-1) {
		margin-left: 0.25rem;
	}

	.sort-icon-wrapper {
		display: inline-flex;
		align-items: center;
		color: var(--text-tertiary);
		margin-left: 0.25rem;
		opacity: 0;
		transition: opacity 0.2s;
		width: 14px; /* Fixed width matching icon size */
	}

	.sort-icon-wrapper.visible {
		opacity: 1;
		color: var(--action-primary);
	}

	th:hover .sort-icon-wrapper {
		opacity: 0.5;
	}

	th:hover .sort-icon-wrapper.visible {
		opacity: 1;
	}
</style>
