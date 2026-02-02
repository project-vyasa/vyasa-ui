<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		size?: number | string;
		strokeWidth?: number | string;
		class?: string;
		[key: string]: any;
	}

	let {
		icon: IconComponent,
		size = 16,
		strokeWidth = 2,
		class: className,
		...rest
	}: Props = $props();
</script>

{#if IconComponent}
	<IconComponent {size} {strokeWidth} class={className} {...rest} />
{/if}
