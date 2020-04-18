import {
  createElement
} from '../utils';

const createSortingMarkup = (sort) => {
  const {
    name
  } = sort;

  const classList = `sort__button ${name === `Sort by default` ? `sort__button--active` : ``}`;

  return `
  <li>
    <a href="#" class="${classList}">
      ${name}
    </a>
  </li>`;
};

const createSortTemplate = (sortings) => {
  const sortingMarkup = sortings
    .map((item) => createSortingMarkup(item))
    .join(`\n`);

  return (
    `<ul class="sort">
      ${sortingMarkup}
    </ul>`
  );
};

class Sort {
  constructor(sortings) {
    this._sortings = sortings;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._sortings);
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

export default Sort;
