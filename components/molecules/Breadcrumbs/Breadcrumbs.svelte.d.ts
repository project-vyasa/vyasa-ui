interface BreadcrumbItem {
    label: string;
    href?: string;
}
interface Props {
    items: BreadcrumbItem[];
    separator?: import('svelte').Snippet;
    item?: import('svelte').Snippet<[BreadcrumbItem]>;
}
declare const Breadcrumbs: import("svelte").Component<Props, {}, "">;
type Breadcrumbs = ReturnType<typeof Breadcrumbs>;
export default Breadcrumbs;
