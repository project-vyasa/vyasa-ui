<script lang="ts">
	import Icon from '../../atoms/Icon/Icon.svelte';

	interface Props {
		variant?: 'info' | 'success' | 'warning' | 'danger';
		title?: string;
		closable?: boolean;
		onClose?: () => void;
		children?: import('svelte').Snippet;
	}

	let { variant = 'info', title, closable = false, onClose, children }: Props = $props();

	let visible = $state(true);

	function close() {
		visible = false;
		onClose?.();
	}

	const icons = {
		info: 'Info',
		success: 'CheckCircle',
		warning: 'AlertTriangle',
		danger: 'AlertOctagon'
	};

	let iconName = $derived(icons[variant] || 'Info');
</script>

{#if visible}
	<div class="alert {variant}" role="alert">
		<div class="alert-icon">
			<Icon name={iconName} size={24} />
		</div>
		<div class="alert-content">
			{#if title}
				<h4 class="alert-title">{title}</h4>
			{/if}
			<div class="alert-body">
				{@render children?.()}
			</div>
		</div>
		{#if closable}
			<button class="close-btn" onclick={close} aria-label="Close alert">
				<Icon name="X" size={16} />
			</button>
		{/if}
	</div>
{/if}

<style>
	.alert {
		position: relative;
		display: flex;
		padding: 1rem;
		border-radius: var(--control-radius);
		border: 1px solid transparent;
		gap: 1rem; /* Increased gap for larger icon */
		margin-bottom: 1rem;
		align-items: flex-start;
	}

	.alert-content {
		flex: 1;
		min-width: 0; /* Prevent overflow */
		padding-top: 0.125rem; /* Align text cap-height with icon */
	}

	.alert-title {
		font-weight: 600;
		margin-bottom: 0.25rem;
		font-size: var(--text-base); /* Increased slightly for better hierarchy */
		line-height: 1.4;
		margin-top: -0.125rem; /* Pull up to remove visual blank space */
	}

	.alert-body {
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.close-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.2s;
		margin-top: 0.125rem;
		color: inherit;
	}

	.close-btn:hover {
		opacity: 1;
	}

	/* Variants */
	.alert.info {
		background-color: var(--color-blue-50);
		border-color: var(--color-blue-200);
		color: var(--color-blue-900);
	}
	.alert.info .alert-icon {
		color: var(--color-blue-500);
	}

	.alert.success {
		background-color: var(--color-green-50);
		border-color: var(--color-green-200);
		color: var(--color-green-900);
	}
	.alert.success .alert-icon {
		color: var(--color-green-500);
	}

	.alert.warning {
		background-color: var(--color-yellow-50);
		border-color: var(--color-yellow-200);
		color: var(--color-yellow-900);
	}
	.alert.warning .alert-icon {
		color: var(--color-yellow-500);
	}
	.alert.warning .close-btn {
		color: var(--color-yellow-700);
	}

	.alert.danger {
		background-color: var(--color-red-50);
		border-color: var(--color-red-200);
		color: var(--color-red-900);
	}
	.alert.danger .alert-icon {
		color: var(--color-red-500);
	}

	/* Dark mode overrides would go here or be handled by variable mapping */
</style>
