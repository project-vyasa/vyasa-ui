import { type Snippet } from 'svelte';
interface Props {
    children: Snippet;
    appBar?: Snippet;
    sidebarLeft?: Snippet;
    sidebarRight?: Snippet;
    sidebarTop?: Snippet;
    panelBottom?: Snippet;
    statusBar?: Snippet;
    header?: Snippet;
    leftVisible?: boolean;
    rightVisible?: boolean;
    bottomVisible?: boolean;
    topVisible?: boolean;
    maximizedZone?: 'none' | 'bottom' | 'content';
    leftWidth?: number;
    rightWidth?: number;
    bottomHeight?: number;
    topHeight?: number;
}
declare const AppShell: import("svelte").Component<Props, {}, "leftWidth" | "rightWidth" | "bottomHeight" | "topHeight">;
type AppShell = ReturnType<typeof AppShell>;
export default AppShell;
