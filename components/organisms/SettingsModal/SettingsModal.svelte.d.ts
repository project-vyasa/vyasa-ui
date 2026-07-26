import type { SettingSection } from '../SettingsPanel/types';
interface Props {
    open?: boolean;
    title?: string;
    schema: SettingSection[];
    data: Record<string, any>;
}
declare const SettingsModal: import("svelte").Component<Props, {}, "open" | "data">;
type SettingsModal = ReturnType<typeof SettingsModal>;
export default SettingsModal;
