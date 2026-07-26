<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CodeEditor from './CodeEditor.svelte';

	const { Story } = defineMeta({
		component: CodeEditor,
		title: 'Molecules/CodeEditor',
		argTypes: {
			language: {
				control: { type: 'select' },
				options: ['markdown', 'html', 'handlebars', 'typescript', 'vy']
			},
			theme: {
				control: { type: 'radio' },
				options: ['light', 'dark']
			},
			readonly: {
				control: 'boolean'
			},
			value: {
				control: 'text'
			}
		}
	});
</script>

<Story
	name="Markdown"
	args={{
		value: '# Hello World\n\nThis is a **markdown** editor.\n\n- Item 1\n- Item 2',
		language: 'markdown',
		theme: 'dark'
	}}
/>

<Story
	name="TypeScript"
	args={{
		value: 'const greeting: string = "Hello World";\nconsole.log(greeting);',
		language: 'typescript',
		theme: 'dark'
	}}
/>

<Story
	name="HTML"
	args={{
		value: '<div class="container">\n  <h1>Hello World</h1>\n</div>',
		language: 'html',
		theme: 'dark'
	}}
/>

<Story
	name="Handlebars"
	args={{
		value:
			'<div class="entry">\n  <h1>{{title}}</h1>\n  <div class="body">\n    {{body}}\n  </div>\n</div>',
		language: 'handlebars',
		theme: 'dark'
	}}
/>

<Story
	name="Vy (Placeholder)"
	args={{
		value: 'word = definition | synonym1, synonym2',
		language: 'vy',
		theme: 'dark'
	}}
/>

<Story
	name="Light Theme"
	args={{
		value: '# Light Theme\n\nThis is the light theme.',
		language: 'markdown',
		theme: 'light'
	}}
/>

<Story
	name="Read Only"
	args={{
		value: 'This content cannot be edited.',
		readonly: true,
		language: 'markdown',
		theme: 'dark'
	}}
/>
