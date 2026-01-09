<script lang="ts">
	import '../lib/style/design-system.css';
	import ThemeProvider from '$lib/components/utils/ThemeProvider.svelte';
	import ToastProvider from '$lib/components/molecules/Toast/ToastProvider.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<ToastProvider>
	<ThemeProvider>
		{@render children?.()}
	</ThemeProvider>
</ToastProvider>
