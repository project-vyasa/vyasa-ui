import type { Component, ComponentType } from 'svelte';
export interface TabItem {
    id: string;
    label: string;
    icon?: Component | ComponentType;
    content?: import('svelte').Snippet;
    closeable?: boolean;
}
interface Props {
    tabs: TabItem[];
    activeTabId: string;
    onSelect: (id: string) => void;
    onClose?: (id: string) => void;
    children?: import('svelte').Snippet;
}
declare const Tabs: Component<Props, {}, "">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
