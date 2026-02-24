const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');

    // Блокируем скролл при открытом меню
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

// Обработчики событий
menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Закрытие меню при изменении размера окна (если перешли на десктоп)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

// Показываем кнопку после скролла
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


function toggleAccordion(button) {
    // Находим текущий контент
    const currentContent = button.closest('.border').querySelector('.accordion-content');
    const currentIcon = button.querySelector('svg');

    // Закрываем все другие открытые элементы
    document.querySelectorAll('.accordion-content').forEach(content => {
        if (content !== currentContent && !content.classList.contains('hidden')) {
            content.classList.add('hidden');
            const otherButton = content.closest('.border').querySelector('button');
            const otherIcon = otherButton.querySelector('svg');
            otherIcon.classList.remove('rotate-180');
            otherButton.classList.remove('bg-gray-50');
            otherButton.classList.add('bg-white');
        }
    });

    // Переключаем текущий элемент
    currentContent.classList.toggle('hidden');
    currentIcon.classList.toggle('rotate-180');

    // Меняем фон кнопки
    if (currentContent.classList.contains('hidden')) {
        button.classList.remove('bg-gray-50');
        button.classList.add('bg-white');
    } else {
        button.classList.remove('bg-white');
        button.classList.add('bg-gray-50');
    }
}

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
let autoAdvanceTimer;
let touchStartX = 0;
let touchEndX = 0;
const carousel = document.querySelector('.carousel-track');

// Add touch events for swipe
carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.className = 'carousel-item absolute top-0 left-0 w-full h-full';
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index === (currentSlide + 1) % slides.length) {
            slide.classList.add('next');
        } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('hidden');
        }
    });
}

function resetAutoAdvance() {
    clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = setInterval(nextSlide, 5000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
    resetAutoAdvance();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
    resetAutoAdvance();
}

// Initialize auto advance
resetAutoAdvance();

// Initialize slides
updateSlides();