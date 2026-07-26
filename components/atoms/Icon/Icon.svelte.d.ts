import type { Component } from 'svelte';
interface Props {
    icon: Component | any;
    size?: number | string;
    strokeWidth?: number | string;
    class?: string;
    [key: string]: any;
}
declare const Icon: Component<Props, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
