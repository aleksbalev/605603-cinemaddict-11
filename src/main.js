import {
  createProfileTemplate
} from './components/profile';
import {
  createMainNavTemplate
} from './components/main-navigation';
import {
  createSortTemplate
} from './components/sorting';
import {
  createMainFilmTemplate
} from './components/main-film';
import {
  createFilmCardTemplate
} from './components/film-card';
import {
  createShowMoreButtonTemplate
} from './components/show-more-button';
import {
  createFilmsDetailTemplate
} from './components/films-detail';

const MAIN_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElem = document.querySelector(`header`);
const siteMainElem = document.querySelector(`main`);
const siteBodyElem = document.querySelector(`body`);

render(siteHeaderElem, createProfileTemplate(), `beforeend`);
render(siteMainElem, createMainNavTemplate(), `afterbegin`);
render(siteMainElem, createSortTemplate(), `beforeend`);
render(siteMainElem, createMainFilmTemplate(), `beforeend`);

const filmsElem = siteMainElem.querySelector(`.films`);
const filmsListElem = filmsElem.querySelector(`.films-list`);
const filmsMainContainerElem = filmsListElem.querySelector(`.films-list__container`);
const filmsExtraContainersElem = filmsElem.querySelectorAll(`.films-list--extra`);
const [topRated, mostCommented] = filmsExtraContainersElem;
const topRatedContainer = topRated.querySelector(`.films-list__container`);
const mostCommentedContainer = mostCommented.querySelector(`.films-list__container`);


for (let i = 0; i < MAIN_FILMS_COUNT; i++) {
  render(filmsMainContainerElem, createFilmCardTemplate(), `beforeend`);
}

render(filmsListElem, createShowMoreButtonTemplate(), `beforeend`);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(topRatedContainer, createFilmCardTemplate(), `beforeend`);
  render(mostCommentedContainer, createFilmCardTemplate(), `beforeend`);
}

render(siteBodyElem, createFilmsDetailTemplate(), `beforeend`);

const filmsDetailsElem = document.querySelector(`.film-details`);
filmsDetailsElem.style.display = `none`;

/* Тут я начинаю валять дурака */
const filmCardPosters = filmsElem.querySelectorAll(`.film-card__poster`);
const filmCardComments = filmsElem.querySelectorAll(`.film-card__comments`);
const filmCardTitles = filmsElem.querySelectorAll(`.film-card__title`);

const cardsElements = [filmCardPosters, filmCardComments, filmCardTitles];

cardsElements.forEach((elem) => {
  elem.forEach((card) => {
    card.addEventListener(`click`, () => {
      filmsDetailsElem.style.display = ``;
    });
  });
});

const closeCardDetailBtn = document.querySelector(`.film-details__close-btn`);

closeCardDetailBtn.addEventListener(`click`, () => {
  filmsDetailsElem.style.display = `none`;
});
/* Закончил валять дурака */
