import BoardComponent from './components/board';
import NavigationComponent from './components/navigation';
import ProfileComponent from './components/profile';
// import SortComponent from './components/sort';
import FilmsCountComponent from './components/footer-stats';
import PageController from './controllers/page-controller';
import {
  generateFilters
} from './mock/navigation';
import {
  generateCards
} from './mock/card';
import {
  switchElem
} from './utils/common';
import {
  renderPosition,
  cardCount
} from './utils/const';
import {
  render
} from './utils/render';

const siteHeaderElem = document.querySelector(`header`);
const siteMainElem = document.querySelector(`main`);
const siteBodyElem = document.querySelector(`body`);

const cards = generateCards(cardCount.FILMS_CARDS_COUNT);
const filters = generateFilters();

render(siteHeaderElem, new ProfileComponent(), renderPosition.BEFOREEND);
render(siteMainElem, new NavigationComponent(filters), renderPosition.AFTERBEGIN);
// render(siteMainElem, new SortComponent(), renderPosition.BEFOREEND);

const filterElements = [].slice.call(siteMainElem.querySelectorAll(`.main-navigation__item`));
switchElem(filterElements, `main-navigation__item`);

const boardComponent = new BoardComponent();
const pageController = new PageController(boardComponent);
render(siteMainElem, boardComponent, renderPosition.BEFOREEND);

pageController.render(boardComponent, cards);

const footerStatistics = siteBodyElem.querySelector(`.footer__statistics`);
render(footerStatistics, new FilmsCountComponent(), renderPosition.BEFOREEND);
