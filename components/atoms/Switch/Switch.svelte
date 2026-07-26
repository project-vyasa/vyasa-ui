<script lang="ts">
	interface Props {
		checked?: boolean;
		disabled?: boolean;
		size?: 'sm' | 'md' | 'lg';
		onchange?: (checked: boolean) => void;
		id?: string;
		name?: string;
		label?: string;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		size = 'md',
		onchange,
		id,
		name,
		label
	}: Props = $props();

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		checked = target.checked;
		onchange?.(checked);
	}
</script>

<label class="switch-container {size}" class:disabled>
	<input
		{id}
		{name}
		type="checkbox"
		bind:checked
		{disabled}
		onchange={handleChange}
		class="switch-input"
		role="switch"
		aria-checked={checked}
	/>
	<span class="switch-track">
		<span class="switch-thumb"></span>
	</span>
	{#if label}
		<span class="switch-label">{label}</span>
	{/if}
</label>

<style>
	.switch-container {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
		gap: 0.5rem;
		vertical-align: middle;
	}

	.switch-container.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.switch-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.switch-track {
		position: relative;
		display: inline-block;
		width: 2.25rem;
		height: 1.25rem;
		background-color: var(--color-gray-300);
		border-radius: 9999px;
		transition: background-color 0.2s ease-in-out;
	}

	.switch-thumb {
		position: absolute;
		top: 0.125rem;
		left: 0.125rem;
		width: 1rem;
		height: 1rem;
		background-color: white;
		border-radius: 50%;
		transition: transform 0.2s ease-in-out;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	/* Checked State */
	.switch-input:checked + .switch-track {
		background-color: var(--action-primary);
	}

	.switch-input:checked + .switch-track .switch-thumb {
		transform: translateX(1rem);
	}

	/* Focus State */
	.switch-input:focus-visible + .switch-track {
		outline: 2px solid var(--action-primary);
		outline-offset: 2px;
	}

	/* Sizes */
	.switch-container.sm .switch-track {
		width: 1.75rem;
		height: 1rem;
	}
	.switch-container.sm .switch-thumb {
		width: 0.75rem;
		height: 0.75rem;
	}
	.switch-container.sm .switch-input:checked + .switch-track .switch-thumb {
		transform: translateX(0.75rem);
	}

	.switch-container.lg .switch-track {
		width: 3rem;
		height: 1.5rem;
	}
	.switch-container.lg .switch-thumb {
		width: 1.25rem;
		height: 1.25rem;
	}
	.switch-container.lg .switch-input:checked + .switch-track .switch-thumb {
		transform: translateX(1.5rem);
	}

	.switch-label {
		font-size: var(--text-sm);
		color: var(--text-primary);
	}
</style>
