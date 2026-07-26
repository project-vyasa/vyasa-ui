interface Props {
    checked?: boolean | 'mixed';
    disabled?: boolean;
    label?: string;
    value?: string;
    name?: string;
    id?: string;
    onchange?: (checked: boolean | 'mixed', value?: string) => void;
}
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
