<script lang="ts">
	import { getContext } from 'svelte';
	import AppShell from '$lib/components/organisms/AppShell/AppShell.svelte';
	import Tree, { type TreeNode } from '$lib/components/organisms/Tree/Tree.svelte';
	import Tabs, { type TabItem } from '$lib/components/organisms/Tabs/Tabs.svelte';
	import Panel from '$lib/components/organisms/Panel/Panel.svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';
	import CodeEditor from '$lib/components/molecules/CodeEditor/CodeEditor.svelte';
	import {
		FolderOpen,
		Folder,
		FileCode,
		FileJson,
		FileText,
		Menu,
		Search,
		PanelLeft,
		PanelBottom,
		PanelRight,
		PanelTop,
		Files,
		GitBranch,
		MoreHorizontal,
		RefreshCw,
		ChevronRight,
		List,
		Terminal,
		Minimize2,
		Maximize2,
		Layout,
		X,
		Plus,
		Settings
	} from 'lucide-svelte';

	// --- State ---
	// --- State ---
	let leftVisible = $state(true);
	let bottomVisible = $state(true);
	let rightVisible = $state(false);
	let topVisible = $state(false);
	let maximizedZone = $state<'none' | 'bottom' | 'content'>('none'); // [REFACTOR]

	// --- Context ---
	const themeContext = getContext<{ current: 'light' | 'dark' }>('theme');

	let activeActivityId = $state('files');

	// --- File Content Data ---
	let fileContentMap = $state<Record<string, string>>({
		'app.html': `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>`,
		'page.svelte': `<script>
	let count = 0;
<\/script>

<h1>Welcome to Vyasa</h1>
<button on:click={() => count++}>
	Clicks: {count}
</button>`,
		'layout.svelte': `<slot />`,
		'package.json': `{
	"name": "project-vyasa",
	"version": "0.0.1",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview"
	}
}`,
		'readme.md': `# Project Vyasa

A modern IDE built with Svelte.

## Features
- Fast
- Accessible
- Beautiful`,
		'tsconfig.json': `{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true
	}
}`
	});

	function getLanguageFromFilename(filename: string) {
		if (filename.endsWith('.md')) return 'markdown';
		if (filename.endsWith('.html')) return 'html';
		if (filename.endsWith('.ts') || filename.endsWith('.json')) return 'typescript'; // JSON as TS for now or add json lang
		return 'html'; // Default to HTML/Svelte-like
	}

	// Maximized state helpers
	function toggleMaximizeBottom() {
		if (maximizedZone === 'bottom') {
			maximizedZone = 'none';
		} else {
			// Ensure it's visible before maximizing
			bottomVisible = true;
			maximizedZone = 'bottom';
		}
	}

	function toggleMaximizeContent() {
		if (maximizedZone === 'content') {
			maximizedZone = 'none';
		} else {
			maximizedZone = 'content';
		}
	}

	// --- File Explorer Data ---
	const fileTree: TreeNode[] = [
		{
			id: 'root',
			label: 'project-vyasa',
			icon: FolderOpen,
			children: [
				{
					id: 'src',
					label: 'src',
					icon: Folder,
					children: [
						{ id: 'app.html', label: 'app.html', icon: FileCode },
						{
							id: 'routes',
							label: 'routes',
							icon: Folder,
							children: [
								{ id: 'page.svelte', label: '+page.svelte', icon: FileCode },
								{ id: 'layout.svelte', label: '+layout.svelte', icon: FileCode }
							]
						},
						{
							id: 'lib',
							label: 'lib',
							icon: Folder,
							children: [{ id: 'components', label: 'components', icon: Folder }]
						}
					]
				},
				{ id: 'package.json', label: 'package.json', icon: FileJson },
				{ id: 'readme.md', label: 'README.md', icon: FileText },
				{ id: 'tsconfig.json', label: 'tsconfig.json', icon: FileJson }
			]
		}
	];

	let expandedIds = $state(new Set(['root', 'src']));
	let selectedFileId = $state('page.svelte');

	// --- Tabs Data ---
	let activeTabId = $state('page.svelte');
	let openTabs = $state<TabItem[]>([
		{ id: 'page.svelte', label: '+page.svelte', icon: FileCode, closeable: true },
		{ id: 'layout.svelte', label: '+layout.svelte', icon: FileCode, closeable: true },
		{ id: 'readme.md', label: 'README.md', icon: FileText, closeable: true }
	]);

	function handleFileSelect(node: TreeNode) {
		selectedFileId = node.id;
		if (!node.children && !openTabs.find((t) => t.id === node.id)) {
			openTabs = [
				...openTabs,
				{ id: node.id, label: node.label, icon: node.icon, closeable: true }
			];
		}
		if (!node.children) {
			activeTabId = node.id;
		}
	}

	function closeTab(id: string) {
		openTabs = openTabs.filter((t) => t.id !== id);
		if (activeTabId === id && openTabs.length > 0) {
			activeTabId = openTabs[openTabs.length - 1].id;
		}
	}

	// ... (Other handlers) ...

	// --- Handlers ---
	function handleActivityClick(id: string) {
		if (activeActivityId === id) {
			// If already active, toggle visibility
			leftVisible = !leftVisible;
		} else {
			activeActivityId = id;
			leftVisible = true;
		}
	}
