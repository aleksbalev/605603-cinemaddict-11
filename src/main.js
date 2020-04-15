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
import {
  generateFilters
} from './mock/main-navigation';
import {
  switchElem
} from './components/switch';
import {
  generateSorting
} from './mock/sorting';
import {
  generateTasks
} from './mock/film-card';

const FILMS_CARDS_COUNT = 15;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_CARDS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElem = document.querySelector(`header`);
const siteMainElem = document.querySelector(`main`);
const siteBodyElem = document.querySelector(`body`);

const filters = generateFilters();

render(siteHeaderElem, createProfileTemplate(), `beforeend`);
render(siteMainElem, createMainNavTemplate(filters), `afterbegin`);

const filterElements = [].slice.call(siteMainElem.querySelectorAll(`.main-navigation__item`));
switchElem(filterElements, `main-navigation__item`);

const sortings = generateSorting();

render(siteMainElem, createSortTemplate(sortings), `beforeend`);

const sortElements = [].slice.call(siteMainElem.querySelectorAll(`.sort__button`));
switchElem(sortElements, `sort__button`);

render(siteMainElem, createMainFilmTemplate(), `beforeend`);

const filmsElem = siteMainElem.querySelector(`.films`);
const filmsListElem = filmsElem.querySelector(`.films-list`);

const filmsMainContainerElem = filmsListElem.querySelector(`.films-list__container`);
const filmsExtraContainersElem = filmsElem.querySelectorAll(`.films-list--extra`);

const [topRated, mostCommented] = filmsExtraContainersElem;
const topRatedContainer = topRated.querySelector(`.films-list__container`);
const mostCommentedContainer = mostCommented.querySelector(`.films-list__container`);

const cards = generateTasks(FILMS_CARDS_COUNT);

let showingCardsCount = SHOWING_FILMS_CARDS_COUNT;
let showingExtraCardsCount = EXTRA_FILMS_COUNT;

cards.slice(0, showingCardsCount)
  .forEach((card) => render(filmsMainContainerElem, createFilmCardTemplate(card), `beforeend`));

render(filmsListElem, createShowMoreButtonTemplate(), `beforeend`);

cards.slice(0, showingExtraCardsCount)
  .forEach((card) => {
    render(topRatedContainer, createFilmCardTemplate(card), `beforeend`);
    render(mostCommentedContainer, createFilmCardTemplate(card), `beforeend`);
  });

render(siteBodyElem, createFilmsDetailTemplate(cards[0]), `beforeend`);

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
