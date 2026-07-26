import type { Snippet } from 'svelte';
interface Props {
    label?: string;
    error?: string;
    hint?: string;
    description?: string;
    required?: boolean;
    id?: string;
    layout?: 'vertical' | 'horizontal';
    align?: 'start' | 'center' | 'end';
    children: Snippet;
    class?: string;
}
declare const FormField: import("svelte").Component<Props, {}, "">;
type FormField = ReturnType<typeof FormField>;
export default FormField;
