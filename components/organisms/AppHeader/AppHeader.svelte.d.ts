interface Props {
    appName?: string;
    href?: string;
    leftVisible?: boolean;
    bottomVisible?: boolean;
    rightVisible?: boolean;
    themeContext?: any;
    headerRight?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
}
declare const AppHeader: import("svelte").Component<Props, {}, "leftVisible" | "rightVisible" | "bottomVisible">;
type AppHeader = ReturnType<typeof AppHeader>;
export default AppHeader;
