export function initEnvironmentUI() {
    const cursorGlow = document.getElementById('cursor-glow');
    const interactionLayer = document.getElementById('interaction-layer');
    const slowLayers = document.querySelectorAll('.layer-slow');
    const fastLayers = document.querySelectorAll('.layer-fast');
    let ticking = false;
    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.5;

    document.addEventListener('pointermove', (event) => {
        x = event.clientX;
        y = event.clientY;
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                const normalizedX = (x / window.innerWidth - 0.5) * 2;
                const normalizedY = (y / window.innerHeight - 0.5) * 2;

                slowLayers.forEach((layer) => {
                    layer.style.transform = `translate3d(${normalizedX * -8}px, ${normalizedY * -8}px, 0)`;
                });

                fastLayers.forEach((layer) => {
                    layer.style.transform = `translate3d(${normalizedX * 14}px, ${normalizedY * 14}px, 0)`;
                });

                if (cursorGlow) {
                    cursorGlow.style.opacity = '1';
                    cursorGlow.style.left = `${x}px`;
                    cursorGlow.style.top = `${y}px`;
                }

                ticking = false;
            });
        }
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
        if (cursorGlow) cursorGlow.style.opacity = '0';
    });

    if (interactionLayer) {
        document.addEventListener('pointerdown', (event) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${event.clientX}px`;
            ripple.style.top = `${event.clientY}px`;
            interactionLayer.appendChild(ripple);
            setTimeout(() => ripple.remove(), 740);
        });
    }
}
