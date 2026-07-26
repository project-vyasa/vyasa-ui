interface Props {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    closable?: boolean;
    onClose?: () => void;
    children?: import('svelte').Snippet;
}
declare const Alert: import("svelte").Component<Props, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
