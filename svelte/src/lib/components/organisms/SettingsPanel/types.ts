import type { ComponentType } from 'svelte';

export type SettingType = 'text' | 'number' | 'boolean' | 'color' | 'select' | 'font';

export interface SettingItem {
    id: string; // Key in the data object (can be nested path like 'editor.fontSize')
    label: string;
    description?: string;
    type: SettingType;
    options?: { label: string; value: any }[]; // For 'select' type
    min?: number; // For 'number'
    max?: number; // For 'number'
    step?: number; // For 'number'
    defaultValue?: any;
    placeholder?: string;
}

export interface SettingGroup {
    title?: string;
    items: SettingItem[];
}

export interface SettingSection {
    id: string;
    title: string;
    icon?: ComponentType; // Lucide icon
    groups: SettingGroup[];
}
