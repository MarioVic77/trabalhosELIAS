let _nextId = 1;

// reset usado nos testes
export function resetId() {
  _nextId = 1;
}

// -------------------------
// validateTitle
// -------------------------
export function validateTitle(title) {
  if (typeof title !== 'string') return false;

  const trimmed = title.trim();
  return trimmed.length >= 3;
}

// -------------------------
// createTask
// -------------------------
export function createTask(title) {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
  };
}

// -------------------------
// addTask
// -------------------------
export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }

  const task = createTask(title);
  return [...tasks, task];
}

// -------------------------
// toggleTask
// -------------------------
export function toggleTask(task) {
  return {
    ...task,
    completed: !task.completed,
  };
}

// -------------------------
// removeTask
// -------------------------
export function removeTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

// -------------------------
// filterTasks
// -------------------------
export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter(t => t.completed);
    case 'pending':
      return tasks.filter(t => !t.completed);
    case 'all':
    default:
      return [...tasks];
  }
}

// -------------------------
// contadores
// -------------------------
export function countTasks(tasks) {
  return tasks.length;
}

export function countCompleted(tasks) {
  return tasks.filter(t => t.completed).length;
}

export function countPending(tasks) {
  return tasks.filter(t => !t.completed).length;
}