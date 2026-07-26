export interface Toast {
    id: string;
    message: string;
    variant?: 'info' | 'success' | 'warning' | 'danger';
    duration?: number;
    dismissible?: boolean;
}
declare class ToastStore {
    toasts: Toast[];
    add(message: string, options?: Partial<Omit<Toast, 'id' | 'message'>>): void;
    dismiss(id: string): void;
    info(message: string, options?: {}): void;
    success(message: string, options?: {}): void;
    warning(message: string, options?: {}): void;
    danger(message: string, options?: {}): void;
}
export declare const toast: ToastStore;
export {};
