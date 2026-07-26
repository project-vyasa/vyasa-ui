import type { Component, ComponentType } from 'svelte';
export type SettingType = 'text' | 'number' | 'boolean' | 'color' | 'select' | 'font' | 'date' | 'time' | 'email' | 'url' | 'password';
export interface SettingItem {
    id: string;
    label: string;
    description?: string;
    type: SettingType;
    options?: {
        label: string;
        value: any;
    }[];
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: any;
    placeholder?: string;
    colSpan?: number;
}
export interface SettingGroup {
    id?: string;
    title?: string;
    items: SettingItem[];
    columns?: 1 | 2 | 3 | 4;
}
export interface SettingSection {
    id: string;
    title: string;
    icon?: Component | ComponentType;
    groups: SettingGroup[];
}
