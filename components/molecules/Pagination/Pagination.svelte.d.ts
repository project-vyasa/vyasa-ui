interface Props {
    page?: number;
    total: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
}
declare const Pagination: import("svelte").Component<Props, {}, "page">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
