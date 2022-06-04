export const truncateString = (input: string | undefined, n: number) => {
  if (input == undefined) {
    return "";
  }
  return input.length > n ? `${input.substring(0, n)}...` : input;
};
