import { AppState, persist } from './state.js';

export function initTheme() {
    const root = document.documentElement;
    const themeSelect = document.getElementById('theme-select');
    const modeSelect = document.getElementById('mode-select');
    const accentSelect = document.getElementById('accent-select');
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsClose = document.getElementById('settings-close');
    const settingsPanel = document.getElementById('settings-panel');
    const modeLabel = document.getElementById('mode-label');

    if (!AppState.mode) AppState.mode = 'deep-work';
    if (!AppState.theme) AppState.theme = 'dark';

    applyTheme(root, modeLabel);

    if (themeSelect) themeSelect.value = AppState.theme;
    if (accentSelect) accentSelect.value = AppState.accent;
    if (modeSelect) modeSelect.value = AppState.mode;

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            AppState.theme = e.target.value;
            applyTheme(root, modeLabel);
            persist();
        });
    }

    if (modeSelect) {
        modeSelect.addEventListener('change', (e) => {
            AppState.mode = e.target.value;
            applyTheme(root, modeLabel);
            persist();
        });
    }

    if (accentSelect) {
        accentSelect.addEventListener('input', (e) => {
            AppState.accent = e.target.value;
            applyTheme(root, modeLabel);
            persist();
        });
    }

    if (settingsToggle && settingsClose && settingsPanel) {
        settingsToggle.addEventListener('click', () => {
            settingsPanel.classList.toggle('hidden');
        });
        settingsClose.addEventListener('click', () => {
            settingsPanel.classList.add('hidden');
        });
    }

    applyTimeBasedHue();
    setInterval(applyTimeBasedHue, 60000);
}

function applyTheme(root, modeLabel) {
    root.setAttribute('data-theme', AppState.theme);
    root.setAttribute('data-mode', AppState.mode);

    if (AppState.accent) root.style.setProperty('--accent-color', AppState.accent);

    if (modeLabel) {
        modeLabel.textContent = AppState.mode.replace('-', ' ').toUpperCase();
    }
}

function applyTimeBasedHue() {
    if (AppState.theme !== 'dark') return;

    const hour = new Date().getHours();
    let hue = 'rgba(0, 229, 255, 0.26)';

    if (hour >= 6 && hour < 12) {
        hue = 'rgba(125, 227, 255, 0.2)';
    } else if (hour >= 12 && hour < 18) {
        hue = 'rgba(0, 229, 255, 0.26)';
    } else if (hour >= 18 && hour < 21) {
        hue = 'rgba(255, 95, 133, 0.22)';
    }

    document.documentElement.style.setProperty('--accent-glow', hue);
}
