import type { Component, ComponentType } from 'svelte';
export interface TreeNode {
    id: string;
    label: string;
    icon?: Component | ComponentType;
    children?: TreeNode[];
    [key: string]: any;
}
interface Props {
    data: TreeNode[];
    selectedId?: string;
    expandedIds?: Set<string>;
    onSelect?: (node: TreeNode) => void;
    onToggle?: (node: TreeNode, expanded: boolean) => void;
}
declare const Tree: Component<Props, {}, "selectedId" | "expandedIds">;
type Tree = ReturnType<typeof Tree>;
export default Tree;
