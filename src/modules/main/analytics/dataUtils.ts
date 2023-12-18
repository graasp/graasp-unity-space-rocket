export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce(
    (groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );

export const median = (arr: number[]): number => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
