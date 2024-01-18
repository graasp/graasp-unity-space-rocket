// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupBy = <T, K extends keyof any>(
  arr: T[],
  key: (i: T) => K,
): Record<K, T[]> =>
  arr.reduce(
    (groups, item) => {
      const keyValue = key(item);
      return { ...groups, [keyValue]: [...(groups[keyValue] || []), item] };
    },
    {} as Record<K, T[]>,
  );

export const median = (arr: number[]): number => {
  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
