import { type Snippet } from 'svelte';
interface Props<T> {
    items: T[];
    keyField?: keyof T | (string & {});
    selectable?: boolean;
    selectedIds?: Set<string | number>;
    selectedId?: string | number;
    onSelect?: (item: T) => void;
    onSelectionChange?: (ids: Set<string | number>) => void;
    titleField?: keyof T | (string & {}) | ((item: T) => string);
    subtitleField?: keyof T | (string & {}) | ((item: T) => string);
    descriptionField?: keyof T | (string & {}) | ((item: T) => string);
    metaField?: keyof T | (string & {}) | ((item: T) => string);
    unreadField?: keyof T | (string & {}) | ((item: T) => boolean);
    avatar?: Snippet<[T]>;
    title?: Snippet<[T]>;
    meta?: Snippet<[T]>;
    actions?: Snippet<[T]>;
    item?: Snippet<[T]>;
    groupBy?: keyof T | (string & {}) | ((item: T) => string);
    groupHeader?: Snippet<[string, boolean, () => void]>;
    collapsibleGroups?: boolean;
    showFilterInput?: boolean;
    class?: string;
}
declare function $$render<T = Record<string, any>>(): {
    props: Props<T>;
    exports: {};
    bindings: "selectedId" | "selectedIds";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T = Record<string, any>> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "selectedId" | "selectedIds";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T = Record<string, any>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T = Record<string, any>>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const ListView: $$IsomorphicComponent;
type ListView<T = Record<string, any>> = InstanceType<typeof ListView<T>>;
export default ListView;
