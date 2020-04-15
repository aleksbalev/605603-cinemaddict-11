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
  switchElem
};
