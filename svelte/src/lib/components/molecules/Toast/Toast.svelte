<script lang="ts">
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';
	import { toast, type Toast } from '$lib/stores/toast.svelte.js';
	import { fly } from 'svelte/transition';

	interface Props {
		item: Toast;
	}

	let { item }: Props = $props();

	const icons = {
		info: 'Info',
		success: 'CheckCircle',
		warning: 'AlertTriangle',
		danger: 'AlertOctagon'
	};

	let iconName = $derived(icons[item.variant || 'info'] || 'Info');
</script>

<div class="toast {item.variant || 'info'}" role="alert" transition:fly={{ y: 20, duration: 300 }}>
	<div class="toast-icon">
		<Icon name={iconName} size={20} />
	</div>
	<div class="toast-message">{item.message}</div>
	{#if item.dismissible}
		<button class="close-btn" onclick={() => toast.dismiss(item.id)} aria-label="Dismiss">
			<Icon name="X" size={16} />
		</button>
	{/if}
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: var(--bg-surface-elevated);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		gap: 0.75rem;
		min-width: 20rem;
		max-width: 24rem;
		pointer-events: auto;
	}

	.toast-message {
		flex: 1;
		font-size: var(--text-sm);
		color: var(--text-primary);
		line-height: 1.4;
	}

	.toast-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 0.2s;
		color: var(--text-secondary);
		display: flex;
	}
	.close-btn:hover {
		opacity: 1;
		color: var(--text-primary);
	}

	/* Variant Colors for Icon */
	.info .toast-icon {
		color: var(--color-blue-500);
	}
	.success .toast-icon {
		color: var(--color-green-500);
	}
	.warning .toast-icon {
		color: var(--color-yellow-500);
	}
	.danger .toast-icon {
		color: var(--color-red-500);
	}
</style>
