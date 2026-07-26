import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ActivityBar from './ActivityBar.svelte';
import { createRawSnippet } from 'svelte';
import { Files, Search } from 'lucide-svelte';
describe('ActivityBar.svelte', () => {
    it('should render items correctly', async () => {
        const { getByTitle } = render(ActivityBar, {
            items: [
                { id: 'files', icon: Files, title: 'Explorer' },
                { id: 'search', icon: Search, title: 'Search' }
            ]
        });
        await expect.element(getByTitle('Explorer')).toBeInTheDocument();
        await expect.element(getByTitle('Search')).toBeInTheDocument();
    });
    it('should render children when provided', async () => {
        const { getByText } = render(ActivityBar, {
            children: createRawSnippet(() => ({
                render: () => '<div>Test Content</div>'
            }))
        });
        await expect.element(getByText('Test Content')).toBeInTheDocument();
    });
    it('should render top and bottom slots when provided', async () => {
        const { getByText } = render(ActivityBar, {
            top: createRawSnippet(() => ({
                render: () => '<div>Top Content</div>'
            })),
            bottom: createRawSnippet(() => ({
                render: () => '<div>Bottom Content</div>'
            }))
        });
        await expect.element(getByText('Top Content')).toBeInTheDocument();
        await expect.element(getByText('Bottom Content')).toBeInTheDocument();
    });
});
