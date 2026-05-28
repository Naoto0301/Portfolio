// ======================================
// 落ちる図形のアニメーション（背景）
// ======================================
function createFallingSymbol() {
    const symbols = ['✕', '◯', '◇'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    const div = document.createElement('div');
    const symbolClass = symbol === '✕' ? 'cross' : symbol === '◯' ? 'circle' : 'diamond';
    div.className = `falling-symbol ${symbolClass}`;
    div.textContent = symbol;

    const leftPos = Math.random() * window.innerWidth;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 0.5;

    div.style.left = leftPos + 'px';
    div.style.top = '-50px';
    div.style.animation = `fall ${duration}s linear ${delay}s forwards`;
    div.style.zIndex = '1';

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, (duration + delay) * 1000);
}

for (let i = 0; i < 5; i++) {
    setTimeout(() => createFallingSymbol(), i * 200);
}
setInterval(createFallingSymbol, 500);

// ======================================
// アコーディオン機能（イベント）
// ======================================
function initializeEventAccordion() {
    const eventHeaders = document.querySelectorAll('.event-header');
    eventHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const section = this.closest('.event-detail-section');
            section.classList.toggle('collapsed');
        });
    });
    document.querySelectorAll('.event-detail-section').forEach(section => {
        section.classList.add('collapsed');
    });
}

// ======================================
// スキル・資格セクション全体のアコーディオン
// ======================================
function initializeSectionAccordion() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    const skillsContent = skillsSection.querySelector('.section-accordion');
    if (!skillsContent) return;
    const skillsHeader = skillsContent.querySelector('.section-accordion-header');
    if (skillsHeader) {
        skillsHeader.addEventListener('click', function () {
            skillsContent.classList.toggle('collapsed');
        });
        skillsContent.classList.add('collapsed');
    }
}

// ======================================
// アコーディオン機能（資格）
// ======================================
function initializeCertificationAccordion() {
    const certHeaders = document.querySelectorAll('.certification-header');
    certHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const card = this.closest('.certification-card');
            card.classList.toggle('collapsed');
        });
    });
    document.querySelectorAll('.certification-card').forEach(card => {
        card.classList.add('collapsed');
    });
}

// ======================================
// スライド機能
// ======================================
function changeSlide(button, direction) {
    const slider = button.closest('.image-slider');
    const images = slider.querySelectorAll('.slider-image');
    const counter = slider.querySelector('.current-slide');

    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) currentIndex = index;
    });

    images[currentIndex].classList.remove('active');
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    images[currentIndex].classList.add('active');
    counter.textContent = currentIndex + 1;
    slider.querySelector('.prev-btn').disabled = currentIndex === 0;
    slider.querySelector('.next-btn').disabled = currentIndex === images.length - 1;
}

// ======================================
// スキルカテゴリーのアコーディオン
// ======================================
function initializeSkillCategories() {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const header = category.querySelector('h3');
        if (header) {
            header.addEventListener('click', function () {
                category.classList.toggle('collapsed');
            });
        }
    });
}

