<script lang="ts">
	interface Props {
		variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { variant = 'neutral', children, class: className = '' }: Props = $props();
</script>

<span class="badge {variant} {className}">
	{#if children}
		{@render children()}
	{/if}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		padding: 0.125rem 0.5rem;
		border-radius: 9999px; /* Pill shape */
		font-size: var(--text-xs);
		font-weight: var(--font-medium);
		line-height: 1.5;
		white-space: nowrap;
		font-family: var(--font-sans);
	}

	.neutral {
		background-color: var(--color-gray-100);
		color: var(--color-gray-700);
	}

	.primary {
		background-color: var(--color-blue-100);
		color: var(--color-blue-900); /* Darker blue for text */
	}

	.success {
		background-color: var(--color-green-100);
		color: var(--color-green-900); /* Darker green for text */
	}

	.warning {
		background-color: var(--color-yellow-100);
		color: var(--color-yellow-900); /* Darker yellow/brown for text */
	}

	.danger {
		background-color: var(--color-red-100);
		color: var(--color-red-900); /* Darker red for text */
	}

	/* Dark Mode Overrides (if needed) - typically handled by variable remapping, 
       but if explicit high contrast is needed: */
	/* 
    :global([data-theme='dark']) .neutral { background: var(--color-gray-800); color: var(--color-gray-200); }
    */
</style>
