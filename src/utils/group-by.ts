export function groupBy<T>(collection: T[], key: keyof T) {
  return collection.reduce(
    (acc, item) => {
      const index = item[key] as unknown as string;
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}
