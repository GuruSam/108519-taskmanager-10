import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskBoardTemplate} from './components/task-board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskFormTemplate} from './components/task-form.js';
import {createLoadMoreButtonTemplate} from './components/load-more.js';

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);
const mainControlSection = mainContainer.querySelector(`.main__control`);

render(mainControlSection, createSiteMenuTemplate());
render(mainContainer, createFilterTemplate());
render(mainContainer, createTaskBoardTemplate());

const boardContainerSection = mainContainer.querySelector(`.board`);

render(boardContainerSection, createLoadMoreButtonTemplate());

const boardTaskListSection = boardContainerSection.querySelector(`.board__tasks`);

render(boardTaskListSection, createTaskFormTemplate(), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(boardTaskListSection, createTaskTemplate());
}
