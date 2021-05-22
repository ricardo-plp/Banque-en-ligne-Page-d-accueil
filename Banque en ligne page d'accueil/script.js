'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improvised functionality and analytics. <button class="btn btn--close-cookie">GOT IT !<button>';
header.prepend(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty(
  '--color-primary-darker',
  'orangered'
);

const logo = document.querySelector('.nav__logo');

// console.log(logo.dataTest.versionNumber);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// console.log(btnScrollTo);

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target.classList);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handlover = function (opacity) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(el => {
        if (el !== link) el.style.fontSize = opacity;
      });
      logo.style.opacity = opacity;
    }
  };
};
nav.addEventListener('mouseover', handlover('x-large'));
nav.addEventListener('mouseout', handlover(1));

//bar  de navigation collante
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshol: 0,
  rootMargin: '-90px',
});

headerObserver.observe(header);

const sectionAll = document.querySelectorAll('.section ');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sectionAll.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Image load
let imgTargets = document.querySelectorAll('img[data-src]');

const loadimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imageObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0.5,
});
imgTargets.forEach(img => imageObserver.observe(img));

//slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// const slider = document.querySelector('.slider');

// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

let curSlide = 0;
let maxSlide = slides.length;

const creatDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
creatDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;

    goToSlide(slide);
    activateDot(slide);
  }
});

const goToSlide = function (slider) {
  const sliderAll = slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slider)}%)`)
  );
};

goToSlide(0);
const init = function () {
  goToSlide(curSlide);
  activateDot(curSlide);
};
const sliderLeft = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 4;
  } else {
    curSlide--;
  }
  init();
};
const sliderRight = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  init();
};

btnLeft.addEventListener('click', sliderLeft);
btnRight.addEventListener('click', sliderRight);

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  if (e.key === 'ArrowLeft') sliderLeft();
  if (e.key === 'ArrowRight') sliderRight();
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = 'Bonjour';
});

// const allSections = document.querySelec{torAll('.section');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entries);
//   console.log(entry.isIntersecting);
//   if (!entry.isIntersecting) return;
//   console.log(entry.isIntersecting);
//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');
//   console.log(clicked);
//   if (!clicked) return;

//   //Remove
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(c => c.classList.remove('operations__content--active'));

//   //Add
//   clicked.classList.add('operations__tab--active');
//   console.log(clicked.dataset.tab);
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('onmouseenter : Great! You are reading the heading :D');
// });

// const h4 = document.querySelector('h4');
// h4.onmouseenter = function (e) {
//   alert('');
// };

// const h1alert = function (e) {
//   alert('onmouseenter : Great! You are reading the heading :D');
//   setTimeout(() => h1.removeEventListener('mouseenter', h1alert), 10000);
// };

// h1.addEventListener('mouseenter', h1alert);

// section1.addEventListener('click', function (e) {
//   alert('Bonjour Ricardo');
// });

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min));

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
//   e.stopPropagation();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log(e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'blue';
// h1.lastElementChild.style.color = 'orange';

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--color-tertiary)';
// h1.closest('.header__title').style.background = 'var(--color-primary)';

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
