import {createElement, formatTime, Months, Days, Colors} from "../utils";

export default class TaskForm {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  renderDateStatus(date, time) {
    return `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder="23 September"
          name="date"
          value="${date} ${time}"
        />
      </label>
    </fieldset>`;
  }

  renderRepeatingDays(days, repeatingDays) {
    const renderDays = () => {
      return days.map((day) => {
        const isChecked = repeatingDays[day];

        return `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-1"
        name="repeat"
        value="${day}"
        ${isChecked ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-1"
        >${day}</label>`;
      })
        .join(`\n`);
    };

    return `<fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${renderDays()}
                </div>
              </fieldset>`;
  }

  renderTags(tags) {
    return tags.map((tag) =>
      `<span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="${tag}"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        #${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`)
      .join(`\n`);
  }

  renderColors(colors, currentColor) {
    return colors.map((color) => {
      return `<input
              type="radio"
              id="color-${color}-1"
              class="card__color-input card__color-input--${color} visually-hidden"
              name="color"
              value="${color}"
              ${color === currentColor ? `checked` : ``}
            />
            <label
              for="color-${color}-1"
              class="card__color card__color--${color}"
              >${color}</label
            >`;
    }).join(`\n`);
  }

  getTemplate() {
    const task = this._task;
    const isExpired = task.dueDate instanceof Date && task.dueDate < Date.now();
    const isDateShowing = !!task.dueDate;

    const date = isDateShowing ? `${task.dueDate.getDate()} ${Months[task.dueDate.getMonth()]}` : ``;
    const time = isDateShowing ? formatTime(task.dueDate) : ``;

    const isRepeating = Object.values(task.repeatingDays).some(Boolean);
    const repeatClass = isRepeating ? `card--repeat` : ``;
    const deadlineClass = isExpired ? `card--deadline` : ``;

    return `<article class="card card--edit card--${task.color} ${repeatClass} ${deadlineClass}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${task.description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
              </button>

              ${isDateShowing ? this.renderDateStatus(date, time) : ``}

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
              </button>

              ${isRepeating ? this.renderRepeatingDays(Days, task.repeatingDays) : ``}
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">${this.renderTags(task.tags)}</div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${this.renderColors(Colors, task.color)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
