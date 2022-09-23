export type ValueOf<T> = T[keyof T];

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
