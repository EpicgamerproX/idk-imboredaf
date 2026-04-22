// links.js
import { AppState, persist } from '../config/state.js';

export function initLinks() {
    const linksList = document.getElementById('links-list');
    const newName = document.getElementById('new-link-name');
    const newUrl = document.getElementById('new-link-url');
    const addBtn = document.getElementById('add-link-btn');

    if (!linksList || !addBtn) return;

    function render() {
        linksList.innerHTML = '';
        AppState.links.forEach((link, index) => {
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.classList.add('link-item');
            const icon = resolveIcon(link.url);
            a.innerHTML = `<span class="link-icon">${icon}</span><span>${link.name}</span>`;
            
            const delBtn = document.createElement('button');
            delBtn.classList.add('delete-link');
            delBtn.innerHTML = '&times;';
            delBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                AppState.links.splice(index, 1);
                persist();
                render();
            });

            li.appendChild(a);
            li.appendChild(delBtn);
            linksList.appendChild(li);
        });
    }

    addBtn.addEventListener('click', () => {
        addLink();
    });

    [newName, newUrl].forEach((input) => {
        if (!input) return;
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') addLink();
        });
    });

    function addLink() {
        const name = newName.value.trim();
        let url = newUrl.value.trim();

        if (name && url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            AppState.links.push({ name, url });
            newName.value = '';
            newUrl.value = '';
            persist();
            render();
        }
    }

    render();
}

function resolveIcon(url) {
    if (url.includes('github')) return '◉';
    if (url.includes('youtube')) return '▶';
    if (url.includes('spotify') || url.includes('soundcloud')) return '♫';
    if (url.includes('mail')) return '✉';
    return '◇';
}
