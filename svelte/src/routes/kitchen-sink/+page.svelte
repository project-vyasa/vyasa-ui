<script lang="ts">
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import Badge from '$lib/components/atoms/Badge/Badge.svelte';
	import Input from '$lib/components/atoms/Input/Input.svelte';
	import FormField from '$lib/components/molecules/FormField/FormField.svelte';
	import Toolbar from '$lib/components/organisms/Toolbar/Toolbar.svelte';
	import Panel from '$lib/components/organisms/Panel/Panel.svelte';
	import Tabs, { type TabItem } from '$lib/components/organisms/Tabs/Tabs.svelte';
	import Tree, { type TreeNode } from '$lib/components/organisms/Tree/Tree.svelte';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';

	import DataGrid, { type Column } from '$lib/components/organisms/DataGrid/DataGrid.svelte';
	import Dropdown from '$lib/components/molecules/Dropdown/Dropdown.svelte';
	import Modal from '$lib/components/molecules/Modal/Modal.svelte';
	import Tooltip from '$lib/components/molecules/Tooltip/Tooltip.svelte';
	import Checkbox from '$lib/components/atoms/Checkbox/Checkbox.svelte';
	import Radio from '$lib/components/atoms/Radio/Radio.svelte';
	import Switch from '$lib/components/atoms/Switch/Switch.svelte';
	import Textarea from '$lib/components/atoms/Textarea/Textarea.svelte';
	import Select from '$lib/components/molecules/Select/Select.svelte';
	import Alert from '$lib/components/molecules/Alert/Alert.svelte';
	import { toast } from '$lib/stores/toast.svelte.js'; // No component import needed here, provider wraps app
	import Breadcrumbs from '$lib/components/molecules/Breadcrumbs/Breadcrumbs.svelte';
	import Pagination from '$lib/components/molecules/Pagination/Pagination.svelte';

	import { getContext } from 'svelte';

	// Theme Context
	const themeCtx = getContext<any>('theme');

	let inputValue = $state('');
	let errorValue = $state('Invalid');

	// --- Tabs Data ---
	let activeTabId = $state('tab1');
	let tabs: TabItem[] = [
		{ id: 'tab1', label: 'Account', icon: 'User' },
		{ id: 'tab2', label: 'Preferences', icon: 'Settings' },
		{ id: 'tab3', label: 'Notifications', icon: 'Bell' }
	];

	// --- Tree Data ---
	let expandedIds = $state(new Set(['root']));
	let selectedId = $state('');
	const treeData: TreeNode[] = [
		{
			id: 'root',
			label: 'Project Root',
			icon: 'FolderOpen',
			children: [
				{ id: 'src', label: 'src', icon: 'Folder' },
				{ id: 'public', label: 'public', icon: 'Folder' },
				{ id: 'package.json', label: 'package.json', icon: 'FileCode' }
			]
		}
	];

	// --- DataGrid Data ---
	interface User {
		id: number;
		name: string;
		role: string;
		status: string;
	}

	const gridData: User[] = [
		{ id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Active' },
		{ id: 2, name: 'Bob Smith', role: 'Editor', status: 'Offline' },
		{ id: 3, name: 'Charlie Brown', role: 'Viewer', status: 'Active' },
		{ id: 4, name: 'Diana Prince', role: 'Editor', status: 'Active' },
		{ id: 5, name: 'Evan Wright', role: 'Viewer', status: 'Inactive' }
	];

	const gridColumns: Column<User>[] = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', sortable: true }
	];

	let selectedGridIds = $state(new Set<number | string>());

	// --- Interactive Demo State ---
	let dropdownOpen = $state(false);
	let modalOpen = $state(false);
	let checkbox1 = $state(false);
	let checkbox2 = $state(true);
	let radioGroup = $state('opt1');
	let switch1 = $state(false);
	let switch2 = $state(true);

	const selectOptions = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Angular', value: 'angular' },
		{ label: 'Solid', value: 'solid' }
	];
	let selectVal1 = $state('');
	let selectVal2 = $state(['svelte', 'vue']);
</script>

