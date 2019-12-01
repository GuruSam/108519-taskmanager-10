const generateFilters = (tasks) => {
  const filters = [
    {
      title: `All`,
      count: 0
    },
    {
      title: `Today`,
      count: tasks.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate()).length
    },
    {
      title: `Overdue`,
      count: tasks.filter((task) => task.dueDate && task.dueDate < Date.now()).length
    },
    {
      title: `Favorites`,
      count: tasks.filter((task) => task.isFavorite).length
    },
    {
      title: `Repeating`,
      count: tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length
    },
    {
      title: `Tags`,
      count: tasks.filter((task) => task.tags.length >= 1).length
    },
    {
      title: `Archive`,
      count: tasks.filter((task) => task.isArchive).length
    },
  ];

  filters[0][`count`] = filters.reduce((prev, current) => prev + current.count, 0);

  return filters;
};

export {generateFilters};
