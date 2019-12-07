import MenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import TaskBoardComponent from './components/task-board.js';
import TaskComponent from './components/task.js';
import TaskFormComponent from './components/task-form.js';
import LoadMoreButtonComponent from './components/load-more.js';
import {generateFilters} from "./mock/filters";
import {generateTask} from "./mock/tasks";
import {render, isEscPressed} from "./utils";
import NoTasksComponent from "./components/no-tasks";

const TOTAL_TASK_AMOUNT = 16;
const INITIAL_TASK_AMOUNT = 8;
const LOADED_TASK_AMOUNT = 8;

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskFormComponent = new TaskFormComponent(task);
  const taskEditButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  const onEditClick = () => {
    boardTaskListSection.replaceChild(taskFormComponent.getElement(), taskComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
    taskFormComponent.getElement().querySelector(`form.card__form`).addEventListener(`submit`, onTaskSubmit);
  };

  const onTaskSubmit = () => {
    boardTaskListSection.replaceChild(taskComponent.getElement(), taskFormComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
    taskFormComponent.getElement().querySelector(`form.card__form`).removeEventListener(`submit`, onTaskSubmit);
  };

  const onEscKeyDown = (evt) => {
    if (isEscPressed(evt)) {
      boardTaskListSection.replaceChild(taskComponent.getElement(), taskFormComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskEditButton.onclick = (onEditClick);

  render(boardTaskListSection, taskComponent.getElement());
};

// Рендер меню
const mainContainer = document.querySelector(`.main`);
const mainControlSection = mainContainer.querySelector(`.main__control`);

render(mainControlSection, new MenuComponent().getElement());

// Генерация задач
const taskList = [];

for (let i = 0; i < TOTAL_TASK_AMOUNT; i++) {
  taskList.push(generateTask());
}

// Рендер фильтров и контента
const filters = generateFilters(taskList);
render(mainContainer, new FilterComponent(filters).getElement());

const taskBoardComponent = new TaskBoardComponent();
render(mainContainer, taskBoardComponent.getElement());

const boardTaskListSection = taskBoardComponent.getElement().querySelector(`.board__tasks`);

// Рендер задач
if (taskList.length) {
  for (let i = 0; i < INITIAL_TASK_AMOUNT; i++) {
    renderTask(taskList[i]);
  }

  // Рендер кнопки Load-More и установка клик-события
  render(boardTaskListSection.parentNode, new LoadMoreButtonComponent().getElement());

  const loadMoreBtn = mainContainer.querySelector(`.load-more`);

  loadMoreBtn.onclick = () => {
    let taskLoaded = document.querySelectorAll(`.card`).length;
    const loadMoreAmount = taskLoaded + LOADED_TASK_AMOUNT;

    taskList.slice(taskLoaded, loadMoreAmount)
      .forEach((task) => {
        renderTask(task);
        taskLoaded++;
      });

    if (taskLoaded === TOTAL_TASK_AMOUNT) {
      loadMoreBtn.remove();
    }
  };
} else {
  mainContainer.replaceChild(new NoTasksComponent().getElement(), taskBoardComponent.getElement());
}
