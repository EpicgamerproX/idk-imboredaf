// state.js - Central configuration management

const DEFAULT_STATE = {
    theme: 'dark',
    mode: 'deep-work',
    accent: '#00ffc3',
    notes: '',
    todos: [
        { id: 1, text: 'Click to cross out', completed: false },
        { id: 2, text: 'Hover to delete ->', completed: false }
    ],
    links: [
        { name: 'YouTube', url: 'https://youtube.com' },
        { name: 'GitHub', url: 'https://github.com' }
    ]
};

const STORAGE_KEY = 'metro_start_config';

export function loadState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return { ...DEFAULT_STATE, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.error('Failed to parse local storage', e);
    }
    return DEFAULT_STATE;
}

export function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save to local storage', e);
    }
}

// Global active state object that widgets can mutate and save
export const AppState = loadState();

export function persist() {
    saveState(AppState);
}
