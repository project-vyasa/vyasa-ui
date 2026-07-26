import type { Snippet, Component, ComponentType } from 'svelte';
export interface ActivityBarItem {
    id: string;
    icon: Component<any> | ComponentType;
    title?: string;
}
interface Props {
    items?: ActivityBarItem[];
    activeId?: string;
    expanded?: boolean;
    children?: Snippet;
    top?: Snippet;
    bottom?: Snippet;
}
declare const ActivityBar: Component<Props, {}, "activeId" | "expanded">;
type ActivityBar = ReturnType<typeof ActivityBar>;
export default ActivityBar;
