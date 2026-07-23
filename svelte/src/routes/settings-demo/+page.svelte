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
					columns: 2,
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
							description: 'Controls the font family.',
							colSpan: 2
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

	import DemoToolbar from '$lib/components/organisms/DemoToolbar/DemoToolbar.svelte';
	import SettingsModal from '$lib/components/organisms/SettingsModal/SettingsModal.svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import { onDestroy } from 'svelte';

	let isSettingsOpen = $state(false);

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
			document.body.style.height = '';
			document.body.style.margin = '';
		}
	});
</script>

<div class="h-screen flex flex-col">
	<DemoToolbar title="Settings Panel Demo" backUrl="/" />

	<div class="flex-1 flex flex-col items-center justify-center p-8 bg-surface-elevated">
		<Button variant="primary" onclick={() => (isSettingsOpen = true)}>Open Settings Modal</Button>

		<div
			class="mt-8 w-full max-w-2xl bg-surface p-4 border border-border-base rounded overflow-auto font-mono text-xs"
		>
			<h3 class="mb-2 font-semibold text-center">Live Settings Object</h3>
			<pre class="whitespace-pre-wrap">{JSON.stringify(settings, null, 2)}</pre>
		</div>
	</div>

	<SettingsModal bind:open={isSettingsOpen} {schema} bind:data={settings} />
</div>

<style>
	/* Quick utility overrides for demo layout */
	:global(body) {
		margin: 0;
		height: 100vh;
		overflow: hidden;
	}
	/* Use :global for classes passed to components to avoid unused selector warnings */
	:global(.border-0) {
		border: 0;
	}
	:global(.rounded-none) {
		border-radius: 0;
	}

	.h-screen {
		height: 100vh;
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
	.overflow-auto {
		overflow: auto;
	}
	.p-4 {
		padding: 1rem;
	}
	/* Removed unused utility classes flagged by svelte-check */
	.bg-surface-elevated {
		background-color: var(--bg-surface-elevated);
	}
	.font-semibold {
		font-weight: 600;
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
</style>
