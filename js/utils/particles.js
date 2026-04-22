// particles.js - Ambient soft particle drift system

export function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particleCount = window.innerWidth < 768 ? 26 : 58;
    const particles = [];
    let pointerX = width * 0.5;
    let pointerY = height * 0.5;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 3 + 0.8;
            this.radius = this.z * 1.3;
            this.vx = (Math.random() - 0.5) * 0.12;
            this.vy = (Math.random() - 0.5) * 0.12;
            this.opacity = Math.random() * 0.28 + 0.08;
        }

        update() {
            const dx = (pointerX - this.x) * 0.00002 * this.z;
            const dy = (pointerY - this.y) * 0.00002 * this.z;
            this.vx += dx;
            this.vy += dy;
            this.vx *= 0.99;
            this.vy *= 0.99;
            this.x += this.vx;
            this.y += this.vy;

            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
        }

        draw() {
            const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#00e5ff';
            const rgb = hexToRgb(accent);
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, {passive: true});

    window.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
    }, { passive: true });
}

function hexToRgb(hex) {
    const raw = hex.replace('#', '');
    const value = raw.length === 3
        ? raw.split('').map((c) => c + c).join('')
        : raw;
    const num = parseInt(value, 16);

    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}
