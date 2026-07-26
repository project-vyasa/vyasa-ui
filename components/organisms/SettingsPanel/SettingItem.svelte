<script lang="ts">
	import type { SettingItem } from './types';
	import FormField from '../../molecules/FormField/FormField.svelte';
	import Input from '../../atoms/Input/Input.svelte';
	import InputColor from '../../atoms/InputColor/InputColor.svelte';
	import Switch from '../../atoms/Switch/Switch.svelte';
	import Select from '../../molecules/Select/Select.svelte';

	interface Props {
		item: SettingItem;
		value: any;
	}

	let { item, value = $bindable() }: Props = $props();

	// Calculate grid column span if provided
	let style = $derived(item.colSpan ? `grid-column: span ${item.colSpan};` : '');
</script>

<div class="setting-item-wrapper" {style}>
	{#if item.type === 'boolean'}
		<!-- Boolean logic: Side-by-side switch -->
		<div class="setting-boolean-row">
			<div class="setting-label-group">
				<label for={item.id} class="setting-label">{item.label}</label>
				{#if item.description}
					<p class="setting-description">{item.description}</p>
				{/if}
			</div>
			<Switch id={item.id} bind:checked={value} />
		</div>
	{:else}
		<!-- Standard Input Fields -->
		<FormField
			id={item.id}
			label={item.label}
			description={item.description}
			layout="vertical"
			class="mb-0"
		>
			{#if item.type === 'select' || item.type === 'font'}
				<Select
					id={item.id}
					bind:value
					options={item.options || []}
					placeholder={item.placeholder}
				/>
			{:else if item.type === 'color'}
				<InputColor id={item.id} bind:value />
			{:else if item.type === 'number'}
				<Input
					type="number"
					id={item.id}
					bind:value
					min={item.min}
					max={item.max}
					step={item.step}
					placeholder={item.placeholder}
					fullWidth
				/>
			{:else}
				<!-- Default to Input for text, email, password, date, time, etc. -->
				<Input type={item.type} id={item.id} bind:value placeholder={item.placeholder} fullWidth />
			{/if}
		</FormField>
	{/if}
</div>

<style>
	.setting-item-wrapper {
		/* Needs to be a block/wrapper to respect grid placement if parent is grid */
		min-width: 0;
	}

	.setting-boolean-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem 0;
		margin-bottom: 0;
		gap: 1rem;
		min-height: 42px; /* Align roughly with input heights */
	}

	.setting-label-group {
		flex: 1;
	}

	.setting-label {
		display: block;
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-primary);
	}

	.setting-description {
		font-size: var(--text-xs);
		color: var(--text-secondary);
		margin-top: 0.125rem;
		line-height: 1.4;
	}
</style>
