<script lang="ts">
	import type { SettingItem } from './types';
	import Icon from '$lib/components/atoms/Icon/Icon.svelte';
	import { Info } from 'lucide-svelte';

	interface Props {
		item: SettingItem;
		value: any;
	}

	let { item, value = $bindable() }: Props = $props();

	function handleColorChange(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
	}
</script>

<div class="setting-item">
	<div class="setting-info">
		<label for={item.id} class="setting-label">
			{item.label}
		</label>
		{#if item.description}
			<div class="setting-description">{item.description}</div>
		{/if}
	</div>

	<div class="setting-control">
		{#if item.type === 'text'}
			<input
				id={item.id}
				type="text"
				bind:value
				placeholder={item.placeholder}
				class="input-text"
			/>
		{:else if item.type === 'number'}
			<input
				id={item.id}
				type="number"
				bind:value
				min={item.min}
				max={item.max}
				step={item.step}
				class="input-number"
			/>
		{:else if item.type === 'boolean'}
			<label class="switch">
				<input id={item.id} type="checkbox" bind:checked={value} />
				<span class="slider round"></span>
			</label>
		{:else if item.type === 'color'}
			<div class="color-wrapper">
				<input id={item.id} type="color" {value} oninput={handleColorChange} class="input-color" />
				<span class="color-value">{value}</span>
			</div>
		{:else if item.type === 'select' || item.type === 'font'}
			<select id={item.id} bind:value class="input-select">
				{#each item.options || [] as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{/if}
	</div>
</div>

<style>
	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--border-base);
		gap: var(--space-4);
	}

	.setting-item:last-child {
		border-bottom: none;
	}

	.setting-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.setting-label {
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		color: var(--text-primary);
	}

	.setting-description {
		font-size: var(--text-xs);
		color: var(--text-secondary);
		line-height: 1.4;
	}

	.setting-control {
		flex-shrink: 0;
		min-width: 150px;
		display: flex;
		justify-content: flex-end;
	}

	/* Input Styles */
	.input-text,
	.input-number,
	.input-select {
		width: 100%;
		padding: var(--space-1) var(--space-2);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		background-color: var(--bg-surface);
		color: var(--text-primary);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		transition: border-color 0.2s;
	}

	.input-text:focus,
	.input-number:focus,
	.input-select:focus {
		outline: none;
		border-color: var(--action-primary);
		box-shadow: 0 0 0 1px var(--action-primary);
	}

	/* Switch Styles */
	.switch {
		position: relative;
		display: inline-block;
		width: 36px;
		height: 20px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--color-gray-300);
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 16px;
		width: 16px;
		left: 2px;
		bottom: 2px;
		background-color: white;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: var(--action-primary);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--action-primary);
	}

	input:checked + .slider:before {
		transform: translateX(16px);
	}

	.slider.round {
		border-radius: 20px;
	}

	.slider.round:before {
		border-radius: 50%;
	}

	/* Color Input */
	.color-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.input-color {
		-webkit-appearance: none;
		appearance: none;
		border: none;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		overflow: hidden;
		padding: 0;
		cursor: pointer;
		background: none;
	}

	.input-color::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	.input-color::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
		border: 1px solid var(--border-base);
	}

	.color-value {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-secondary);
	}
</style>
