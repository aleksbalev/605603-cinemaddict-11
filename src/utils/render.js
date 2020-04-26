import {
  renderPosition
} from './const';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, сomponent, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(сomponent.getElement());
      break;
    case renderPosition.BEFOREEND:
      container.append(сomponent.getElement());
      break;
  }
};

const remove = (componetn) => {
  componetn.getElement().remove();
  componetn.removeElement();
};

export {
  createElement,
  render,
  remove
};
