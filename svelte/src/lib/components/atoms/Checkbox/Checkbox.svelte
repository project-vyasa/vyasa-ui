<script lang="ts">
	interface Props {
		checked?: boolean | 'mixed';
		disabled?: boolean;
		label?: string;
		value?: string;
		name?: string;
		id?: string;
		onchange?: (checked: boolean | 'mixed', value?: string) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		label,
		value,
		name,
		id,
		onchange
	}: Props = $props();

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		checked = target.checked;
		onchange?.(checked, value);
	}

	// Handle 'mixed' (indeterminate) state programmatically via ref is tricky with binding,
	// usually simpler to trust browser behavior or explicit prop.
	// We'll use an action or effect if needed, but for now simple binding.
	// Note: HTML input type='checkbox' doesn't support 'mixed' as a value attribute, it's a property.
</script>

<label class="checkbox-container" class:disabled>
	<input
		{id}
		{name}
		{value}
		type="checkbox"
		checked={checked === true}
		{disabled}
		onchange={handleChange}
		class="checkbox-input"
		indeterminate={checked === 'mixed'}
	/>
	<span class="custom-checkbox">
		{#if checked === true}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="check-icon"
			>
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		{:else if checked === 'mixed'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="check-icon"
			>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
		{/if}
	</span>
	{#if label}
		<span class="label-text">{label}</span>
	{/if}
</label>

<style>
	.checkbox-container {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
		position: relative;
		gap: 0.5rem;
	}

	.checkbox-container.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.checkbox-input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.custom-checkbox {
		height: 1.25rem;
		width: 1.25rem;
		border: 1px solid var(--border-base);
		border-radius: 0.25rem;
		background-color: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
		flex-shrink: 0;
	}

	.checkbox-input:focus-visible + .custom-checkbox {
		outline: 2px solid var(--action-primary);
		outline-offset: 2px;
	}

	.checkbox-input:checked + .custom-checkbox,
	.checkbox-input:indeterminate + .custom-checkbox {
		background-color: var(--action-primary);
		border-color: var(--action-primary);
		color: var(--action-text);
	}

	.check-icon {
		width: 0.875rem;
		height: 0.875rem;
	}

	.label-text {
		font-size: var(--text-sm);
		color: var(--text-primary);
	}
</style>
