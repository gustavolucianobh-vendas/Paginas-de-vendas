// =================================================
// ASPIRADOR PORTÁTIL 4 em 1 — Script Premium
// Efeitos: Partículas, Scroll, FAQ, Urgência, Mobile
// =================================================

// ─── PLAYER VSL — ativa o YouTube ao clicar na thumbnail ───
function playVSL() {
    const thumb = document.getElementById('vsl-thumb');
    const frame = document.getElementById('vsl-frame');
    if (!thumb || !frame) return;

    const videoId = 'oAMVZAOVMUg';
    const origin = encodeURIComponent(window.location.origin || 'https://localhost');

    frame.innerHTML =
        '<iframe' +
        ' src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1&playsinline=1&origin=' + origin + '"' +
        ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
        ' allowfullscreen loading="eager"></iframe>';

    thumb.style.display = 'none';
    frame.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. PARTÍCULAS FUTURISTAS ────────────────────────
    (function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
            }, 120);
        });

        const COUNT = Math.min(60, Math.floor((W * H) / 22000));
        const COLORS = ['rgba(59,130,246,', 'rgba(16,185,129,', 'rgba(96,165,250,'];

        const particles = Array.from({ length: COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.4 + 0.4,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.35,
            col: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.5 + 0.15,
        }));

        function draw() {
            ctx.clearRect(0, 0, W, H);

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(59,130,246,' + (0.06 * (1 - dist / 140)) + ')';
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.col + p.alpha + ')';
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > W) p.dx *= -1;
                if (p.y < 0 || p.y > H) p.dy *= -1;
            });

            requestAnimationFrame(draw);
        }
        draw();
    })();


    // ─── 2. SCROLL FADE IN ───────────────────────────────
    const obs = new IntersectionObserver(
        (entries) => entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll(
        '.benefit-card, .kit-card, .faq-item, .pain-list li, .media-placeholder, .gallery-placeholders, .trust-pill, .tech-pills'
    ).forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = ((i % 5) * 70) + 'ms';
        obs.observe(el);
    });


    // ─── 3. URGÊNCIA DINÂMICA ────────────────────────────
    const stockLeft = Math.floor(Math.random() * 14) + 9;
    const urgency = document.createElement('div');
    urgency.className = 'urgency-bar';
    urgency.innerHTML =
        '🔥 Apenas <strong>' + stockLeft + ' unidades</strong> disponíveis em estoque. ' +
        'Pedidos realizados hoje chegam em até <strong>6 dias úteis</strong>.';

    const priceHero = document.getElementById('price-hero');
    if (priceHero) priceHero.insertAdjacentElement('beforebegin', urgency);


    // ─── 4. FAQ ACCORDION ────────────────────────────────
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('toggle', function () {
            if (this.open) {
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== this) other.open = false;
                });
            }
        });
    });



    // ─── 6. ESTILOS DINÂMICOS ────────────────────────────
    const dynStyle = document.createElement('style');
    dynStyle.textContent = [
        '.urgency-bar {',
        '  background: rgba(239,68,68,0.08);',
        '  border: 1px solid rgba(239,68,68,0.2);',
        '  color: #fca5a5;',
        '  border-radius: 10px;',
        '  padding: 10px 20px;',
        '  font-size: clamp(0.78rem, 1.6vw, 0.88rem);',
        '  margin: 0 auto 16px;',
        '  max-width: 560px;',
        '  text-align: center;',
        '  line-height: 1.55;',
        '}',
        '.urgency-bar strong { color: #f87171; }',
        '#btn-float-mobile {',
        '  display: none;',
        '  position: fixed;',
        '  bottom: 0; left: 0; right: 0;',
        '  z-index: 9999;',
        '  background: linear-gradient(135deg, #1d4ed8, #15803d);',
        '  color: #fff;',
        '  text-decoration: none;',
        '  font-weight: 800;',
        '  font-size: clamp(0.88rem, 4vw, 1rem);',
        '  text-align: center;',
        '  padding: 17px 20px;',
        '  box-shadow: 0 -4px 24px rgba(0,0,0,0.5);',
        '  letter-spacing: 0.3px;',
        '  line-height: 1.4;',
        '}',
        '@media (max-width: 768px) { body { padding-bottom: 0; } }'
    ].join('\n');
    document.head.appendChild(dynStyle);


    // ─── 7. HOVER NOS KITS ───────────────────────────────
    document.querySelectorAll('.kit-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
    });

});
