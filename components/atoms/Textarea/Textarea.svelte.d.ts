interface Props {
    value?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    readonly?: boolean;
    fullWidth?: boolean;
    autoResize?: boolean;
    maxHeight?: string;
    name?: string;
    id?: string;
    oninput?: (e: Event) => void;
    onchange?: (e: Event) => void;
}
declare const Textarea: import("svelte").Component<Props, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
