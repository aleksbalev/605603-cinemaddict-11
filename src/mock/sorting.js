const sortNames = [
  `Sort by default`, `Sort by date`, `Sort by rating`
];

const generateSorting = () => {
  return sortNames.map((item) => {
    return {
      name: item
    };
  });
};

export {
  generateSorting
};
