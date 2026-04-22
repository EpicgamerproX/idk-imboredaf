// notes.js
import { AppState, persist } from '../config/state.js';

export function initNotes() {
    const noteArea = document.getElementById('note-area');
    if (!noteArea) return;

    // Load state
    noteArea.value = AppState.notes || '';

    // Quick save on input
    noteArea.addEventListener('input', (e) => {
        AppState.notes = e.target.value;
        persist();
    });
}
