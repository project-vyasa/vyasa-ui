<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		gap?: 'sm' | 'md' | 'lg';
		columns?: 1 | 2 | 3 | 4;
		children: Snippet;
		class?: string;
		onSubmit?: (e: SubmitEvent) => void;
	}

	let { gap = 'md', columns = 1, children, class: className = '', onSubmit }: Props = $props();
</script>

<form
	class="form gap-{gap} cols-{columns} {className}"
	onsubmit={(e) => {
		if (onSubmit) {
			e.preventDefault();
			onSubmit(e);
		}
	}}
>
	{@render children()}
</form>

<style>
	.form {
		display: grid;
		width: 100%;
	}

	/* Gaps */
	.gap-sm {
		gap: 0.5rem;
	}
	.gap-md {
		gap: 1rem;
		row-gap: 1.5rem; /* Larger row gap for better separation */
	}
	.gap-lg {
		gap: 2rem;
	}

	/* Columns */
	.cols-1 {
		grid-template-columns: 1fr;
	}
	.cols-2 {
		grid-template-columns: repeat(2, 1fr);
	}
	.cols-3 {
		grid-template-columns: repeat(3, 1fr);
	}
	.cols-4 {
		grid-template-columns: repeat(4, 1fr);
	}

	/* Responsive adjustments - collapse to 1 col on mobile */
	@media (max-width: 640px) {
		.cols-2,
		.cols-3,
		.cols-4 {
			grid-template-columns: 1fr;
		}
	}
</style>
