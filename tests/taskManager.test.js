import { describe, it, expect } from 'vitest';
import { validateTitle } from '../src/taskManager.js';

describe('validateTitle', () => {
  it('deve retornar true para um título válido', () => {
    expect(validateTitle('Estudar Vitest')).toBe(true);
  });

  it('deve retornar false para string vazia', () => {
    expect(validateTitle('')).toBe(false);
  });
});