export function validateTitle(title) {
  if (typeof title !== 'string') return false;

  return title.trim().length >= 3;
}