const Months = [
  `January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`
];

const getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

// Параметр chance - процент вероятности получить true
const getRandomBoolean = (chance = 50) => Math.random() * 100 < chance;

const castTimeFormat = (value) => value < 10 ? `0${value}` : value;

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 && date.getHours() < 24 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
};

export {getRandomNumber, getRandomArrayItem, getRandomBoolean, formatTime, Months};
