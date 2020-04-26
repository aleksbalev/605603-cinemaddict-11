import AbstractComponent from './abstract-component';
import {
  cardCount
} from '../utils/const';

const createFilmsCountTemplate = () => {
  return `<p>${cardCount.FILMS_CARDS_COUNT} movies inside</p>`;
};

class FilmsCount extends AbstractComponent {
  getTemplate() {
    return createFilmsCountTemplate();
  }
}

export default FilmsCount;
