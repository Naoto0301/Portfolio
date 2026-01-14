// 落ちる図形のアニメーション（背景）
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

// 初期生成
for (let i = 0; i < 5; i++) {
    setTimeout(() => createFallingSymbol(), i * 200);
}

// 連続生成
setInterval(createFallingSymbol, 500);

// ======================================
// アコーディオン機能（イベント）
// ======================================
function initializeEventAccordion() {
    const eventHeaders = document.querySelectorAll('.event-header');
    
    eventHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.closest('.event-detail-section');
            section.classList.toggle('collapsed');
        });
    });

    // 初期状態：すべて収縮
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
        skillsHeader.addEventListener('click', function() {
            skillsContent.classList.toggle('collapsed');
        });
        // 初期状態：収縮
        skillsContent.classList.add('collapsed');
    }
}

// ======================================
// アコーディオン機能（資格）
// ======================================
function initializeCertificationAccordion() {
    const certHeaders = document.querySelectorAll('.certification-header');
    
    certHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.certification-card');
            card.classList.toggle('collapsed');
        });
    });

    // 初期状態：すべて収縮
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

// ======================================
// スキルカテゴリーのアコーディオン
// ======================================
function initializeSkillCategories() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const header = category.querySelector('h3');
        if (header) {
            header.addEventListener('click', function() {
                category.classList.toggle('collapsed');
            });
        }
    });
}

// ======================================
// ページロード時の初期化
// ======================================
window.addEventListener('load', () => {
    // 各アコーディオンの初期化
    initializeEventAccordion();
    initializeSectionAccordion();
    initializeCertificationAccordion();
    initializeSkillCategories();
    
    // スライダーの初期化
    document.querySelectorAll('.image-slider').forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        slider.querySelector('.prev-btn').disabled = true;
        if (images.length === 1) {
            slider.querySelector('.next-btn').disabled = true;
        }
    });
});