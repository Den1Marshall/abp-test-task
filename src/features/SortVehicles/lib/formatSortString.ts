export const formatSortString = (sortString: string) => {
  sortString = sortString
    .replace('sortBy=', '')
    .replace('&order=', ' ')
    .replace('asc', '(asc)')
    .replace('desc', '(desc)')
    .trim();

  return sortString.charAt(0).toUpperCase() + sortString.slice(1); // capitalize first letter;
};
