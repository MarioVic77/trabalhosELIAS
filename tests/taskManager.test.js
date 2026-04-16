import { describe, it, expect } from 'vitest';
import { validateTitle } from '../src/taskManager.js';

describe('validateTitle', () => {
  it('deve retornar true para título válido', () => {
    expect(validateTitle('Estudar')).toBe(true);
  });
});