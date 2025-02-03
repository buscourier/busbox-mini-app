export const identityMatcherById = <T extends { id: string | number }>(
  a: T | null,
  b: T | null,
): boolean => {
  if (!a || !b) return a === b;
  return a.id === b.id;
};

export const identityMatcherByKey =
  <T>(key: keyof T) =>
  (a: T | null, b: T | null): boolean => {
    if (!a || !b) return a === b;
    return a[key] === b[key];
  };
