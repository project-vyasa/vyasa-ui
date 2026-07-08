<script lang="ts" generics="T">
	import { type Snippet } from 'svelte';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	interface Props<T> {
		items: T[];
		keyField?: keyof T;

		selectable?: boolean;
		selectedIds?: Set<string | number>;
		selectedId?: string | number;

		onSelect?: (item: T) => void;
		onSelectionChange?: (ids: Set<string | number>) => void;

		titleField?: keyof T | ((item: T) => string);
		subtitleField?: keyof T | ((item: T) => string);
		descriptionField?: keyof T | ((item: T) => string);
		metaField?: keyof T | ((item: T) => string);
		unreadField?: keyof T | ((item: T) => boolean);

		avatar?: Snippet<[T]>;
		title?: Snippet<[T]>;
		meta?: Snippet<[T]>;
		actions?: Snippet<[T]>;
		item?: Snippet<[T]>;

		groupBy?: keyof T | ((item: T) => string);
		groupHeader?: Snippet<[string]>;

		class?: string;
	}

	let {
		items = [],
		keyField = 'id' as keyof T,
		selectable = false,
		selectedIds = $bindable(new SvelteSet()),
		selectedId = $bindable(undefined),
		onSelect,
		onSelectionChange,

		titleField,
		subtitleField,
		descriptionField,
		metaField,
		unreadField,

		avatar,
		title,
		meta,
		actions,
		item: itemSnippet,

		groupBy,
		groupHeader,
		class: className = ''
	}: Props<T> = $props();

	let container = $state<HTMLElement>();

	// --- Helper Accessors ---
	function getTitle(row: T): string {
		if (typeof titleField === 'function') return titleField(row);
		if (titleField) return String(row[titleField] ?? '');
		return String((row as Record<string, unknown>).title ?? '');
	}

	function getSubtitle(row: T): string {
		if (typeof subtitleField === 'function') return subtitleField(row);
		if (subtitleField) return String(row[subtitleField] ?? '');
		return String((row as Record<string, unknown>).subtitle ?? '');
	}

	function getDescription(row: T): string {
		if (typeof descriptionField === 'function') return descriptionField(row);
		if (descriptionField) return String(row[descriptionField] ?? '');
		return String((row as Record<string, unknown>).description ?? '');
	}

	function getMeta(row: T): string {
		if (typeof metaField === 'function') return metaField(row);
		if (metaField) return String(row[metaField] ?? '');
		return String((row as Record<string, unknown>).meta ?? '');
	}

	function getUnread(row: T): boolean {
		if (typeof unreadField === 'function') return unreadField(row);
		if (unreadField) return Boolean(row[unreadField]);
		return Boolean((row as Record<string, unknown>).unread);
	}

	// --- Grouping Logic ---
	interface GroupedItems {
		name: string;
		items: T[];
	}

	const groupedItems = $derived.by<GroupedItems[]>(() => {
		if (!groupBy) {
			return [{ name: '', items }];
		}

		const groupsMap = new SvelteMap<string, T[]>();
		for (const row of items) {
			let groupName = '';
			if (typeof groupBy === 'function') {
				groupName = groupBy(row);
			} else {
				groupName = String(row[groupBy] ?? '');
			}

			if (!groupsMap.has(groupName)) {
				groupsMap.set(groupName, []);
			}
			groupsMap.get(groupName)!.push(row);
		}

		return Array.from(groupsMap.entries()).map(([name, items]) => ({
			name,
			items
		}));
	});

	// --- Selection Handling ---
	function handleRowClick(row: T) {
		const id = row[keyField] as string | number;
		selectedId = id;
		onSelect?.(row);
	}

	function handleCheckboxClick(row: T) {
		const id = row[keyField] as string | number;
		const newSet = new SvelteSet(selectedIds);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		selectedIds = newSet;
		onSelectionChange?.(selectedIds);
	}

	// --- Keyboard Navigation ---
	function handleKeyDown(e: KeyboardEvent, row: T) {
		const id = row[keyField] as string | number;
		if (e.key === 'Enter') {
			e.preventDefault();
			handleRowClick(row);
		} else if (e.key === ' ') {
			e.preventDefault();
			if (selectable) {
				handleCheckboxClick(row);
			} else {
				handleRowClick(row);
			}
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			const index = items.findIndex((item) => item[keyField] === id);
			let nextIndex = index;
			if (e.key === 'ArrowDown') {
				nextIndex = Math.min(items.length - 1, index + 1);
			} else {
				nextIndex = Math.max(0, index - 1);
			}

			const nextRow = items[nextIndex];
			const nextId = nextRow[keyField] as string | number;

			selectedId = nextId;
			onSelect?.(nextRow);

			if (container) {
				const nodes = container.querySelectorAll('.list-view-item');
				const targetNode = nodes[nextIndex] as HTMLElement;
				targetNode?.focus();
			}
		}
	}
</script>

<div
	bind:this={container}
	class="list-view {className}"
	role="listbox"
	aria-multiselectable={selectable}
