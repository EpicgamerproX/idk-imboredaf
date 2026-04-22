// scroll.js - IntersectionObserver for tile flip fades

export function initScrollObserver() {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    // Quick fallback check
    if (!('IntersectionObserver' in window)) {
        animateElements.forEach(el => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target); 
            } else {
                // If we want it to animate out when scrolled back, remove the class
                // entry.target.classList.remove('in-view');
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Apply slightly after it enters viewport
    });

    animateElements.forEach((el) => {
        observer.observe(el);
    });
}
