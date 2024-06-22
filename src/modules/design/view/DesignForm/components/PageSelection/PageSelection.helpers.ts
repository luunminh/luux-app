export const getArrayOfPages = (numberOfPages: number): number[] => {
  return Array.from({ length: numberOfPages }, (_, i) => i + 1);
};
