const switchElem = (arr, className) => {
  arr.forEach((elem) => {
    elem.addEventListener(`click`, () => {
      let el = arr[0];
      while (el) {
        if (el.tagName === `A`) {
          el.classList.remove(`${className}--active`);
        }

        if (typeof el === `undefined`) {
          break;
        }

        el = el.parentNode.nextSibling.querySelector(`a`);
      }

      elem.classList.add(`${className}--active`);
    });
  });
};

export {
  switchElem
};
