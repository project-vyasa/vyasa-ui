<script lang="ts">
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';
	import { getContext } from 'svelte';

	interface Props {
		appName?: string;
		href?: string;
		leftVisible?: boolean;
		bottomVisible?: boolean;
		rightVisible?: boolean;
	}

	let {
		appName = 'Vyasa IDE',
		href = '/',
		leftVisible = $bindable(true),
		bottomVisible = $bindable(true),
		rightVisible = $bindable(false)
	}: Props = $props();

	const themeCtx = getContext<any>('theme');
	const appShellCtx = getContext<{ hasLeft: boolean; hasRight: boolean; hasBottom: boolean }>(
		'appShell'
	);

	const showLeftToggle = $derived(appShellCtx?.hasLeft ?? true);
	const showRightToggle = $derived(appShellCtx?.hasRight ?? true);
	const showBottomToggle = $derived(appShellCtx?.hasBottom ?? true);
</script>

<div class="app-header">
	<div class="header-left">
		<a {href} class="app-title">{appName}</a>
	</div>

	<div class="header-center"></div>

	<div class="header-right">
		{#if themeCtx}
			<div class="divider-v"></div>
		{/if}

		<!-- Panel Toggles -->
		{#if showLeftToggle}
			<Button
				variant={leftVisible ? 'secondary' : 'ghost'}
				size="icon"
				class={leftVisible ? 'active-t' : ''}
				onclick={() => (leftVisible = !leftVisible)}
				title="Toggle Left Sidebar"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="2" y="2" width="12" height="12" rx="2" />
					<path d="M6 2v12" />
					{#if leftVisible}
						<path d="M6 2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2V2z" fill="currentColor" stroke="none" />
					{/if}
				</svg>
			</Button>
		{/if}

		{#if showBottomToggle}
			<Button
				variant={bottomVisible ? 'secondary' : 'ghost'}
				size="icon"
				class={bottomVisible ? 'active-t' : ''}
				onclick={() => (bottomVisible = !bottomVisible)}
				title="Toggle Bottom Panel"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="2" y="2" width="12" height="12" rx="2" />
					<path d="M2 10h12" />
					{#if bottomVisible}
						<path
							d="M2 10v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2H2z"
							fill="currentColor"
							stroke="none"
						/>
					{/if}
				</svg>
			</Button>
		{/if}

		{#if showRightToggle}
			<Button
				variant={rightVisible ? 'secondary' : 'ghost'}
				size="icon"
				class={rightVisible ? 'active-t' : ''}
				onclick={() => (rightVisible = !rightVisible)}
				title="Toggle Right Sidebar"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="2" y="2" width="12" height="12" rx="2" />
					<path d="M10 2v12" />
					{#if rightVisible}
						<path
							d="M10 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2V2z"
							fill="currentColor"
							stroke="none"
						/>
					{/if}
				</svg>
			</Button>
		{/if}
	</div>
</div>

<style>
	.app-header {
		display: flex;
		align-items: center;
		padding: 0 var(--space-4);
		height: 100%;
		gap: var(--space-4);
		background-color: var(--bg-surface-alt);
		font-size: var(--text-sm);
	}
	.header-left,
	.header-center,
	.header-right {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}
	.header-center {
		flex: 1;
		justify-content: center;
	}
	.header-right {
		color: var(--text-primary);
	}
	.app-title {
		font-weight: 600;
		text-decoration: none;
		color: inherit;
	}
	:global(.active-t) {
		background-color: var(--action-primary);
		color: var(--action-text);
	}
	.divider-v {
		width: 1px;
		height: 1.5rem;
		background-color: var(--border-base);
		margin: 0 var(--space-2);
	}

	/* Ensure SVGs scale nicely */
	:global(.app-header .btn svg) {
		width: calc(1.15rem * var(--density, 1));
		height: calc(1.15rem * var(--density, 1));
	}
</style>
