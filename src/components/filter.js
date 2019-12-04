import {createElement} from "../utils";

const renderFilters = (filters) => {
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
};

const createFilterTemplate = (filters) =>
  `<section class="main__filter filter container">
    ${renderFilters(filters)}
  </section>`;

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
