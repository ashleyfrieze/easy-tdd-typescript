export type Range = {
  min: number;
  max: number;
};

export const rowFirstRange = (
  row: boolean[],
  size: number
): Range | undefined => {
  let min = 0;

  for (let index = 0; index < row.length; index++) {
    if (row[index]) {
      min = index + 1;
    } else {
      if (index - min + 1 === size) {
        return { min, max: index };
      }
    }
  }

  return undefined;
};
