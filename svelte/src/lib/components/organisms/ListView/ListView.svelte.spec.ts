import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ListView from './ListView.svelte';

interface TestItem {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	date: string;
	unread?: boolean;
}

const mockItems: TestItem[] = [
	{
		id: '1',
		title: 'First Item',
		subtitle: 'First Subtitle',
		description: 'First description content.',
		date: '10:30 AM',
		unread: true
	},
	{
		id: '2',
		title: 'Second Item',
		subtitle: 'Second Subtitle',
		description: 'Second description content.',
		date: 'Yesterday',
		unread: false
	}
];

describe('ListView.svelte', () => {
	it('should render items with default fields', async () => {
		const { getByText } = render(ListView, {
			items: mockItems,
			titleField: 'title',
			subtitleField: 'subtitle',
			descriptionField: 'description',
			metaField: 'date',
			unreadField: 'unread'
		});

		await expect.element(getByText('First Item')).toBeInTheDocument();
		await expect.element(getByText('First Subtitle')).toBeInTheDocument();
		await expect.element(getByText('First description content.')).toBeInTheDocument();
		await expect.element(getByText('10:30 AM')).toBeInTheDocument();

		await expect.element(getByText('Second Item')).toBeInTheDocument();
		await expect.element(getByText('Second Subtitle')).toBeInTheDocument();
		await expect.element(getByText('Second description content.')).toBeInTheDocument();
		await expect.element(getByText('Yesterday')).toBeInTheDocument();
	});

	it('should call onSelect when an item is clicked', async () => {
		const onSelect = vi.fn();
		const { getByText } = render(ListView, {
			items: mockItems,
			titleField: 'title',
			onSelect
		});

		const firstItem = getByText('First Item');
		await firstItem.click();

		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toHaveBeenCalledWith(mockItems[0]);
	});

	it('should handle multi-selection with checkboxes when selectable is true', async () => {
		const onSelectionChange = vi.fn();
		const selectedIds = new Set<string | number>();

		const { container } = render(ListView, {
			items: mockItems,
			titleField: 'title',
			selectable: true,
			selectedIds,
			onSelectionChange
		});

		// Find the checkbox for the first item
		const checkboxes = container.querySelectorAll('input[type="checkbox"]');
		expect(checkboxes.length).toBe(2);

		const firstCheckbox = checkboxes[0] as HTMLInputElement;
		firstCheckbox.click();

		expect(onSelectionChange).toHaveBeenCalledTimes(1);
		// The mock handler checks set values
		const calledSet = onSelectionChange.mock.calls[0][0] as Set<string | number>;
		expect(calledSet.has('1')).toBe(true);
	});

	it('should group items when groupBy is provided and allow expanding collapsed groups', async () => {
		const itemsWithGroups = [
			{ id: '1', title: 'Task A', category: 'Work' },
			{ id: '2', title: 'Task B', category: 'Personal' },
			{ id: '3', title: 'Task C', category: 'Work' }
		];

		const { getByText } = render(ListView, {
			items: itemsWithGroups,
			titleField: 'title',
			groupBy: 'category'
		});

		await expect.element(getByText('Work')).toBeInTheDocument();
		await expect.element(getByText('Personal')).toBeInTheDocument();
		await expect.element(getByText('Task A')).toBeInTheDocument();
		await expect.element(getByText('Task C')).toBeInTheDocument();

		// Group 'Personal' is collapsed initially (non-active). Clicking header expands it.
		const personalHeader = getByText('Personal');
		await personalHeader.click();
		await expect.element(getByText('Task B')).toBeInTheDocument();

		// Clicking header again collapses it.
		await personalHeader.click();
		await expect.element(getByText('Task B')).not.toBeInTheDocument();
	});

	it('should keep all groups expanded when collapsibleGroups is false', async () => {
		const itemsWithGroups = [
			{ id: '1', title: 'Task A', category: 'Work' },
			{ id: '2', title: 'Task B', category: 'Personal' }
		];

		const { getByText } = render(ListView, {
			items: itemsWithGroups,
			titleField: 'title',
			groupBy: 'category',
			collapsibleGroups: false
		});

		await expect.element(getByText('Task A')).toBeInTheDocument();
		await expect.element(getByText('Task B')).toBeInTheDocument();
	});
});

