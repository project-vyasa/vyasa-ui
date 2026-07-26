import type { Snippet, Component, ComponentType } from 'svelte';
interface Props {
    title: string;
    icon?: Component | ComponentType;
    actions?: Snippet;
    children: Snippet;
    class?: string;
}
declare const Panel: Component<Props, {}, "">;
type Panel = ReturnType<typeof Panel>;
export default Panel;
