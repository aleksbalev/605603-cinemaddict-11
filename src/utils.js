const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
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
