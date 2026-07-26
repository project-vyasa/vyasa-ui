import type { Snippet } from 'svelte';
interface Props {
    children: Snippet;
    orientation?: 'horizontal' | 'vertical';
    class?: string;
}
declare const Toolbar: import("svelte").Component<Props, {}, "">;
type Toolbar = ReturnType<typeof Toolbar>;
export default Toolbar;
