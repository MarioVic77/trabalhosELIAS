import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateTitle,
  createTask,
  addTask,
  toggleTask,
  removeTask,
  filterTasks,
  countTasks,
  countCompleted,
  countPending,
  resetId,
} from '../src/taskManager.js';

/* ============================================================
  1. validateTitle
============================================================ */
describe('validateTitle', () => {
  it('válido', () => {
    expect(validateTitle('Estudar')).toBe(true);
  });

  it('inválido vazio', () => {
    expect(validateTitle('')).toBe(false);
  });

  it('inválido null', () => {
    expect(validateTitle(null)).toBe(false);
  });

  it('inválido número', () => {
    expect(validateTitle(123)).toBe(false);
  });

  it('trim funciona', () => {
    expect(validateTitle('  abc  ')).toBe(true);
  });
});

/* ============================================================
  2. createTask
============================================================ */
describe('createTask', () => {
  beforeEach(() => resetId());

  it('cria tarefa', () => {
    const task = createTask('Estudar');

    expect(task.title).toBe('Estudar');
    expect(task.completed).toBe(false);
    expect(task.id).toBeDefined();
  });

  it('id incremental', () => {
    const t1 = createTask('A');
    const t2 = createTask('B');

    expect(t2.id).toBe(t1.id + 1);
  });
});

/* ============================================================
  3. addTask
============================================================ */
describe('addTask', () => {
  beforeEach(() => resetId());

  it('adiciona tarefa', () => {
    const tasks = addTask([], 'Estudar');

    expect(tasks).toHaveLength(1);
  });

  it('imutabilidade', () => {
    const original = [];
    const updated = addTask(original, 'Estudar');

    expect(original).toHaveLength(0);
    expect(updated).not.toBe(original);
  });

  it('erro inválido', () => {
    expect(() => addTask([], '')).toThrow();
  });
});

/* ============================================================
  4. toggleTask
============================================================ */
describe('toggleTask', () => {
  it('marca como concluída', () => {
    const task = createTask('A');
    const updated = toggleTask(task);

    expect(updated.completed).toBe(true);
  });

  it('desmarca', () => {
    const task = toggleTask(createTask('A'));
    const updated = toggleTask(task);

    expect(updated.completed).toBe(false);
  });

  it('imutável', () => {
    const task = createTask('A');
    const updated = toggleTask(task);

    expect(updated).not.toBe(task);
  });
});

/* ============================================================
  5. removeTask
============================================================ */
describe('removeTask', () => {
  beforeEach(() => resetId());

  it('remove por id', () => {
    const tasks = [
      createTask('A'),
      createTask('B'),
      createTask('C'),
    ];

    const updated = removeTask(tasks, 2);

    expect(updated).toHaveLength(2);
    expect(updated.find(t => t.id === 2)).toBeUndefined();
  });

  it('imutabilidade', () => {
    const tasks = [createTask('A')];

    const updated = removeTask(tasks, 1);

    expect(updated).not.toBe(tasks);
  });
});

/* ============================================================
  6. filterTasks
============================================================ */
describe('filterTasks', () => {
  beforeEach(() => resetId());

  it('all', () => {
    const tasks = [createTask('A')];
    expect(filterTasks(tasks, 'all')).toHaveLength(1);
  });

  it('pending', () => {
    const tasks = [createTask('A')];
    expect(filterTasks(tasks, 'pending')[0].completed).toBe(false);
  });

  it('completed', () => {
    let tasks = [createTask('A')];
    tasks[0] = toggleTask(tasks[0]);

    expect(filterTasks(tasks, 'completed')).toHaveLength(1);
  });
});

/* ============================================================
  7. countTasks
============================================================ */
describe('countTasks', () => {
  it('conta total', () => {
    const tasks = [createTask('A'), createTask('B')];

    expect(countTasks(tasks)).toBe(2);
  });
});

/* ============================================================
  8. countCompleted
============================================================ */
describe('countCompleted', () => {
  it('conta concluídas', () => {
    let tasks = [createTask('A'), createTask('B')];
    tasks[0] = toggleTask(tasks[0]);

    expect(countCompleted(tasks)).toBe(1);
  });
});

/* ============================================================
  9. countPending
============================================================ */
describe('countPending', () => {
  it('conta pendentes', () => {
    let tasks = [createTask('A'), createTask('B')];
    tasks[0] = toggleTask(tasks[0]);

    expect(countPending(tasks)).toBe(1);
  });
});