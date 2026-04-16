export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }

  const newTask = createTask(title);
  return [...tasks, newTask];
}