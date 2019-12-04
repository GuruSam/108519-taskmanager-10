import {createElement, formatTime, Months} from "../utils";

const renderTags = (tags) => {
  return tags.map((tag) =>
    `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${tag}
        </span>
      </span>`)
    .join(`\n`);
};

const createTaskTemplate = (task) => {
  const isExpired = task.dueDate instanceof Date && task.dueDate < Date.now();
  const isDateShowing = !!task.dueDate;

  const date = isDateShowing ? `${task.dueDate.getDate()} ${Months[task.dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(task.dueDate) : ``;

  const repeatClass = Object.values(task.repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return `<article class="card card--${task.color} ${repeatClass} ${deadlineClass}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${task.description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time">${time}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">              
                ${renderTags(task.tags)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
};

export default class Task {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
