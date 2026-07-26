interface Props {
    variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
    children?: import('svelte').Snippet;
    class?: string;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
