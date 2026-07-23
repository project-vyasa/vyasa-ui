<script lang="ts">
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import { getContext } from 'svelte';

	interface Props {
		appName?: string;
		href?: string;
		leftVisible?: boolean;
		bottomVisible?: boolean;
		rightVisible?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		appName = 'Vyasa IDE',
		href = '/',
		leftVisible = $bindable(true),
		bottomVisible = $bindable(true),
		rightVisible = $bindable(false),
		children
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

	<div class="header-center">
		{@render children?.()}
	</div>

	<div class="header-right">
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

		{#if themeCtx}
			<div class="divider-v"></div>

			<Button
				variant="ghost"
				size="icon"
				onclick={() => themeCtx.toggleTheme()}
				title="Toggle Theme"
			>
				{#if themeCtx.current === 'dark'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="4" />
						<path d="M12 2v2" />
						<path d="M12 20v2" />
						<path d="m4.93 4.93 1.41 1.41" />
						<path d="m17.66 17.66 1.41 1.41" />
						<path d="M2 12h2" />
						<path d="M20 12h2" />
						<path d="m6.34 17.66-1.41 1.41" />
						<path d="m19.07 4.93-1.41 1.41" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
					</svg>
				{/if}
			</Button>

			<Button
				variant="ghost"
				size="icon"
				onclick={() => themeCtx.cycleDensity()}
				title="Toggle Density"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect width="20" height="14" x="2" y="3" rx="2" />
					<line x1="8" x2="16" y1="21" y2="21" />
					<line x1="12" x2="12" y1="17" y2="21" />
				</svg>
			</Button>
		{/if}
	</div>
</div>

<style>
	.app-header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		pointer-events: none;
	}
	.header-center > :global(*) {
		pointer-events: auto;
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
