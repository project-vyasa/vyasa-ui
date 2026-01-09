<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		appBar?: Snippet;
		sidebarLeft?: Snippet;
		sidebarRight?: Snippet;
		sidebarTop?: Snippet;
		panelBottom?: Snippet;
		statusBar?: Snippet;
		header?: Snippet;

		// State props
		leftVisible?: boolean;
		rightVisible?: boolean;
		bottomVisible?: boolean;
		topVisible?: boolean;
		maximizedZone?: 'none' | 'bottom' | 'content'; // [REFACTOR]
	}

	let {
		children,
		appBar,
		sidebarLeft,
		sidebarRight,
		sidebarTop,
		panelBottom,
		statusBar,
		header,
		leftVisible = true,
		rightVisible = true,
		bottomVisible = true,
		topVisible = true,
		maximizedZone = 'none'
	}: Props = $props();

	// --- Resizable State ---
	let leftWidth = $state(320); // 20rem = 320px
	let rightWidth = $state(320);
	let bottomHeight = $state(192); // 12rem = 192px
	let topHeight = $state(200);

	// --- Grid Template ---
	const gridTemplate = $derived(`
		"header header header header"
		"appbar sidebar-left top sidebar-right"
		"appbar sidebar-left content sidebar-right"
		"appbar sidebar-left bottom sidebar-right"
		"status status status status"
	`);

	// --- Track Sizes ---
	function getColSizes(zone: string) {
		if (zone === 'bottom') {
			// Bottom maximized: hide everything except appbar (optional) or just hide sidebars
			// Current requirement: Bottom takes full width of content area
			// Actually user said "hides sidebars and app bar".
			// So: 0 0 1fr 0
			// Wait, if app bar is hidden, grid areas might break if we don't handle it in template or sizes.
			// Sizes 0px is safe.
			return `0px 0px 1fr 0px`;
		}
		if (zone === 'content') {
			// Content maximized: hide everything
			return `0px 0px 1fr 0px`;
		}
		// Default
		return `${appBar ? '3rem' : '0px'} 
		${leftVisible && sidebarLeft ? `${leftWidth}px` : '0px'} 
		1fr 
		${rightVisible && sidebarRight ? `${rightWidth}px` : '0px'}`;
	}

	function getRowSizes(zone: string) {
		if (zone === 'bottom') {
			// Bottom maximized: Header, 0, 0, 1fr, Status
			// Wait, bottom row is the 4th row.
			// Rows: Header, Top, Content, Bottom, Status
			return `${header ? 'auto' : '0px'} 0px 0px 1fr ${statusBar ? '1.5rem' : '0px'}`;
		}
		if (zone === 'content') {
			// Content maximized: Header, 0, 1fr, 0, Status
			return `${header ? 'auto' : '0px'} 0px 1fr 0px ${statusBar ? '1.5rem' : '0px'}`;
		}
		// Default
		return `${header ? 'auto' : '0px'} 
		${topVisible && sidebarTop ? `${topHeight}px` : '0px'}
		1fr 
		${bottomVisible && panelBottom ? `${bottomHeight}px` : '0px'} 
		${statusBar ? '1.5rem' : '0px'}`;
	}

	const colSizes = $derived(getColSizes(maximizedZone));
	const rowSizes = $derived(getRowSizes(maximizedZone));

	// --- Resize Logic ---
	let isResizing = $state<string | null>(null);

	function startResize(direction: string) {
		isResizing = direction;
		document.body.style.cursor =
			direction === 'left' || direction === 'right' ? 'col-resize' : 'row-resize';
		document.body.style.userSelect = 'none';
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isResizing) return;

		if (isResizing === 'left') {
			leftWidth = Math.max(100, e.clientX - (appBar && maximizedZone === 'none' ? 48 : 0));
		} else if (isResizing === 'right') {
			rightWidth = Math.max(100, window.innerWidth - e.clientX);
		} else if (isResizing === 'bottom') {
			bottomHeight = Math.max(100, window.innerHeight - e.clientY - (statusBar ? 24 : 0));
		} else if (isResizing === 'top') {
			topHeight = Math.max(100, e.clientY - 40);
		}
	}

	function stopResize() {
		isResizing = null;
		document.body.style.cursor = '';
		document.body.style.userSelect = '';
	}

	// Attach global listeners
	$effect(() => {
		if (isResizing) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', stopResize);
		} else {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', stopResize);
		}
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', stopResize);
		};
	});
