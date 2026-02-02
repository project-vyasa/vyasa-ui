<script lang="ts">
	import SettingsPanel from '$lib/components/organisms/SettingsPanel/SettingsPanel.svelte';
	import type { SettingSection } from '$lib/components/organisms/SettingsPanel/types';
	import { Terminal, Type, Palette, Layout } from 'lucide-svelte';

	let settings = $state({
		'editor.fontFamily': 'Fira Code',
		'editor.fontSize': 14,
		'editor.lineHeight': 1.5,
		'editor.minimap': true,
		'editor.wordWrap': 'off',
		'terminal.integrated.fontFamily': 'JetBrains Mono',
		'terminal.integrated.fontSize': 13,
		'theme.colorTheme': 'Default Dark+ based',
		'theme.iconTheme': 'file-icons',
		'workbench.colorCustomizations.activityBar.background': '#333333',
		'workbench.enablePreview': true
	});

	const schema: SettingSection[] = [
		{
			id: 'editor',
			title: 'Text Editor',
			icon: Type,
			groups: [
				{
					title: 'Font',
					items: [
						{
							id: 'editor.fontFamily',
							label: 'Font Family',
							type: 'font',
							options: [
								{ label: 'Fira Code', value: 'Fira Code' },
								{ label: 'JetBrains Mono', value: 'JetBrains Mono' },
								{ label: 'Source Code Pro', value: 'Source Code Pro' },
								{ label: 'Courier New', value: 'Courier New' }
							],
							description: 'Controls the font family.'
						},
						{
							id: 'editor.fontSize',
							label: 'Font Size',
							type: 'number',
							min: 8,
							max: 32,
							step: 1,
							description: 'Controls the font size in pixels.'
						},
						{
							id: 'editor.lineHeight',
							label: 'Line Height',
							type: 'number',
							min: 0.5,
							max: 3,
							step: 0.1,
							description: 'Controls the line height.'
						}
					]
				},
				{
					title: 'Minimap',
					items: [
						{
							id: 'editor.minimap',
							label: 'Enable Minimap',
							type: 'boolean',
							description: 'Controls whether the minimap is shown.'
						}
					]
				},
				{
					title: 'Word Wrap',
					items: [
						{
							id: 'editor.wordWrap',
							label: 'Word Wrap',
							type: 'select',
							options: [
								{ label: 'Off', value: 'off' },
								{ label: 'On', value: 'on' },
								{ label: 'Word Wrap Column', value: 'wordWrapColumn' },
								{ label: 'Bounded', value: 'bounded' }
							],
							description: 'Controls how lines should wrap.'
						}
					]
				}
			]
		},
		{
			id: 'terminal',
			title: 'Terminal',
			icon: Terminal,
			groups: [
				{
					items: [
						{
							id: 'terminal.integrated.fontFamily',
							label: 'Font Family',
							type: 'font',
							options: [
								{ label: 'Fira Code', value: 'Fira Code' },
								{ label: 'JetBrains Mono', value: 'JetBrains Mono' },
								{ label: 'MesloLGS NF', value: 'MesloLGS NF' }
							]
						},
						{
							id: 'terminal.integrated.fontSize',
							label: 'Font Size',
							type: 'number',
							min: 8,
							max: 32
						}
					]
				}
			]
		},
		{
			id: 'workbench',
			title: 'Workbench',
			icon: Layout,
			groups: [
				{
					items: [
						{
							id: 'workbench.enablePreview',
							label: 'Enable Preview',
							type: 'boolean',
							description: 'Controls whether opened editors show as preview.'
						}
					]
				},
				{
					title: 'Appearance',
					items: [
						{
							id: 'workbench.colorCustomizations.activityBar.background',
							label: 'Activity Bar Background',
							type: 'color',
							description: 'Custom background color for the Activity Bar'
						}
					]
				}
			]
		},
		{
			id: 'theme',
			title: 'Theme',
			icon: Palette,
			groups: [
				{
					items: [
						{
							id: 'theme.colorTheme',
							label: 'Color Theme',
							type: 'select',
							options: [
								{ label: 'Default Dark+', value: 'Default Dark+ based' },
								{ label: 'Light+', value: 'Light+ (default light)' },
								{ label: 'Monokai', value: 'Monokai' }
							]
						}
					]
				}
			]
		}
	];
</script>

<div class="h-screen flex flex-col">
	<div class="p-4 border-b border-border-base bg-surface-alt">
		<h1 class="text-xl font-bold">Settings Panel Demo</h1>
		<p class="text-secondary text-sm">Modify settings below and watch the JSON object update.</p>
	</div>
	<div class="flex-1 flex overflow-hidden">
		<!-- Settings Panel uses full height of parent -->
		<div class="flex-[2] h-full border-r border-border-base">
			<SettingsPanel {schema} bind:data={settings} class="h-full border-0 rounded-none" />
		</div>

		<!-- Live Data Preview -->
		<div class="flex-1 p-4 bg-surface-elevated overflow-auto font-mono text-xs">
			<h3 class="mb-2 font-semibold">Live Settings Object</h3>
			<pre class="whitespace-pre-wrap">{JSON.stringify(settings, null, 2)}</pre>
		</div>
	</div>
</div>

<style>
	/* Quick utility overrides for demo layout */
	:global(body) {
		margin: 0;
		height: 100vh;
		overflow: hidden;
	}
	.h-screen {
		height: 100vh;
	}
	.w-full {
		width: 100%;
	}
	.flex {
		display: flex;
	}
	.flex-col {
		flex-direction: column;
	}
	.flex-1 {
		flex: 1;
	}
	.h-full {
		height: 100%;
	}
	.overflow-hidden {
		overflow: hidden;
	}
	.overflow-auto {
		overflow: auto;
	}
	.p-4 {
		padding: 1rem;
	}
	.border-b {
		border-bottom: 1px solid var(--border-base);
	}
	.border-r {
		border-right: 1px solid var(--border-base);
	}
	.border-0 {
		border: 0;
	}
	.rounded-none {
		border-radius: 0;
	}
	.bg-surface-alt {
		background-color: var(--bg-surface-alt);
	}
	.bg-surface-elevated {
		background-color: var(--bg-surface-elevated);
	}
	.text-xl {
		font-size: 1.25rem;
	}
	.font-bold {
		font-weight: 700;
	}
	.font-semibold {
		font-weight: 600;
	}
	.text-secondary {
		color: var(--text-secondary);
	}
	.text-sm {
		font-size: 0.875rem;
	}
	.text-xs {
		font-size: 0.75rem;
	}
	.mb-2 {
		margin-bottom: 0.5rem;
	}
	.font-mono {
		font-family: var(--font-mono);
	}
	.whitespace-pre-wrap {
		white-space: pre-wrap;
	}
	.flex-\[2\] {
		flex: 2;
	}
</style>
