import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskBoardTemplate} from './components/task-board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskFormTemplate} from './components/task-form.js';
import {createLoadMoreButtonTemplate} from './components/load-more.js';
import {generateFilters} from "./mock/filters";
import {generateTask} from "./mock/tasks";

const TASK_COUNT = 4;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);
const mainControlSection = mainContainer.querySelector(`.main__control`);

render(mainControlSection, createSiteMenuTemplate());

const taskList = [];

for (let i = 0; i < TASK_COUNT; i++) {
  taskList.push(generateTask());
}

render(mainContainer, createTaskBoardTemplate());

const boardTaskListSection = mainContainer.querySelector(`.board__tasks`);
render(boardTaskListSection, createTaskFormTemplate(taskList.shift()), `afterbegin`);

const filters = generateFilters(taskList);
render(mainControlSection, createFilterTemplate(filters), `afterend`);

taskList.forEach((task) => {
  render(boardTaskListSection, createTaskTemplate(task));
});

render(boardTaskListSection, createLoadMoreButtonTemplate(), `afterend`);
