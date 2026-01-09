<script lang="ts">
	import * as icons from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	// We accept valid lucide icon names.
	export type IconName = string;

	interface Props {
		name: IconName;
		size?: number | string;
		strokeWidth?: number | string;
		class?: string;
		[key: string]: any;
	}

	let { name, size = 16, strokeWidth = 2, class: className, ...rest }: Props = $props();

	// Dynamically resolve the component
	let IconComponent = $derived((icons as any)[name] as ComponentType);
</script>

{#if IconComponent}
	<IconComponent {size} {strokeWidth} class={className} {...rest} />
{:else}
	<!-- Fallback or empty if invalid name -->
	<span class="inline-block w-6 h-6 bg-red-100" title={`Icon not found: ${String(name)}`}></span>
{/if}
