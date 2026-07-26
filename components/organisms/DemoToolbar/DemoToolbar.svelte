<script lang="ts">
	import Button from '../../atoms/Button/Button.svelte';
	import { Sun, Moon, Maximize2, Home, Github } from 'lucide-svelte';
	import { getContext } from 'svelte';

	// Theme Context
	// Expects the parent layout or provider to expose 'theme' context
	const themeCtx = getContext<any>('theme');

	interface Props {
		title: string;
		backUrl?: string; // URL to go back to (default /)
		repoUrl?: string; // URL to repo (optional)
	}

	let { title, backUrl = '/', repoUrl }: Props = $props();
</script>

<header class="demo-toolbar">
	<div class="toolbar-content">
		<div class="left-section">
			<a href={backUrl} class="home-link" aria-label="Go Home">
				<Home size={20} />
			</a>
			<div class="divider-v"></div>
			<h1 class="page-title">{title}</h1>
		</div>

		<div class="right-section">
			<div class="controls">
				{#if themeCtx}
					<Button
						variant="outline"
						size="sm"
						onclick={() => themeCtx.toggleTheme()}
						icon={themeCtx.theme === 'dark' ? Sun : Moon}
					>
						{themeCtx.theme === 'light' ? 'Dark' : 'Light'}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onclick={() => themeCtx.cycleDensity()}
						icon={Maximize2}
					>
						{themeCtx.density}
					</Button>
				{/if}
				{#if repoUrl}
					<a href={repoUrl} target="_blank" rel="noopener noreferrer">
						<Button variant="ghost" size="icon" icon={Github} />
					</a>
				{/if}
			</div>
		</div>
	</div>
</header>

<style>
	.demo-toolbar {
		position: sticky;
		top: 0;
		z-index: 50;
		background-color: var(--bg-surface);
		border-bottom: 1px solid var(--border-base);
		padding: 0.75rem 1.5rem;
		/* Ensure it sits above content */
	}

	.toolbar-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px; /* Match typical demo max-width */
		margin: 0 auto;
	}

	.left-section {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.right-section {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.home-link {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-secondary);
		transition: color 0.2s;
	}
	.home-link:hover {
		color: var(--action-primary);
	}

	.divider-v {
		width: 1px;
		height: 1.5rem;
		background-color: var(--border-base);
	}

	.page-title {
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0;
		color: var(--text-primary);
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
