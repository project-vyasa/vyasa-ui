<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label?: string;
		error?: string;
		hint?: string;
		required?: boolean;
		id?: string;
		children: Snippet;
	}

	let { label, error, hint, required, id, children }: Props = $props();
</script>

<div class="form-field">
	{#if label}
		<label for={id} class="label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	{@render children()}

	{#if error}
		<p class="message error" role="alert">{error}</p>
	{:else if hint}
		<p class="message hint">{hint}</p>
	{/if}
</div>

<style>
	.form-field {
		width: 100%;
		margin-bottom: 1rem;
	}

	.label {
		display: block;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.required {
		color: var(--status-error);
		margin-left: 0.125rem;
	}

	.message {
		font-size: var(--text-xs);
		margin-top: 0.25rem;
	}

	.message.error {
		color: var(--status-error);
	}

	.message.hint {
		color: var(--text-tertiary);
	}
</style>
