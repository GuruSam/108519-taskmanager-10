import {getRandomArrayItem, getRandomNumber, getRandomBoolean} from "../utils";

const taskDescriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const generateRandomDate = () => {
  const randomDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const dateDifference = sign * getRandomNumber(0, 7);

  randomDate.setDate(randomDate.getDate() + dateDifference);
  randomDate.setHours(getRandomNumber(7, 24));
  randomDate.setMinutes(0);

  return randomDate;
};

const generateRepeatingDays = () => {
  const result = {};

  days.forEach((day, index) => {
    if (index < 1) {
      result[day] = getRandomBoolean();
    } else {
      result[day] = false;
    }
  });

  return result;
};

const generateRandomTags = () => {
  const tagsAmount = getRandomNumber(0, 3);
  const randomTags = new Set();

  for (let i = 0; i < tagsAmount; i++) {
    randomTags.add(getRandomArrayItem(tags));
  }

  return Array.from(randomTags);
};

const generateTask = () => {
  return {
    description: getRandomArrayItem(taskDescriptions),
    dueDate: getRandomBoolean() ? generateRandomDate() : null,
    repeatingDays: generateRepeatingDays(),
    tags: generateRandomTags(),
    color: getRandomArrayItem(colors),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean()
  };
};

export {generateTask};
