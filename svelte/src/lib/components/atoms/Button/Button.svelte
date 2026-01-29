<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { ComponentType } from 'svelte';
	import Icon from '../Icon/Icon.svelte';
	import { Loader2 } from 'lucide-svelte';

	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
		size?: 'sm' | 'md' | 'lg' | 'icon';
		loading?: boolean;
		icon?: ComponentType;
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		loading = false,
		icon,
		class: className = '',
		children,
		disabled,
		...rest
	}: Props = $props();

	function cx(...classes: any[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<button
	class={cx('btn', `variant-${variant}`, `size-${size}`, className)}
	disabled={disabled || loading}
	{...rest}
>
	{#if loading}
		<Icon icon={Loader2} class="spinner" size={16} />
	{/if}

	{#if icon && !loading}
		<Icon {icon} class="icon-left" size={16} />
	{/if}

	{#if children}
		<span>{@render children()}</span>
	{/if}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		border-radius: var(--control-radius);
		font-weight: var(--font-medium);
		transition:
			background-color 0.2s,
			color 0.2s,
			border-color 0.2s,
			opacity 0.2s;
		border: 1px solid transparent;
		cursor: pointer;
		font-family: var(--font-sans);
	}

	.btn:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 2px var(--border-focus),
			0 0 0 4px var(--bg-surface);
	}

	.btn:disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	/* Variants */
	.variant-primary {
		background-color: var(--action-primary);
		color: var(--action-text);
	}
	.variant-primary:hover {
		background-color: var(--action-primary-hover);
	}

	.variant-secondary {
		background-color: var(--bg-surface-alt);
		color: var(--text-primary);
	}
	.variant-secondary:hover {
		background-color: var(--border-base);
	}

	.variant-outline {
		background-color: transparent;
		border-color: var(--border-base);
		color: var(--text-primary);
	}
	.variant-outline:hover {
		background-color: var(--bg-surface-alt);
	}

	.variant-ghost {
		background-color: transparent;
		color: var(--text-secondary);
	}
	.variant-ghost:hover {
		background-color: var(--bg-surface-alt);
		color: var(--text-primary);
	}

	.variant-danger {
		background-color: var(--status-error);
		color: var(--color-white);
	}
	.variant-danger:hover {
		opacity: 0.9;
	}

	.variant-success {
		background-color: var(--status-success);
		color: var(--color-white);
	}
	.variant-success:hover {
		opacity: 0.9;
	}

	.variant-warning {
		background-color: var(--status-warning);
		color: var(--color-white);
	}
	.variant-warning:hover {
		opacity: 0.9;
	}

	/* Sizes */
	.size-sm {
		height: calc(2rem * var(--density));
		padding: 0 calc(0.75rem * var(--density));
		font-size: var(--text-sm);
	}

	.size-md {
		height: calc(2.5rem * var(--density));
		padding: 0 calc(1rem * var(--density));
		font-size: var(--text-base);
	}

	.size-lg {
		height: calc(3rem * var(--density));
		padding: 0 calc(2rem * var(--density));
		font-size: var(--text-lg);
	}

	.size-icon {
		height: calc(2.5rem * var(--density));
		width: calc(2.5rem * var(--density));
		padding: 0;
	}

	/* Children Spacing */
	/* We use :global because the Icon component is nested and might not be targeted directly by scoped styles if not passed as slot in a way svelte expects - actually direct descendants are fine but let's be safe or just use gap on flex container if we want, but margins work well for icon-left */

	:global(.spinner) {
		margin-right: 0.5rem;
		animation: spin 1s linear infinite;
	}

	:global(.icon-left) {
		margin-right: 0.5rem;
	}

	/* If size is icon, remove margins */
	.size-icon :global(.icon-left),
	.size-icon :global(.spinner) {
		margin-right: 0;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
