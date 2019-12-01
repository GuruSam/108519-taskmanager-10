import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskBoardTemplate} from './components/task-board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskFormTemplate} from './components/task-form.js';
import {createLoadMoreButtonTemplate} from './components/load-more.js';
import {generateFilters} from "./mock/filters";
import {generateTask} from "./mock/tasks";

const TOTAL_TASK_AMOUNT = 16;
const INITIAL_TASK_AMOUNT = 8;
const LOADED_TASK_AMOUNT = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);
const mainControlSection = mainContainer.querySelector(`.main__control`);

render(mainControlSection, createSiteMenuTemplate());

// Генерация задач-моков
const taskList = [];

for (let i = 0; i < TOTAL_TASK_AMOUNT; i++) {
  taskList.push(generateTask());
}

render(mainContainer, createTaskBoardTemplate());

const boardTaskListSection = mainContainer.querySelector(`.board__tasks`);
render(boardTaskListSection, createTaskFormTemplate(taskList[0]), `afterbegin`);

// Рендер фильтров
const filters = generateFilters(taskList);
render(mainControlSection, createFilterTemplate(filters), `afterend`);

// Рендер задач
for (let i = 1; i < INITIAL_TASK_AMOUNT; i++) {
  render(boardTaskListSection, createTaskTemplate(taskList[i]));
}

// Рендер кнопки Load-More и установка клик-события
render(boardTaskListSection, createLoadMoreButtonTemplate(), `afterend`);

const loadMoreBtn = mainContainer.querySelector(`.load-more`);

loadMoreBtn.onclick = () => {
  let taskLoaded = document.querySelectorAll(`.card`).length;
  const loadMoreAmount = taskLoaded + LOADED_TASK_AMOUNT;

  taskList.slice(taskLoaded, loadMoreAmount)
    .forEach((task) => {
      render(boardTaskListSection, createTaskTemplate(task));
      taskLoaded++;
    });

  if (taskLoaded === TOTAL_TASK_AMOUNT) {
    loadMoreBtn.remove();
  }
};
