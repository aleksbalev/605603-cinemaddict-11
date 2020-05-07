import AbstractComponent from "./abstract-component";

const SortType = {
  DATE_DOWN: `date-down`,
  RATE_DOWN: `rank-down`,
  DEFAULT: `default`,
};

const createSortTemplate = () => {
  return `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE_DOWN}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATE_DOWN}" class="sort__button">Sort by rating</a></li>
    </ul>`;
};

class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    const sortButtons = this.getElement().querySelectorAll(`.sort__button`);

    sortButtons.forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `A`) {
          return;
        }

        const sortType = evt.target.dataset.sortType;

        if (this._currentSortType === sortType) {
          return;
        }

        this._currentSortType = sortType;

        handler(this._currentSortType);
      });
    });
  }
}

export default Sort;
export {
  SortType
};
