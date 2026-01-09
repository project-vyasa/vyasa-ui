export interface Toast {
    id: string;
    message: string;
    variant?: 'info' | 'success' | 'warning' | 'danger';
    duration?: number; // ms, default 3000
    dismissible?: boolean;
}

class ToastStore {
    toasts = $state<Toast[]>([]);

    add(message: string, options: Partial<Omit<Toast, 'id' | 'message'>> = {}) {
        const id = crypto.randomUUID();
        const duration = options.duration ?? 3000;

        const toast: Toast = {
            id,
            message,
            variant: 'info',
            dismissible: true,
            ...options
        };

        this.toasts.push(toast);

        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(id);
            }, duration);
        }
    }

    dismiss(id: string) {
        this.toasts = this.toasts.filter((t) => t.id !== id);
    }

    // Convenience methods
    info(message: string, options = {}) { this.add(message, { ...options, variant: 'info' }); }
    success(message: string, options = {}) { this.add(message, { ...options, variant: 'success' }); }
    warning(message: string, options = {}) { this.add(message, { ...options, variant: 'warning' }); }
    danger(message: string, options = {}) { this.add(message, { ...options, variant: 'danger' }); }
}

export const toast = new ToastStore();
