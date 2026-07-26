import { type Toast } from '../../../stores/toast.svelte.js';
interface Props {
    item: Toast;
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
