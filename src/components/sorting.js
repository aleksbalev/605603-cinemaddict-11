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

export const createSortTemplate = (sortings) => {
  const sortingMarkup = sortings
    .map((item) => createSortingMarkup(item))
    .join(`\n`);

  return (
    `<ul class="sort">
      ${sortingMarkup}
    </ul>`
  );
};
