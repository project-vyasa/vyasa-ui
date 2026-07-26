class ToastStore {
    toasts = $state([]);
    add(message, options = {}) {
        const id = crypto.randomUUID();
        const duration = options.duration ?? 3000;
        const toast = {
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
    dismiss(id) {
        this.toasts = this.toasts.filter((t) => t.id !== id);
    }
    // Convenience methods
    info(message, options = {}) {
        this.add(message, { ...options, variant: 'info' });
    }
    success(message, options = {}) {
        this.add(message, { ...options, variant: 'success' });
    }
    warning(message, options = {}) {
        this.add(message, { ...options, variant: 'warning' });
    }
    danger(message, options = {}) {
        this.add(message, { ...options, variant: 'danger' });
    }
}
export const toast = new ToastStore();
