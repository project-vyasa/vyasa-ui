<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { EditorState, Compartment } from '@codemirror/state';
	import { keymap } from '@codemirror/view';
	import { defaultKeymap } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { markdown } from '@codemirror/lang-markdown';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { vyasaLanguage } from './vyasaLanguage';

	interface Props {
		value: string;
		language?: 'markdown' | 'html' | 'handlebars' | 'typescript' | 'vy';
		readonly?: boolean;
		lineWrapping?: boolean;
		theme?: 'light' | 'dark';
		class?: string;
	}

	let {
		value = $bindable(),
		language = 'markdown',
		readonly = false,
		lineWrapping = false,
		theme = 'dark',
		class: className = ''
	}: Props = $props();

	let editorElement: HTMLElement;
	let view: EditorView;

	// Compartments for dynamic reconfiguration
	const languageConf = new Compartment();
	const themeConf = new Compartment();
	const readOnlyConf = new Compartment();
	const lineWrappingConf = new Compartment();

	function getLanguageExtension(lang: string) {
		switch (lang) {
			case 'typescript':
				return javascript({ typescript: true });
			case 'html':
			case 'handlebars': // Handlebars uses HTML mode for now
				return html();
			case 'vy':
				return vyasaLanguage;
			case 'markdown':
			default:
				return markdown();
		}
	}

	function getThemeExtension(thm: string) {
		return thm === 'dark' ? oneDark : EditorView.baseTheme({});
	}

	onMount(() => {
		const startState = EditorState.create({
			doc: value,
			extensions: [
				basicSetup,
				keymap.of(defaultKeymap),
				languageConf.of(getLanguageExtension(language)),
				themeConf.of(getThemeExtension(theme)),
				readOnlyConf.of(EditorState.readOnly.of(readonly)),
				lineWrappingConf.of(lineWrapping ? EditorView.lineWrapping : []),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						value = update.state.doc.toString();
					}
				})
			]
		});

		view = new EditorView({
			state: startState,
			parent: editorElement
		});
	});

	onDestroy(() => {
		if (view) {
			view.destroy();
		}
	});

	// Reactive updates
	$effect(() => {
		if (view && value !== view.state.doc.toString()) {
			view.dispatch({
				changes: { from: 0, to: view.state.doc.length, insert: value }
			});
		}
	});

	$effect(() => {
		if (view) {
			view.dispatch({
				effects: languageConf.reconfigure(getLanguageExtension(language))
			});
		}
	});

	$effect(() => {
		if (view) {
			view.dispatch({
				effects: themeConf.reconfigure(getThemeExtension(theme))
			});
		}
	});

	$effect(() => {
		if (view) {
			view.dispatch({
				effects: readOnlyConf.reconfigure(EditorState.readOnly.of(readonly))
			});
		}
	});

	$effect(() => {
		if (view) {
			view.dispatch({
				effects: lineWrappingConf.reconfigure(lineWrapping ? EditorView.lineWrapping : [])
			});
		}
	});
</script>

<div
	bind:this={editorElement}
	class="h-full w-full overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 {className}"
></div>

<style>
	:global(.cm-editor) {
		height: 100%;
	}
	:global(.cm-scroller) {
		font-family: 'Fira Code', monospace;
	}
</style>