>
	{#each groupedItems as group (group.name)}
		{#if group.name}
			{#if groupHeader}
				{@render groupHeader(group.name)}
			{:else}
				<div class="list-view-group-header">
					{group.name}
				</div>
			{/if}
		{/if}

		<div class="list-view-group-items">
			{#each group.items as row (row[keyField])}
				{@const id = row[keyField] as string | number}
				{@const isSelected = selectedId === id}
				{@const isChecked = selectedIds.has(id)}
				{@const isUnread = getUnread(row)}

				<div
					class="list-view-item"
					class:selected={isSelected}
					class:checked={isChecked}
					class:unread={isUnread}
					onclick={() => handleRowClick(row)}
					onkeydown={(e) => handleKeyDown(e, row)}
					role="option"
					aria-selected={isSelected}
					tabindex="0"
				>
					{#if itemSnippet}
						{@render itemSnippet(row)}
					{:else}
						<!-- Avatar / Selection Area -->
						{#if selectable || avatar}
							<!-- stopPropagation to avoid triggering row select when clicking checkbox/avatar -->
							<div
								class="item-avatar-area"
								onclick={(e) => {
									e.stopPropagation();
									handleCheckboxClick(row);
								}}
								role="presentation"
							>
								{#if avatar}
									{@render avatar(row)}
								{:else if selectable}
									<input
										type="checkbox"
										checked={isChecked}
										class="item-checkbox"
										tabindex="-1"
										onclick={(e) => e.stopPropagation()}
										onchange={() => handleCheckboxClick(row)}
									/>
								{/if}
							</div>
						{/if}

						<!-- Content Block -->
						<div class="item-content">
							<div class="item-header-row">
								<div class="item-title">
									{#if title}
										{@render title(row)}
									{:else}
										{getTitle(row)}
									{/if}
									{#if isUnread}
										<span class="unread-dot" title="Unread"></span>
									{/if}
								</div>

								<div class="item-meta">
									{#if meta}
										{@render meta(row)}
									{:else}
										{getMeta(row)}
									{/if}
								</div>
							</div>

							{#if subtitleField || getSubtitle(row)}
								<div class="item-subtitle">
									{getSubtitle(row)}
								</div>
							{/if}

							{#if descriptionField || getDescription(row)}
								<div class="item-description">
									{getDescription(row)}
								</div>
							{/if}
						</div>

						<!-- Hover Actions -->
						{#if actions}
							<div class="item-actions" onclick={(e) => e.stopPropagation()} role="presentation">
								{@render actions(row)}
							</div>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.list-view {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: var(--bg-surface);
		color: var(--text-primary);
		font-family: var(--font-sans);
		overflow-y: auto;
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius, 6px);
	}

	.list-view-group-header {
		padding: calc(0.35rem * var(--density, 1)) var(--space-3);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--text-secondary);
		background-color: var(--bg-surface-alt);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--border-base);
		position: sticky;
		top: 0;
		z-index: 5;
	}

	.list-view-group-items {
		display: flex;
		flex-direction: column;
	}

	.list-view-item {
		display: flex;
		align-items: flex-start;
		padding: calc(var(--space-3) * var(--density, 1)) var(--space-4);
		border-bottom: 1px solid var(--border-base);
		cursor: pointer;
		position: relative;
		transition: background-color 0.15s ease;
		outline: none;
		gap: var(--space-3);
	}

	.list-view-item:last-child {
		border-bottom: none;
	}

	.list-view-item:hover {
		background-color: var(--bg-surface-alt);
	}

	.list-view-item.selected {
		background-color: var(--bg-surface-elevated);
		box-shadow: inset 3px 0 0 0 var(--action-primary);
	}

	.list-view-item:focus-visible {
		box-shadow: inset 0 0 0 2px var(--action-primary);
	}

	/* Avatar Area */
	.item-avatar-area {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 1.5rem;
		height: 1.5rem;
	}

	.item-checkbox {
		width: 1rem;
		height: 1rem;
		cursor: pointer;
		accent-color: var(--action-primary);
	}

	/* Content Block */
	.item-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0; /* Prevents text overflow breaking layout */
		gap: var(--space-1);
	}

	.item-header-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-2);
	}

	.item-title {
		font-weight: 500;
		font-size: var(--text-sm);
		color: var(--text-primary);
		display: flex;
		align-items: center;
		gap: var(--space-2);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-view-item.unread .item-title {
		font-weight: 700;
	}

	.unread-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		background-color: var(--action-primary);
		border-radius: 50%;
	}

	.item-meta {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.item-subtitle {
		font-size: var(--text-xs);
		color: var(--text-secondary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-view-item.unread .item-subtitle {
		font-weight: 600;
		color: var(--text-primary);
	}

	.item-description {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.4;
	}

	/* Actions Area */
	.item-actions {
		opacity: 0;
		transition: opacity 0.15s ease;
		display: flex;
		align-items: center;
		gap: var(--space-1);
		position: absolute;
		right: var(--space-4);
		top: 50%;
		transform: translateY(-50%);
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--bg-surface-alt) 20%,
			var(--bg-surface-alt) 100%
		);
		padding-left: var(--space-4);
		height: 80%;
	}

	.list-view-item.selected .item-actions {
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--bg-surface-elevated) 20%,
			var(--bg-surface-elevated) 100%
		);
	}

	.list-view-item:hover .item-actions {
		opacity: 1;
	}
</style>
