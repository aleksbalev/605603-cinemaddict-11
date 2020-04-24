import CardComponent from '../components/card';
import DetailComponent from '../components/detail';
import NoFilmsComponent from '../components/no-films';
import ShowMoreButtonComponent from '../components/show-more-button';
import {
  render,
  remove
} from '../utils/render';
import {
  renderPosition,
  cardCount,
} from '../utils/const';
import {
  generateCards
} from '../mock/card';

const renderCard = (cardPlace, card) => {
  const siteBodyElem = document.querySelector(`body`);
  const cards = generateCards(cardCount.FILMS_CARDS_COUNT);


  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(detailComponent);
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
      render(siteBodyElem, detailComponent, renderPosition.BEFOREEND);

      detailComponent.setClickHandler(() => {
        remove(detailComponent);
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });

  render(cardPlace, cardComponent, renderPosition.BEFOREEND);
};

const renderCards = (boardComponent, cards) => {
  cards.forEach((card) => {
    renderCard(boardComponent, card);
  });
};

class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(boardComponent, cards) {
    boardComponent = boardComponent.getElement();

    if (cardCount.FILMS_CARDS_COUNT === 0) {
      const extraFilms = boardComponent.querySelectorAll(`.films-list--extra`);
      render(boardComponent, this._noFilmsComponent, renderPosition.AFTERBEGIN);
      extraFilms.forEach((child) => {
        boardComponent.removeChild(child);
      });
      return;
    }

    const filmsMainContainerElem = boardComponent.querySelector(`.films-list__container`);
    const filmsExtraContainersElem = boardComponent.querySelectorAll(`.films-list--extra`);

    const [topRated, mostCommented] = filmsExtraContainersElem;
    const topRatedContainer = topRated.querySelector(`.films-list__container`);
    const mostCommentedContainer = mostCommented.querySelector(`.films-list__container`);

    const filmsListElem = boardComponent.querySelector(`.films-list`);

    let showingCardsCount = cardCount.SHOWING_CARDS_COUNT_ON_START;

    renderCards(boardComponent, cards.slice(0, showingCardsCount));

    let showingExtraCardsCount = cardCount.EXTRA_FILMS_COUNT;
    cards.slice(0, showingExtraCardsCount)
      .forEach((card) => {
        renderCard(topRatedContainer, card);
        renderCard(mostCommentedContainer, card);
      });

    render(filmsListElem, this._showMoreButtonComponent, renderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = showingCardsCount;
      showingCardsCount = showingCardsCount + cardCount.SHOWING_CARDS_COUNT_BY_BUTTON;

      renderCards(filmsMainContainerElem, cards.slice(prevCardsCount, showingCardsCount));

      if (showingCardsCount >= cards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}

export default PageController;
