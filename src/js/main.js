import '../css/style.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

window.addEventListener('load', () => {
  const burgerBtn = document.querySelector('#burger');
  const mobileContainer = document.querySelector('#mobile-container');
  const body = document.querySelector('body');

  if (burgerBtn && mobileContainer) {
    burgerBtn.addEventListener('click', () => {
      mobileContainer.classList.toggle('hidden');
      burgerBtn.classList.toggle('after:bg-purple');
      burgerBtn.classList.toggle('before:bg-purple');
      body.classList.toggle('overflow-hidden');
    });
  }

  const installTabs = () => {
    const tabsButtons = document.querySelectorAll('[data-tab-content]');
    const tabContent = document.querySelectorAll('.tab-content');

    const removeActiveClassForNav = () => {
      tabsButtons.forEach((item) => item.classList.remove('bg-purple'));
    };
    const hiddenContentTabs = () => {
      tabContent.forEach((item) => item.classList.add('hidden'));
    };
    tabsButtons.forEach((item) => {
      const tabsButton = item.getAttribute('data-tab-content');

      item.addEventListener('click', () => {
        const showContent = document.getElementById(tabsButton);

        removeActiveClassForNav();
        item.classList.add('bg-purple');

        hiddenContentTabs();
        showContent.classList.remove('hidden');
      });
    });
    tabsButtons[0].click();
  };

  function initPartners() {
    const breakpoint = window.matchMedia('(max-width:991px)');
    console.log(breakpoint);

    let partnersSwiper;

    const breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (partnersSwiper !== undefined) partnersSwiper.destroy(true, true);
        return;
      } else if (breakpoint.matches === false) {
        return enableSwiper();
      }
    };

    const enableSwiper = function () {
      partnersSwiper = new Swiper('.swiper', {
        slidesPerView: 4,
        speed: 3000,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
      });
      const swiperMobileTabletConfig = {
        slidesPerView: 2,
        grid: {
          rows: 3,
          fill: 'row',
        },
        spaceBetween: 20,
        allowTouchMove: false,
        loop: false,
        autoplay: false,
      };
    };

    if (breakpoint.addEventListener) {
      breakpoint.addEventListener('change', breakpointChecker);
    } else if (breakpoint.addListener) {
      breakpoint.addListener(breakpointChecker);
    }

    breakpointChecker();
  }

  initPartners();
  document.querySelectorAll('.tabs').length ? installTabs() : null;
});
