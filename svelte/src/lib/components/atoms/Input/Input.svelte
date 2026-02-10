<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		'aria-invalid'?: boolean | 'grammar' | 'spelling';
		error?: boolean;
		fullWidth?: boolean;
		type?:
			| 'text'
			| 'email'
			| 'password'
			| 'number'
			| 'date'
			| 'datetime-local'
			| 'time'
			| 'month'
			| 'week'
			| 'tel'
			| 'url'
			| 'search'
			| 'file'
			| 'hidden';
	}

	let {
		class: className = '',
		value = $bindable(),
		type = 'text',
		disabled,
		error = false,
		fullWidth = false,
		...rest
	}: Props = $props();

	function cx(...classes: any[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<input
	{type}
	class={cx('input', error && 'error', fullWidth && 'full-width', className)}
	bind:value
	{disabled}
	aria-invalid={error ? true : undefined}
	{...rest}
/>

<style>
	.input {
		display: flex;
		border-radius: var(--control-radius);
		border: 1px solid var(--border-base);
		background-color: transparent;
		padding: 0.25rem 0.75rem;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--text-primary);

		/* Density handled via control-height-base */
		height: var(--control-height-base);
		width: auto; /* Default to auto width unless fullWidth */
	}

	/* Placeholder opacity needs browser prefixes typically, keeping it simple for now standard */
	.input::placeholder {
		color: var(--text-tertiary);
	}

	.input:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--border-focus);
		border-color: var(--border-focus);
	}

	.input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
		background-color: var(--bg-surface-alt);
	}

	.input.error {
		border-color: var(--status-error);
	}
	.input.error:focus-visible {
		box-shadow: 0 0 0 2px var(--status-error);
		border-color: var(--status-error);
	}

	.input.full-width {
		width: 100%;
	}

	/* Type specific styles */
	input[type='search'] {
		border-radius: 9999px; /* Rounded pill for search */
	}

	/* File input styling hacks usually needed, but basic for now */
	input[type='file'] {
		padding: 0.125rem;
		line-height: normal;
	}
	input[type='file']::file-selector-button {
		margin-right: 0.75rem;
		border: none;
		background: var(--bg-surface-alt);
		padding: 0.25rem 0.5rem;
		border-radius: var(--control-radius);
		color: var(--text-primary);
		cursor: pointer;
		font-size: var(--text-xs);
		font-family: var(--font-sans);
		transition: background-color 0.2s;
	}
	input[type='file']::file-selector-button:hover {
		background-color: var(--bg-surface-hover);
	}
</style>
