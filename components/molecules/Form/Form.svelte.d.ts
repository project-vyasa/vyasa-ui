import type { Snippet } from 'svelte';
interface Props {
    gap?: 'sm' | 'md' | 'lg';
    columns?: 1 | 2 | 3 | 4;
    children: Snippet;
    class?: string;
    onSubmit?: (e: SubmitEvent) => void;
}
declare const Form: import("svelte").Component<Props, {}, "">;
type Form = ReturnType<typeof Form>;
export default Form;
