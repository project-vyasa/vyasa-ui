interface Props {
    value: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    oninput?: (e: Event) => void;
    onchange?: (e: Event) => void;
}
declare const InputColor: import("svelte").Component<Props, {}, "value">;
type InputColor = ReturnType<typeof InputColor>;
export default InputColor;
