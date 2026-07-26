interface Props {
    open?: boolean;
    position?: 'bottom-left' | 'bottom-right';
    trigger: import('svelte').Snippet;
    items: import('svelte').Snippet;
}
declare const Dropdown: import("svelte").Component<Props, {}, "open">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
