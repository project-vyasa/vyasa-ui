<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		icon: Component | any;
		size?: number | string;
		strokeWidth?: number | string;
		class?: string;
		[key: string]: any;
	}

	let {
		icon,
		size = 16,
		strokeWidth = 2,
		class: className,
		...rest
	}: Props = $props();

	let IconComponent = $derived(icon);
</script>

{#key IconComponent}
	{#if IconComponent}
		<IconComponent {size} {strokeWidth} class={className} {...rest} />
	{/if}
{/key}
