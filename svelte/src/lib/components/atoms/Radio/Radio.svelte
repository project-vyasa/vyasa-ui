<script lang="ts">
	interface Props {
		group: any;
		value: any;
		label?: string;
		disabled?: boolean;
		name?: string;
		id?: string;
		onchange?: (value: any) => void;
	}

	let { group = $bindable(), value, label, disabled = false, name, id, onchange }: Props = $props();

	function handleChange() {
		group = value;
		onchange?.(value);
	}
</script>

<label class="radio-container" class:disabled>
	<input
		{id}
		{name}
		type="radio"
		{value}
		bind:group
		{disabled}
		onchange={handleChange}
		class="radio-input"
	/>
	<span class="custom-radio">
		<span class="radio-dot"></span>
	</span>
	{#if label}
		<span class="label-text">{label}</span>
	{/if}
</label>

<style>
	.radio-container {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
		position: relative;
		gap: 0.5rem;
	}

	.radio-container.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.radio-input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.custom-radio {
		height: 1.25rem;
		width: 1.25rem;
		border: 1px solid var(--border-base);
		border-radius: 50%;
		background-color: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
		flex-shrink: 0;
	}

	.radio-input:focus-visible + .custom-radio {
		outline: 2px solid var(--action-primary);
		outline-offset: 2px;
	}

	.radio-input:checked + .custom-radio {
		border-color: var(--action-primary);
	}

	.radio-dot {
		height: 0.625rem;
		width: 0.625rem;
		background-color: var(--action-primary);
		border-radius: 50%;
		transform: scale(0);
		transition: transform 0.2s;
	}

	.radio-input:checked + .custom-radio .radio-dot {
		transform: scale(1);
	}

	.label-text {
		font-size: var(--text-sm);
		color: var(--text-primary);
		font-weight: 500;
	}
</style>
