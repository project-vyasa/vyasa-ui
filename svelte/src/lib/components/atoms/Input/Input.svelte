<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLInputAttributes {
		'aria-invalid'?: boolean | 'grammar' | 'spelling';
		error?: boolean;
		fullWidth?: boolean;
		prefix?: Snippet;
		suffix?: Snippet;
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
		prefix,
		suffix,
		...rest
	}: Props = $props();

	function cx(...classes: any[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<div
	class={cx(
		'input-wrapper',
		error && 'error',
		fullWidth && 'full-width',
		disabled && 'disabled',
		className
	)}
>
	{#if prefix}
		<div class="input-prefix">{@render prefix()}</div>
	{/if}

	<input
		{type}
		class="input-control"
		bind:value
		{disabled}
		aria-invalid={error ? true : undefined}
		{...rest}
	/>

	{#if suffix}
		<div class="input-suffix">{@render suffix()}</div>
	{/if}
</div>

<style>
	.input-wrapper {
		display: flex;
		align-items: center;
		border-radius: var(--control-radius);
		border: 1px solid var(--border-base);
		background-color: var(--bg-surface);
		padding: 0 calc(0.75rem * var(--density, 1)); /* Scaling padding with density */
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		/* Height handled by wrapper content or explicit height */
		height: var(--control-height-base);
		width: auto;
		position: relative;
	}

	.input-wrapper:focus-within {
		border-color: var(--border-focus);
		box-shadow: 0 0 0 2px var(--border-focus);
	}

	.input-wrapper.error {
		border-color: var(--status-error);
	}
	.input-wrapper.error:focus-within {
		box-shadow: 0 0 0 2px var(--status-error);
		border-color: var(--status-error);
	}

	.input-wrapper.disabled {
		cursor: not-allowed;
		opacity: 0.6;
		background-color: var(--bg-surface-alt);
	}

	.input-wrapper.full-width {
		width: 100%;
	}

	/* The actual input element */
	.input-control {
		flex: 1;
		min-width: 0;
		border: none;
		background: transparent;
		padding: 0.25rem 0; /* Vertical padding only */
		height: 100%;
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--text-primary);
		outline: none;
	}

	.input-control::placeholder {
		color: var(--text-tertiary);
	}

	.input-control:disabled {
		cursor: not-allowed;
	}

	.input-prefix,
	.input-suffix {
		display: flex;
		align-items: center;
		color: var(--text-secondary);
	}
	.input-prefix {
		margin-right: 0.5rem;
	}
	.input-suffix {
		margin-left: 0.5rem;
	}

	/* Search styling tweaks */
	.input-wrapper:has(input[type='search']) {
		border-radius: 9999px;
	}

	/* File input special handling */
	input[type='file'] {
		padding: 0.125rem 0;
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
