// gestures.js - Mobile touch interactions

export function attachSwipeToDelete(element, onDelete) {
    let startX = 0;
    let currentX = 0;
    const threshold = 80; // px to trigger delete
    
    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        element.style.transition = 'none';
        element.parentElement.classList.add('active-touch'); // Visual tap feedback
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        // Only allow swipe right
        if (diffX > 0) {
            element.style.transform = `translateX(${diffX}px)`;
            element.style.opacity = Math.max(0.2, 1 - (diffX / threshold) * 0.8);
        }
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        element.parentElement.classList.remove('active-touch');
        const diffX = currentX - startX;
        element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

        if (diffX > threshold) {
            // Trigger delete animation and callback
            element.style.transform = `translateX(100%)`;
            element.style.opacity = '0';
            setTimeout(() => {
                onDelete();
            }, 300);
        } else {
            // Snap back
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }
    });

    // Desktop alternative for swipe simulation or pure touch (not needed since mouse uses hover)
}
