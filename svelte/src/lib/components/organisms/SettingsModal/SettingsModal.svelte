<script lang="ts">
	import Modal from '$lib/components/molecules/Modal/Modal.svelte';
	import SettingsPanel from '$lib/components/organisms/SettingsPanel/SettingsPanel.svelte';
	import type { SettingSection } from '$lib/components/organisms/SettingsPanel/types';

	interface Props {
		open?: boolean;
		title?: string;
		schema: SettingSection[];
		data: Record<string, any>;
	}

	let { open = $bindable(false), title = 'Settings', schema, data = $bindable() }: Props = $props();
</script>

<Modal bind:open {title} size="xl">
	{#snippet body()}
		<div class="settings-modal-body">
			<SettingsPanel {schema} bind:data class="settings-panel-in-modal" />
		</div>
	{/snippet}
</Modal>

<style>
	.settings-modal-body {
		height: 65vh;
		min-height: 400px;
		display: flex;
		flex-direction: column;
		/* Reset margin/padding since modal body has padding, but we want SettingsPanel to fill it fully */
		margin: -1rem;
	}
	:global(.settings-panel-in-modal) {
		border: none !important;
		border-radius: 0 !important;
	}
</style>