<div class="kitchen-sink">
	<header class="sticky-header">
		<div class="header-content">
			<div>
				<h1 class="heading-1">Kitchen Sink</h1>
				<p class="description">Visual test suite for components.</p>
			</div>
			<div class="controls">
				<Button
					variant="outline"
					onclick={() => themeCtx.toggleTheme()}
					icon={themeCtx.theme === 'dark' ? 'Sun' : 'Moon'}
				>
					{themeCtx.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
				</Button>
				<Button variant="outline" onclick={() => themeCtx.cycleDensity()} icon="Maximize2">
					Density: {themeCtx.density}
				</Button>
			</div>
		</div>
	</header>

	<section class="section">
		<h2 class="heading-2">Typography</h2>
		<div class="grid-2-col">
			<div class="flex flex-col gap-2">
				<h1>Heading 1 (h1)</h1>
				<h2>Heading 2 (h2)</h2>
				<h3>Heading 3 (h3)</h3>
				<h4>Heading 4 (h4)</h4>
				<h5>Heading 5 (h5)</h5>
				<h6>Heading 6 (h6)</h6>
			</div>
			<div class="flex flex-col gap-2">
				<p class="text-xl">Body Large (text-xl)</p>
				<p class="text-base">Body Regular (text-base)</p>
				<p class="text-sm">Body Small (text-sm)</p>
				<p class="text-overline">Caption / Overline (text-overline)</p>
				<p class="font-bold">Bold Text</p>
				<p class="text-secondary">Secondary Text</p>
				<p class="font-mono">Monospace Text</p>
			</div>
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Buttons</h2>
		<div class="row">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="success">Success</Button>
			<Button variant="warning">Warning</Button>
			<Button disabled>Disabled</Button>
			<Button loading>Loading</Button>
			<Button variant="primary" icon="Search">Icon Left</Button>
			<Button variant="outline" size="icon" icon="Bell" />
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Badges</h2>
		<div class="row">
			<Badge variant="neutral">Neutral</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="danger">Danger</Badge>
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Inputs & Form Fields</h2>
		<div class="form-grid">
			<FormField label="Username" hint="Enter your unique handle" id="username">
				<Input id="username" bind:value={inputValue} fullWidth placeholder="e.g. johndoe" />
			</FormField>

			<FormField label="Email" error="Invalid email address" id="email" required>
				<Input id="email" bind:value={errorValue} fullWidth error />
			</FormField>

			<FormField label="Disabled Input" id="disabled">
				<Input id="disabled" value="Cannot edit" disabled fullWidth />
			</FormField>
		</div>

		<h3 class="heading-2 mt-4">Selection Controls</h3>
		<div class="row">
			<div class="flex flex-col gap-2">
				<Checkbox label="Remember me" bind:checked={checkbox1} />
				<Checkbox label="Subscribe to newsletter" bind:checked={checkbox2} />
				<Checkbox label="Disabled option" disabled />
			</div>
			<div class="divider"></div>
			<div class="flex flex-col gap-2">
				<Radio label="Option 1" value="opt1" bind:group={radioGroup} />
				<Radio label="Option 2" value="opt2" bind:group={radioGroup} />
				<Radio label="Option 3 (Disabled)" value="opt3" disabled bind:group={radioGroup} />
			</div>
			<div class="divider"></div>
			<div class="flex flex-col gap-2">
				<Switch label="Toggle me" bind:checked={switch1} />
				<Switch label="Checked Switch" bind:checked={switch2} />
				<Switch label="Small" size="sm" />
				<Switch label="Large" size="lg" />
				<Switch label="Disabled" disabled />
			</div>
		</div>

		<h3 class="heading-2 mt-4">Text Inputs</h3>
		<div class="form-grid">
			<FormField label="Standard Textarea">
				<Textarea placeholder="Type something..." fullWidth />
			</FormField>
			<FormField label="Auto-resizing Textarea">
				<Textarea placeholder="Type more to expand..." autoResize fullWidth rows={1} />
			</FormField>
			<FormField label="Disabled Textarea">
				<Textarea value="Cannot edit me" disabled fullWidth />
			</FormField>
		</div>

		<h3 class="heading-2 mt-4">Selects</h3>
		<div class="form-grid">
			<FormField label="Single Select">
				<Select options={selectOptions} bind:value={selectVal1} placeholder="Choose framework..." />
			</FormField>
			<FormField label="Multi Select (Searchable)">
				<Select
					options={selectOptions}
					bind:value={selectVal2}
					multiple
					searchable
					placeholder="Pick favorites..."
				/>
			</FormField>
			<FormField label="Disabled Select">
				<Select options={selectOptions} disabled placeholder="Locked" />
			</FormField>
		</div>

		<h3 class="heading-2 mt-4">Alerts</h3>
		<div class="flex flex-col gap-2">
			<Alert title="Information" variant="info">This is a standard informational alert.</Alert>
			<Alert title="Success!" variant="success" closable>
				Operation completed successfully. (Click X to dismiss)
			</Alert>
			<Alert variant="warning">Warning: This alert has no title, just content.</Alert>
			<Alert title="Critical Error" variant="danger">Something went terribly wrong.</Alert>
		</div>

		<h3 class="heading-2 mt-4">Toasts</h3>
		<div class="flex gap-2 flex-wrap">
			<Button onclick={() => toast.info('This is an info toast')}>Info Toast</Button>
			<Button onclick={() => toast.success('Operation successful!')}>Success Toast</Button>
			<Button onclick={() => toast.warning('Check your network connection')}>Warning Toast</Button>
			<Button onclick={() => toast.danger('Failed to save changes')}>Error Toast</Button>
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Navigation</h2>
		<div class="flex flex-col gap-4">
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Components', href: '/kitchen-sink' },
					{ label: 'Breadcrumbs' }
				]}
			/>

			<div class="flex items-center gap-4">
				<Pagination total={100} pageSize={10} page={1} />
			</div>
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Toolbar</h2>
		<div class="toolbar-wrapper">
			<Toolbar>
				<Button variant="ghost" size="icon" icon="Bold" />
				<Button variant="ghost" size="icon" icon="Italic" />
				<Button variant="ghost" size="icon" icon="Underline" />
				<div class="divider"></div>
				<Button variant="ghost" size="icon" icon="AlignLeft" />
				<Button variant="ghost" size="icon" icon="AlignCenter" />
				<Button variant="ghost" size="icon" icon="AlignRight" />
			</Toolbar>
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Icons</h2>
		<div class="row">
			<Icon name="Activity" />
			<Icon name="Airplay" />
			<Icon name="AlertCircle" color="var(--status-error)" />
			<Icon name="CheckCircle" color="var(--status-success)" />
			<Icon name="Github" />
			<Icon name="Sun" />
			<Icon name="Moon" />
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Panels & Composition</h2>
		<div class="grid-2-col">
			<!-- Panel with Tree -->
			<div class="demo-box h-80">
				<Panel title="File Explorer" icon="Files">
					{#snippet actions()}
						<Button variant="ghost" size="icon" icon="Plus" class="h-4 w-4" />
					{/snippet}
					<Tree data={treeData} bind:expandedIds bind:selectedId />
				</Panel>
			</div>

			<!-- Tabs -->
			<div class="demo-box h-80 bg-surface">
				<Tabs {tabs} {activeTabId} onSelect={(id) => (activeTabId = id)}>
					<div class="p-4">
						{#if activeTabId === 'tab1'}
							<h3 class="font-bold mb-2">Account Settings</h3>
							<p class="text-secondary text-sm">Manage your profile and security settings.</p>
						{:else if activeTabId === 'tab2'}
							<h3 class="font-bold mb-2">Preferences</h3>
							<p class="text-secondary text-sm">Customize your IDE appearance.</p>
						{:else}
							<div class="empty-state">No notifications</div>
						{/if}
					</div>
				</Tabs>
			</div>
		</div>
	</section>
	<section class="section">
		<h2 class="heading-2">DataGrid</h2>
		<div class="datagrid-wrapper">
			<DataGrid
				data={gridData}
				columns={gridColumns}
				selectable
				bind:selectedIds={selectedGridIds}
			/>
			<div style="margin-top: 1rem;" class="text-sm text-secondary">
				Selected IDs: {Array.from(selectedGridIds).join(', ') || 'None'}
			</div>
		</div>
	</section>

	<section class="section">
		<h2 class="heading-2">Interactive Components</h2>
		<div class="row">
			<!-- Dropdown -->
			<div class="demo-box p-4" style="height: 200px; display: flex; align-items: flex-start;">
				<Dropdown bind:open={dropdownOpen}>
					{#snippet trigger()}
						<Button variant="outline" icon="MoreHorizontal">Options</Button>
					{/snippet}
					{#snippet items()}
						<div class="dropdown-content">
							<button class="menu-item">
								<Icon name="Edit" size={14} /> Edit
							</button>
							<button class="menu-item">
								<Icon name="Copy" size={14} /> Duplicate
							</button>
							<div class="divider-h"></div>
							<button class="menu-item text-danger">
								<Icon name="Trash" size={14} /> Delete
							</button>
						</div>
					{/snippet}
				</Dropdown>
			</div>

			<!-- Modal Trigger -->
			<div class="demo-box p-4 flex items-center">
				<Button onclick={() => (modalOpen = true)}>Open Modal</Button>
			</div>

			<!-- Tooltips -->
			<div class="demo-box p-4 flex items-center gap-4">
				<Tooltip text="Top Tooltip">
					<Button variant="ghost" size="icon" icon="ArrowUp" />
				</Tooltip>
				<Tooltip text="Right Tooltip" position="right">
					<Button variant="ghost" size="icon" icon="ArrowRight" />
				</Tooltip>
				<Tooltip text="Bottom Tooltip" position="bottom">
					<Button variant="ghost" size="icon" icon="ArrowDown" />
				</Tooltip>
				<Tooltip text="Left Tooltip" position="left">
					<Button variant="ghost" size="icon" icon="ArrowLeft" />
				</Tooltip>
			</div>
		</div>
	</section>
</div>

{#snippet modalBodySnippet()}
	<p class="text-secondary">
		This is a demonstration of the modal component. It traps focus (basic) and handles backdrop
		clicks.
	</p>
	<div class="mt-4">
		<FormField label="Confirmation input">
			<Input placeholder="Type something..." fullWidth />
		</FormField>
	</div>
{/snippet}

{#snippet modalFooterSnippet()}
	<Button variant="ghost" onclick={() => (modalOpen = false)}>Cancel</Button>
	<Button onclick={() => (modalOpen = false)}>Confirm</Button>
{/snippet}

<Modal
	bind:open={modalOpen}
	title="Example Modal"
	body={modalBodySnippet}
	footer={modalFooterSnippet}
/>

<style>
	.dropdown-content {
		display: flex;
		flex-direction: column;
	}
	.menu-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border: none;
		background: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
		color: var(--text-primary);
		font-size: var(--text-sm);
		border-radius: 0.25rem;
	}
	.menu-item:hover {
		background-color: var(--bg-surface-alt);
	}
	.text-danger {
		color: var(--status-error);
	}
	.divider-h {
		height: 1px;
		background-color: var(--border-base);
		margin: 0.25rem 0;
	}
	.flex {
		display: flex;
	}
	.flex-col {
		flex-direction: column;
	}
	.gap-2 {
		gap: 0.5rem;
	}
	.gap-4 {
		gap: 1rem;
	}
	.items-center {
		align-items: center;
	}
	.mt-4 {
		margin-top: 1rem;
	}
	.kitchen-sink {
		padding: 2rem;
		margin: 0 auto;
		max-width: 80rem; /* max-w-7xl */
		display: flex;
		flex-direction: column;
		gap: 2rem; /* space-y-8 equivalent */
		font-family: var(--font-sans);
		color: var(--text-primary);
	}

	.sticky-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background-color: var(--bg-surface);
		padding: 1rem 0;
		border-bottom: 1px solid var(--border-base);
		margin-top: -2rem; /* Counteract parent padding to sit flush against viewport edge if needed, but here it's inside padding */
		/* Actually, parent has padding 2rem. To be truly sticky at top of viewport, we need to handle that or let it stick within the container. 
		   Ideally, kitchen-sink main padding should be handled differently or we use negative margins. 
		   Let's try negative margin to pull it up. */
		margin: -2rem -2rem 0 -2rem;
		padding: 1rem 2rem;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.heading-1 {
		font-size: var(--text-2xl);
		font-weight: 700;
	}

	.heading-2 {
		font-size: var(--text-xl);
		font-weight: 600;
		border-bottom: 1px solid var(--border-base);
		padding-bottom: 0.5rem;
	}

	.description {
		color: var(--text-secondary);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}

	.form-grid {
		display: grid;
		gap: 1rem;
		max-width: 28rem;
	}

	.toolbar-wrapper {
		max-width: 36rem;
	}

	.divider {
		width: 1px;
		height: 1.5rem;
		background-color: var(--border-base);
		margin: 0 0.25rem;
	}

	.grid-2-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.demo-box {
		border: 1px solid var(--border-base);
		border-radius: 0.375rem;
		overflow: hidden;
	}

	.h-80 {
		height: 20rem;
	}
	.p-4 {
		padding: 1rem;
	}
	.mb-2 {
		margin-bottom: 0.5rem;
	}
	.font-bold {
		font-weight: 600;
	}
	.text-secondary {
		color: var(--text-secondary);
	}
	.text-sm {
		font-size: var(--text-sm);
	}
	.bg-surface {
		background-color: var(--bg-surface);
	}
	.text-xl {
		font-size: var(--text-xl);
	}
	.text-base {
		font-size: var(--text-base);
	}
	.font-mono {
		font-family: var(--font-mono);
	}

	/* Headers for demo */
	h1 {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin: 0;
	}
	h2 {
		font-size: var(--text-xl);
		font-weight: 600;
		margin: 0;
	}
	h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0;
	}
	h4 {
		font-size: var(--text-base);
		font-weight: 600;
		margin: 0;
	}
	h5 {
		font-size: var(--text-sm);
		font-weight: 600;
		margin: 0;
	}
	h6 {
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		margin: 0;
	}

	/* Reset paragraph margins for alignment in demo grid */
	.grid-2-col p {
		margin: 0;
		line-height: 1.5;
	}
</style>
