import {
  createElement
} from '../utils';

const createFilterMarkup = (filter) => {
  const {
    name,
    count
  } = filter;

  const hrefLink = `#${name === `All movies` ? `all` : name.toLowerCase()}`;
  const classList = `main-navigation__item ${name === `All movies` ? `main-navigation__item--active` : ``}`;
  const spanClassList = `${count && name !== `All movies` ? `main-navigation__item-count` : ``}`;

  return `
  <a href="${hrefLink}" class="${classList}">
    ${name} 
    <span class="${spanClassList}">
      ${count === 0 || name === `All movies` ? `` : count}
    </span>
  </a>`;
};

const createMainNavTemplate = (filters) => {
  const filterMarkup = filters
    .map((item) => createFilterMarkup(item))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class Navigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainNavTemplate(this._filters);
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

export default Navigation;
