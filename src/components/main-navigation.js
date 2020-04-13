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
