'use strict';

function init() {
  // Counter functionality
  const dataCounters = document.querySelectorAll('.counter-content');

  dataCounters.forEach(counter => {
    counter.innerText = '0';

    const counterUpdate = () => {
      const dataTarget = +counter.getAttribute('data-target');
      const data = +counter.innerText;

      const counterIncrement = dataTarget / 750;

      if (data < dataTarget) {
        counter.innerText = `${Math.floor(data + counterIncrement)}`;
        setTimeout(counterUpdate, 1);
      } else {
        counter.innerText = dataTarget;
      }
    };

    counterUpdate();
  });

  // Form
  const formHolder = document.querySelector('.form-holder');
  const formModalBox = document.querySelector('.form-modal');

  formHolder.addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target;
    if (input.value === '') {
      return;
    } else {
      setTimeout(() => {
        formModalBox.classList.remove('hidden');
        formModalBox.classList.add('formThanksAnimation');
      }, 1000);
      setTimeout(() => {
        formHolder.classList.add('hidden');
      }, 900);
    }
  });
  // REVIEWS
  const reviewsList = document.querySelector('.reviews-list');
  const reviewsButton = document.querySelector('.reviews-button');

  const getData = async () => {
    let resultsNumber = 6;

    const res = await fetch(
      `https://randomuser.me/api?results=${resultsNumber}`
    );

    const { results } = await res.json();

    results.forEach(user => {
      const div = document.createElement('div');

      div.classList.add('reviewsHolder');

      div.innerHTML = `
    <img class="reviews-image" src="${user.picture.large}" alt="${user.name.first}">
    <div class="reviews-info">
    <span>${user.name.first} <br> ${user.name.last}</span>

    </div>`;

      reviewsList.appendChild(div);
    });
  };

  getData();
  reviewsButton.addEventListener('click', () => {
    setTimeout(() => {
      getData();
    }, 500);
  });

  // MAP
  const map = L.map('map').setView([50.0578399, 14.4316543], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 14,
    id: 'mapbox/streets-v11',
  }).addTo(map);

  const gymIcon = L.icon({
    iconUrl: 'img/logomap.png',

    iconSize: [40, 40],

    iconAnchor: [20, 100],

    popupAnchor: [0, -100],
  });

  L.marker([50.0578399, 14.4316543], { icon: gymIcon })
    .addTo(map)
    .bindPopup('Guardian Gym')
    .openPopup();

  // // sections reveal

  const allSections = document.querySelectorAll('.section');

  const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,

    threshold: 0.15,
  });

  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
  });
}

init();
