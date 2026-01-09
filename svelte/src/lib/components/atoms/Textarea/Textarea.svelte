<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		rows?: number;
		disabled?: boolean;
		readonly?: boolean;
		fullWidth?: boolean;
		autoResize?: boolean;
		maxHeight?: string;
		name?: string;
		id?: string;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
	}

	let {
		value = $bindable(''),
		placeholder,
		rows = 3,
		disabled = false,
		readonly = false,
		fullWidth = false,
		autoResize = false,
		maxHeight,
		name,
		id,
		oninput,
		onchange
	}: Props = $props();

	let textareaRef: HTMLTextAreaElement;

	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		value = target.value;
		if (autoResize) {
			adjustHeight();
		}
		oninput?.(e);
	}

	function adjustHeight() {
		if (!textareaRef) return;
		textareaRef.style.height = 'auto';
		textareaRef.style.height = `${textareaRef.scrollHeight}px`;
	}

	$effect(() => {
		if (autoResize && value && textareaRef) {
			// Adjust height on mount or value change
			adjustHeight();
		}
	});
</script>

<textarea
	bind:this={textareaRef}
	{name}
	{id}
	class="textarea"
	class:full-width={fullWidth}
	{placeholder}
	{rows}
	{disabled}
	{readonly}
	bind:value
	oninput={handleInput}
	{onchange}
	style:max-height={maxHeight}
></textarea>

<style>
	.textarea {
		background-color: var(--bg-surface);
		border: 1px solid var(--border-base);
		border-radius: var(--control-radius);
		padding: 0.5rem 0.75rem;
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--text-primary);
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		resize: vertical; /* Default resize behavior */
		min-height: 2.5rem;
	}

	.textarea:focus {
		outline: none;
		border-color: var(--action-primary);
		box-shadow: 0 0 0 2px var(--action-primary-alpha);
	}

	.textarea::placeholder {
		color: var(--text-secondary);
		opacity: 0.7;
	}

	.textarea:disabled {
		background-color: var(--bg-surface-alt);
		cursor: not-allowed;
		opacity: 0.7;
	}

	.textarea:read-only {
		background-color: var(--bg-surface-alt);
	}

	.full-width {
		width: 100%;
		display: block;
	}
</style>