</script>

{#snippet codeEditorSnippet(filename: string)}
	<div class="code-editor relative h-full">
		<div class="absolute top-2 right-2 z-10 flex gap-2">
			<Button
				variant="ghost"
				size="icon"
				icon={maximizedZone === 'content' ? Minimize2 : Maximize2}
				onclick={toggleMaximizeContent}
				title={maximizedZone === 'content' ? 'Restore View' : 'Maximize Editor'}
			/>
		</div>
		<CodeEditor
			bind:value={fileContentMap[filename]}
			language={getLanguageFromFilename(filename)}
			theme={themeContext.current}
			class="h-full border-0"
		/>
	</div>
{/snippet}

{#snippet headerContent()}
	<div class="header-container">
		<div class="header-left">
			<Button variant="ghost" size="icon" icon={Menu} />
			<span class="app-title">Vyasa IDE</span>
			<!-- Simplified Menu for Demo -->
		</div>
		<div class="header-center">
			<div class="command-center">
				<Icon icon={Search} size={14} class="text-tertiary" />
				<span>project-vyasa</span>
			</div>
		</div>
		<div class="header-right">
			<!-- Panel Toggles -->
			<!-- Panel Toggles -->
			<Button
				variant={leftVisible ? 'secondary' : 'ghost'}
				size="icon"
				icon={PanelLeft}
				class={leftVisible ? 'active-t' : ''}
				onclick={() => (leftVisible = !leftVisible)}
				title="Toggle Left Sidebar"
			/>
			<Button
				variant={bottomVisible ? 'secondary' : 'ghost'}
				size="icon"
				icon={PanelBottom}
				class={bottomVisible ? 'active-t' : ''}
				onclick={() => (bottomVisible = !bottomVisible)}
				title="Toggle Bottom Panel"
			/>
			<Button
				variant={rightVisible ? 'secondary' : 'ghost'}
				size="icon"
				icon={PanelRight}
				class={rightVisible ? 'active-t' : ''}
				onclick={() => (rightVisible = !rightVisible)}
				title="Toggle Right Sidebar"
			/>
			<div class="divider-v"></div>
			<Button
				variant={topVisible ? 'secondary' : 'ghost'}
				size="icon"
				icon={PanelTop}
				class={topVisible ? 'active-t' : ''}
				onclick={() => (topVisible = !topVisible)}
				title="Toggle Top Panel"
			/>
		</div>
	</div>
{/snippet}

{#snippet appBarContent()}
	<div class="app-bar">
		<div class="app-item-wrapper {activeActivityId === 'files' && leftVisible ? 'active' : ''}">
			<Button
				variant="ghost"
				size="icon"
				icon={Files}
				onclick={() => handleActivityClick('files')}
				title="Explorer"
			/>
		</div>
		<div class="app-item-wrapper {activeActivityId === 'search' && leftVisible ? 'active' : ''}">
			<Button
				variant="ghost"
				size="icon"
				icon={Search}
				onclick={() => handleActivityClick('search')}
				title="Search"
			/>
		</div>
		<div class="app-item-wrapper {activeActivityId === 'git' && leftVisible ? 'active' : ''}">
			<Button
				variant="ghost"
				size="icon"
				icon={GitBranch}
				onclick={() => handleActivityClick('git')}
				title="Source Control"
			/>
		</div>
		<div class="spacer"></div>
		<Button variant="ghost" size="icon" icon={Settings} />
	</div>
{/snippet}

{#snippet sidebarLeftContent()}
	{#if activeActivityId === 'files'}
		<Panel title="Explorer" icon={Files}>
			{#snippet actions()}
				<Button variant="ghost" size="icon" icon={MoreHorizontal} class="action-icon" />
			{/snippet}
			<div class="tree-container">
				<Tree
					data={fileTree}
					bind:expandedIds
					selectedId={selectedFileId}
					onSelect={handleFileSelect}
				/>
			</div>
		</Panel>
	{:else if activeActivityId === 'search'}
		<Panel title="Search" icon={Search}>
			<div class="p-2">
				<div class="search-input-box">
					<input
						type="text"
						placeholder="Search"
						class="w-full px-2 py-1 border rounded bg-surface-alt text-sm"
					/>
				</div>
				<p class="text-xs text-secondary mt-2">No results found.</p>
			</div>
		</Panel>
	{:else if activeActivityId === 'git'}
		<Panel title="Source Control" icon={GitBranch}>
			<div class="p-2 text-sm">
				<div class="flex items-center gap-2 mb-2">
					<Icon icon={RefreshCw} size={12} />
					<span>Changes</span>
				</div>
				<div class="text-xs text-secondary pl-4">
					<div class="flex items-center gap-2 py-1">
						<Icon icon={FileText} size={12} />
						<span>+page.svelte</span>
						<span class="text-tertiary ml-auto">M</span>
					</div>
				</div>
			</div>
		</Panel>
	{/if}
{/snippet}

{#snippet sidebarTopContent()}
	<div class="top-bar-content">
		<div class="breadcrumb">
			<span>project-vyasa</span>
			<Icon icon={ChevronRight} size={14} />
			<span>src</span>
			<Icon icon={ChevronRight} size={14} />
			<span>routes</span>
			<Icon icon={ChevronRight} size={14} />
			<span>ide-demo</span>
		</div>
	</div>
{/snippet}

{#snippet sidebarRightContent()}
	<Panel title="Outline" icon={List}>
		<div class="p-2 text-sm text-secondary">
			<div class="mb-2 font-semibold text-primary">Symbols</div>
			<div class="pl-2">
				<div>init</div>
				<div>render</div>
				<div>cleanup</div>
			</div>
		</div>
	</Panel>
{/snippet}

{#snippet panelBottomContent()}
	<Panel title="Terminal" icon={Terminal} class="terminal-panel">
		{#snippet actions()}
			<Button
				variant="ghost"
				size="icon"
				icon={maximizedZone === 'bottom' ? Minimize2 : Maximize2}
				class="action-icon"
				onclick={toggleMaximizeBottom}
				title={maximizedZone === 'bottom' ? 'Restore' : 'Maximize Panel'}
			/>
			<Button
				variant="ghost"
				size="icon"
				icon={X}
				class="action-icon"
				onclick={() => {
					bottomVisible = false;
					maximizedZone = 'none';
				}}
			/>
		{/snippet}
		<div class="terminal-content">
			<!-- ... content ... -->
			<div class="term-line">
				<span class="term-success">➜</span>
				<span class="term-path">~</span> npm install local-pkg
			</div>
			<div class="term-secondary">added 1 package in 2s</div>
			<div class="term-line">
				<span class="term-success">➜</span>
				<span class="term-path">~</span> <span class="term-cursor">_</span>
			</div>
		</div>
	</Panel>
{/snippet}

{#snippet statusBarContent()}
	<div class="status-bar">
		<button class="status-item">
			<Icon icon={GitBranch} size={12} />
			<span>main</span>
		</button>
		<button class="status-item">
			<Icon icon={RefreshCw} size={12} />
			<span>0</span>
		</button>
		<div class="spacer"></div>
		<button class="status-item">
			<span>Ln 12, Col 4</span>
		</button>
		<button class="status-item">
			<span>UTF-8</span>
		</button>
		<button class="status-item" onclick={() => (bottomVisible = !bottomVisible)}>
			<Icon icon={Layout} size={12} />
		</button>
	</div>
{/snippet}

<AppShell
	{leftVisible}
	{bottomVisible}
	{rightVisible}
	{topVisible}
	{maximizedZone}
	header={headerContent}
	appBar={appBarContent}
	sidebarLeft={sidebarLeftContent}
	sidebarRight={sidebarRightContent}
	sidebarTop={sidebarTopContent}
	panelBottom={panelBottomContent}
	statusBar={statusBarContent}
>
	<Tabs tabs={openTabs} {activeTabId} onSelect={(id) => (activeTabId = id)} onClose={closeTab}>
		{@render codeEditorSnippet(activeTabId)}
	</Tabs>
</AppShell>

<style>
	/* Code Editor Snippet */
	.code-editor {
		padding: 1rem;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	/* Header */
	.header-container {
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		height: 100%;
		gap: 1rem;
		background-color: var(--bg-surface-alt);
		font-size: var(--text-sm);
	}
	.header-left,
	.header-center,
	.header-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.header-center {
		flex: 1;
		justify-content: center;
	}
	/* Ensure header buttons are visible */
	.header-right {
		color: var(--text-primary);
	}

	.app-title {
		font-weight: 600;
		margin-right: 0.5rem;
	}

	.command-center {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--bg-surface);
		border: 1px solid var(--border-base);
		border-radius: 4px;
		padding: 0.125rem 0.5rem;
		width: 20rem;
		color: var(--text-secondary);
	}
	:global(.active-t) {
		background-color: var(--action-primary);
		color: var(--action-text);
	}
	:global(.text-tertiary) {
		color: var(--text-tertiary);
	}

	/* Top Bar */
	.top-bar-content {
		padding: 0.5rem;
		height: 100%;
		font-size: var(--text-sm);
	}
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--text-secondary);
	}

	/* App Bar (renamed from Activity Bar) */
	.app-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem 0;
		gap: 0.5rem;
		height: 100%;
		width: 3rem;
	}
	/* Active state for App Bar items - Visual Cue */
	.app-item-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		border-left: 2px solid transparent;
	}
	.app-item-wrapper.active {
		background-color: var(--bg-surface);
		border-left-color: var(--action-primary);
		color: var(--action-primary);
	}
	/* Ensure icon inside inherits color */
	.app-item-wrapper.active :global(.icon) {
		color: var(--action-primary);
	}

	/* Sidebar Left */
	:global(.action-icon) {
		height: 1.5rem;
		width: 1.5rem;
	}
	.tree-container {
		padding: 0.5rem 0;
	}

	/* Terminal Panel */
	.terminal-content {
		padding: 0.5rem;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
	}
	.term-line {
		display: flex;
		gap: 0.5rem;
	}
	.term-success {
		color: var(--status-success);
	}
	.term-path {
		color: var(--action-primary);
	}
	.term-secondary {
		color: var(--text-secondary);
	}
	.term-cursor {
		animation: pulse 1s infinite;
	}

	/* Status Bar */
	.status-bar {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 0 0.5rem;
	}
	.status-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: inherit;
	}
	.status-item:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.spacer {
		flex: 1;
	}

	/* Utilities used in template */
	.p-2 {
		padding: 0.5rem;
	}
	.w-full {
		width: 100%;
	}
	.px-2 {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.py-1 {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	.border {
		border: 1px solid var(--border-base);
	}
	.rounded {
		border-radius: 0.25rem;
	}
	.text-xs {
		font-size: var(--text-xs);
	}
	.text-secondary {
		color: var(--text-secondary);
	}
	/* New utilities */
	.relative {
		position: relative;
	}
	.absolute {
		position: absolute;
	}
	.top-2 {
		top: 0.5rem;
	}
	.right-2 {
		right: 0.5rem;
	}
	.h-full {
		height: 100%;
	}

	.divider-v {
		width: 1px;
		height: 1.5rem;
		background-color: var(--border-base);
		margin: 0 0.5rem;
	}

	.mt-2 {
		margin-top: 0.5rem;
	}
	.flex {
		display: flex;
	}
	.items-center {
		align-items: center;
	}
	.gap-2 {
		gap: 0.5rem;
	}
	.mb-2 {
		margin-bottom: 0.5rem;
	}
	.pl-4 {
		padding-left: 1rem;
	}
	.ml-auto {
		margin-left: auto;
	}
</style>
