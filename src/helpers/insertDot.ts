export const insertDot = (string: string) => {
  const pattern = /2e/g;
  return string.replace(pattern, '.');
}