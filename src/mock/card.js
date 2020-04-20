const titles = [
  `Made for Each Other`,
  `Popeye meets Sinbadr`,
  `Sagebrush trail`,
  `Santa Claus conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man With the Golden Arm`
];

const years = [`1929`, `1933`, `1936`, `1945`, `1955`, `1964`, `1939`];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const genres = [
  `Comedy`,
  `Cartoon`,
  `Western`,
  `Musical`,
  `Mystery`,
  `Drama`
];

const imgLinks = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const emojis = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const comments = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const names = [
  `Pig`,
  `Tim Macoveev`,
  `John Doe`,
  `Anonimous`
];

const commentTimes = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `Today`
];

const generateDuration = () => {
  const randomH = Math.floor(Math.random() * 2);
  const randomM = getRandomIntegerItem(20, 59);

  if (randomH === 0) {
    const string = `${randomM}m`;
    return string;
  } else {
    const string = `${randomH}h ${randomM}m`;
    return string;
  }
};

const generateRandomSentence = (arr) => {
  const count = Math.floor(Math.random() * 5) + 1;
  const cloneArr = [...arr];
  const shuffled = cloneArr.sort(() => {
    return 0.5 - Math.random();
  });
  const selected = shuffled.slice(0, count);
  const sentence = selected.join(` `);

  return sentence;
};

const getRandomIntegerItem = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const generateComments = (count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      emoji: emojis[getRandomIndex(emojis)],
      comment: comments[getRandomIndex(comments)],
      name: names[getRandomIndex(names)],
      time: commentTimes[getRandomIndex(commentTimes)]
    });
  }

  return arr;
};


const generateCard = () => {
  const randomCommentsCount = Math.floor(Math.random() * 5);
  return {
    cardTitle: titles[getRandomIndex(titles)],
    cardRating: Math.round((Math.random() * 10) * 10) / 10,
    cardDate: [
      years[getRandomIndex(years)],
      months[getRandomIndex(months)],
      getRandomIntegerItem(1, 31)
    ],
    cardDuration: generateDuration(),
    cardGenre: genres[getRandomIndex(genres)],
    cardPoster: imgLinks[getRandomIndex(imgLinks)],
    cardDescription: generateRandomSentence(descriptions),
    cardComments: [
      randomCommentsCount,
      generateComments(randomCommentsCount)
    ],
  };
};

const generateCards = (count) => {
  return new Array(count).fill(``)
    .map(generateCard);
};

export {
  generateCard,
  generateCards,
  getRandomIntegerItem,
};
