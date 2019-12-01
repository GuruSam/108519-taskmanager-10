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

export const createFilterTemplate = (filters) =>
  `<section class="main__filter filter container">
    ${renderFilters(filters)}
  </section>`;
