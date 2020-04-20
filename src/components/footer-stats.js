import {
  cardCount
} from '../const';
import {
  createElement
} from '../utils';

const createFilmsCountTemplate = () => {
  return `<p>${cardCount.FILMS_CARDS_COUNT} movies inside</p>`;
};

class FilmsCount {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsCountTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmsCount;
