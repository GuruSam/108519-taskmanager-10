import {createElement} from "../utils";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  renderFilters(filters) {
    return filters.map((filter, index) =>
      `<input
        type="radio"
        id="filter__${filter.title}"
        class="filter__input visually-hidden"
        name="filter"
        ${index === 0 ? `checked` : ``}
        ${filter.count === 0 ? `disabled` : ``}
      />
      <label for="filter__${filter.title}" class="filter__label">
        ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span></label
      >`)
      .join(`\n`);
  }

  getTemplate() {
    return `<section class="main__filter filter container">
    ${this.renderFilters(this._filters)}
  </section>`;
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
