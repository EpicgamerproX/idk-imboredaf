// main.js - Application Entry Point

import { initTheme } from './config/theme.js';
import { initScrollObserver } from './utils/scroll.js';
import { initParticles } from './utils/particles.js';
import { initEnvironmentUI } from './utils/environment.js';

import { initClock } from './widgets/clock.js';
import { initNotes } from './widgets/notes.js';
import { initTodo } from './widgets/todo.js';
import { initLinks } from './widgets/links.js';
import { initMusic } from './widgets/music.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    initClock();
    initNotes();
    initTodo();
    initLinks();
    initMusic();

    initParticles();
    initEnvironmentUI();

    setTimeout(() => {
        initScrollObserver();
    }, 50);
});
