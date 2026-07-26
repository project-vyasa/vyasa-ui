interface Props {
    group: any;
    value: any;
    label?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    onchange?: (value: any) => void;
}
declare const Radio: import("svelte").Component<Props, {}, "group">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
