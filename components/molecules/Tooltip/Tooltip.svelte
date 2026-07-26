<script lang="ts">
	interface Props {
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		children: import('svelte').Snippet;
	}

	let { text, position = 'top', children }: Props = $props();
</script>

<div class="tooltip-wrapper">
	{@render children()}
	<div class="tooltip" data-position={position}>
		{text}
	</div>
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		background-color: var(--color-gray-900);
		color: var(--color-white);
		text-align: center;
		padding: 0.25rem 0.5rem;
		border-radius: var(--control-radius);
		z-index: 100;
		white-space: nowrap;
		font-size: var(--text-xs);
		pointer-events: none;
		transition:
			opacity 0.15s ease-in-out,
			visibility 0.15s ease-in-out;

		/* Shadow for better visibility */
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	/* Light/Dark Mode override if needed, but tooltips are often inverse or dark by default */
	:global([data-theme='dark']) .tooltip {
		background-color: var(--color-gray-100);
		color: var(--color-gray-900);
	}

	.tooltip-wrapper:hover .tooltip {
		visibility: visible;
		opacity: 1;
	}

	/* Positioning Logic */
	.tooltip[data-position='top'] {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: 0.25rem;
	}

	.tooltip[data-position='bottom'] {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 0.25rem;
	}

	.tooltip[data-position='left'] {
		top: 50%;
		right: 100%;
		transform: translateY(-50%);
		margin-right: 0.25rem;
	}

	.tooltip[data-position='right'] {
		top: 50%;
		left: 100%;
		transform: translateY(-50%);
		margin-left: 0.25rem;
	}
</style>
