import type { SettingSection } from './types';
interface Props {
    schema: SettingSection[];
    data: Record<string, any>;
    class?: string;
}
declare const SettingsPanel: import("svelte").Component<Props, {}, "data">;
type SettingsPanel = ReturnType<typeof SettingsPanel>;
export default SettingsPanel;
