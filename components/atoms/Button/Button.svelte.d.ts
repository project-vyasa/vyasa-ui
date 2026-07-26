import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Component, ComponentType } from 'svelte';
interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    loading?: boolean;
    icon?: Component | ComponentType;
    children?: import('svelte').Snippet;
}
declare const Button: Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
