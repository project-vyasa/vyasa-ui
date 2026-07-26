import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SettingsPanel from './SettingsPanel.svelte';
describe('SettingsPanel.svelte', () => {
    it('should render empty state when schema is empty', async () => {
        const { getByText } = render(SettingsPanel, {
            schema: [],
            data: {}
        });
        await expect.element(getByText('No settings found matching ""')).toBeInTheDocument();
    });
    it('should render sections based on schema', async () => {
        const schema = [
            {
                id: 'general',
                title: 'General Settings',
                groups: [
                    {
                        id: 'group1',
                        title: 'Group 1',
                        items: [
                            {
                                id: 'testItem',
                                type: 'text',
                                label: 'Test Item Label'
                            }
                        ]
                    }
                ]
            }
        ];
        const { getByRole, getByText } = render(SettingsPanel, {
            schema,
            data: { testItem: 'value' }
        });
        await expect.element(getByRole('heading', { name: 'General Settings' })).toBeInTheDocument();
        await expect.element(getByRole('heading', { name: 'Group 1' })).toBeInTheDocument();
        await expect.element(getByText('Test Item Label')).toBeInTheDocument();
    });
});
