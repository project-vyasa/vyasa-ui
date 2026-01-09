<script lang="ts">
	import Icon from '../../atoms/Icon/Icon.svelte';
	import { onDestroy } from 'svelte';

	interface Option {
		label: string;
		value: any;
	}

	interface Props {
		options: Option[];
		value?: any | any[];
		multiple?: boolean;
		placeholder?: string;
		disabled?: boolean;
		searchable?: boolean;
		id?: string;
		name?: string;
		onchange?: (value: any) => void;
	}

	let {
		options,
		value = $bindable(),
		multiple = false,
		placeholder = 'Select...',
		disabled = false,
		searchable = false,
		id,
		name,
		onchange
	}: Props = $props();

	let isOpen = $state(false);
	let searchQuery = $state('');
	let containerRef: HTMLDivElement | undefined = $state(undefined);

	// Initialize value if undefined
	$effect(() => {
		if (value === undefined) {
			value = multiple ? [] : null;
		}
	});

	let filteredOptions = $derived(
		searchable && searchQuery
			? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
			: options
	);

	let displayValue = $derived.by(() => {
		if (multiple) {
			if (!Array.isArray(value) || value.length === 0) return placeholder;
			const selectedBuffer = options.filter((opt) => value.includes(opt.value));
			if (selectedBuffer.length === 0) return placeholder;
			return selectedBuffer.map((opt) => opt.label).join(', ');
		} else {
			const selected = options.find((opt) => opt.value === value);
			return selected ? selected.label : placeholder;
		}
	});

	function toggle() {
		if (disabled) return;
		isOpen = !isOpen;
		if (isOpen && searchable) {
			// Focus search input logic could go here
		}
	}

	function select(optionVal: any, e?: Event) {
		if (e) e.stopPropagation();

		if (multiple) {
			let currentVal = Array.isArray(value) ? value : [];
			if (currentVal.includes(optionVal)) {
				value = currentVal.filter((v: any) => v !== optionVal);
			} else {
				value = [...currentVal, optionVal];
			}
		} else {
			value = optionVal;
			isOpen = false;
		}
		onchange?.(value);
	}

	function handleOutsideClick(event: MouseEvent) {
		if (isOpen && containerRef && !containerRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	// Effect for handling outside clicks
	$effect(() => {
		if (isOpen) {
			if (typeof window !== 'undefined') {
				window.addEventListener('click', handleOutsideClick);
			}
		} else {
			if (typeof window !== 'undefined') {
				window.removeEventListener('click', handleOutsideClick);
			}
		}
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('click', handleOutsideClick);
			}
		};
	});

	function isSelected(optValue: any) {
		if (multiple) {
			return Array.isArray(value) && value.includes(optValue);
		}
		return value === optValue;
	}
</script>

<div class="select-container" class:disabled bind:this={containerRef}>
	<!-- Trigger -->
	<div
		class="select-trigger"
		onclick={toggle}
		role="combobox"
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		aria-controls="select-options"
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		onkeydown={(e) => e.key === 'Enter' && toggle()}
	>
		<span class="select-value" class:placeholder={displayValue === placeholder}>
			{displayValue}
		</span>
		<Icon name="ChevronDown" size={16} class="select-icon" />
	</div>

	<input type="hidden" {name} value={JSON.stringify(value)} {id} />

	{#if isOpen}
		<div class="select-dropdown" role="listbox" id="select-options">
			{#if searchable}
				<div class="search-box">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search..."
						class="search-input"
						onclick={(e) => e.stopPropagation()}
					/>
				</div>
			{/if}

			<div class="options-list">
				{#each filteredOptions as option}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						class="option-item"
						class:selected={isSelected(option.value)}
						onclick={(e) => select(option.value, e)}
						role="option"
						aria-selected={isSelected(option.value)}
						tabindex="0"
					>
						<span>{option.label}</span>
						{#if isSelected(option.value)}
							<Icon name="Check" size={14} class="check-icon" />
						{/if}
					</div>
				{:else}
					<div class="no-options">No options found</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.select-container {
		position: relative;
		width: 100%;
		display: inline-block;
		font-family: var(--font-sans);
	}

	.select-container.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.select-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.75rem;
		background-color: var(--bg-surface);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		cursor: pointer;
		height: var(--control-height-base);
		user-select: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.select-trigger:focus {
		outline: none;
		border-color: var(--action-primary);
		box-shadow: 0 0 0 2px var(--action-primary-alpha);
	}

	.select-value {
		font-size: var(--text-sm);
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 0.5rem;
	}

	.select-value.placeholder {
		color: var(--text-secondary);
	}

	.select-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		background-color: var(--bg-surface-elevated);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		z-index: 50;
		overflow: hidden;
	}

	.search-box {
		padding: 0.5rem;
		border-bottom: 1px solid var(--border-base);
	}

	.search-input {
		width: 100%;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border-base);
		border-radius: calc(var(--control-radius) - 2px);
		font-size: var(--text-sm);
		background-color: var(--bg-surface);
		color: var(--text-primary);
	}
	.search-input:focus {
		outline: none;
		border-color: var(--action-primary);
	}

	.options-list {
		max-height: 15rem;
		overflow-y: auto;
	}

	.option-item {
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		font-size: var(--text-sm);
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--text-primary);
	}

	.option-item:hover {
		background-color: var(--bg-surface-alt);
	}

	.option-item.selected {
		background-color: var(
			--action-primary-alpha
		); /* Needs defining, or just a light usage of primary */
		color: var(--action-primary);
		font-weight: 500;
	}

	.no-options {
		padding: 0.75rem;
		text-align: center;
		color: var(--text-secondary);
		font-size: var(--text-sm);
	}
</style>
