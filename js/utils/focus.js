// focus.js - Tile expansion system

export function initFocusSystem() {
    const tiles = document.querySelectorAll('.tile');
    const backdrop = document.getElementById('backdrop');

    if (!backdrop) return;

    let activeTile = null;

    tiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            // Only expand if clicking the tile background, not an input inside it
            if (e.target.tagName.toLowerCase() === 'input' || 
                e.target.tagName.toLowerCase() === 'textarea' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.classList.contains('delete-todo') ||
                e.target.classList.contains('delete-link')) {
                return;
            }

            if (activeTile === tile) {
                closeFocus();
            } else {
                if (activeTile) {
                    activeTile.classList.remove('expanded');
                }
                tile.classList.add('expanded');
                document.body.classList.add('focus-active');
                activeTile = tile;
            }
        });
    });

    backdrop.addEventListener('click', closeFocus);

    // Escape key handling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeFocus();
    });

    function closeFocus() {
        if (activeTile) {
            activeTile.classList.remove('expanded');
            activeTile = null;
        }
        document.body.classList.remove('focus-active');
    }
}
