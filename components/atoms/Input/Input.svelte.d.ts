import type { HTMLInputAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
interface Props extends Omit<HTMLInputAttributes, 'prefix'> {
    'aria-invalid'?: boolean | 'grammar' | 'spelling';
    error?: boolean;
    fullWidth?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'datetime-local' | 'time' | 'month' | 'week' | 'tel' | 'url' | 'search' | 'file' | 'hidden';
}
declare const Input: import("svelte").Component<Props, {}, "value">;
type Input = ReturnType<typeof Input>;
export default Input;
