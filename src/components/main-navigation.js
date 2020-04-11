const createFilterMarkup = (filter) => {
  const {
    name,
    count
  } = filter;

  return `<a href="#${
    name === `All movies` ? `all` : name.toLowerCase()
  }" class="main-navigation__item ${
    name === `All movies` ? `main-navigation__item--active` : ``
  }">${name} <span class="${
    count && name !== `All movies` ? `main-navigation__item-count` : ``
  }">${count === 0 || name === `All movies` ? `` : count}</span></a>`;
};

export const createMainNavTemplate = (filters) => {
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
