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
