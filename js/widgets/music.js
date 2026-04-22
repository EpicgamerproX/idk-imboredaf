// music.js

export function initMusic() {
    // The iframe handles itself for MVPs. 
    // In future versions, we can dynamically load the iframe to save initial load time.
    
    // Example of lazy loading iframe:
    /*
    const player = document.getElementById('music-player');
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            player.innerHTML = `<iframe ... ></iframe>`;
            observer.disconnect();
        }
    });
    observer.observe(document.getElementById('widget-music'));
    */
}
