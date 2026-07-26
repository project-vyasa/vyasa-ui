<script lang="ts">
	interface Props {
		open?: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		body: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		onClose?: () => void;
	}

	let { open = $bindable(false), title, size = 'md', body, footer, onClose }: Props = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			close();
		}
	}

	function close() {
		open = false;
		onClose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="modal-backdrop" role="presentation" onclick={handleBackdropClick}>
		<div
			class="modal-container {size}"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			{#if title}
				<div class="modal-header">
					<h3 id="modal-title">{title}</h3>
					<button class="close-btn" onclick={close} aria-label="Close modal">
						<!-- We typically use an Icon here, but avoiding circular dep or assuming Icon existence for simplicity in this file, though we know Icon exists. Let's use generic close char or Icon if possible. -->
						<!-- Accessing Icon might require import. Keeping it simple with character for now or SVG. -->
						&times;
					</button>
				</div>
			{/if}

			<div class="modal-body">
				{@render body()}
			</div>

			{#if footer}
				<div class="modal-footer">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		backdrop-filter: blur(2px);
	}

	.modal-container {
		background-color: var(--bg-surface);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		display: flex;
		flex-direction: column;
		max-height: 90vh;
		width: 100%;
		margin: 1rem;
	}

	/* Sizes */
	.modal-container.sm {
		max-width: 24rem;
	}
	.modal-container.md {
		max-width: 32rem;
	}
	.modal-container.lg {
		max-width: 48rem;
	}
	.modal-container.xl {
		max-width: 64rem;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		border-bottom: 1px solid var(--border-base);
	}

	.modal-header h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		color: var(--text-secondary);
		padding: 0;
	}
	.close-btn:hover {
		color: var(--text-primary);
	}

	.modal-body {
		padding: 1rem;
		overflow-y: auto;
	}

	.modal-footer {
		padding: 1rem;
		border-top: 1px solid var(--border-base);
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		background-color: var(--bg-surface-alt);
	}
</style>
