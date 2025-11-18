// === [UTILS] Генерация URL-ов изображений по ключевому слову ===
const makeImageUrls = (keyword = 'travel') => {
  const safeKeyword = encodeURIComponent(keyword.trim());
  const randomSeed = Math.floor(Math.random() * 10000);
  const timestamp = Date.now();

  return [`https://picsum.photos/seed/${safeKeyword}-${randomSeed}/640/360`, `https://source.unsplash.com/640x360/?${safeKeyword}&sig=${timestamp}`];
};

// === [IMAGES] Загрузка изображений с fallback и preloader ===
const loadImagesForTab = (tab) => {
  if (!tab) return;

  const images = tab.querySelectorAll('img');

  images.forEach((img) => {
    if (img.hasAttribute('data-loaded')) return;

    const keyword = img.alt || 'travel';
    const urls = makeImageUrls(keyword);

    const tryLoad = (index = 0) => {
      if (index >= urls.length) {
        img.src = 'assets/img/cat-scottish.webp';
        img.setAttribute('data-loaded', 'true');
        return;
      }

      const imgPre = new Image();

      imgPre.onload = () => {
        img.src = urls[index];
        img.setAttribute('data-loaded', 'true');
        img.loading = 'lazy';
      };

      imgPre.onerror = () => tryLoad(index + 1);

      imgPre.src = urls[index];
    };

    tryLoad();
  });
};

// === [TABS] Инициализация табов и загрузка изображений ===
const installTabs = () => {
  const tabButtons = document.querySelectorAll('[data-tab-content]');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabButtons.length || !tabContents.length) return;

  const clearActiveState = () => {
    tabButtons.forEach((btn) => btn.classList.remove('bg-purple'));
    tabContents.forEach((tab) => tab.classList.add('hidden'));
  };

  tabButtons.forEach((btn) => {
    const targetId = btn.getAttribute('data-tab-content');

    btn.addEventListener('click', () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      clearActiveState();

      btn.classList.add('bg-purple');
      target.classList.remove('hidden');

      // loadImagesForTab(target);
    });
  });

  // Автостарт первого таба
  tabButtons[0].click();
};

// === [BURGER MENU] Мобильное меню ===
const initBurgerMenu = () => {
  const burgerBtn = document.querySelector('#burger');
  const mobileContainer = document.querySelector('#mobile-container');
  const body = document.body;

  if (!burgerBtn || !mobileContainer) return;

  burgerBtn.addEventListener('click', () => {
    mobileContainer.classList.toggle('hidden');
    burgerBtn.classList.toggle('after:bg-purple');
    burgerBtn.classList.toggle('before:bg-purple');
    body.classList.toggle('overflow-hidden');
  });
};

// === [SWIPER] Инициализация с адаптивом ===
let swiperInstance;
const initSwiper = (mediaQuery) => {
  if (swiperInstance) swiperInstance.destroy(true, true);

  swiperInstance = new Swiper(
    '.swiper',
    mediaQuery.matches
      ? {
          slidesPerView: 2,
          slidesPerGroup: 2,
          grid: { rows: 3, fill: 'row' },
          spaceBetween: 20,
          loop: false,
        }
      : {
          slidesPerView: 4,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
        },
  );
};

// === [INIT] Запуск при загрузке DOM ===
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.tabs')) installTabs();

  initBurgerMenu();

  const mediaQuery768 = window.matchMedia('(max-width: 768px)');
  initSwiper(mediaQuery768);
  mediaQuery768.addEventListener('change', () => initSwiper(mediaQuery768));
});
