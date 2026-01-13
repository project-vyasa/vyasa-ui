<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		component: Button,
		title: 'Atoms/Button',
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning']
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg', 'icon']
			},
			loading: { control: 'boolean' },
			disabled: { control: 'boolean' },
			icon: { control: 'text' }
		}
	});
</script>

<Story name="Primary" args={{ children: 'Primary Button', variant: 'primary' }} />

<Story name="Secondary" args={{ children: 'Secondary Button', variant: 'secondary' }} />

<Story name="Outline" args={{ children: 'Outline Button', variant: 'outline' }} />

<Story name="Ghost" args={{ children: 'Ghost Button', variant: 'ghost' }} />

<Story name="Danger" args={{ children: 'Danger Button', variant: 'danger' }} />

<Story name="Success" args={{ children: 'Success Button', variant: 'success' }} />

<Story name="Warning" args={{ children: 'Warning Button', variant: 'warning' }} />

<Story name="Loading" args={{ children: 'Loading State', loading: true }} />

<Story name="With Icon" args={{ children: 'Search', icon: 'Search' }} />

<Story name="Icon Only" args={{ icon: 'Plus', size: 'icon', 'aria-label': 'Add Item' }} />
