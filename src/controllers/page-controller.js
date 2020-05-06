import CardComponent from '../components/card';
import DetailComponent from '../components/detail';
import NoFilmsComponent from '../components/no-films';
import ShowMoreButtonComponent from '../components/show-more-button';
import SortComponent, {
  SortType
} from '../components/sort';
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
import {
  switchElem
} from '../utils/common';

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

const getSortedCards = (cards, sortType, from, to) => {
  let sortedCards = [];
  const showingCards = cards.slice();

  switch (sortType) {
    case SortType.DATE_DOWN:
      sortedCards = showingCards.sort((a, b) => b.cardDate[0] - a.cardDate[0]);
      break;
    case SortType.RATE_DOWN:
      sortedCards = showingCards.sort((a, b) => b.cardRating - a.cardRating);
      break;
    case SortType.DEFAULT:
      sortedCards = showingCards;
      break;
  }

  return sortedCards.slice(from, to);
};

class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(container, cards) {
    container = this._container.getElement();
    const containerMain = container.querySelector(`.films-list__container`);
    const containerExtra = container.querySelectorAll(`.films-list--extra`);

    const renderShowMoreButton = () => {

      render(container.querySelector(`.films-list`), this._showMoreButtonComponent, renderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + cardCount.SHOWING_CARDS_COUNT_BY_BUTTON;

        const sortedCards = getSortedCards(cards, this._sortComponent.getSortType(), prevCardsCount, showingCardsCount);

        renderCards(containerMain, sortedCards);

        if (showingCardsCount >= cards.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    if (cardCount.FILMS_CARDS_COUNT === 0) {
      render(container, this._noFilmsComponent, renderPosition.AFTERBEGIN);
      containerExtra.forEach((child) => {
        container.removeChild(child);
      });
      return;
    }

    const [topRated, mostCommented] = containerExtra;
    const topRatedContainer = topRated.querySelector(`.films-list__container`);
    const mostCommentedContainer = mostCommented.querySelector(`.films-list__container`);

    const filmsListElem = container.querySelector(`.films-list > .films-list__container`);

    let showingCardsCount = cardCount.SHOWING_CARDS_COUNT_ON_START;

    render(container, this._sortComponent, renderPosition.AFTERBEGIN);

    const sortElements = [].slice.call(container.querySelectorAll(`.sort__button`));
    switchElem(sortElements, `sort__button`);

    let showingExtraCardsCount = cardCount.EXTRA_FILMS_COUNT;
    cards.slice(0, showingExtraCardsCount)
      .forEach((card) => {
        renderCard(topRatedContainer, card);
        renderCard(mostCommentedContainer, card);
      });

    renderCards(filmsListElem, cards.slice(0, showingCardsCount));

    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingCardsCount = cardCount.SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedCards = getSortedCards(cards, sortType, 0, showingCardsCount);

      filmsListElem.innerHTML = ``;

      renderCards(filmsListElem, sortedCards);

      renderShowMoreButton();
    });
  }
}

export default PageController;