</script>

<div
	class="app-shell"
	style:grid-template-areas={gridTemplate}
	style:grid-template-columns={colSizes}
	style:grid-template-rows={rowSizes}
>
	<!-- Header -->
	{#if header}
		<header class="area-header border-b">
			{@render header()}
		</header>
	{/if}

	<!-- App Bar -->
	{#if appBar}
		<aside class="area-app-bar border-r bg-surface-alt">
			{@render appBar()}
		</aside>
	{/if}

	<!-- Left Sidebar -->
	{#if sidebarLeft && leftVisible}
		<aside class="area-sidebar-left border-r relative">
			{@render sidebarLeft()}
			<!-- Resizer -->
			<button
				class="resizer-v right-0"
				aria-label="Resize Left Sidebar"
				onmousedown={() => startResize('left')}
			></button>
		</aside>
	{/if}

	<!-- Top Sidebar (NEW) -->
	{#if sidebarTop && topVisible}
		<div class="area-top border-b relative bg-surface-alt">
			{@render sidebarTop()}
			<button
				class="resizer-h bottom-0"
				aria-label="Resize Top Sidebar"
				onmousedown={() => startResize('top')}
			></button>
		</div>
	{/if}

	<!-- Main Content -->
	<main class="area-content bg-surface">
		{@render children()}
	</main>

	<!-- Bottom Panel -->
	{#if panelBottom && bottomVisible}
		<div class="area-bottom border-t relative">
			<!-- Resizer is at top of this box -->
			<button
				class="resizer-h top-0"
				style="top: -4px;"
				aria-label="Resize Bottom Panel"
				onmousedown={() => startResize('bottom')}
			></button>
			{@render panelBottom()}
		</div>
	{/if}

	<!-- Right Sidebar -->
	{#if sidebarRight && rightVisible}
		<aside class="area-sidebar-right border-l relative">
			<!-- Resizer is at left of this box -->
			<button
				class="resizer-v left-0"
				style="left: -4px;"
				aria-label="Resize Right Sidebar"
				onmousedown={() => startResize('right')}
			></button>
			{@render sidebarRight()}
		</aside>
	{/if}

	<!-- Status Bar -->
	{#if statusBar}
		<footer class="area-status border-t bg-surface-alt text-primary">
			{@render statusBar()}
		</footer>
	{/if}
</div>

<style>
	.app-shell {
		display: grid;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background-color: var(--bg-surface);
		color: var(--text-primary);
	}

	/* Grid Areas */
	.area-header {
		grid-area: header;
	}
	.area-app-bar {
		grid-area: appbar;
	}
	.area-sidebar-left {
		grid-area: sidebar-left;
	}
	.area-top {
		grid-area: top;
	} /* [NEW] */
	.area-content {
		grid-area: content;
		position: relative;
		overflow: auto;
	}
	.area-bottom {
		grid-area: bottom;
	}
	.area-sidebar-right {
		grid-area: sidebar-right;
	}
	.area-status {
		grid-area: status;
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		font-size: var(--text-xs);
	}

	/* Resizers */
	.resizer-v {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 4px;
		cursor: col-resize;
		z-index: 10;
		transition: background-color 0.2s;
		background: transparent;
		border: none;
		padding: 0;
	}
	.resizer-h {
		position: absolute;
		left: 0;
		right: 0;
		height: 4px;
		cursor: row-resize;
		z-index: 10;
		transition: background-color 0.2s;
		background: transparent;
		border: none;
		padding: 0;
	}
	.resizer-v:hover,
	.resizer-h:hover {
		background-color: var(--action-primary);
	}
	.relative {
		position: relative;
	}
	.right-0 {
		right: 0;
	}
	.left-0 {
		left: 0;
	}
	.top-0 {
		top: 0;
	}
	.bottom-0 {
		bottom: 0;
	}

	/* Utilities used in template */
	.border-b {
		border-bottom: 1px solid var(--border-base);
	}
	.border-t {
		border-top: 1px solid var(--border-base);
	}
	.border-l {
		border-left: 1px solid var(--border-base);
	}
	.border-r {
		border-right: 1px solid var(--border-base);
	}

	.bg-surface-alt {
		background-color: var(--bg-surface-alt);
	}
	.bg-surface {
		background-color: var(--bg-surface);
	}
	.text-primary {
		color: var(--text-primary);
	}
</style>
