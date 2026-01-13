// 落ちる図形のアニメーション
function createFallingSymbol() {
    const symbols = ['✕', '◯', '◇'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    const div = document.createElement('div');
    div.className = 'falling-symbol';
    div.textContent = symbol;
    
    const leftPos = Math.random() * window.innerWidth;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 0.5;
    
    div.style.left = leftPos + 'px';
    div.style.top = '-50px';
    div.style.animation = `fall ${duration}s linear ${delay}s forwards`;
    
    document.body.appendChild(div);
    setTimeout(() => div.remove(), (duration + delay) * 1000);
}

for (let i = 0; i < 5; i++) {
    setTimeout(() => createFallingSymbol(), i * 200);
}
setInterval(createFallingSymbol, 500);

// =============== アコーディオン初期化 ===============

// ページ読み込み完了時に実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccordions);
} else {
    initializeAccordions();
}

function initializeAccordions() {
    // スキル・資格セクション（トップレベル）
    document.querySelectorAll('.section-accordion').forEach(accordion => {
        accordion.classList.add('collapsed');
        const header = accordion.querySelector('.section-accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                accordion.classList.toggle('collapsed');
            });
        }
    });

    // スキルカテゴリー
    document.querySelectorAll('.skill-category').forEach(category => {
        category.classList.add('collapsed');
        const header = category.querySelector('h3');
        if (header) {
            header.addEventListener('click', () => {
                category.classList.toggle('collapsed');
            });
        }
    });

    // イベント詳細セクション
    document.querySelectorAll('.event-detail-section').forEach(section => {
        section.classList.add('collapsed');
        const header = section.querySelector('.event-header');
        if (header) {
            header.addEventListener('click', () => {
                section.classList.toggle('collapsed');
            });
        }
    });

    // 資格カード
    document.querySelectorAll('.certification-card').forEach(card => {
        card.classList.add('collapsed');
        const header = card.querySelector('.certification-header');
        if (header) {
            header.addEventListener('click', () => {
                card.classList.toggle('collapsed');
            });
        }
    });

    // スライダー初期化
    document.querySelectorAll('.image-slider').forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        
        if (prevBtn) prevBtn.disabled = true;
        if (images.length === 1 && nextBtn) nextBtn.disabled = true;
    });
}

// スライド関数
function changeSlide(button, direction) {
    const slider = button.closest('.image-slider');
    const images = slider.querySelectorAll('.slider-image');
    const counter = slider.querySelector('.current-slide');
    
    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
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