const generateFilters = (tasks) => {
  const filters = [
    {
      title: `all`,
      count: 0
    },
    {
      title: `overdue`,
      count: tasks.filter((task) => task.dueDate && task.dueDate < Date.now()).length
    },
    {
      title: `today`,
      count: tasks.filter((task) => task.dueDate && task.dueDate.getDate() === new Date().getDate()).length
    },
    {
      title: `favorites`,
      count: tasks.filter((task) => task.isFavorite).length
    },
    {
      title: `repeating`,
      count: tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length
    },
    {
      title: `tags`,
      count: tasks.filter((task) => task.tags.length >= 1).length
    },
    {
      title: `archive`,
      count: tasks.filter((task) => task.isArchive).length
    },
  ];

  filters[0][`count`] = filters.reduce((prev, current) => prev + current.count, 0);

  return filters;
};

export {generateFilters};
