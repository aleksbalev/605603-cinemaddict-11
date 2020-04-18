import BoardComponent from './components/board';
import CardComponent from './components/card';
import DetailComponent from './components/detail';
import NavigationComponent from './components/navigation';
import ProfileComponent from './components/profile';
import ShowMoreButtonComponent from './components/show-more-button';
import SortComponent from './components/sort';
import {
  generateFilters
} from './mock/navigation';
import {
  generateSorting
} from './mock/sort';
import {
  generateCards
} from './mock/card';
import {
  switchElem,
  render
} from './utils';

const FILMS_CARDS_COUNT = 15;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_CARDS_COUNT = 5;

const renderCard = (cardPlace, card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const cardComponent = new CardComponent(card);

  const filmCardPoster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardComment = cardComponent.getElement().querySelector(`.film-card__comments`);
  const filmCardTitle = cardComponent.getElement().querySelector(`.film-card__title`);
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

const cards = generateCards(FILMS_CARDS_COUNT);

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
