<script lang="ts">
	import type { SettingSection, SettingGroup, SettingItem as ISettingItem } from './types';
	import SettingItem from './SettingItem.svelte';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import { Search } from 'lucide-svelte';

	interface Props {
		schema: SettingSection[];
		data: Record<string, any>;
		class?: string;
	}

	let { schema, data = $bindable(), class: className = '' }: Props = $props();

	let searchQuery = $state('');
	let activeSectionId = $state(schema.length > 0 ? schema[0].id : '');
	let contentContainer: HTMLElement;
	let observer: IntersectionObserver;
	let isScrollingFromClick = false;

	// Filter schema based on search query
	let filteredSchema = $derived.by(() => {
		if (!searchQuery.trim()) return schema;

		const query = searchQuery.toLowerCase();
		return schema
			.map((section) => {
				const matchingGroups = section.groups
					.map((group) => {
						const matchingItems = group.items.filter((item) => {
							return (
								item.label.toLowerCase().includes(query) ||
								(item.description && item.description.toLowerCase().includes(query)) ||
								item.id.toLowerCase().includes(query)
							);
						});

						return { ...group, items: matchingItems };
					})
					.filter((group) => group.items.length > 0);

				return { ...section, groups: matchingGroups };
			})
			.filter((section) => section.groups.length > 0);
	});

	// Scroll Spy
	$effect(() => {
		if (typeof IntersectionObserver === 'undefined' || !contentContainer) return;

		const options = {
			root: contentContainer,
			threshold: 0.1,
			rootMargin: '-5% 0px -80% 0px' // Bias towards top
		};

		observer = new IntersectionObserver((entries) => {
			if (isScrollingFromClick) return;

			// Find valid intersecting entry with highest intersection ratio
			// But since we want "scroll spy" logic, usually the first visible one is good.
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.getAttribute('data-section-id');
					if (id) activeSectionId = id;
				}
			});
		}, options);

		const sections = contentContainer.querySelectorAll('.settings-section-block');
		sections.forEach((s) => observer.observe(s));

		return () => observer.disconnect();
	});

	// Re-run observer when filtered schema changes
	$effect(() => {
		// Triggered by schema change, wait for DOM update
		if (filteredSchema && observer && contentContainer) {
			// Small timeout to allow DOM to settle? Svelte types might not need it if reactivity works right.
			// Actually, the previous effect handles setup/teardown if dep changes.
			// But we need to re-observe if DOM nodes changed.
			// The simple way is to destroy and recreate observer.
			// Let's rely on the block above reacting to DOM changes or we simply re-select.
			// The above effect has no explicit dependency on filteredSchema, so it runs once.
			// We need it to run when list changes.
		}
	});

	// We can make the observer setup effect depend on filteredSchema length to re-run
	$effect(() => {
		filteredSchema; // dependency
		if (!contentContainer) return;

		// Cleanup old
		if (observer) observer.disconnect();

		const options = {
			root: contentContainer,
			threshold: 0,
			rootMargin: '-10px 0px -80% 0px'
		};

		observer = new IntersectionObserver((entries) => {
			if (isScrollingFromClick) return;

			const visible = entries.find((e) => e.isIntersecting);
			if (visible) {
				const id = visible.target.getAttribute('data-section-id');
				if (id) activeSectionId = id;
			}
		}, options);

		// Tick/Timeout ensures DOM is ready
		setTimeout(() => {
			const sections = contentContainer.querySelectorAll('.settings-section-block');
			sections.forEach((s) => observer.observe(s));
		}, 0);

		return () => observer && observer.disconnect();
	});

	function scrollToSection(id: string) {
		if (!contentContainer) return;
		isScrollingFromClick = true;
		activeSectionId = id;

		const el = contentContainer.querySelector(`[data-section-id="${id}"]`);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			// Reset flag after animation
			setTimeout(() => (isScrollingFromClick = false), 500);
		}
	}
</script>

