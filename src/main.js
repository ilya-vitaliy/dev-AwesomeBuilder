const getLoremImage = () => {
  const images = document.querySelectorAll('img');

  images.forEach((item) => {
    if (!item.getAttribute('src')) {
      fetch('https://picsum.photos/640/360')
        .then((response) => response.blob())
        .then((blob) => (item.src = URL.createObjectURL(blob)))
        .catch(() => (item.src = 'assets/img/cat-scottish.webp'));
    }
  });
};

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

let swiper;

function myFunction(Matchmedia_768) {
  if (swiper) swiper.destroy(true, true); 

  if (Matchmedia_768.matches) {
    swiper = new Swiper('.swiper', {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 3,
        fill: 'row',
      },
      spaceBetween: 20,
      loop: false,
    });
  } else {
    swiper = new Swiper('.swiper', {
      slidesPerView: 4,
      slidesPerGroup: 1,
      loop: true,
    });
  }
}

const Matchmedia_768 = window.matchMedia('(max-width: 768px)');

myFunction(Matchmedia_768);

Matchmedia_768.addEventListener('change', () => myFunction(Matchmedia_768));

if (document.querySelectorAll('img').length > 0) getLoremImage();

