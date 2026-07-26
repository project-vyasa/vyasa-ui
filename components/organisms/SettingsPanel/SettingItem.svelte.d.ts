import type { SettingItem } from './types';
interface Props {
    item: SettingItem;
    value: any;
}
declare const SettingItem: import("svelte").Component<Props, {}, "value">;
type SettingItem = ReturnType<typeof SettingItem>;
export default SettingItem;
