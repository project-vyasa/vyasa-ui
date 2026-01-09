<script lang="ts">
	import { toast } from '$lib/stores/toast.svelte.js';
	import ToastItem from './Toast.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}

<div class="toast-viewport">
	{#each toast.toasts as t (t.id)}
		<ToastItem item={t} />
	{/each}
</div>

<style>
	.toast-viewport {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 1000;
		pointer-events: none; /* Let clicks pass through empty areas */
	}
</style>
