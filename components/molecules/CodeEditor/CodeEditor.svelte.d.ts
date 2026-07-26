interface Props {
    value: string;
    language?: 'markdown' | 'html' | 'handlebars' | 'typescript' | 'vy';
    readonly?: boolean;
    lineWrapping?: boolean;
    theme?: 'light' | 'dark';
    class?: string;
}
declare const CodeEditor: import("svelte").Component<Props, {}, "value">;
type CodeEditor = ReturnType<typeof CodeEditor>;
export default CodeEditor;
