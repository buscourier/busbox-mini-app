export const isObject = (item: unknown): item is Record<string, unknown> => {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
};

export const isObjectsEqual = <T>(obj1: T | null, obj2: T | null): boolean => {
  if (obj1 === obj2) return true; // Ссылки равны или оба null
  if (!obj1 || !obj2) return false; // Один из объектов null, другой нет
  if (typeof obj1 !== typeof obj2) return false; // Разные типы данных

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    return (
      obj1.length === obj2.length && obj1.every((item, index) => isObjectsEqual(item, obj2[index]))
    );
  }

  if (isObject(obj1) && isObject(obj2)) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false; // Разное количество ключей

    return keys1.every((key) => isObjectsEqual(obj1[key as keyof T], obj2[key as keyof T]));
  }

  // Для других типов данных (числа, строки, булевы значения)
  return obj1 === obj2;
};
