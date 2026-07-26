<script lang="ts">
	interface Props {
		value: string;
		id?: string;
		name?: string;
		disabled?: boolean;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
	}

	let {
		value = $bindable('#000000'),
		id,
		name,
		disabled = false,
		oninput,
		onchange
	}: Props = $props();

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		oninput?.(e);
	}
</script>

<div class="color-input-container" class:disabled>
	<div class="color-preview-wrapper">
		<input
			type="color"
			{id}
			{name}
			{value}
			{disabled}
			oninput={handleInput}
			{onchange}
			class="color-picker"
		/>
		<div class="color-preview" style:background-color={value}></div>
	</div>
	<input
		type="text"
		bind:value
		{disabled}
		oninput={handleInput}
		{onchange}
		class="color-text"
		maxlength="9"
	/>
</div>

<style>
	.color-input-container {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
	}

	.color-input-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.color-preview-wrapper {
		position: relative;
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
	}

	/* The actual input type=color is usually ugly, so we make it cover the preview but be transparent */
	.color-picker {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		opacity: 0;
		cursor: pointer;
		z-index: 10;
	}

	.color-picker:disabled {
		cursor: not-allowed;
	}

	.color-preview {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 1px solid var(--border-base);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.color-text {
		flex: 1;
		min-width: 0;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		background-color: var(--bg-surface);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		height: var(--control-height-base);
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.color-text:focus {
		outline: none;
		border-color: var(--action-primary);
		box-shadow: 0 0 0 2px var(--action-primary-alpha);
	}

	.color-text:disabled {
		cursor: not-allowed;
		background-color: var(--bg-surface-alt);
	}
</style>
