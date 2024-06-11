import { convertKebabToTitle } from './kebab-case-converter';

describe('Kebab case conversion', () => {
  // individual it cases for demonstration
  it('converts empty string to empty string', () => {
    expect(convertKebabToTitle('')).toBe('');
  });

  it('converts single capitalized word to itself', () => {
    expect(convertKebabToTitle('Title')).toBe('Title');
  });

  it('converts single lowercase word to capitalized', () => {
    expect(convertKebabToTitle('title')).toBe('Title');
  });

  it('converts single lowercase word to capitalized', () => {
    expect(convertKebabToTitle('tiTLe')).toBe('Title');
  });

  it('converts paragraph-title', () => {
    expect(convertKebabToTitle('paragraph-title')).toBe('Paragraph Title');
  });

  // continue using these tests
  it.each([
    ['', ''],
    ['Title', 'Title'],
    ['title', 'Title'],
    ['tiTLe', 'Title'],
    ['paragraph-title', 'Paragraph Title'],
    ['paragraph - title', 'Paragraph Title'],
    ['a-b-c', 'A B C'],
    ['    a-b-c-def', 'A B C Def'],
  ])('Expect "%s" to map to "%s"', (input, expected) => {
    expect(convertKebabToTitle(input)).toBe(expected);
  });
});
