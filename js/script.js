// 落ちる図形のアニメーション
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

// スライド機能
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

// ページロード時の初期化
window.addEventListener('load', () => {
    document.querySelectorAll('.image-slider').forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        slider.querySelector('.prev-btn').disabled = true;
        if (images.length === 1) {
            slider.querySelector('.next-btn').disabled = true;
        }
    });
});