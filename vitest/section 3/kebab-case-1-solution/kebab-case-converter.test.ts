import { convertKebabToTitle, convertTitleToKebab } from './kebab-case-converter';

describe('Case conversions', () => {
  describe('Kebab case to Title conversion', () => {
    it.each([
      ['', ''],
      ['Title', 'Title'],
      ['title', 'Title'],
      ['tiTLe', 'Title'],
      ['paragraph-title', 'Paragraph Title'],
      ['paragraph - title', 'Paragraph Title'],
      ['a-b-c', 'A B C'],
      ['    a-b-c-def', 'A B C Def'],
    ])('converts kebab-case "%s" to Title "%s"', (input, expected) => {
      expect(convertKebabToTitle(input)).toBe(expected);
    });
  });

  describe('title to kebab conversion', () => {
    it.each([
      ['', ''],
      ['Title', 'title'],
      ['Paragraph Title', 'paragraph-title'],
      ['A Big Paragraph Title', 'a-big-paragraph-title'],
      [' Paragraph   Title ', 'paragraph-title']
    ])('converts Title "%s" to kebab "%s"', (input, expected) => {
      expect(convertTitleToKebab(input)).toBe(expected);
    });
  });

  describe('Round trip kebab to title', () => {
    it.each([
      ['', ''],
      ['Title', 'title'],
      ['Paragraph Title', 'paragraph-title'],
      ['A Big Paragraph Title', 'a-big-paragraph-title'],
      ['A B C', 'a-b-c'],
    ])('preserves integrity when round tripping between Title "%s" and kebab "%s"', (title, kebab) => {
      const kebabVersion = convertTitleToKebab(title);
      expect(kebabVersion).toBe(kebab);

      const titleVersion = convertKebabToTitle(kebabVersion);
      expect(titleVersion).toBe(title);
    });
  });
});
