export interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    width?: string;
    render?: (row: T) => any;
}
interface Props<T> {
    data: T[];
    columns: Column<T>[];
    keyField?: keyof T;
    selectable?: boolean;
    selectedIds?: Set<string | number>;
    onSelectionChange?: (ids: Set<string | number>) => void;
    onRowClick?: (row: T) => void;
}
declare function $$render<T>(): {
    props: Props<T>;
    exports: {};
    bindings: "selectedIds";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "selectedIds";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const DataGrid: $$IsomorphicComponent;
type DataGrid<T> = InstanceType<typeof DataGrid<T>>;
export default DataGrid;
