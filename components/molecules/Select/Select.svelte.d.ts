interface Option {
    label: string;
    value: any;
}
interface Props {
    options: Option[];
    value?: any | any[];
    multiple?: boolean;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    id?: string;
    name?: string;
    onchange?: (value: any) => void;
}
declare const Select: import("svelte").Component<Props, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
