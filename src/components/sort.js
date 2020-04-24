import AbstractComponent from './abstract-component';

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

class Sort extends AbstractComponent {
  constructor(sortings) {
    super();

    this._sortings = sortings;
  }

  getTemplate() {
    return createSortTemplate(this._sortings);
  }
}

export default Sort;
