'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.upcomings__tab');
const tabsContainer = document.querySelector('.upcomings__tab-container');
const tabsContent = document.querySelectorAll('.upcomings__content');
const navs = document.querySelectorAll('.nav__item');

console.log(btnsOpenModal);

navs.forEach(e => {
  e.addEventListener('click', () => {
    console.log(e);
    e.classList.add('abc');
  });
});

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.upcomings__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('upcomings__tab--active'));
  tabsContent.forEach(c => c.classList.remove('upcomings__content--active'));

  // Activate tab
  clicked.classList.add('upcomings__tab--active');

  // Activate content area
  document
    .querySelector(`.upcomings__content--${clicked.dataset.tab}`)
    .classList.add('upcomings__content--active');
});

///////////////////////////////////////
// Menu fade animation
const dropdown = document.querySelector('.dropdown');
const questionbtn = document.querySelector('.questionbtn');

const handleHoverIn = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    link.style.color = '#59d9cc';
    logo.style.opacity = this;
    questionbtn.style.opacity = this;
    dropdown.style.opacity = this;
  }
};

const handleHoverOut = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    link.style.color = 'black';
    logo.style.opacity = this;
    questionbtn.style.opacity = this;
    dropdown.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHoverIn.bind(0.5));
nav.addEventListener('mouseout', handleHoverOut.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
/*
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
*/
///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//Copy clipboard
let modal__success = document.querySelector('.modal__success');

const CopyClipboard = function () {
  var copyText = document.getElementById('project__link--1');
  var getLink = document.getElementById('getLink');
  var btnSendContact = document.querySelector('.btn--contact');
  getLink.addEventListener('click', () => {
    console.log(copyText);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    modal__success.classList.remove('hidden');

    setTimeout(() => {
      modal__success.classList.add('hidden');
    }, 3000);
  });

  btnSendContact.addEventListener('click', () => {
    console.log(copyText);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    modal__success.classList.remove('hidden');

    setTimeout(() => {
      modal__success.classList.add('hidden');
    }, 3000);
  });
};

CopyClipboard();

//Open modal donate

let btnDnt = document.getElementsByClassName('donate');

Array.from(btnDnt).forEach(e => {
  e.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});

//Open modal contact

const modalContact = document.querySelector('.modal__contact');
console.log(modalContact);
const openModalContact = function (e) {
  e.preventDefault();
  modalContact.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalContact = function () {
  modalContact.classList.add('hidden');
  overlay.classList.add('hidden');
};

const btnCloseModalContact = document.querySelector(
  '.btn--close-modal--contact'
);
const btnOpenModalContact = document.querySelector('.btn--show-modal--contact');

console.log(btnOpenModalContact);

btnOpenModalContact.addEventListener('click', openModalContact);

btnCloseModalContact.addEventListener('click', closeModalContact);

//Open Q&A modals

const modalQA = document.querySelector('.modal__qa');
const openModalQA = function (e) {
  e.preventDefault();
  modalQA.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalQA = function () {
  modalQA.classList.add('hidden');
  overlay.classList.add('hidden');
};

const btnCloseModalQA = document.querySelector('.btn--close-modal__qa');

console.log(btnOpenModalContact);
questionbtn.addEventListener('click', openModalQA);
btnCloseModalQA.addEventListener('click', closeModalQA);

// document.querySelectorAll('.questions__item').addEventListener('click', e => {
// document.querySelector('.question__arrow_down').classList.toggle('active');
// document.querySelector('.question__arrow_down').classList.toggle('disable');
// document.querySelectorAll('.questions__answer').classList.toggle('hidden');
// });

// console.log(document.querySelectorAll('.questions__item'));

const listQuestions = document.querySelectorAll('.questions__item');

listQuestions.forEach(q => {
  q.addEventListener('click', function (e) {
    document.querySelector('.question__arrow_down').classList.toggle('active');
    document.querySelector('.question__arrow_down').classList.toggle('disable');
    document.querySelector('.questions__answer').classList.toggle('hidden');
  });
});
