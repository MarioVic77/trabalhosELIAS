import { createTask } from '../src/taskManager.js';

describe('createTask', () => {
  it('deve criar uma tarefa', () => {
    const task = createTask('Estudar');

    expect(task.title).toBe('Estudar');
    expect(task.completed).toBe(false);
  });
});