<div class="settings-panel {className}">
	<aside class="settings-sidebar">
		<div class="sidebar-header">
			<div class="search-box">
				<Icon icon={Search} size={14} class="search-icon" />
				<input
					type="text"
					placeholder="Search settings..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>
		</div>
		<nav class="sidebar-nav">
			{#each filteredSchema as section}
				<button
					class="nav-item {activeSectionId === section.id ? 'active' : ''}"
					onclick={() => scrollToSection(section.id)}
				>
					{#if section.icon}
						<Icon icon={section.icon} size={16} />
					{/if}
					<span>{section.title}</span>
				</button>
			{/each}
		</nav>
	</aside>

	<main class="settings-content" bind:this={contentContainer}>
		{#if filteredSchema.length === 0}
			<div class="empty-state">
				<p>No settings found matching "{searchQuery}"</p>
				<Button variant="ghost" onclick={() => (searchQuery = '')}>Clear Search</Button>
			</div>
		{:else}
			{#each filteredSchema as section (section.id)}
				<section class="settings-section-block" data-section-id={section.id}>
					<header class="section-header">
						<h1>{section.title}</h1>
					</header>

					<div class="section-body">
						{#each section.groups as group}
							<div class="setting-group">
								{#if group.title}
									<h3>{group.title}</h3>
								{/if}
								<div class="group-items">
									{#each group.items as item (item.id)}
										<SettingItem {item} bind:value={data[item.id]} />
									{/each}
								</div>
							</div>
						{/each}
					</div>
					<div class="section-divider"></div>
				</section>
			{/each}
		{/if}
	</main>
</div>

<style>
	.settings-panel {
		display: flex;
		height: 100%;
		background-color: var(--bg-surface);
		color: var(--text-primary);
		font-family: var(--font-sans);
		overflow: hidden;
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
	}

	.settings-sidebar {
		width: 250px;
		background-color: var(--bg-surface-alt);
		border-right: 1px solid var(--border-base);
		display: flex;
		flex-direction: column;
	}

	.sidebar-header {
		padding: var(--space-4);
		border-bottom: 1px solid var(--border-base);
	}

	.search-box {
		position: relative;
		width: 100%;
	}

	.search-icon {
		position: absolute;
		left: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-secondary);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--space-2) var(--space-2) var(--space-2) var(--space-8);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		background-color: var(--bg-surface);
		color: var(--text-primary);
		font-size: var(--text-sm);
	}
	.search-input:focus {
		outline: none;
		border-color: var(--action-primary);
	}

	.sidebar-nav {
		padding: var(--space-2);
		flex: 1;
		overflow-y: auto;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-2) var(--space-3);
		border: none;
		background: none;
		text-align: left;
		cursor: pointer;
		border-radius: var(--control-radius);
		color: var(--text-secondary);
		font-size: var(--text-sm);
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	.nav-item:hover {
		background-color: var(--bg-surface);
		color: var(--text-primary);
	}

	.nav-item.active {
		background-color: var(--action-primary);
		color: var(--action-text);
	}

	.nav-item.active :global(.icon) {
		color: var(--action-text);
	}

	.settings-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto; /* Scrollable main area */
		overflow-x: hidden;
		scroll-behavior: smooth;
	}

	.settings-section-block {
		padding-bottom: var(--space-8);
	}

	.section-header {
		padding: var(--space-6) var(--space-8) var(--space-4);
		position: sticky;
		top: 0;
		background-color: var(--bg-surface); /* Sticky header needs bg */
		z-index: 10;
		border-bottom: 1px solid var(--border-base);
	}

	.section-header h1 {
		margin: 0;
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
	}

	.section-body {
		padding: var(--space-6) var(--space-8);
	}

	.section-divider {
		height: 1px;
		background-color: var(--border-base);
		margin: 0 var(--space-8);
	}

	.setting-group {
		margin-bottom: var(--space-8);
	}

	.setting-group h3 {
		margin: 0 0 var(--space-4) 0;
		font-size: var(--text-sm);
		font-weight: var(--font-semibold);
		color: var(--text-primary);
		opacity: 0.8;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.group-items {
		display: flex;
		flex-direction: column;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--text-secondary);
		gap: var(--space-4);
	}
</style>
