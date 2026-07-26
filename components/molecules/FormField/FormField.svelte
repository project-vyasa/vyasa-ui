<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label?: string;
		error?: string;
		hint?: string;
		description?: string; // Alias for hint, more common in robust forms
		required?: boolean;
		id?: string;
		layout?: 'vertical' | 'horizontal';
		align?: 'start' | 'center' | 'end'; // Alignment for horizontal layout
		children: Snippet;
		class?: string;
	}

	let {
		label,
		error,
		hint,
		description,
		required,
		id,
		layout = 'vertical',
		align = 'start',
		children,
		class: className = ''
	}: Props = $props();

	let finalDescription = $derived(description || hint);
	let hasFooter = $derived(!!error || !!finalDescription);
</script>

<div class="form-field {layout} align-{align} {className}" class:has-footer={hasFooter}>
	{#if label}
		<label for={id} class="label">
			{label}
			{#if required}
				<span class="required" aria-hidden="true">*</span>
			{/if}
			<!-- Display description below label in horizontal mode for better spacing? 
                 Or keep standard? Let's keep description with control for now. -->
		</label>
	{/if}

	<div class="control-wrapper">
		{@render children()}

		{#if error}
			<p class="message error" role="alert">{error}</p>
		{:else if finalDescription}
			<p class="message hint">{finalDescription}</p>
		{/if}
	</div>
</div>

<style>
	.form-field {
		width: 100%;
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
	}

	.form-field.horizontal {
		flex-direction: row;
		gap: 1rem;
	}

	.form-field.horizontal.align-center {
		align-items: flex-start;
	}
	/* Top alignment + fixed padding for consistent alignment, immune to baseline quirks */
	.form-field.horizontal.align-center .label {
		padding-top: 0.55rem;
		margin-bottom: 0;
	}

	.form-field.horizontal.align-start {
		align-items: flex-start;
		padding-top: 0;
	}
	.form-field.horizontal.align-start .label {
		padding-top: 0.25rem; /* Optical alignment for top-aligned inputs */
	}

	.form-field.horizontal .label {
		width: 150px; /* Fixed width for labels in horizontal mode, or flex-basis */
		flex-shrink: 0;
		text-align: right; /* Optional: right align labels in horizontal forms */
	}

	.control-wrapper {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
		/* Ensure control doesn't overflow */
		min-width: 0;
	}

	.label {
		display: block;
		font-size: var(--text-sm);
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
		line-height: normal;
	}

	.required {
		color: var(--status-error);
		margin-left: 0.125rem;
	}

	.message {
		font-size: var(--text-xs);
		margin-top: 0.25rem;
		line-height: 1.4;
	}

	.message.error {
		color: var(--status-error);
	}

	.message.hint {
		color: var(--text-tertiary);
	}
</style>
