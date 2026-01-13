<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		component: Input,
		title: 'Atoms/Input',
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['text', 'password', 'email', 'number', 'tel', 'url']
			},
			error: { control: 'boolean' },
			disabled: { control: 'boolean' },
			fullWidth: { control: 'boolean' },
			placeholder: { control: 'text' }
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Enter text...' }} />

<Story name="With Value" args={{ value: 'Pre-filled value' }} />

<Story name="Password" args={{ type: 'password', value: 'secret123' }} />

<Story name="Error State" args={{ error: true, value: 'Invalid entry' }} />

<Story name="Disabled" args={{ disabled: true, value: 'Disabled input' }} />

<Story name="Full Width" args={{ fullWidth: true, placeholder: 'Spans full width' }} />
