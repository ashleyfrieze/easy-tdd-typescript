const toCapitalisedWord = (word: string) => {
  const lowerCaseVersion = word.toLowerCase();
  const firstCharacter = lowerCaseVersion.slice(0, 1);
  const remainder = lowerCaseVersion.slice(1);
  return `${firstCharacter.toUpperCase()}${remainder}`;
};

export const convertKebabToTitle = (kebabCase: string): string =>
  kebabCase
    .split('-')
    .map((element) => element.trim())
    .map(toCapitalisedWord)
    .join(' ');

export const convertTitleToKebab = (titleCase: string): string =>
  titleCase.toLowerCase().split(' ').filter(Boolean).join('-');

export const convertKebabToTitleCase = (kebabCase: string) =>
  kebabCase.split('-').map(toCapitalisedWord).join('');

export const convertTitleCaseToKebabCase = (titleCase: string) => {
  const words = titleCase.match(/[A-Z][^A-Z]*/g);
  return words?.map(word => word.toLowerCase()).join('-') || '';
}
