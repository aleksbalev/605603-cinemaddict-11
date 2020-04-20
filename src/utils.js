import {
  renderPosition
} from './const';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const switchElem = (arr, className) => {
  arr.forEach((elem) => {
    elem.addEventListener(`click`, () => {
      arr.forEach((item) => {
        item.classList.remove(`${className}--active`);
      });
      elem.classList.add(`${className}--active`);
    });
  });
};

export {
  createElement,
  render,
  switchElem,
};