// ======================================
// クリック / タッチ 波紋エフェクト
// ======================================
(function () {
    const rippleColors = [
        { color: '0, 255, 255',  size: 80 },
        { color: '255, 0, 255',  size: 60 },
        { color: '255, 255, 0',  size: 70 },
        { color: '0, 153, 255',  size: 90 },
        { color: '255, 60, 180', size: 65 },
    ];

    function spawnRipple(x, y) {
        const v = rippleColors[Math.floor(Math.random() * rippleColors.length)];

        const el = document.createElement('div');
        el.className = 'ripple';
        el.style.cssText =
            'left:' + x + 'px;top:' + y + 'px;' +
            'width:' + v.size + 'px;height:' + v.size + 'px;' +
            'border:2px solid rgba(' + v.color + ',0.9);' +
            'box-shadow:0 0 12px rgba(' + v.color + ',0.6),0 0 24px rgba(' + v.color + ',0.3);';
        document.body.appendChild(el);
        setTimeout(function () { el.remove(); }, 650);

        const el2 = document.createElement('div');
        el2.className = 'ripple';
        el2.style.cssText =
            'left:' + x + 'px;top:' + y + 'px;' +
            'width:' + (v.size * 0.55) + 'px;height:' + (v.size * 0.55) + 'px;' +
            'border:1.5px solid rgba(' + v.color + ',0.6);' +
            'animation-delay:0.08s;';
        document.body.appendChild(el2);
        setTimeout(function () { el2.remove(); }, 750);
    }

    document.addEventListener('click', function (e) {
        spawnRipple(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', function (e) {
        Array.from(e.changedTouches).forEach(function (t) {
            spawnRipple(t.clientX, t.clientY);
        });
    }, { passive: true });
})();

// ======================================
// ページロード時の初期化
// ======================================
window.addEventListener('load', function () {
    initializeEventAccordion();
    initializeSectionAccordion();
    initializeCertificationAccordion();
    initializeSkillCategories();

    document.querySelectorAll('.image-slider').forEach(function (slider) {
        const images = slider.querySelectorAll('.slider-image');
        slider.querySelector('.prev-btn').disabled = true;
        if (images.length === 1) {
            slider.querySelector('.next-btn').disabled = true;
        }
    });
});

// ======================================
// 分子構造 背景アニメーション
// ======================================
(function () {
    const canvas = document.getElementById('moleculeCanvas');
    const ctx = canvas.getContext('2d');

    const NODE_COUNT = 55;
    const CONNECT_DIST = 160;
    const NODE_RADIUS = 3;

    // ノードカラーバリエーション
    const colors = [
        { r: 0,   g: 255, b: 255 },  // シアン
        { r: 0,   g: 153, b: 255 },  // ブルー
        { r: 255, g: 0,   b: 255 },  // マゼンタ
        { r: 255, g: 60,  b: 180 },  // ピンク
    ];

    let nodes = [];
    let W, H;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function initNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            const c = randomColor();
            nodes.push({
                x:   Math.random() * W,
                y:   Math.random() * H,
                vx:  (Math.random() - 0.5) * 0.5,
                vy:  (Math.random() - 0.5) * 0.5,
                r:   NODE_RADIUS + Math.random() * 2.5,
                c:   c,
                // ノードごとにパルスのオフセット
                phase: Math.random() * Math.PI * 2,
            });
        }
    }

    function draw(ts) {
        ctx.clearRect(0, 0, W, H);

        // ── ボンド（線）を先に描く ──
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 1.0;
                    // 線の色は2ノードの中間
                    const rc = Math.round((a.c.r + b.c.r) / 2);
                    const gc = Math.round((a.c.g + b.c.g) / 2);
                    const bc = Math.round((a.c.b + b.c.b) / 2);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(${rc},${gc},${bc},${alpha})`;
                    ctx.lineWidth = 1.8;
                    ctx.stroke();
                }
            }
        }

        // ── ノード（点）を上に描く ──
        const t = ts / 1000;
        for (const n of nodes) {
            // パルスで半径を微妙に変化
            const pulse = n.r + Math.sin(t * 1.5 + n.phase) * 1.2;
            const { r, g, b } = n.c;

            // グロー
            const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulse * 4);
            grad.addColorStop(0,   `rgba(${r},${g},${b},0.7)`);
            grad.addColorStop(0.4, `rgba(${r},${g},${b},0.2)`);
            grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
            ctx.beginPath();
            ctx.arc(n.x, n.y, pulse * 4, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            // コア
            ctx.beginPath();
            ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},0.95)`;
            ctx.shadowColor = `rgb(${r},${g},${b})`;
            ctx.shadowBlur  = 8;
            ctx.fill();
            ctx.shadowBlur  = 0;

            // 移動
            n.x += n.vx;
            n.y += n.vy;

            // 画面端で跳ね返る
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); });
    resize();
    initNodes();
    requestAnimationFrame(draw);
})();