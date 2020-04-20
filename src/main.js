import BoardComponent from './components/board';
import CardComponent from './components/card';
import DetailComponent from './components/detail';
import NavigationComponent from './components/navigation';
import ProfileComponent from './components/profile';
import ShowMoreButtonComponent from './components/show-more-button';
import SortComponent from './components/sort';
import FilmsCountComponent from './components/footer-stats';
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
import {
  renderPosition,
  cardCount
} from './const';

const renderCard = (cardPlace, card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      detailComponent.getElement().remove();
      detailComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const cardComponent = new CardComponent(card);
  const detailComponent = new DetailComponent(cards[0]);

  const filmCardPoster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardComment = cardComponent.getElement().querySelector(`.film-card__comments`);
  const filmCardTitle = cardComponent.getElement().querySelector(`.film-card__title`);

  const popupOpenElements = [filmCardPoster, filmCardComment, filmCardTitle];

  popupOpenElements.forEach((elem) => {
    elem.addEventListener(`click`, () => {
      render(siteBodyElem, detailComponent.getElement(), renderPosition.BEFOREEND);

      const closeCardDetailBtn = detailComponent.getElement().querySelector(`.film-details__close-btn`);
      closeCardDetailBtn.addEventListener(`click`, () => {
        detailComponent.getElement().remove();
        detailComponent.removeElement();
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });

  render(cardPlace, cardComponent.getElement(), renderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, cards) => {
  const filmsMainContainerElem = boardComponent.getElement().querySelector(`.films-list__container`);
  const filmsExtraContainersElem = boardComponent.getElement().querySelectorAll(`.films-list--extra`);

  const [topRated, mostCommented] = filmsExtraContainersElem;
  const topRatedContainer = topRated.querySelector(`.films-list__container`);
  const mostCommentedContainer = mostCommented.querySelector(`.films-list__container`);

  const filmsListElem = boardComponent.getElement().querySelector(`.films-list`);

  let showingCardsCount = cardCount.SHOWING_CARDS_COUNT_ON_START;
  cards.slice(0, showingCardsCount)
    .forEach((card) => renderCard(filmsMainContainerElem, card));

  let showingExtraCardsCount = cardCount.EXTRA_FILMS_COUNT;
  cards.slice(0, showingExtraCardsCount)
    .forEach((card) => {
      renderCard(topRatedContainer, card);
      renderCard(mostCommentedContainer, card);
    });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsListElem, showMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + cardCount.SHOWING_CARDS_COUNT_BY_BUTTON;

    cards.slice(prevCardsCount, showingCardsCount)
      .forEach((card) => renderCard(filmsMainContainerElem, card));

    if (showingCardsCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
};

const siteHeaderElem = document.querySelector(`header`);
const siteMainElem = document.querySelector(`main`);
const siteBodyElem = document.querySelector(`body`);

const cards = generateCards(cardCount.FILMS_CARDS_COUNT);
const filters = generateFilters();
const sortings = generateSorting();

render(siteHeaderElem, new ProfileComponent().getElement(), renderPosition.BEFOREEND);
render(siteMainElem, new NavigationComponent(filters).getElement(), renderPosition.AFTERBEGIN);
render(siteMainElem, new SortComponent(sortings).getElement(), renderPosition.BEFOREEND);

const sortElements = [].slice.call(siteMainElem.querySelectorAll(`.sort__button`));
switchElem(sortElements, `sort__button`);

const filterElements = [].slice.call(siteMainElem.querySelectorAll(`.main-navigation__item`));
switchElem(filterElements, `main-navigation__item`);

const boardComponent = new BoardComponent();
render(siteMainElem, boardComponent.getElement(), renderPosition.BEFOREEND);

renderBoard(boardComponent, cards);

const footerStatistics = siteBodyElem.querySelector(`.footer__statistics`);
render(footerStatistics, new FilmsCountComponent().getElement(), renderPosition.BEFOREEND);
