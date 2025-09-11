const getLoremImage = () => {
  const images = document.querySelectorAll('img');

  images.forEach((item) => {
    if (!item.getAttribute('src')) {
      fetch('https://picsum.photos/640/360')
        .then((response) => response.blob())
        .then((blob) => (item.src = URL.createObjectURL(blob)))
        .catch((error) => (item.src = 'assets/img/cat-scottish.webp'));
    }
  });
};

const burgerBtn = document.querySelector('#burger');
const mobileContainer = document.querySelector('#mobile-container');
const body = document.querySelector('body');

burgerBtn.addEventListener('click', () => {
  mobileContainer.classList.toggle('hidden');
  burgerBtn.classList.toggle('after:bg-purple');
  burgerBtn.classList.toggle('before:bg-purple');
  body.classList.toggle('overflow-hidden');
});

document.querySelectorAll('img').length > 0 ? getLoremImage() : null;
